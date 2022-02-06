import { array2dWithZeros, arrayWithIndex, arrayWithZeros } from "./arrayTools";
import {
  combineMarks,
  exactPlace,
  getPlaceValue,
  sortAndGroupSame,
} from "./calculationTools";
import { FinalMarks, Place, ResultTable } from "./JudgeTypes";

export function calculateMajority(
  judgement: FinalMarks,
  onlyFor?: number[],
  place?: number
) {
  const majority = Math.floor(judgement.judges / 2) + 1;

  const competitorValues: {
    majority: number[];
    sum: number[];
    index: number;
  }[] = [];
  for (let c = 0; c < judgement.competitors; c++) {
    const countMajority = arrayWithZeros(judgement.competitors + 1);
    const countSums = arrayWithZeros(judgement.competitors + 1);
    for (let j = 0; j < judgement.judges; j++) {
      const mark = judgement.marks[c]?.[j] ?? 0;
      if (mark > 0)
        for (let m = mark; m <= judgement.competitors; m++) {
          countMajority[m]++;
          countSums[m] += mark;
        }
    }
    competitorValues[c] = { majority: countMajority, sum: countSums, index: c };
  }

  let remaining = onlyFor || arrayWithIndex(judgement.competitors);
  const table: ResultTable = arrayWithIndex(judgement.competitors).map((i) =>
    arrayWithZeros(judgement.competitors + 1).map((i) => undefined)
  );
  const places: Place[] = [];
  let lookingFor = place || 1;

  let column = lookingFor;
  while (remaining.length && column <= judgement.competitors) {
    let byMaxMajority = sortAndGroupSame(
      remaining
        .map((r) => competitorValues[r]!!)
        .map((a) => {
          const val = a?.majority[column];
          const tableEntry = table[a?.index || 0];
          if (tableEntry) tableEntry[column] = val == 0 ? "-" : val?.toString();
          return a;
        })
        .filter((m) => (m?.majority[column] || 0) >= majority)
        .map((v) => ({
          index: v.index,
          majority: v.majority.slice(column),
          sum: v.sum.slice(column),
        })),
      (a, b) => {
        for (let sortColumn = 0; sortColumn < a.majority.length; sortColumn++) {
          const tableColumn = column + sortColumn;
          table[a.index]!![tableColumn] = a.majority[sortColumn]!!.toString();
          table[b.index]!![tableColumn] = b.majority[sortColumn]!!.toString();
          const sortingByMajority =
            (b.majority[sortColumn] || 0) - (a.majority[sortColumn] || 0);
          if (sortingByMajority) return sortingByMajority;

          table[a.index]!![tableColumn] += "\xA0(" + a.sum[sortColumn] + ")";
          table[b.index]!![tableColumn] += "\xA0(" + b.sum[sortColumn] + ")";
          const sortingBySum =
            (a.sum[sortColumn] || 0) - (b.sum[sortColumn] || 0);
          if (sortingBySum) return sortingBySum;
        }
        return 0;
      }
    );

    for (const group of byMaxMajority) {
      for (const c of group) {
        places[c.index] = {
          from: lookingFor,
          to: lookingFor + group.length - 1,
        };
        remaining = remaining.filter((i) => i != c.index);
      }
      lookingFor += group.length;
    }

    column++;
  }
  return { places, table };
}

export function calculateSkating(
  dances: { marks: FinalMarks; places: Place[] }[]
) {
  if (dances.length < 1) return;
  const competitors = dances[0]?.marks.competitors || 0;
  if (!competitors) return;

  const places: Place[] = arrayWithZeros(competitors).map((i) =>
    exactPlace(i + 1)
  );

  const sum = arrayWithZeros(competitors);
  const placeCount = array2dWithZeros(competitors, competitors + 1);
  const placeSum = array2dWithZeros(competitors, competitors + 1);

  const judges = dances.map((i) => i.marks.judges).reduce((a, b) => a + b);
  const skatingJudgement: FinalMarks = {
    competitors,
    judges,
    marks: combineMarks(
      dances.map((i) => i.marks),
      competitors,
      judges
    ),
  };

  let skatingTable: ResultTable = [];
  let skatingPlaces: Place[] = [];

  const table: string[][] = array2dWithZeros(
    competitors,
    dances.length + 1
  ).map((i) => i.map(() => ""));

  for (let d = 0; d < dances.length; d++) {
    const dance = dances[d]!!;
    for (let c = 0; c < competitors; c++) {
      const place = getPlaceValue(dance.places[c]);
      table[c]!![d] = place.toString();
      sum[c] += place;
      for (let m = competitors; m >= place; m--) {
        placeCount[c]!![m]++;
        placeSum[c]!![m] += place;
      }
    }
  }
  for (let c = 0; c < competitors; c++) {
    table[c]!![dances.length] = sum[c]!!.toString();
  }

  const sortedGroups = sortAndGroupSame(
    arrayWithIndex(competitors),
    (a, b) => sum[a]!! - sum[b]!!
  );

  let place = 1;
  for (const group of sortedGroups) {
    if (group.length == 1) {
      const c = group[0]!!;
      places[c] = exactPlace(place);
      table[c]!![dances.length + 1] = getPlaceValue(places[c]).toString();
      place++;
    } else {
      let remaining = group;
      const tableCol = arrayWithZeros(competitors).map(() => dances.length + 1);
      for (const c of remaining) {
        table[c]!![dances.length + 1] = "punktgleich für " + place + ".";
      }
      while (remaining.length > 0) {
        const byCount = sortAndGroupSame(remaining, (a, b) => {
          return placeCount[b]!![place]!! - placeCount[a]!![place]!!;
        })[0]!!;

        const firstBySum = sortAndGroupSame(byCount, (a, b) => {
          return placeSum[a]!![place]!! - placeSum[b]!![place]!!;
        })[0]!!;

        if (firstBySum.length == 1) {
          const c = firstBySum[0]!!;
          places[c] = exactPlace(place);
          table[c]!![tableCol[c]!! + 1] = getPlaceValue(places[c]).toString();

          remaining = remaining.filter((i) => i != c);
          place++;
        } else {
          for (const c of firstBySum) {
            table[c]!![tableCol[c]!! + 1] = "punktgleich für " + place + ".";
          }
          const skating11Result = calculateMajority(
            skatingJudgement,
            firstBySum,
            place
          );

          for (let row = 0; row < skating11Result.table.length; row++) {
            for (
              let col = 0;
              col < skating11Result.table[row]!!.length;
              col++
            ) {
              const n = skating11Result.table[row]!![col]!!;
              const o = skatingTable[row]?.[col] || "";
              skating11Result.table[row]!![col] = n > o ? n : o;
            }
          }
          skatingTable = skating11Result.table;

          const rule11 = sortAndGroupSame(
            firstBySum,
            (a, b) =>
              getPlaceValue(skating11Result.places[a]!!) -
              getPlaceValue(skating11Result.places[b]!!)
          );

          for (let i = 0; i < rule11.length; i++) {
            const rule11Winner = rule11[i]!!;
            if (i > 0 && (rule11.length > 2 || rule11Winner.length > 1)) {
              for (const c of rule11Winner) {
                tableCol[c] += 2;
              }
              continue;
            }

            for (const c of rule11Winner) {
              places[c] = {
                from: place,
                to: place + rule11Winner.length - 1,
              };
              skatingPlaces[c] = skating11Result.places[c]!!;
              table[c]!![tableCol[c]!! + 2] = getPlaceValue(
                places[c]
              ).toString();
              remaining = remaining.filter((i) => i != c);
            }
            place += rule11Winner.length;
          }
        }
      }
    }
  }

  return { places, table, skatingTable, skatingPlaces };
}
