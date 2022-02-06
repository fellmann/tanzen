import Color from "color";
import { autorun, observable, runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText
} from "reactstrap";
import {
  Bar,
  BarChart, CartesianGrid, LabelList,
  LabelProps, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import selectAll from "../components/selectAll";
import { arrayWithIndex } from "../judge/arrayTools";
import { calcProb } from "./calcProb";

const store = observable({
  crosses: 4,
  judges: 5,
  competitors: 6,
  resultCompetitors: 0,
  setCompetitors(i: number) {
    this.competitors = i;
    this.crosses = Math.round((i * 2) / 3);
  },
  setJudges(i: number) {
    this.judges = i;
  },
  setCrosses(i: number) {
    this.crosses = i;
  },
  data: [] as { name: string; values: number[] }[],
});

autorun(
  () => {
    const data = calcProb(
      store.competitors,
      store.judges,
      store.crosses,
      20000
    );
    runInAction(() => {
      store.data = data;
      store.resultCompetitors = store.competitors;
    });
  },
  { delay: 200 }
);

export default observer(function Crosses() {
  useEffect(() => {
    document.title = "Rechner Final-Wahrscheinlichkeiten";
  }, []);
  return (
    <Container>
      <h1>Rechner Final-Wahrscheinlichkeiten</h1>

      <p>
        Diese Simulation zeigt die Wahrscheinlichkeit, dass n Teilnehmer die
        Majorität der Kreuze in einer Vorrunde bekommen.
      </p>

      <div>
        <form>
          <InputGroup>
            <InputGroupText>Teilnehmer</InputGroupText>
            <Input
              inputMode="numeric"
              pattern="[0-9]*"
              value={store.competitors}
              onFocus={selectAll}
              onChange={(e) => {
                store.setCompetitors(parseInt(e.target.value || "0"));
              }}
              style={{ textAlign: "right" }}
            ></Input>
          </InputGroup>
          <InputGroup>
            <InputGroupText>Wertungsrichter</InputGroupText>
            <Input
              inputMode="numeric"
              pattern="[0-9]*"
              value={store.judges}
              onFocus={selectAll}
              onChange={(e) => {
                store.setJudges(parseInt(e.target.value || "0"));
              }}
              style={{ textAlign: "right" }}
            ></Input>
          </InputGroup>
          <InputGroup>
            <InputGroupText>Kreuzvorgabe</InputGroupText>
            <Button
              onClick={() =>
                store.setCrosses(Math.round((store.competitors * 2) / 3))
              }
            >
              ⅔
            </Button>
            <Input
              inputMode="numeric"
              pattern="[0-9]*"
              value={store.crosses}
              onFocus={selectAll}
              onChange={(e) =>
                store.setCrosses(parseInt(e.target.value || "0"))
              }
              style={{ textAlign: "right" }}
            ></Input>
          </InputGroup>
        </form>
      </div>
      <Chart />
      <p>
        Die X-Achse stellt die Einigkeit der Wertungsrichter dar.
        <br />
        0: Die Kreuze aller WR sind gleich exakt gesetzt.
        <br />
        1: Die Kreuze sind vollkommen zufällig gesetzt.
      </p>
    </Container>
  );
});

const renderCustomizedLabel = (i: number) => (props: LabelProps) => {
  const { x, y, width, height, offset } = props;
  const radius = 10;

  return height!! < 15 ? null : (
    <g>
      <text
        x={(x as number) + (width as number) / 2}
        y={(y as number) + (height as number) / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {i}
      </text>
    </g>
  );
};

const Chart = observer(function Chart() {
  return (
    <ResponsiveContainer width="99%" height={400}>
      <BarChart
        stackOffset="expand"
        margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
        data={toJS(store.data)}
      >
        <YAxis
          type="number"
          domain={[0, 1]}
          tickFormatter={(e) => Math.round(e * 100) + " %"}
        />
        <XAxis dataKey="name" />
        <Tooltip formatter={(e: number) => e.toLocaleString() + " %"} />
        <CartesianGrid stroke="#f5f5f5" />
        {arrayWithIndex(store.resultCompetitors + 1).map((i) => {
          return !store.data.find((d) => !!d.values[i]) ? null : (
            <Bar
              key={i}
              type="monotone"
              dataKey={"values[" + i + "]"}
              name={i + " Teilnehmer"}
              stroke="#000"
              fill={Color.hsl(
                170 + (100 / store.resultCompetitors) * i,
                50,
                50
              ).hex()}
              stackId="a"
              yAxisId={0}
            >
              <LabelList
                dataKey="name"
                content={renderCustomizedLabel(i)}
                position="inside"
              />
            </Bar>
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
});
