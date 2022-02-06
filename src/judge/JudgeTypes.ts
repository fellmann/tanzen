export type ResultTable = (string | undefined)[][];
export interface FinalMarks {
  judges: number;
  competitors: number;

  marks: number[][];
}

export interface Place {
  from: number;
  to: number;
}

export interface PossiblePlace {
  from: Place;
  to: Place;
}
