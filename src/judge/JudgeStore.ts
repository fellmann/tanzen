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

interface Results {
  results: {
    table: ResultTable | undefined;
    places: PossiblePlace[];
  }[];
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
        judges: Math.min(11, count),
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
    });
    localStorage.setItem("final", data);
  },
  { delay: 500 }
);

autorun(
  () => {
    const start = Date.now();
    const results = JudgeStore.marks.map((dance: FinalMarks) =>
      calculateIncompleteMajority(dance)
    );

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

    const d = { results, skating, dances: skatingDances.length };
    runInAction(() => (JudgeStore.results = d));
  },
  { delay: 200 }
);
export default JudgeStore;
