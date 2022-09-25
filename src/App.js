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
  const [agari, setAgariData] = useState(require("./data/3.json"));
  const [options, setOptions] = useState({ pointSticks: false });
  const [answerVisible, setanswerVisible] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const toggle = () => setOptionsOpen(!optionsOpen);
  const showAnswer = () => setanswerVisible(!answerVisible);
  const addCorrectAnswer = () => setCorrectAnswers(correctAnswers + 1);
  const addWrongAnswer = () => setWrongAnswers(wrongAnswers + 1);

  console.log(logo);
  console.log(agari);

  const newHand = () => {
    let jsonData;
    const num = Math.floor(Math.random() * 8) + 1;
    console.log(num);
    jsonData = require("./data/" + num + ".json");
    setAgariData(jsonData);
    setanswerVisible(false);

    var hanLabel = document.getElementById("hanAnswer");
    var fuLabel = document.getElementById("fuAnswer");
    var pointsLabel = document.getElementById("pointsAnswer");
    hanLabel.textContent = "";
    fuLabel.textContent = "";
    pointsLabel.textContent = "";

    var hanBox = document.getElementById("hanBox");
    var fuBox = document.getElementById("fuBox");
    var pointsBox = document.getElementById("pointsBox");
    hanBox.value = "";
    fuBox.value = "";
    pointsBox.value = "";

    document.getElementById("hanBox").disabled = false;
    document.getElementById("fuBox").disabled = false;
    document.getElementById("pointsBox").disabled = false;
  };

  const changeOptions = () => {
    setOptions({ pointSticks: !options.pointSticks });
  };

  return (
    <div className="App">
      <WinRate
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
      ></WinRate>
      Correct: {correctAnswers}
      Wrong: {wrongAnswers}
      <button onClick={toggle} className="OptionsButton" hidden>
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

export default App;
