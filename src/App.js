import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { TilePanel } from "./components/TilePanel";



import { useState } from "react";
import { Melds } from "./components/Melds";
import { InfoPanel } from "./components/InfoPanel";

function App() {
  const [agari, setAgariData] = useState(require("./data/3.json"));
  const [options, setOptions] = useState({pointSticks: false});

  console.log(agari);

  const handleClick = () => {
    let jsonData;
    const num = Math.floor(Math.random() * 8) + 1;
    console.log(num);
    jsonData = require("./data/" + num + ".json");
    setAgariData(jsonData);
  };

  const changeOptions = () => {
    if(options.pointSticks === true){
      setOptions({pointSticks: false})
    }else{
      setOptions({pointSticks: true})
    }
  };

  return (
    <div className="App">
      <button onClick={handleClick} id="1">
        New Hand
      </button>
      <button onClick={changeOptions} id="2">
        Change Options
      </button>
      <div class="row">
        <InfoPanel agari={agari} options={options}/>
        <div class="col-9 border m-4">
          <div class="row">
            <div class="col border m-4">
                <TilePanel agari={agari}/>
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
