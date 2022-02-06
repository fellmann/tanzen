import { array2dWithZeros } from "./arrayTools";
import { FinalMarks, Place } from "./JudgeTypes";

export function sortAndGroupSame<T>(
  values: T[],
  comparator: (a: T, b: T) => number
): T[][] {
  if (values.length == 0) return [];
  if (values.length == 1) return [values];

  const sorted = values.sort(comparator);

  const result: T[][] = [];
  let last = 0;
  for (let first = 0; first < sorted.length; first = last) {
    last = first + 1;
    while (
      last < sorted.length &&
      comparator(sorted[first]!!, sorted[last]!!) == 0
    )
      last++;

    result.push(sorted.slice(first, last));
  }
  return result;
}

export function combineMarks(
  marks: FinalMarks[],
  competitors: number,
  judges: number
): number[][] {
  const result = array2dWithZeros(competitors, judges);
  let jIndex = 0;
  for (const dance of marks) {
    for (let c = 0; c < competitors; c++) {
      for (let j = 0; j < dance.judges; j++) {
        result[c]!![j + jIndex] = dance.marks[c]!![j]!!;
      }
    }
    jIndex += dance.judges;
  }
  return result;
}

export function exactPlace(n: number) {
  return {
    from: n,
    to: n,
  };
}

export function getPlaceValue(place?: Place) {
  if (!place) return 0;
  return (place.from + place.to) / 2;
}
