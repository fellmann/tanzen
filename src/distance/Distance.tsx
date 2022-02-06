import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  Alert,
  Container,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

interface Point {
  x: number;
  y: number;
}

const parse = (s: string) => {
  const ret = parseFloat(s.replace(",", "."));
  if (ret >= 0 && ret < 100) return ret;
  else if (ret <= 0) return 0;
  else if (ret > 100) return 100;
  else return 1;
};

const store = observable({
  width: "18",
  height: "10",
  innerDiameter: "0,4",
  spaceBetween: "2",
  spaceOuter: "1",
});

export default observer(function Distance() {
  useEffect(() => {
    document.title = "Corona-Abstandsrechner";
  }, []);

  const rects: Point[] = [];
  const linesX: number[] = [];
  const linesY: number[] = [];

  const innerDiameter = parse(store.innerDiameter);
  const spaceBetween = parse(store.spaceBetween);
  const spaceOuter = parse(store.spaceOuter);
  const width = parse(store.width);
  const height = parse(store.height);

  for (let i = 1; i < width; i++) {
    linesX.push(i);
  }
  for (let i = 1; i < height; i++) {
    linesY.push(i);
  }

  const radius = (spaceBetween + innerDiameter) / 2;

  const outerMargin = spaceOuter + innerDiameter / 2;

  const rowDiff = Math.sqrt(3 * radius * radius);

  let rowi = 0;
  let minX = 1000,
    maxX = 0;
  let minY = 1000,
    maxY = 0;
  if (width < 100 && height < 100) {
    for (let y = outerMargin; y + outerMargin <= height; y += rowDiff) {
      rowi++;
      const rowOffset = rowi % 2 === 1 ? 0 : radius;
      for (
        let x = outerMargin + rowOffset;
        x + outerMargin <= width;
        x += radius * 2
      ) {
        rects.push({ x, y });
        if (minX > x) minX = x;
        if (maxX < x) maxX = x;
        if (minY > y) minY = y;
        if (maxY < y) maxY = y;
      }
    }
  }
  const offsetX = (width - maxX - radius) / 2;
  const offsetY = (height - maxY - radius) / 2;
  return (
    <Container>
      <h1>Corona-Abstandsrechner</h1>
      <form>
        <div>
          Fläche (m)
          <InputGroup>
            <Input
              type="text"
              value={store.width}
              onChange={(e) => (store.width = e.target.value)}
            />
            <InputGroupText>x</InputGroupText>
            <Input
              type="text"
              value={store.height}
              onChange={(e) => (store.height = e.target.value)}
            />
            <InputGroupText>m</InputGroupText>
          </InputGroup>
        </div>
        <div>
          Abstand zwischen den Personen
          <InputGroup>
            <Input
              type="text"
              value={store.spaceBetween}
              onChange={(e) => (store.spaceBetween = e.target.value)}
            />
            <InputGroupText>m</InputGroupText>
          </InputGroup>
        </div>
        <div>
          Durchmesser Person/Paar
          <InputGroup>
            <Input
              type="text"
              value={store.innerDiameter}
              onChange={(e) => (store.innerDiameter = e.target.value)}
            />
            <InputGroupText>m</InputGroupText>
          </InputGroup>
        </div>
        <div>
          Abstand zur Wand
          <InputGroup>
            <Input
              type="text"
              value={store.spaceOuter}
              onChange={(e) => (store.spaceOuter = e.target.value)}
            />
            <InputGroupText>m</InputGroupText>
          </InputGroup>
        </div>
      </form>
      <div>
        <Alert color="success" className="mt-3">
          {rects.length} Personen
        </Alert>
      </div>
      <svg
        style={{ width: "100%", height: "auto" }}
        viewBox={"0 0 " + width + " " + height}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="none"
          stroke="#000"
          strokeWidth="0.05"
        />
        {rects.map((r, i) => (
          <React.Fragment key={i}>
            <circle
              cx={r.x + offsetX}
              cy={r.y + offsetY}
              r={radius}
              fill="none"
              stroke="#000"
              strokeWidth="0.05"
            />
            <circle
              cx={r.x + offsetX}
              cy={r.y + offsetY}
              r={innerDiameter / 2}
              fill="#a00"
              stroke="#000"
              strokeWidth="0.05"
            />
          </React.Fragment>
        ))}
        {linesX.map((i) => (
          <line
            key={i}
            x1={i}
            y1="0"
            x2={i}
            y2={height}
            stroke="#0003"
            strokeWidth="0.05"
          />
        ))}
        {linesY.map((i) => (
          <line
            key={i}
            y1={i}
            x1="0"
            y2={i}
            x2={width}
            stroke="#0003"
            strokeWidth="0.05"
          />
        ))}
      </svg>
    </Container>
  );
});
