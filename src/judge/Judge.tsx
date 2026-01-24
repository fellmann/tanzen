import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Table,
} from "reactstrap";
import selectAll from "../components/selectAll";
import { arrayWithIndex } from "./arrayTools";
import "./judge.scss";
import JudgeStore from "./JudgeStore";
import { Place, PossiblePlace, ResultTable } from "./JudgeTypes";
import { getPlaceValue } from "./calculationTools";

const store = JudgeStore;

export default observer(function Judge() {
  useEffect(() => {
    document.title = "Finalrechner Majoritäts- & Skatingsystem";
  }, []);

  return (
    <Container>
      <h1>Finalrechner Majoritäts- &amp; Skatingsystem</h1>
      <p>Die Wertungen werden automatisch gespeichert.</p>
      <FinalConfiguration />
      <br />
      <Button onClick={() => store.delete()}>Wertungen zurücksetzen</Button>
      {store.marks.map((_, d) => {
        return <DanceView dance={d} key={d} />;
      })}
      <SkatingResult />
    </Container>
  );
});

const SkatingResult = observer(function SkatingResult() {
  return !store.results?.skating ? null : (
    <div className="dance-section">
      <h3>Gesamtergebnis</h3>
      <FinalResult />
      <h5 className="mt-2 mb-0">Ergebnistabelle</h5>
      <SkatingTableView
        table={toJS(store.results.skating.table)}
        places={store.results.skating.places}
      />
      {!!store.results.skating.skatingTable.length && (
        <>
          <h5 className="mt-2 mb-0">Skatingtabelle</h5>
          <ResultTableView
            table={store.results.skating.skatingTable}
            places={store.results.skating.skatingPlaces}
          />
        </>
      )}
    </div>
  );
});

const DanceView = observer(function DanceView(props: { dance: number }) {
  const d = props.dance;
  const result = store.results?.results[d];
  const group1Result = store.results?.group1Results[d];
  const group2Result = store.results?.group2Results[d];
  const refinedPlaces = store.results?.refinedPlaces[d];

  const [open, setOpen] = useState(() => false);
  const [openGroup1, setOpenGroup1] = useState(() => false);
  const [openGroup2, setOpenGroup2] = useState(() => false);

  const hasGroupResults =
    store.group1Size > 0 && store.group1Size < store.judges;

  return (
    <div key={d} className="dance-section">
      {store.marks.length > 1 && <h3>{d + 1}. Tanz</h3>}
      <MarkInput
        dance={d}
        places={result?.places}
        group1Places={hasGroupResults ? group1Result?.places : undefined}
        group2Places={hasGroupResults ? group2Result?.places : undefined}
        refinedPlaces={hasGroupResults ? refinedPlaces : undefined}
      />
      <br />
      {!!result?.table && (
        <>
          <Button size="sm" onClick={() => setOpen(!open)}>
            Wertungstabelle (Alle Wertungsrichter)
          </Button>
          <Collapse isOpen={open}>
            <ResultTableView table={result.table} places={result.places} />
          </Collapse>
        </>
      )}
      {hasGroupResults && (
        <>
          <br />
          <div style={{ marginTop: "10px" }}>
            {!!group1Result?.table && (
              <>
                <Button
                  size="sm"
                  onClick={() => setOpenGroup1(!openGroup1)}
                  style={{ marginRight: "5px" }}
                >
                  Wertungstabelle Gruppe 1 (WR 1-{store.group1Size})
                </Button>
                <Collapse isOpen={openGroup1}>
                  <ResultTableView
                    table={group1Result.table}
                    places={group1Result.places}
                  />
                </Collapse>
              </>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            {!!group2Result?.table && (
              <>
                <Button size="sm" onClick={() => setOpenGroup2(!openGroup2)}>
                  Wertungstabelle Gruppe 2 (WR {store.group1Size + 1}-
                  {store.judges})
                </Button>
                <Collapse isOpen={openGroup2}>
                  <ResultTableView
                    table={group2Result.table}
                    places={group2Result.places}
                  />
                </Collapse>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
});

const MarkInput = observer(function MarkInput(props: {
  dance: number;
  places?: PossiblePlace[];
  group1Places?: PossiblePlace[];
  group2Places?: PossiblePlace[];
  refinedPlaces?: (string | undefined)[];
}) {
  const dance = store.marks[props.dance];
  if (!dance) return null;
  let inpIdx = props.dance * dance.competitors * dance.judges;

  const focus = (idx: number) => {
    const el = document.getElementById("im" + idx) as HTMLInputElement;
    el?.focus();
    el?.select();
  };

  const hasGroupResults = !!props.group1Places && !!props.group2Places;

  return (
    <div className="mark-input">
      <table className="mark-input">
        <thead>
          <tr>
            <th>Nr</th>
            {dance.marks[0]?.map((_, m) => (
              <th key={m}></th>
            ))}
            {hasGroupResults && <th>U</th>}
            {hasGroupResults && <th>O</th>}
            <th></th>
            {hasGroupResults && <th></th>}
          </tr>
        </thead>
        <tbody>
          {dance.marks.map((competitor, c) => (
            <tr className="mark-row" key={c}>
              <td className="mark-label">#{c + 1}</td>
              {competitor.map((mark, m) => {
                const myIdx = inpIdx++;
                return (
                  <td className="mark-input" key={m}>
                    <Input
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                      style={{
                        backgroundColor:
                          store.valid.valid[props.dance]?.[c]?.[m] === false
                            ? "#fcc"
                            : undefined,
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      autoComplete="off"
                      id={"im" + myIdx}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      key={m}
                      value={mark || ""}
                      onFocus={selectAll}
                      onKeyDown={(e) => {
                        if (!competitor[m] && e.key == "Backspace") {
                          e.preventDefault();
                          focus(myIdx - 1);
                        } else if (e.key == "ArrowUp") {
                          e.preventDefault();
                          focus(myIdx - store.judges);
                        } else if (e.key == "ArrowDown") {
                          e.preventDefault();
                          focus(myIdx + store.judges);
                        } else if (e.key == "ArrowRight") {
                          e.preventDefault();
                          focus(myIdx + 1);
                        } else if (e.key == "ArrowLeft") {
                          e.preventDefault();
                          focus(myIdx - 1);
                        }
                      }}
                      onInput={(e) => {
                        const newValue = parseInt(e.currentTarget.value || "0");
                        if (newValue >= 0 && newValue <= dance.competitors) {
                          store.setMark(props.dance, c, m, newValue);
                          if (newValue > 0)
                            document
                              .getElementById("im" + (myIdx + 1))
                              ?.focus();
                        }
                      }}
                    />
                  </td>
                );
              })}
              {hasGroupResults && (
                <>
                  <td className="mark-label">
                    {!!props.group1Places &&
                      possiblePlaceString(props.group1Places[c])}
                  </td>
                  <td className="mark-label">
                    {!!props.group2Places &&
                      possiblePlaceString(props.group2Places[c])}
                  </td>
                </>
              )}
              <td className="mark-label">
                {!!props.places && possiblePlaceString(props.places[c])}
              </td>
              {hasGroupResults && (
                <>
                  <td className="mark-label">
                    {props.refinedPlaces?.[c] !== undefined &&
                    props.places?.[c] &&
                    props.refinedPlaces[c] != possiblePlaceString(props.places[c])
                      ? props.refinedPlaces[c]
                      : "-"}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function placeString(place?: Place) {
  if (!place?.from || !place?.to) return "-";
  else return getPlaceValue(place).toLocaleString();
}

function possiblePlaceString(possiblePlace?: PossiblePlace) {
  if (!possiblePlace?.from || !possiblePlace?.to) return "-";
  const fromVal = getPlaceValue(possiblePlace.from);
  const toVal = getPlaceValue(possiblePlace.to);

  if (fromVal == toVal) return fromVal.toLocaleString();
  else return fromVal.toLocaleString() + "-" + toVal.toLocaleString();
}

const ResultTableView = observer(function ResultTableView({
  table,
  places,
}: {
  table: ResultTable;
  places: PossiblePlace[] | Place[];
}) {
  return (
    <Table bordered responsive size="sm" className="result-table">
      <thead>
        <tr>
          <th>Nr.</th>
          {table[0]?.map(
            (_, i) => i > 0 && <th key={i}>{i > 1 ? "1-" + i : i}</th>,
          )}
          <th>Ergebnis</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row, r) => (
          <tr key={r}>
            <td>#{r + 1}</td>
            {row.map(
              (column, c) =>
                c > 0 && <td key={c}>{column === undefined ? "—" : column}</td>,
            )}
            <td>
              {places.length > r &&
                !!places[r] &&
                (typeof places[r]?.from == "number"
                  ? placeString(places[r] as Place)
                  : possiblePlaceString(places[r] as PossiblePlace))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

const SkatingTableView = observer(function SkatingTableView({
  table,
  places,
}: {
  table: ResultTable;
  places: Place[];
}) {
  const maxCols = Math.max(...table.map((r) => r.length));
  const dances = JudgeStore.results?.dances || 0;

  const ruleCols = maxCols - dances - 2;
  const cols = arrayWithIndex(maxCols);

  return (
    <Table bordered responsive size="sm" className="result-table">
      <thead>
        <tr>
          <th>Nr.</th>
          {arrayWithIndex(dances).map((_, i) => (
            <th key={i}>{i + 1}</th>
          ))}
          <th>Summe</th>
          <th>Regel 9</th>
          {arrayWithIndex(ruleCols).map((i) => (
            <th key={i}>Regel {10 + (i % 2)}</th>
          ))}
          <th>Ergebnis</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row, r) => (
          <tr key={r}>
            <td>#{r + 1}</td>
            {cols.map((c) => {
              const column = row[c];
              let rowspan = 1;
              if (column?.startsWith("punktgleich")) {
                if (table[r - 1]?.[c] == column) return null;
                else {
                  while (table[r + rowspan]?.[c] == column) rowspan++;
                }
              }
              return (
                <td key={c} rowSpan={rowspan}>
                  {column === undefined ? "—" : column}
                </td>
              );
            })}
            <td>{placeString(places[r])}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

const FinalConfiguration = observer(function FinalConfiguration() {
  return (
    <div className="final-inputs">
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
          <InputGroupText>Tänze</InputGroupText>
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            value={store.marks.length}
            onFocus={selectAll}
            onChange={(e) => store.setDances(parseInt(e.target.value || "0"))}
            style={{ textAlign: "right" }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputGroupText>Unten (Nur RJS)</InputGroupText>
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            value={store.group1Size}
            onFocus={selectAll}
            onChange={(e) => {
              store.setGroup1Size(parseInt(e.target.value || "0"));
            }}
            style={{ textAlign: "right" }}
          ></Input>
        </InputGroup>
      </form>
    </div>
  );
});

const FinalResult = observer(function FinalResult() {
  const places = store.results?.skating?.places;
  const result = store.results?.results;
  if (!places || !result) return null;

  return (
    <div className="mark-input">
      <table className="mark-input">
        <tbody>
          {arrayWithIndex(store.competitors).map((c) => (
            <tr className="mark-row" key={c}>
              <td className="mark-label">#{c + 1}</td>
              {arrayWithIndex(store.marks.length).map((d) => {
                return (
                  <td className="mark-input" key={d}>
                    <form>
                      <Input
                        value={
                          !store.valid.danceValid[d]
                            ? ""
                            : getPlaceValue(result[d]?.places[c]?.from) || ""
                        }
                        disabled={true}
                      />
                    </form>
                  </td>
                );
              })}
              <td className="mark-label">{placeString(places[c])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
