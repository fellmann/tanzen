import Color from "color";
import { autorun, observable, reaction, runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  LabelProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import selectAll from "../components/selectAll";
import { arrayWithIndex } from "../judge/arrayTools";

interface RehearsalData {
  timestamps: number[];
  counts: Record<string, number>[];
}

const timestamps = [
  "Start Stellprobe",
  "Start Aufmarsch",
  "Start Musik",
  "Start Hauptteil",
  "Ende Hauptteil",
  "Ende Musik",
  "Ende Abmarsch",
  "Ende Stellproben",
];

const store = observable({
  state: {
    data: [] as RehearsalData[],
    currentTeam: 0,
  },
  now: Date.now(),

  updateNow() {
    this.now = Date.now();
  },

  getTimes(): ({
    label: string;
    time?: number;
    span?: number;
    min?: number;
    max?: number;
  } | null)[][] {
    return [
      [
        {
          label: "Stellprobe",
          time: this.getDiff(0, 7),
          span: 8,
          max: 15 * 60 * 1000,
        },
        null,
        null,
      ],
      [{ label: "Aufmarsch", time: this.getDiff(1, 2), max: 30 * 1000 }],
      [
        {
          label: "Musik",
          time: this.getDiff(2, 5),
          span: 3,
          max: 6 * 60 * 1000,
        },
        { label: "Einmarsch", time: this.getDiff(2, 3) },
      ],
      [
        {
          label: "Hauptteil",
          time: this.getDiff(3, 4),
          min: 3 * 60 * 1000,
          max: 4.5 * 60 * 1000,
        },
      ],
      [{ label: "Ausmarsch", time: this.getDiff(4, 5) }],
      [{ label: "Abmarsch", time: this.getDiff(5, 6), max: 30 * 1000 }],
      [null, null],
    ];
  },

  getDiff(i1: number, i2: number): number | undefined {
    const data = this.getCurrentData();
    if (!data.timestamps[i1]) {
      return undefined;
    }
    const diff = Math.max(
      0,
      (data.timestamps[i2] ?? this.now) - data.timestamps[i1],
    );
    // format as mm:ss
    return diff;
  },

  incrementTeam(increment: number) {
    if (this.state.currentTeam + increment >= 0) {
      this.state.currentTeam += increment;
    }
  },
  getCurrentData(): RehearsalData {
    if (!this.state.data[this.state.currentTeam]) {
      this.state.data[this.state.currentTeam] = { counts: [], timestamps: [] };
    }
    return this.state.data[this.state.currentTeam]!;
  },
  getCurrentTimestampLabel(): string | undefined {
    const ts = this.getCurrentData().timestamps.length;
    return timestamps[ts] || undefined;
  },
  getPreviousTimestampLabel(): string | undefined {
    const ts = this.getCurrentData().timestamps.length - 1;
    return timestamps[ts] || undefined;
  },

  clear() {
    this.state.data = [];
  },
  undoTimestamp() {
    this.getCurrentData().timestamps.pop();
  },
  addTimestamp() {
    this.getCurrentData().timestamps.push(Date.now());
  },
});

const data =
  typeof window !== "undefined" && window.localStorage.getItem("rehearsals");

if (data) {
  const jsonData = JSON.parse(data);
  Object.assign(store.state, jsonData);
}

autorun(
  () => {
    const data = JSON.stringify(store.state);
    localStorage.setItem("rehearsals", data);
  },
  { delay: 500 },
);

export default observer(function Reharsals() {
  useEffect(() => {
    document.title = "Stellproben";
  }, []);

  useEffect(
    () =>
      reaction(
        () => {
          const t1 = store.getTimes()[0]?.[0];
          if (t1?.max && t1.time && t1.time > t1.max) {
            return true;
          }
          return false;
        },
        (exceeded) => {
          // play alert sound
          if (exceeded) {
            const audio = new Audio("../alarm.mp3");
            audio.play();
          }
        },
      ),
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      store.updateNow();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <table style={{ width: "100%" }}>
        <tbody>
          {store.getTimes().map((t, i) => (
            <tr key={i}>
              {t.map((part, j) =>
                part === null ? (
                  <td key={j}>
                    &nbsp;
                    <br />
                    &nbsp;
                  </td>
                ) : (
                  <td
                    key={j}
                    rowSpan={part.span || 1}
                    style={{
                      padding: "2px",
                      fontSize: "1.5rem",
                      verticalAlign: "middle",
                      textAlign: "center",

                      border: "1px solid black",
                      color:
                        part.max && part.time && part.time > part.max
                          ? "#c00"
                          : part.min && part.time && part.time < part.min
                            ? "#c80"
                            : "black",
                    }}
                  >
                    {part.label}
                    <br />
                    <b>{part.time ? formatDuration(part.time) : "-"}</b>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Button size="lg" onClick={() => store.addTimestamp()}>
        {store.getCurrentTimestampLabel()}
      </Button>
      <Button size="lg" onClick={() => store.undoTimestamp()}>
        Undo {store.getPreviousTimestampLabel()}
      </Button>
      <br />
      <Button size="lg" onClick={() => store.incrementTeam(-1)}>
        &lt;
      </Button>
      {` Team ${store.state.currentTeam + 1} `}
      <Button size="lg" onClick={() => store.incrementTeam(1)}>
        &gt;
      </Button>
      <br />
      <Button size="lg" onClick={() => store.clear()}>
        Clear
      </Button>
    </Container>
  );
});
function formatDuration(diff: number) {
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
