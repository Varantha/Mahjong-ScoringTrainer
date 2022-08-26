import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import * as TileConversion from "./scripts/TileConversion";
import { useState, useEffect } from "react";

function App() {
  const [hand, setHand] = useState([]);
  useEffect(() => {
    const jsonData = require("./data/3.json");
    const data = jsonData.hand;
    setHand(TileConversion.tileStringToArray(data))},[]);

  const renderHand = () => {
    const tileImages = hand.map((tile, index) => (
      <img
        src={TileConversion.tileToPath(tile)}
        width="70"
        height="100"
        key={index}
        alt={tile}
      />
    ));

    return tileImages;
  };

  const handleClick = (e) => {
    e.preventDefault()
    let jsonData

    const num = Math.floor(Math.random() * 8) + 1;
    console.log(num)
    jsonData = require("./data/"+ num +".json")
    const data = jsonData.hand;
    setHand(TileConversion.tileStringToArray(data))
  }

  return (
    <div className="App">
      <button onClick={handleClick} id="1">text</button>
      <div class="row">
        <div class="col-2 border m-4">
          <div class="card">
            <div class="card-body h-100 infoPanel infoPanelBorder"></div>
          </div>
        </div>
        <div class="col-9 border m-4">
          <div class="row">
            <div class="col border m-4">
              <div class="card">
                <div class="card-body h-100 tilePanel">
                  <div id="hand" class="hand">
                    {renderHand()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 border m-5">test</div>
            <div class="col-7 border m-5">test</div>
          </div>
        </div>
      </div>

      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
