import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Hand} from "./components/Hand.js"

import { useState, useEffect } from "react";
import { Melds } from "./components/Melds";

function App() {
  const [agari, setAgariData] = useState(require("./data/3.json"));

    console.log(agari)
  
    const handleClick = (e) => {
    e.preventDefault()
    let jsonData

    const num = Math.floor(Math.random() * 8) + 1;
    console.log(num)
    jsonData = require("./data/"+ num +".json")
    setAgariData(jsonData)
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
                  <div class="hand">
                    <Hand agari={agari}/>
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
