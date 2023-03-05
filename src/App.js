import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { TilePanel } from "./components/TilePanel";

import { useState } from "react";
import { InfoPanel } from "./components/InfoPanel";
import { QuizPanel } from "./components/QuizPanel";
import { OptionsMenu } from "./components/OptionsMenu";
import { WinRate } from "./components/WinRate";

import logo from "./burger-menu.jpg";
import { Row } from "reactstrap";

function App() {
  let jsonMetaData;

  jsonMetaData = require("./data/meta.json");
  const jsonLen = jsonMetaData.length;
  const num = Math.floor(Math.random() * jsonLen);
  const handName = jsonMetaData[num];

  const [agari, setAgariData] = useState(
    require("./data/" + jsonMetaData[num])
  );
  const [options, setOptions] = useState({
    pointSticks: false,
    testHan: true,
    testFu: true,
    kiriageMangan: false,
    testHonba: false,
  });

  const [answerVisible, setanswerVisible] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const toggle = () => setOptionsOpen(!optionsOpen);
  const showAnswer = () => setanswerVisible(!answerVisible);
  const addCorrectAnswer = () => setCorrectAnswers(correctAnswers + 1);
  const addWrongAnswer = () => setWrongAnswers(wrongAnswers + 1);

  const newHand = () => {
    let jsonMetaData, jsonData;

    jsonMetaData = require("./data/meta.json");
    const jsonLen = jsonMetaData.length;
    const num = Math.floor(Math.random() * jsonLen);

    console.log("./data/" + jsonMetaData[num]);
    jsonData = require("./data/" + jsonMetaData[num]);

    setAgariData(jsonData);
    setanswerVisible(false);

    document.getElementById("checkAnswer").disabled = false;

    const formInputs = document.querySelectorAll("#quizForm input");
    formInputs.forEach((input) => {
      input.disabled = false;
      input.value = "";
    });

    const formAnswers = document.querySelectorAll("#quizForm strong");
    formAnswers.forEach((input) => {
      input.textContent = "";
    });
  };

  const changeOptions = (e) => {
    setOptions(outputOptions());
    newHand();
    //setRerender(!rerender);
  };

  return (
    <div className="App">
      <WinRate
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
      ></WinRate>
      <button onClick={toggle} className="OptionsButton">
        <img src={logo} height="30" alt="menu"></img>
      </button>
      <OptionsMenu
        options={options}
        menuOpen={optionsOpen}
        changeOptions={changeOptions}
        setOptionsOpen={setOptionsOpen}
        handName={handName}
      />
      <Row>
        <TilePanel agari={agari} />
      </Row>
      <Row>
        <InfoPanel agari={agari} options={options} />
      </Row>
      <QuizPanel
        agari={agari}
        options={options}
        answerVisible={answerVisible}
        showAnswer={showAnswer}
        newHand={newHand}
        addCorrectAnswer={addCorrectAnswer}
        addWrongAnswer={addWrongAnswer}
      />
    </div>
  );
}

function outputOptions() {
  const MenuOptions = document.querySelectorAll(
    "div.OptionsMenu.collapse.show > span"
  );
  let options = {};
  MenuOptions.forEach((option) => {
    options[option.children[0].children[0].id] =
      option.children[0].children[0].checked;
  });
  return options;
}

export default App;
