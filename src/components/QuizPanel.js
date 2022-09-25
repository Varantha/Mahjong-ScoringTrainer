import React from "react";
import { FormGroup, Form } from "reactstrap";
import { Answer } from "./Answer";

function QuizPanel(props) {
  const agari = props.agari;
  const options = props.options;
  const answerVisible = props.answerVisible;

  const onSubmit = (e) => {
    e.preventDefault();
    //props.showAnswer();
    const hanAnswer = e.target.elements.hanBox.value;
    const fuAnswer = e.target.elements.fuBox.value;
    const pointsAnswer = e.target.elements.pointsBox.value;

    var hanLabel = document.getElementById("hanAnswer");
    var fuLabel = document.getElementById("fuAnswer");
    var pointsLabel = document.getElementById("pointsAnswer");

    hanLabel.textContent = agari.han;
    hanLabel.className = getClassName(agari.han, hanAnswer);

    fuLabel.textContent = agari.fu;
    fuLabel.className = getClassName(agari.fu, fuAnswer);

    pointsLabel.textContent = agari.pointValue;
    pointsLabel.className = getClassName(agari.pointValue, pointsAnswer);
  };

  return (
    <span className="bgcolor-1 quizPanel ">
      <Form className="quizPanel" onSubmit={onSubmit}>
        <table>
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
                <input type="text" id="hanBox" name="han" className="quizBox" />
              </FormGroup>
            </td>
            <td>
              <label id="hanAnswer"></label>
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
              <label id="fuAnswer" className="answerText"></label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Points</label>
            </td>
            <td>
              <FormGroup>
                <input
                  type="text"
                  id="pointsBox"
                  name="points"
                  className="quizBox"
                />
              </FormGroup>
            </td>
            <td>
              <label id="pointsAnswer"></label>
            </td>
          </tr>
        </table>
        <button className="checkAnswer">Check Answer</button>
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

export { QuizPanel };
