import debounce from "debounce-fn";
import { autorun, observable, reaction, runInAction } from "mobx";
import deepEqual from "fast-deep-equal";
import { array2dWithZeros, arrayWithIndex, arrayWithZeros } from "./arrayTools";
import Judge from "./Judge";
import { FinalMarks, Place, PossiblePlace, ResultTable } from "./JudgeTypes";
import { calculateSkating } from "./calculateFinal";
import { calculateIncompleteMajority } from "./calculateIncompleteFinal";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

function initMarks(m: FinalMarks): FinalMarks {
  const marks: FinalMarks = {
    ...m,
    marks: array2dWithZeros(m.competitors, m.judges),
  };

  for (let c = 0; c < m.competitors; c++) {
    for (let j = 0; j < m.judges; j++) {
      marks.marks[c]!![j] = m.marks[c]?.[j] || 0;
    }
  }

  return marks;
}

interface GroupResult {
  table: ResultTable | undefined;
  places: PossiblePlace[];
}

interface Results {
  results: GroupResult[];
  group1Results: GroupResult[];
  group2Results: GroupResult[];
  refinedPlaces: (string | undefined)[][];
  dances: number;
  skating:
    | {
        places: Place[];
        table: string[][];
        skatingTable: ResultTable;
        skatingPlaces: Place[];
      }
    | undefined;
}

const JudgeStore = observable({
  competitors: 6,
  judges: 5,
  group1Size: 0,
  marks: [
    initMarks({
      competitors: 6,
      judges: 5,
      marks: [],
    }),
  ],

  results: undefined as Results | undefined,

  setMark(dance: number, competitor: number, judge: number, mark: number) {
    const competitorRow = this.marks[dance]?.marks[competitor];
    if (competitorRow) competitorRow[judge] = mark;
  },

  setCompetitors(count: number) {
    this.competitors = count;
    for (let c = 0; c < this.marks.length; c++) {
      this.marks[c] = initMarks({
        ...this.marks[c]!!,
        competitors: Math.min(9, count),
      });
    }
  },

  setJudges(count: number) {
    this.judges = count;
    for (let c = 0; c < this.marks.length; c++) {
      this.marks[c] = initMarks({
        ...this.marks[c]!!,
        judges: Math.min(100
          , count),
      });
    }
  },

  setDances(count: number) {
    const marks = [];
    for (let c = 0; c < count; c++) {
      marks[c] =
        this.marks[c] ||
        initMarks({
          marks: [],
          judges: this.judges,
          competitors: this.competitors,
        });
    }
    this.marks = marks;
  },

  setGroup1Size(size: number) {
    this.group1Size = Math.max(0, Math.min(size, this.judges));
  },

  delete() {
    if (confirm("Alle Wertungen löschen?")) {
      for (let m = 0; m < this.marks.length; m++) {
        this.marks[m] = initMarks({ ...this.marks[m]!!, marks: [] });
      }
    }
  },

  get valid(): { danceValid: boolean[]; valid: boolean[][][] } {
    const valid = this.marks.map((i: FinalMarks) =>
      i.marks.map((j) => j.map(() => true))
    );
    const danceValid = this.marks.map(() => true);
    for (let d = 0; d < this.marks.length; d++) {
      const dance = this.marks[d];
      if (!dance) continue;
      for (let j = 0; j < dance.judges; j++) {
        const marks: number[] = [];
        for (let c = 0; c < dance.competitors; c++) {
          const mark = dance.marks[c]?.[j] || 0;
          if (mark <= 0) {
            danceValid[d] = false;
          } else if (mark > dance.competitors) {
            valid[d]!![c]!![j] = false;
            danceValid[d] = false;
          } else if ((marks[mark] ?? -1) >= 0) {
            valid[d]!![c]!![j] = false;
            valid[d]!![marks[mark]!!]!![j] = false;
            danceValid[d] = false;
          }
          marks[mark] = c;
        }
      }
    }
    return { danceValid, valid };
  },
});

const data =
  typeof window !== "undefined" && window.localStorage.getItem("final");

if (data) {
  const jsonData = JSON.parse(data);
  Object.assign(JudgeStore, jsonData);
}

autorun(
  () => {
    const data = JSON.stringify({
      marks: JudgeStore.marks,
      judges: JudgeStore.judges,
      competitors: JudgeStore.competitors,
      group1Size: JudgeStore.group1Size,
    });
    localStorage.setItem("final", data);
  },
  { delay: 500 }
);

// Helper function to calculate refined places based on group1 results
function calculateRefinedPlaces(
  places: PossiblePlace[],
  group1Places: PossiblePlace[],
  competitors: number
): (string | undefined)[] {
  const refinedPlaces: (string | undefined)[] = [];
  
  for (let c = 0; c < competitors; c++) {
    const place = places[c];
    if (!place) {
      refinedPlaces[c] = undefined;
      continue;
    }

    // Find all competitors in this tied range
    const tiedCompetitors: { index: number; group1Place: number }[] = [];
    for (let i = 0; i < competitors; i++) {
      const otherFrom = places[i]?.from.from;
      if (otherFrom === place.from.from) {
        const group1Place = group1Places[i];
        const group1FromValue = group1Place?.from?.from ?? 999;
        const group1ToValue = group1Place?.from?.to ?? 999;
        const group1PlaceValue = (group1FromValue + group1ToValue) / 2;
        tiedCompetitors.push({
          index: i,
          group1Place: group1PlaceValue,
        });
      }
    }

    // Sort by group1 place
    tiedCompetitors.sort((a, b) => a.group1Place - b.group1Place);

    // Group competitors by their group1 place value
    let currentPlace = place.from.from;
    let prevGroup1Place: number | null = null;
    const refinedGroups: { indices: number[]; startPlace: number }[] = [];
    
    for (const tc of tiedCompetitors) {
      if (prevGroup1Place === null || tc.group1Place !== prevGroup1Place) {
        refinedGroups.push({ indices: [tc.index], startPlace: currentPlace });
        prevGroup1Place = tc.group1Place;
      } else {
        refinedGroups[refinedGroups.length - 1]!.indices.push(tc.index);
      }
      
      if (prevGroup1Place !== tc.group1Place || refinedGroups[refinedGroups.length - 1]!.indices.length === 1) {
        currentPlace++;
      }
    }

    // Find which group this competitor belongs to and assign place
    for (const group of refinedGroups) {
      if (group.indices.includes(c)) {
        if (group.indices.length === 1) {
          refinedPlaces[c] = group.startPlace.toString();
        } else {
          const endPlace = group.startPlace + group.indices.length - 1;
          refinedPlaces[c] = `${group.startPlace}-${endPlace}`;
        }
        break;
      }
    }
  }
  
  return refinedPlaces;
}

// Helper function to create a subset of marks for a specific judge group
function createGroupMarks(dance: FinalMarks, judgeStart: number, judgeEnd: number): FinalMarks {
  const groupSize = judgeEnd - judgeStart;
  if (groupSize <= 0) {
    return {
      competitors: dance.competitors,
      judges: 0,
      marks: array2dWithZeros(dance.competitors, 0),
    };
  }
  
  const groupMarks = array2dWithZeros(dance.competitors, groupSize);
  for (let c = 0; c < dance.competitors; c++) {
    for (let j = 0; j < groupSize; j++) {
      groupMarks[c]!![j] = dance.marks[c]?.[judgeStart + j] || 0;
    }
  }
  
  return {
    competitors: dance.competitors,
    judges: groupSize,
    marks: groupMarks,
  };
}

autorun(
  () => {
    const start = Date.now();
    const results = JudgeStore.marks.map((dance: FinalMarks) =>
      calculateIncompleteMajority(dance)
    );
    
    // Calculate group results if group1Size is set
    let group1Results: GroupResult[] = [];
    let group2Results: GroupResult[] = [];
    
    if (JudgeStore.group1Size > 0 && JudgeStore.group1Size < JudgeStore.judges) {
      group1Results = JudgeStore.marks.map((dance: FinalMarks) => {
        const group1Marks = createGroupMarks(dance, 0, JudgeStore.group1Size);
        return calculateIncompleteMajority(group1Marks);
      });
      
      group2Results = JudgeStore.marks.map((dance: FinalMarks) => {
        const group2Marks = createGroupMarks(dance, JudgeStore.group1Size, JudgeStore.judges);
        return calculateIncompleteMajority(group2Marks);
      });
    } else {
      // If group1Size is not set properly, use empty results
      group1Results = JudgeStore.marks.map(() => ({ table: undefined, places: [] }));
      group2Results = JudgeStore.marks.map(() => ({ table: undefined, places: [] }));
    }

    const skatingDances = JudgeStore.valid.danceValid
      .map((valid, i) =>
        valid
          ? {
              marks: JudgeStore.marks[i]!!,
              places: results[i]?.places?.map((i) => i.from)!!,
            }
          : null
      )
      .filter((i) => !!i)
      .map((i) => i!!);

    const skating =
      skatingDances.length > 1 ? calculateSkating(skatingDances) : undefined;

    // Calculate refined places for each dance
    const refinedPlaces: (string | undefined)[][] = [];
    if (JudgeStore.group1Size > 0 && JudgeStore.group1Size < JudgeStore.judges) {
      for (let d = 0; d < results.length; d++) {
        refinedPlaces[d] = calculateRefinedPlaces(
          results[d]?.places || [],
          group1Results[d]?.places || [],
          JudgeStore.competitors
        );
      }
    } else {
      for (let d = 0; d < results.length; d++) {
        refinedPlaces[d] = [];
      }
    }

    const d = { results, group1Results, group2Results, refinedPlaces, skating, dances: skatingDances.length };
    runInAction(() => (JudgeStore.results = d));
  },
  { delay: 200 }
);
export default JudgeStore;
