import React from "react";
import { FormGroup, Form } from "reactstrap";
import { Answer } from "./Answer";

function QuizPanel(props) {
  const agari = props.agari;
  const options = props.options;
  const answerVisible = props.answerVisible;

  const onSubmit = (e) => {
    e.preventDefault();
    props.showAnswer();
  };

  return (
    <span className="bgcolor-1 quizPanel ">
      <Form className="quizPanel" onSubmit={onSubmit}>
        <table>
          <tr>
            <td>
              <label>Han</label>
            </td>
            <td>
              <FormGroup>
                <input type="text" id="hanBox" name="han" className="quizBox" />
              </FormGroup>
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
          </tr>
        </table>
        <button>Show Answer</button>
      </Form>
      <Answer agari={agari} options={options} showAnswer={answerVisible} />
    </span>
  );
}

export { QuizPanel };
