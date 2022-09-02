import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { TilePanel } from "./components/TilePanel";

import { useState } from "react";
import { InfoPanel } from "./components/InfoPanel";
import { OptionsMenu } from "./components/OptionsMenu";

import logo from "./burger-menu.jpg";
import { Answer } from "./components/Answer";

function App() {
  const [agari, setAgariData] = useState(require("./data/3.json"));
  const [options, setOptions] = useState({ pointSticks: false });
  const [answerVisible, setanswerVisible] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggle = () => setOptionsOpen(!optionsOpen);
  const showAnswer = () => setanswerVisible(!answerVisible);

  console.log(logo);
  console.log(agari);

  const handleClick = () => {
    let jsonData;
    const num = Math.floor(Math.random() * 8) + 1;
    console.log(num);
    jsonData = require("./data/" + num + ".json");
    setAgariData(jsonData);
    setanswerVisible(false);
  };

  const changeOptions = () => {
    setOptions({ pointSticks: !options.pointSticks });
  };

  return (
    <div className="App">
      <button onClick={handleClick} id="1">
        New Hand
      </button>
      <button onClick={toggle} className="OptionsButton">
        <img src={logo} height="30" alt="menu"></img>
      </button>
      <OptionsMenu
        options={options}
        menuOpen={optionsOpen}
        changeOptions={changeOptions}
      />
      <div class="row">
        <InfoPanel agari={agari} options={options} />
        <div class="col-9  m-4">
          <div class="row">
            <div class="col m-4">
              <TilePanel agari={agari} />
            </div>
          </div>
          <div class="row">
            <div class="col-3 border m-5">
              <button onClick={showAnswer}>Show Answer</button>
              <Answer
                agari={agari}
                options={options}
                showAnswer={answerVisible}
              />
            </div>
            <div class="col-7 border m-5">test</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
