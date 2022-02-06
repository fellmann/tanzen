import { array2dWithZeros, arrayWithZeros } from "../judge/arrayTools";

export function calcProb(
  teams: number,
  wr: number,
  crosses: number,
  iterations: number
) {
  const mj = Math.floor(wr / 2) + 1;
  const noCross = teams - crosses;

  const result: { name: string; values: number[] }[] = [];

  for (let distribution = 0; distribution <= 1.000001; distribution += 0.1) {
    const teamsOccurence: number[] = arrayWithZeros(teams + 1);
    const randTeam = () =>
      Math.floor(Math.pow(Math.random(), distribution) * teams);

    for (let i = 0; i < iterations; i++) {
      const cross = [];
      for (let w = 0; w < wr; w++) {
        cross[w] = [...new Array(teams)].map(() => 1);
        for (let r = 0; r < noCross; r++) {
          const randomTeam = randTeam();
          for (let t = 0; t < teams; t++) {
            const crossTeam = (randomTeam + t) % teams;
            if (cross[w]?.[crossTeam] == 1) {
              cross[w]!![crossTeam] = 0;
              break;
            }
          }
        }
      }
      let teamsChosen = 0;
      for (let t = 0; t < teams; t++) {
        let crossesPerTeam = 0;
        for (let w = 0; w < wr; w++) {
          crossesPerTeam += cross[w]?.[t] || 0;
        }
        if (crossesPerTeam >= mj) teamsChosen++;
      }
      teamsOccurence[teamsChosen] = (teamsOccurence[teamsChosen] || 0) + 1;
    }
    const res = { name: distribution.toLocaleString(), values: [] as number[] };
    for (let t = 0; t <= teams; t++) {
      res.values[t] = Math.round((100 * (teamsOccurence[t] || 0)) / iterations);
    }
    result.push(res);
  }
  return result;
}
