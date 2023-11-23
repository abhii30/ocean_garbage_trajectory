import { useState } from "react";
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
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [positions, setPositions] = useState("");
  const [showMarkers, setShowMarkers] = useState(false);
  const [startMark, setStartMark] = useState([]);

  const clearFields = () => {
    setLatitude("");
    setLongitude("");
  };
  // const handleClicked = () => {
  //   if (!latitude || !longitude) {
  //     alert("Please enter the coordinates");
  //   }
  //   const lat = parseFloat(latitude);
  //   const long = parseFloat(longitude);
  //   if (lat > 90 || lat < -90 || long > 180 || long < -180) {
  //     alert("Please enter the correct coordinates");
  //     clearFields();
  //   }
  //   const marker = [long, lat];
  //   markers.push(marker);
  //   console.log(markers);
  //   clearFields();
  // };

  const handleSimulation = async () => {
    try {
      const simulatedPositions = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      }).then((response) => response.json());
      const marker = [parseFloat(longitude), parseFloat(latitude)];
      setStartMark([marker]);
      console.log(startMark);
      setShowMarkers(true);
      const positionArray = Object.values(simulatedPositions);
      console.log(positionArray[0]);
      setPositions(positionArray);
    } catch (error) {
      console.log("Error fetching data :", error);
    }
  };

  const handleReset = () => {
    setShowMarkers(false);
    clearFields();
  };
  return (
    <div className="App">
      <div className="head-group">
        <h1 className="head">Ocean Garbage Trajectory</h1>
        <div className="input-div">
          <div className="input-group">
            <label className="input-label">Longitude</label>
            <input
              type="text"
              className="input-box"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Latitude</label>
            <input
              type="text"
              className="input-box"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
        </div>
        <span>
          {!longitude || !latitude
            ? "Please enter the coordinates"
            : `Longitude: ${longitude}, Latitude: ${latitude}`}
        </span>
        <div className="button-group">
          <button onClick={handleSimulation}>Show Path</button>
          <button onClick={handleReset} style={{ backgroundColor: "red" }}>
            Reset
          </button>
        </div>
      </div>
      <div
        style={{
          width: "800px",
          // padding: "0vh 2vh",
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
            {showMarkers &&
              startMark.map((marker, i) => (
                <Marker key={i} coordinates={marker}>
                  <circle r={2} fill="#F53" />
                </Marker>
              ))}

            {showMarkers &&
              positions[0].map(
                (coordinates, index) =>
                  index < positions.length - 1 && (
                    <Line
                      key={index}
                      from={coordinates}
                      to={positions[index + 1]}
                      strokeWidth={1}
                      fill="#F53"
                    />
                  )
              )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default App;
