import { array2dWithZeros, arrayWithIndex } from "../../src/judge/arrayTools";
import {
  calculateMajority,
  calculateSkating,
} from "../../src/judge/calculateFinal";
import { getPlaceValue } from "../../src/judge/calculationTools";
import { FinalMarks } from "../../src/judge/JudgeTypes";

describe("TSO Beispiele", () => {
  test("Beispiel A", () =>
    testBeispiel(
      "15112 1,22541 2,33323 3,44234 4,51455 5,66666 6;1,2,3,4,5,6"
    ));
  test("Beispiel B", () =>
    testBeispiel(
      "11144 1,32211 2,25522 3,43453 4,54335 5,66666 6;1,2,3,4,5,6"
    ));
  test("Beispiel C", () =>
    testBeispiel(
      "11155 1,22514 2,55222 3,33461 4,44333 5,66646 6;1,2,3,4,5,6"
    ));

  test("Beispiel D", () =>
    testBeispiel(
      "21511 1,12255 2,56122 3,33336 4,44464 5,65643 6;1,2,3,4,5,6"
    ));
  test("Beispiel E", () =>
    testBeispiel(
      "21511 1,12255 2.5,55122 2.5,33336 4,44464 5,66643 6;1,2.5,2.5,4,5,6"
    ));
  test("Beispiel F", () =>
    testBeispiel(
      "1 1,3 3,2 2,4 4,5 5,6 6;2 2,1 1,3 3,4 4,5 5,6 6;1 1,2 2,3 3,4 4,5 5,6 6;2 2,1 1,3 3,4 4,5 5,6 6;2 2,4 4,3 3,1 1,6 6,5 5;1,2,3,4,5,6"
    ));
  test("Beispiel G", () => {
    testBeispiel(
      "1 1,3 3,2 2,4 4,6 6,5 5;1 1,3 3,5 5,2 2,6 6,4 4;2 2,1 1,4 4,3 3,5 5,6 6;5 5,2 2,4 4,6 6,1 1,3 3;1,2,4,3,6,5"
    );
  });
  test("Beispiel H", () => {
    testBeispiel(
      "3 3,2 2,1 1,4 4,5 5,6 6;1 1,2 2,4 4,5 5,3 3,6 6;1 1,3 3,2 2,6 6,5 5,4 4;1 1,2 2,5 5,4 4,3 3,6 6;1 1,6 6,3 3,2 2,5 5,4 4;1,2,3,4,5,6"
    );
  });
  test("Beispiel J", () => {
    testBeispiel(
      "1 1,3 3,2 2,6 6,5 5,4 4;1 1,4 4,2 2,3 3,5 5,6 6;2 2,1 1,3 3,4 4,5 5,6 6;3 3,2 2,1 1,5 5,4 4,6 6;2 2,1 1,3 3,5 5,4 4,6 6;1,2,3,4,5,6"
    );
  });
  test("Beispiel K", () => {
    testBeispiel(
      "2 2,1 1,6 6,4 4,5 5,3 3;1 1,2 2,6 6,4 4,3 3,5 5;5 5,2 2,1 1,4 4,3 3,6 6;3 3,6 6,1 1,4 4,2 2,5 5;2 2,6 6,3 3,1 1,4 4,5 5;1,2,3,4,5,6"
    );
  });
  test("Beispiel M", () => {
    testBeispiel(
      "11253 1,22525 2,45311 3,33636 4,66144 5,54462 6;" +
        "12234 1,53122 2,31313 3,44441 4,25555 5,66666 6;" +
        "11223 1.5,32112 1.5,53361 3,26634 4,44556 5.5,65445 5.5;" +
        "22515 2,11252 1,56323 4,33136 3,64664 6,45441 5;" +
        "26261 2,15152 1,32424 4,51513 3,44636 6,63345 5;" +
        "2,1,3,4,6,5"
    );
  });
  test("Beispiel N", () => {
    testBeispiel(
      "11253 1,22525 2,33636 4,45311 3,66144 5,54462 6;" +
        "12234 1,53122 2,44441 4,31313 3,25555 5,66666 6;" +
        "11111 1,23456 4,34562 4,45623 4,52234 2,66345 6;" +
        "11252 1,56323 4,22515 2,33136 3,45441 5,64664 6;" +
        "15152 1,32424 4,26261 2,51513 3,63345 5,44636 6;" +
        "1,2,3,4,5,6"
    );
  });
  test("Beispiel P", () => {
    testBeispiel(
      "22525 2,33636 4,45311 3,11253 1,66144 5,54462 6;" +
        "12234 1,31313 3,25555 5,44441 4,66666 6,53122 2;" +
        "11111 1,23456 4,34562 4,45623 4,52234 2,66345 6;" +
        "33136 3,11252 1,45441 5,56323 4,22515 2,64664 6;" +
        "26261 2,44636 6,15152 1,63345 5,51514 4,32423 3;" +
        "1,2,3,4,5,6"
    );
  });
  test("Edge 1", () => {
    testBeispiel("1 1;1");
  });
  test("Edge 2", () => {
    testBeispiel(
      "1 1,2 2,3 3,4 4,5 5;" +
        "2 2,3 3,4 4,5 5,1 1;" +
        "3 3,4 4,5 5,1 1,2 2;" +
        "4 4,5 5,1 1,2 2,3 3;" +
        "5 5,1 1,2 2,3 3,4 4;" +
        "3,3,3,3,3"
    );
  });
});

function testBeispiel(text: string) {
  const dances = text.split(";");
  const countDances = Math.max(dances.length - 1, 1);
  const countCompetitors = dances[0]!.split(",").length;
  const countJudges = dances[0]!.split(",")[0]!.split(" ")[0]!.length;

  const marks: FinalMarks[] = arrayWithIndex(countDances).map((i) => ({
    competitors: countCompetitors,
    judges: countJudges,
    marks: array2dWithZeros(countCompetitors, countJudges),
  }));

  for (let d = 0; d < countDances; d++) {
    const competitors = dances[d]!.split(",");
    for (let c = 0; c < countCompetitors; c++) {
      const competitor = competitors[c]!.split(" ");
      for (let j = 0; j < countJudges; j++) {
        marks[d]!.marks[c]![j] = parseInt(competitor[0]!.substring(j, j + 1));
      }
    }
  }

  const results = marks.map((dance) => calculateMajority(dance));

  for (let d = 0; d < countDances; d++) {
    const competitors = dances[d]!.split(",");
    for (let c = 0; c < countCompetitors; c++) {
      const competitor = competitors[c]!.split(" ");
      expect(getPlaceValue(results[d]?.places[c]).toString()).toBe(
        competitor[1]
      );
    }
  }
  if (dances.length > countDances) {
    const skatingResult = calculateSkating(
      marks.map((m, i) => ({ marks: m, places: results[i]!.places }))
    );

    const competitors = dances[dances.length - 1]!.split(",");
    for (let c = 0; c < countCompetitors; c++) {
      expect(getPlaceValue(skatingResult?.places[c]).toString()).toBe(
        competitors[c]
      );
    }
  }
}
