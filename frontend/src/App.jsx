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
  const [showMarkers, setShowMarkers] = useState(true);
  const [startMark, setStartMark] = useState([]);

  const clearFields = () => {
    setLatitude("");
    setLongitude("");
  };

  const markers = [
    [26.95, -169.38],
    [26.099618556869526, -168.71227406789814],
    [25.946054927817407, -169.7448933722509],
    [24.486482052936367, -170.11418466543137],
    [25.969585007425728, -170.19724454861426],
    [24.696473321319722, -169.5335695516204],
    [24.82829823222796, -170.1923557460553],
    [23.637695313426686, -168.6921182869057],
    [23.42156147985759, -167.15540852145082],
    [24.659278914394665, -166.15678275681697],
    [26.01847571288328, -165.5175970532184],
    [25.402965650669266, -166.2804570492853],
    [24.23128416613826, -165.80716522265362],
    [25.44267207496378, -166.72016166942808],
    [26.821151655420756, -166.9123462793286],
    [26.967868731002007, -165.59877521207804],
    [26.54815858656975, -165.76610005981107],
    [26.61061838322156, -165.0717569736186],
    [27.062426995728494, -164.9972821463622],
    [27.213164143301935, -164.71661263153408],
    [26.8361783504357, -165.17658691438444],
    [26.778335828996944, -164.77779794982817],
    [26.857953669328147, -165.12389179071525],
    [27.200584050098204, -165.02012039276647],
    [26.94054191728989, -164.75790722513466],
    [26.708762446842684, -164.38383778472988],
    [26.187724781105203, -164.40037983932112],
    [26.00480800607702, -163.79913856084298],
    [25.014079482287258, -164.01428720609152],
    [24.298007168983762, -162.47874316243838],
    [24.56904816154445, -160.36785952777433],
    [23.60216971891643, -158.6323034947096],
    [25.118115015201756, -157.800354919022],
    [25.450287611026457, -159.66389927951622],
    [24.11115213062522, -161.1087568466046],
    [23.731303991697484, -159.08646416661904],
    [25.119799051285014, -160.20588957884],
    [25.368892820329997, -162.12088929307384],
    [26.899144667984523, -162.88789693939825],
    [27.23403038807552, -161.79773761933953],
    [26.799400870918504, -160.4475524738771],
  ];

  const markers1 = [
    [19.067, 72.9777],
    [19.81214368309826, 70.69478206773887],
    [20.685621002090926, 72.88068214402237],
    [20.17480214707837, 70.64834928247247],
    [20.744798042883517, 71.6478115018922],
    [21.318008668059772, 69.14016415031432],
    [21.672477174902813, 69.68647002588366],
    [21.096966705742282, 69.55871301595175],
    [20.49313969470523, 69.67044931439953],
    [19.92135950976562, 69.47576992902005],
    [19.67365470365515, 72.07544915479254],
    [19.958510242746645, 69.5881933495734],
    [19.870324250188197, 71.97525609571505],
    [20.160405707214952, 71.24983438534284],
    [20.876779885891175, 71.66197199438508],
    [21.49035418392758, 69.08581536869463],
    [21.731745715801345, 69.69441218715849],
    [21.153681567306972, 69.5679521983223],
    [20.59804336834508, 69.79462779342283],
    [20.10329395508839, 72.04803690341595],
    [20.37246552220121, 72.52481891298746],
    [20.702812364736133, 72.82425298563699],
    [20.93321036748259, 73.08729283039472],
  ];

  const markers2 = [
    [22.2, 68.45],
    [21.431146111908244, 67.84388693288975],
    [22.064972455331716, 68.37323797483474],
    [22.3446227, 68.59709697176109],
    [22.190991334237296, 67.35781589838977],
    [21.16450067956339, 68.52571577085168],
    [20.901989995348472, 67.91980387759072],
    [22.127281261096496, 68.552384],
    [22.213866446876796, 66.6669775273919],
    [22.65735428267409, 68.41259298823711],
    [23.49361435, 68.10359949696654],
    [22.52693110268175, 67.6457383204339],
    [23.477989930598486, 66.94910380465946],
    [23.023486, 66.18456224320552],
    [23.938278536707493, 67.02922777493512],
    [23.370606945294135, 66.1668648722],
    [24.485390803297737, 66.9943881246122],
    [23.939622533333115, 67.90722456351737],
  ];

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

  const handleReverse = () => {
    const reversedPositions = markers2.map(([latitude, longitude]) => [
      longitude,
      latitude,
    ]);
    setPositions([reversedPositions]);
    console.log(positions);
  };
  const handleSimulation = async () => {
    if (!latitude || !longitude) {
      alert("Please enter the coordinates");
    }
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    if (lat > 90 || lat < -90 || long > 180 || long < -180) {
      alert("Please enter the correct coordinates");
      clearFields();
    }
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
      console.log(simulatedPositions);
      setShowMarkers(true);
    } catch (error) {
      console.log("Error fetching data :", error);
    }
  };

  return (
    <div className="App">
      <div className="head-group">
        <h1 className="head">Global Maritime Debris Trajectory Forecasting</h1>
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
          <button onClick={handleSimulation}>Show Start Point</button>
          <button onClick={handleReverse} style={{ backgroundColor: "red" }}>
            Show Path
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
              startMark?.map((marker, i) => (
                <Marker key={i} coordinates={marker}>
                  <circle r={2} fill="#F53" />
                </Marker>
              ))}

            {showMarkers &&
              positions[0]?.map(
                (coordinates, index) =>
                  index < positions[0].length - 1 && (
                    <Line
                      key={index}
                      from={coordinates}
                      to={positions[0][index + 1]}
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
