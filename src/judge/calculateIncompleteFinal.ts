import { klona } from "klona";
import { arrayWithZeros } from "./arrayTools";
import { calculateMajority } from "./calculateFinal";
import { exactPlace, getPlaceValue } from "./calculationTools";
import { FinalMarks, PossiblePlace, ResultTable } from "./JudgeTypes";

export function calculateIncompleteMajority(marks: FinalMarks) {
  const judgement = klona(marks);

  let setCount = 0;

  let competitorSet: boolean[] = [];
  const markCount: number[] = arrayWithZeros(judgement.competitors + 1);
  for (let c = 0; c < judgement.competitors; c++) {
    competitorSet[c] = true;
    for (let j = 0; j < judgement.judges; j++) {
      const mark = judgement.marks[c]?.[j] || 0;
      if (mark <= 0 || mark > judgement.competitors) {
        competitorSet[c] = false;
        break;
      }
    }
    if (competitorSet[c]) {
      for (let j = 0; j < judgement.judges; j++) {
        const mark = judgement.marks[c]?.[j] || 0;
        markCount[mark]++;
      }
      setCount++;
    }
  }

  function distributeMissing(countGood: number) {
    const unset = competitorSet
      .map((set, i) => (!set ? i : -1))
      .filter((i) => i >= 0);

    if (unset.length == 0) return;

    const goodOnes = unset.filter((_, i) => i < countGood);
    const badOnes = unset.filter((_, i) => i >= countGood);

    const missingMarks = [];
    for (let mark = judgement.competitors; mark > 0; mark--) {
      missingMarks.push(
        ...arrayWithZeros(judgement.judges - (markCount[mark] || 0)).map(
          () => mark
        )
      );
    }

    for (const ones of [goodOnes, badOnes]) {
      const sums = arrayWithZeros(judgement.competitors);
      let sortedOnes = [...ones];
      for (let j = 0; j < judgement.judges; j++) {
        for (let i = 0; i < sortedOnes.length; i++) {
          let markRow = judgement.marks[sortedOnes[i] || 0];
          const mark = missingMarks.pop() || 0;
          if (markRow) markRow[j] = mark;
          sums[sortedOnes[i] || 0] += mark;
        }
        sortedOnes = sortedOnes.sort((a, b) => {
          return -(sums[a] || 0) + (sums[b] || 0);
        });
      }
    }
  }

  let table: ResultTable | undefined;
  let places: PossiblePlace[] = [];
  const unsetPlace: PossiblePlace = {
    from: exactPlace(judgement.competitors),
    to: exactPlace(1),
  };
  for (let c = 0; c < judgement.competitors; c++) {
    if (competitorSet[c])
      places[c] = {
        from: exactPlace(judgement.competitors),
        to: exactPlace(1),
      };
    else places[c] = unsetPlace;
  }
  for (
    let iteration = 0;
    iteration <= judgement.competitors - setCount;
    iteration++
  ) {
    distributeMissing(iteration);
    const result = calculateMajority(judgement);
    table = result.table;
    for (let c = 0; c < judgement.competitors; c++) {
      const possiblePlace = result.places[c];
      if (!possiblePlace) continue;
      const currentPlace = places[c];
      if (currentPlace) {
        if (getPlaceValue(currentPlace.from) > getPlaceValue(possiblePlace)) {
          currentPlace.from = possiblePlace;
        }
        if (getPlaceValue(currentPlace.to) < getPlaceValue(possiblePlace)) {
          currentPlace.to = possiblePlace;
        }
      }
    }
  }

  if (table && setCount < judgement.competitors - 1)
    for (let c = 0; c < judgement.competitors; c++) {
      if (!competitorSet[c])
        table[c] = arrayWithZeros(judgement.competitors + 1).map((i) => "");
    }

  return { table, places };
}
