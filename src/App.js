import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { TilePanel } from "./components/TilePanel";

import { useState } from "react";
import { InfoPanel } from "./components/InfoPanel";
import { OptionsMenu } from "./components/OptionsMenu";

import logo from "./burger-menu.jpg";
import { Answer } from "./components/Answer";
import { Row, FormGroup, Form } from "reactstrap";

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
      <Row>
        <TilePanel agari={agari} />
      </Row>
      <Row>
        {" "}
        <InfoPanel agari={agari} options={options} />
      </Row>
      <Row>
        <div class="col-3 border m-5 bgcolor-1">
          <Form>
            <FormGroup>
              <label>
                Points:
                <input type="text" id="pointsBox" name="points" />
              </label>
            </FormGroup>
            <FormGroup>
              <label>
                Han:
                <input type="text" id="hanBox" name="han" />
              </label>
            </FormGroup>
            <FormGroup>
              <label>
                Fu:
                <input type="text" id="fuBox" name="fu" />
              </label>
            </FormGroup>
            <button onClick={showAnswer}>Show Answer</button>
          </Form>
          <Answer agari={agari} options={options} showAnswer={answerVisible} />
        </div>
        <div class="col-7 border m-5 bgcolor-1">test</div>
      </Row>
    </div>
  );
}

export default App;
