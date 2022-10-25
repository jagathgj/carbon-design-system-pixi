import Grid from "./grid";
import Character from "./character";

import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      {/* change character file names "spineboy" or spineboy-pro for two different characters */}
      {/* <Character name={"spineboy"} /> */}
      <Grid />
    </div>
  );
}
