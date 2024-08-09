import { action } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import React from "react";
import { Button, ButtonToggle, FormGroup, Input, Label } from "reactstrap";

import "./tempi.scss";

function formatMinSec(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

const dances = [
  {
    name: "Langsamer Walzer",
    bpmMin: 84,
    bpmMax: 90,
    durationMin: 1.5,
    durationMax: 2,
    beats: 3,
  },
  {
    name: "Tango",
    bpmMin: 124,
    bpmMax: 132,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
  {
    name: "Wiener Walzer",
    bpmMin: 174,
    bpmMax: 180,
    durationMin: 1.5,
    durationMax: 2,
    beats: 3,
  },
  {
    name: "Slowfox",
    bpmMin: 112,
    bpmMax: 120,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
  {
    name: "Quickstep",
    bpmMin: 200,
    bpmMax: 208,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
  {
    name: "Samba",
    bpmMin: 100,
    bpmMax: 104,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
  {
    name: "Cha-Cha-Cha",
    bpmMin: 120,
    bpmMax: 128,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
  {
    name: "Rumba",
    bpmMin: 100,
    bpmMax: 108,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
  {
    name: "Paso Doble",
    bpmMin: 120,
    bpmMax: 124,
    durationMin: 1.25,
    durationMax: 2.5,
    beats: 2,
  },
  {
    name: "Jive",
    bpmMin: 168,
    bpmMax: 176,
    durationMin: 1.5,
    durationMax: 2,
    beats: 4,
  },
];

export default observer(function Tempi() {
  const tapRef = useRef<HTMLButtonElement>(null);

  const store = useLocalObservable(() => ({
    clicks: [] as number[],
    dance: 0,
    started: 0,
    finished: 0,
    time: Date.now(),
    tapped: 0,
    bars: true,
  }));

  useEffect(() => {
    if (tapRef.current) {
      tapRef.current.addEventListener("touchstart", (e) => {
        e.preventDefault();
        tap();
      });
      tapRef.current.addEventListener("mousedown", tap);
    }
  }, [tapRef]);

  useEffect(() => {
    const interval = setInterval(
      action(() => {
        store.time = Date.now();
      }),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const tap = action(() => {
    if (store.tapped > Date.now() - 150) return;
    if (store.tapped < Date.now() - 5000) store.clicks = [];
    store.tapped = Date.now();
    store.clicks.push(Date.now());
    while (store.clicks.length > dance.beats * 4) store.clicks.shift();
  });

  const dance = dances[store.dance]!!;
  const tempo =
    (store.clicks.length > 1
      ? (60000 * (store.clicks.length - 1)) /
        (store.clicks[store.clicks.length - 1]!! - store.clicks[0]!!)
      : 0) * (store.bars ? dance.beats : 1);
  const passed = (store.finished || store.time) - (store.started || store.time);

  return (
    <div style={{ padding: "5px" }}>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {dances.map((dance, i) => (
          <Button
            key={i}
            onClick={action(() => (store.dance = i))}
            active={store.dance === i}
          >
            {dance.name}
          </Button>
        ))}
      </div>
      <div>{new Date(store.time).toLocaleTimeString()}</div>
      <hr />
      <h2>Dauer</h2>
      <div className="positioned-text">
        <div
          style={{
            position: "absolute",
            left: `min(100% - 80px, ${(100 * passed) / 60000 / (dance.durationMax * 1.2)}%)`,
            top: 0,
          }}
        >
          <b>Ist</b>
          <br />
          {formatMinSec((1 / 1000) * passed)}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: "30px",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "5px",
            height: "20px",
            backgroundColor: "gray",
            width: `${(100 * passed) / (dance.durationMax * 1.2 * 60 * 1000)}%`,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: `${(100 * dance.durationMin) / (dance.durationMax * 1.2)}%`,
            top: "0px",
            height: "30px",
            backgroundColor: "green",
            width: "5px",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: `${100 / 1.2}%`,
            top: "0px",
            height: "30px",
            backgroundColor: "red",
            width: "5px",
          }}
        ></div>
      </div>
      <div className="positioned-text">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${(100 * dance.durationMin) / (dance.durationMax * 1.2)}%`,
          }}
        >
          <b>Min</b>
          <br />
          {formatMinSec(dance.durationMin * 60)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${100 / 1.2}%`,
          }}
        >
          <b>Max</b>
          <br />
          {formatMinSec(dance.durationMax * 60)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        <Button
          color="primary"
          onClick={action(() => {
            store.started = store.time;
            store.finished = 0;
          })}
        >
          Start
        </Button>
        <Button
          color="primary"
          onClick={action(() => (store.finished = store.time))}
        >
          Stop
        </Button>
        <Button
          onClick={action(() => {
            store.finished = 0;
            store.started = 0;
          })}
        >
          Clear
        </Button>
      </div>
      <hr />
      <h2>Tempo</h2>
      <div className="positioned-text" style={{ height: "4em" }}>
        <div
          style={{
            position: "absolute",
            left: `min(100% - 80px, ${Math.max(
              0,
              33 + (33 * (tempo - dance.bpmMin)) / (dance.bpmMax - dance.bpmMin)
            )}%)`,
            top: 0,
          }}
        >
          <b>Ist</b>
          <div>{Math.round(tempo)} bpm</div>
          <div style={{ color: "#888" }}>
            {Math.round(tempo / dance.beats)} tpm
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: "30px",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "33%",
            width: "5px",
            top: 0,
            height: "30px",
            backgroundColor: "green",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "66%",
            width: "5px",
            top: 0,
            height: "30px",
            backgroundColor: "red",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: `min(100% - 10px, ${Math.max(
              0,
              33 + (33 * (tempo - dance.bpmMin)) / (dance.bpmMax - dance.bpmMin)
            )}%)`,
            width: "10px",
            top: "5px",
            height: "20px",
            backgroundColor: "gray",
          }}
        ></div>
      </div>
      <div className="positioned-text" style={{ height: "4em" }}>
        <div
          style={{
            position: "absolute",
            left: "33%",
            top: 0,
          }}
        >
          <b>Min</b>
          <div>{Math.round(dance.bpmMin)} bpm</div>
          <div style={{ color: "#888" }}>
            {Math.round(dance.bpmMin / dance.beats)} tpm
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "66%",
            top: 0,
          }}
        >
          <b>Max</b>
          <div>{Math.round(dance.bpmMax)} bpm</div>
          <div style={{ color: "#888" }}>
            {Math.round(dance.bpmMax / dance.beats)} tpm
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        <Button innerRef={tapRef} color="primary">
          Tap
        </Button>
        <Button
          onClick={action(() => {
            store.clicks = [];
          })}
        >
          Clear
        </Button>
      </div>
      <div style={{ marginTop: "10px", display: "flex", gap: "20px" }}>
        <FormGroup switch>
          <Input
            type="switch"
            checked={!store.bars}
            onChange={action(() => (store.bars = false))}
          />
          <Label check>Schläge</Label>
        </FormGroup>
        <FormGroup switch>
          <Input
            type="switch"
            checked={store.bars}
            onChange={action(() => (store.bars = true))}
          />
          <Label check>Takt ({dance.beats}/4)</Label>
        </FormGroup>
      </div>
    </div>
  );
});
