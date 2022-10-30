import React from "react";
import { FormGroup, Form, Tooltip } from "reactstrap";

import * as YakuConversion from "../scripts/YakuConversion";

function QuizPanel(props) {
  const agari = props.agari;
  const options = props.options;

  const isTsumo = agari.isTsumo;
  const isDealer = agari.isDealer;

  const pointCalculations = calculatePoints(agari, options);

  const pointsCalcSteps = pointCalculations.calculationSteps;
  const pointsCalcStepsDealer = pointCalculations.pointsCalculationsDealer;

  const pointValue = pointCalculations.pointValue;
  const pointValueDealer = pointCalculations.pointValueDealer;

  const onSubmit = (e) => {
    e.preventDefault();

    const rowMapping = {
      hanAnswer: agari.han,
      fuAnswer: agari.fu,
      pointsAnswer: pointValue,
      pointsAnswerDealer: pointValueDealer,
    }; //map the output ids to the correct answers for each of them

    const quizBox = document.querySelectorAll("#quizForm tr");

    for (let i = 1; i < quizBox.length; i++) {
      const row = quizBox[i];

      const input = row.querySelectorAll("input")[0];
      const output = row.querySelectorAll("strong")[0];
      const answer = rowMapping[output.id];

      output.textContent = answer;
      output.className = getClassName(answer, input.value);
      input.disabled = true;
    }

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
            {generateHanAndFuQuiz(
              props.options.testHan,
              props.options.testFu,
              agari
            )}
            {generatePointsQuiz(
              isTsumo,
              isDealer,
              pointsCalcSteps,
              pointsCalcStepsDealer
            )}
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

function GenerateRow(props) {
  const [TooltipOpen, setTooltipOpen] = React.useState(false);
  const rowData = [];
  rowData.push(
    <tr>
      <td>
        <label>{props.label}</label>
      </td>
      <td>
        <FormGroup>
          <input
            type="text"
            id={props.inputId}
            name={props.name}
            className="quizBox"
          />
        </FormGroup>
      </td>
      <td>
        <strong id={props.outputId} className="answerText"></strong>
      </td>
    </tr>
  );

  if (props.tooltipContent !== undefined) {
    rowData.push(
      <Tooltip
        isOpen={TooltipOpen}
        className="hanTooltip"
        placement="right"
        target={props.outputId}
        toggle={() => {
          setTooltipOpen(!TooltipOpen);
        }}
      >
        {props.tooltipContent}
      </Tooltip>
    );
  }

  return rowData;
}

function formatFuList(agari) {
  const output = [];
  output.push(<p></p>);
  agari.fu_details.forEach((line) => {
    var reason = capitalizeFirstLetter(line.reason.replaceAll("_", " "));
    var fuValue = line.fu;
    output.push(<p>{reason + ": " + fuValue + " fu"}</p>);
  });
  return output;
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

function generateHanAndFuQuiz(isHanQuiz, isFuQuiz, agari) {
  const hanAndFuQuizRows = [];

  if (isHanQuiz) {
    hanAndFuQuizRows.push(
      <GenerateRow
        label={"Han"}
        inputId="hanBox"
        outputId="hanAnswer"
        name="han"
        tooltipContent={formatHanList(agari)}
      />
    );
  }
  if (isFuQuiz) {
    hanAndFuQuizRows.push(
      <GenerateRow
        label={"Fu"}
        inputId="fuBox"
        outputId="fuAnswer"
        name="fu"
        tooltipContent={formatFuList(agari)}
      />
    );
  }
  return hanAndFuQuizRows;
}

function generatePointsQuiz(
  isTsumo,
  isDealer,
  pointsCalculations,
  pointsCalculationsDealer
) {
  const pointQuizRows = [];
  if (isTsumo && isDealer) {
    pointQuizRows.push(
      <GenerateRow
        label={["Points", <br />, "(from each)"]}
        inputId="pointsBox"
        outputId="pointsAnswer"
        name="points"
        tooltipContent={pointsCalculations}
      />
    );
  }

  if (isTsumo && !isDealer) {
    pointQuizRows.push(
      <>
        <GenerateRow
          label={["Points", <br />, "(from non-dealer)"]}
          inputId="pointsBox"
          outputId="pointsAnswer"
          name="points"
          tooltipContent={pointsCalculations}
        />
        <GenerateRow
          label={["Points", <br />, "(from dealer)"]}
          inputId="pointsBoxDealer"
          outputId="pointsAnswerDealer"
          name="pointsDealer"
          tooltipContent={pointsCalculationsDealer}
        />
      </>
    );
  }

  if (!isTsumo) {
    pointQuizRows.push(
      <GenerateRow
        label="Points"
        inputId="pointsBox"
        outputId="pointsAnswer"
        name="points"
        tooltipContent={pointsCalculations}
      />
    );
  }
  return pointQuizRows;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function calculatePoints(agari, options) {
  const calculationSteps = [<br />];
  var calculationStepsDealer = [<br />];

  var basicPoints,
    pointValue,
    pointValueDealer = 0;

  const isTsumo = agari.isTsumo;
  const isDealer = agari.isDealer;
  const isKiriageMangan = options.kiriageMangan;

  calculationSteps.push(<p>{agari.han + " han"}</p>);
  switch (parseInt(agari.han)) {
    case 1:
    case 2:
    case 3:
    case 4:
      basicPoints = Math.min(
        parseInt(agari.fu) * Math.pow(2, 2 + parseInt(agari.han)),
        2000
      );
      calculationSteps.push(<p>{agari.fu + " fu"}</p>);
      calculationSteps.push(
        <p>
          Basic points: {agari.fu} x 2
          <sup>
            {"2 + "}
            {agari.han}
          </sup>
        </p>
      );
      calculationSteps.push(
        <p>
          {agari.fu} x {Math.pow(2, 2 + agari.han)}
        </p>
      );
      if (parseInt(agari.fu) * Math.pow(2, 2 + parseInt(agari.han)) > 2000) {
        calculationSteps.push(<p>[Basic Points limited at 2000]</p>);
      }

      if (isKiriageMangan) {
        if (agari.han === 3 && agari.fu === "60") {
          basicPoints = 2000;
          calculationSteps.push(<p>{"Kiriage Mangan: +80"}</p>);
        }
        if (agari.han === 4 && agari.fu === "30") {
          basicPoints = 2000;
          calculationSteps.push(<p>{"Kiriage Mangan: +80"}</p>);
        }
      }
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

  calculationSteps.push(<p>{"Basic points: " + basicPoints}</p>);
  calculationStepsDealer = [].concat(calculationSteps);

  if (isTsumo) {
    if (isDealer) {
      pointValue = Math.ceil((basicPoints * 2) / 100) * 100;

      calculationSteps.push(
        <p>{"Dealer Tsumo: " + basicPoints * 2 + " (x2)"}</p>
      );
      if (basicPoints * 2 !== pointValue) {
        calculationSteps.push(
          <p>
            {format(
              "Round up: {} (+{})",
              pointValue,
              pointValue - basicPoints * 2
            )}
          </p>
        );
      }
    } else {
      pointValue = Math.ceil(basicPoints / 100) * 100;
      pointValueDealer = Math.ceil((basicPoints * 2) / 100) * 100;

      calculationStepsDealer.push(
        <p>{"Tsumo (dealer): " + basicPoints * 2 + " (x2)"}</p>
      );
      if (basicPoints * 2 !== pointValueDealer) {
        calculationStepsDealer.push(
          <p>
            {format(
              "Round up: {} (+{})",
              pointValueDealer,
              pointValueDealer - basicPoints * 2
            )}
          </p>
        );
      }

      calculationSteps.push(<p>{"Tsumo (non-dealer): " + basicPoints}</p>);

      if (basicPoints !== pointValue) {
        calculationSteps.push(
          <p>
            {format("Round up: {} (+{})", pointValue, pointValue - basicPoints)}
          </p>
        );
      }
    }
  } else {
    pointValue = parseInt(agari.pointValue);
    if (isDealer) {
      pointValue = Math.ceil((basicPoints * 6) / 100) * 100;

      calculationSteps.push(
        <p>{"Dealer Ron: " + basicPoints * 6 + " (x6)"}</p>
      );
      if (basicPoints * 6 !== pointValue) {
        calculationSteps.push(
          <p>
            {format(
              "Round up: {} (+{})",
              pointValue,
              pointValue - basicPoints * 6
            )}
          </p>
        );
      }
    } else {
      pointValue = Math.ceil((basicPoints * 4) / 100) * 100;

      calculationSteps.push(<p>{"Ron: " + basicPoints * 4 + " (x4)"}</p>);

      if (basicPoints * 4 !== pointValue) {
        calculationSteps.push(
          <p>
            {format(
              "Round up: {} (+{})",
              pointValue,
              pointValue - basicPoints * 4
            )}
          </p>
        );
      }
    }
  }

  return {
    pointValue: pointValue,
    pointValueDealer: pointValueDealer,
    calculationSteps: calculationSteps,
    pointsCalculationsDealer: calculationStepsDealer,
  };
}

function format() {
  var i = 1,
    args = arguments;
  return args[0].replace(/{}/g, function () {
    return typeof args[i] != "undefined" ? args[i++] : "";
  });
}

export { QuizPanel };
