import React from "react";
import { FormGroup, Form, Tooltip } from "reactstrap";
import { Answer } from "./Answer";

import * as YakuConversion from "../scripts/YakuConversion";

function QuizPanel(props) {
  const agari = props.agari;
  const options = props.options;
  const answerVisible = props.answerVisible;

  const isTsumo = agari.isTsumo;
  const isDealer = agari.isDealer;

  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    //props.showAnswer();
    const hanAnswer = e.target.elements.hanBox.value;
    const fuAnswer = e.target.elements.fuBox.value;
    const pointsAnswer = e.target.elements.pointsBox.value;

    var hanLabel = document.getElementById("hanAnswer");
    var fuLabel = document.getElementById("fuAnswer");
    var pointsLabel = document.getElementById("pointsAnswer");
    var pointsLabelDealer = document.getElementById("pointsAnswerDealer");

    hanLabel.textContent = agari.han;
    hanLabel.className = getClassName(agari.han, hanAnswer);

    fuLabel.textContent = agari.fu;
    fuLabel.className = getClassName(agari.fu, fuAnswer);

    var basicPoints = 0;

    switch (parseInt(agari.han)) {
      case 1:
      case 2:
      case 3:
      case 4:
        basicPoints = Math.min(
          parseInt(agari.fu) * Math.pow(2, 2 + parseInt(agari.han)),
          2000
        );
        break;
      case 5:
        basicPoints = 2000;
        break;
      case 6:
      case 7:
        basicPoints = 3000;
        break;
      case 8:
      case 9:
      case 10:
        basicPoints = 4000;
        break;
      case 11:
      case 12:
        basicPoints = 6000;
        break;
      default:
        basicPoints = 8000;
        break;
    }

    if (isTsumo) {
      if (isDealer) {
        const pointValue = Math.ceil((basicPoints * 2) / 100) * 100;
        pointsLabel.textContent = pointValue;
        pointsLabel.className = getClassName(pointValue, pointsAnswer);
      } else {
        const pointsAnswerDealer = e.target.elements.pointsBoxDealer.value;
        const pointValue = Math.ceil(basicPoints / 100) * 100;
        const pointValueDealer = Math.ceil((basicPoints * 2) / 100) * 100;
        pointsLabelDealer.textContent = pointValueDealer;
        pointsLabelDealer.className = getClassName(
          pointValueDealer,
          pointsAnswerDealer
        );
        pointsLabel.textContent = pointValue;
        pointsLabel.className = getClassName(pointValue, pointsAnswer);
        document.getElementById("pointsBoxDealer").disabled = true;
      }
    } else {
      const pointValue = parseInt(agari.pointValue);
      pointsLabel.textContent = pointValue;
      pointsLabel.className = getClassName(pointValue, pointsAnswer);
    }

    const formInputs = document.querySelectorAll("#quizForm input");
    formInputs.forEach((input) => {
      input.disabled = true;
    });

    const formAnswers = document.querySelectorAll(
      "#quizForm strong.wrongAnswer"
    );

    const isCorrect = formAnswers.length === 0;

    document.getElementById("checkAnswer").disabled = true;

    if (isCorrect) {
      props.addCorrectAnswer();
    } else {
      props.addWrongAnswer();
    }
  };

  return (
    <span className="bgcolor-1 quizPanel">
      <Form id="quizForm" className="quizPanel" onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Your Answer</th>
              <th>Real Answer</th>
            </tr>
            <tr>
              <td>
                <label>Han</label>
              </td>
              <td>
                <FormGroup>
                  <input
                    type="text"
                    id="hanBox"
                    name="han"
                    className="quizBox"
                  />
                </FormGroup>
              </td>
              <td>
                <strong id="hanAnswer" className="answerText"></strong>
                <Tooltip
                  isOpen={tooltipOpen}
                  className="hanTooltip"
                  placement="right"
                  target="hanAnswer"
                  toggle={() => {
                    setTooltipOpen(!tooltipOpen);
                  }}
                >
                  {formatHanList(agari)}
                </Tooltip>
              </td>
            </tr>
            <tr>
              <td>
                <label>Fu</label>
              </td>
              <td>
                <FormGroup>
                  <input type="text" id="fuBox" name="fu" className="quizBox" />
                </FormGroup>
              </td>
              <td>
                <strong id="fuAnswer" className="answerText"></strong>
              </td>
            </tr>
            {generatePointsQuiz(isTsumo, isDealer)}
          </tbody>
        </table>
        <button className="checkAnswer" id="checkAnswer">
          Check Answer
        </button>
        <button
          onClick={props.newHand}
          className="newHand"
          type="button"
          id="1"
        >
          New Hand
        </button>
      </Form>
      <Answer agari={agari} options={options} showAnswer={answerVisible} />
    </span>
  );
}

function getClassName(agariValue, answerValue) {
  const stringAgari = agariValue.toString();
  const trimmedAnswer = answerValue.trim();
  if (stringAgari === trimmedAnswer) {
    return "correctAnswer answerText";
  } else {
    return "wrongAnswer answerText";
  }
}

function formatHanList(agari) {
  const output = [];
  output.push(<p></p>);
  for (const [key, value] of Object.entries(agari.yakusAchieved)) {
    output.push(
      <p>{YakuConversion.YakuIdToName(key) + ": " + value + " han"}</p>
    );
  }
  return output;
}

function GenerateRow(props) {
  return (
    <tr>
      <td>
        <label>{props.label}</label>
      </td>
      <td>
        <FormGroup>
          <input
            type="text"
            id={props.inputId}
            name="points"
            className="quizBox"
          />
        </FormGroup>
      </td>
      <td>
        <strong id={props.outputId} className="answerText"></strong>
      </td>
    </tr>
  );
}

function generatePointsQuiz(isTsumo, isDealer) {
  if (isTsumo) {
    if (isDealer) {
      //test on points from all
      return (
        <GenerateRow
          label={["Points", <br />, "(from each)"]}
          inputId="pointsBox"
          outputId="pointsAnswer"
        />
      );
    } else {
      return (
        <>
          <GenerateRow
            label={["Points", <br />, "(from non-dealer)"]}
            inputId="pointsBox"
            outputId="pointsAnswer"
          />
          <GenerateRow
            label={["Points", <br />, "(from dealer)"]}
            inputId="pointsBoxDealer"
            outputId="pointsAnswerDealer"
          />
        </>
      );
    }
  } else {
    return (
      <GenerateRow label="Points" inputId="pointsBox" outputId="pointsAnswer" />
    );
  }
}

export { QuizPanel };
