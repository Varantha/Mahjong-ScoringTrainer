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
        <FormGroup>
          <label>
            Points:
            <input type="text" id="pointsBox" name="points" />
          </label>
        </FormGroup>
        <button>Show Answer</button>
      </Form>
      <Answer agari={agari} options={options} showAnswer={answerVisible} />
    </span>
  );
}

export { QuizPanel };
