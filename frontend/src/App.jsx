// import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  // Annotation,
  ZoomableGroup,
  Line,
} from "react-simple-maps";
// import ReactTooltip from "react-tooltip";
import "./App.css";

function App() {
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const markers = [
    [-48.83, 39.85],
    [-47.06002625155747, 51.53229254971389],
    [-72.05, 37.97],
    [-71.36921425052961, 42.75502193467757],
  ];
  const markers0 = [
    [-48.83, 39.85],
    [-52.70017467104684, 37.99491255569573],
    [-49.49037783679882, 40.43587303153542],
    [-51.172143350395146, 44.38537961282664],
    [-54.188074585896025, 45.09755822599109],
    [-51.344556091493, 46.68984996207766],
    [-52.08842906312116, 44.066888236253476],
    [-48.376510231122005, 42.73254472546684],
    [-45.1785707217469, 41.21324008431714],
    [-42.35716709824415, 43.512427593701275],
    [-41.71256687555116, 46.511588843872396],
    [-43.88161275803958, 45.45634367052359],
    [-41.38129122520672, 46.97407715193478],
    [-41.98430150727897, 44.48196048134338],
    [-42.58577401636591, 46.5471340864777],
    [-44.76780898366517, 47.658253107223764],
    [-44.389016351494305, 50.89341247825424],
    [-47.11056268095555, 50.60570193698528],
    [-46.435443621950476, 50.94272646966464],
    [-46.82185912405621, 51.02878258931485],
    [-47.06002625155747, 51.53229254971389],
  ];
  const markers1 = [
    [-72.05, 37.97],
    [-69.970797020529, 39.87653031364603],
    [-70.60882798937952, 41.422014410270144],
    [-71.36921425052961, 42.75502193467757],
    [-71.36921425052961, 42.75502193467757],
    [-71.36921425052961, 42.75502193467757],
    [-71.36921425052961, 42.75502193467757],
    [-71.36921425052961, 42.75502193467757],
    [-71.36921425052961, 42.75502193467757],
    [-71.36921425052961, 42.75502193467757],
  ];

  return (
    <div className="App">
      <h1 className="head">Ocean Garbage Trajectory</h1>
      <div
        style={{
          width: "1000px",
          padding: "0vh 2vh",
          borderStyle: "double",
          borderColor: "black",
        }}
      >
        <ComposableMap data-tip="">
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            {markers.map((marker, i) => (
              <Marker key={i} coordinates={marker}>
                <circle r={2} fill="#F53" />
              </Marker>
            ))}
            {/* {markers1.map((marker, i) => (
              <Marker key={i} coordinates={marker}>
                <circle r={0.1} fill="#F53" />
              </Marker>
            ))} */}
            {markers0.map(
              (coordinates, i) =>
                i < markers0.length - 1 && (
                  <Line
                    key={i}
                    from={coordinates}
                    to={markers0[i + 1]}
                    strokeWidth={1}
                  />
                )
            )}
            {markers1.map(
              (coordinates, i) =>
                i < markers1.length - 1 && (
                  <Line
                    key={i}
                    from={coordinates}
                    to={markers1[i + 1]}
                    strokeWidth={1}
                  />
                )
            )}
            {/* {markers1.map(
              (coordinates, i) =>
                i < markers1.length - 1 && (
                  <Line key={i} from={coordinates} to={markers1[i + 1]} />
                )
            )} */}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default App;
