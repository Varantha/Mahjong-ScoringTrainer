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

      const label = row.querySelectorAll("label")[0];
      const input = row.querySelectorAll("input")[0];
      const output = row.querySelectorAll("strong")[0];
      const answer = rowMapping[output.id];

      output.textContent = answer;
      output.className = getClassName(answer, input.value, label.textContent, props.ignoreFuAnswer);
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
    <span className=" quizPanel">
      <Form id="quizForm" className="quizPanel bgcolor-1" onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th className="unselectable">Your Answer</th>
              <th className="unselectable">Real Answer</th>
            </tr>
            {generateHanAndFuQuiz(
              props.options.testHan,
              props.options.testFu,
              agari,
              props.ignoreFuAnswer
            )}
            {generatePointsQuiz(
              isTsumo,
              isDealer,
              pointsCalcSteps,
              pointsCalcStepsDealer
            )}
          </tbody>
        </table>

      <div className="btns">
      <button className="checkAnswer unselectable" id="checkAnswer">
          Check Answer
        </button>

        <button
          onClick={props.newHand}
          className="newHand unselectable"
          type="button"
          id="1"
        >
          New Hand
        </button>
      </div>
      </Form>
    </span>
  );
}

function getClassName(agariValue, answerValue, label, ignoreFuAnswer) {
  // if we ignore Fu on limit hands, and it is a hand above 4 han, we want to ignore the Fu answer
  if (label === "Fu" && ignoreFuAnswer) {
    return "ignoredAnswer answerText unselectable";
  }
  const stringAgari = agariValue.toString();
  const trimmedAnswer = answerValue.trim();
  if (stringAgari === trimmedAnswer) {
    return "correctAnswer answerText unselectable";
  } else {
    return "wrongAnswer answerText unselectable";
  }
}

function GenerateRow(props) {
  const [TooltipOpen, setTooltipOpen] = React.useState(false);
  const rowData = [];
  rowData.push(
    <tr>
      <td>
        <label className="unselectable">{props.label}</label>
      </td>
      <td>
        <FormGroup>
          <input
            type="number"
            id={props.inputId}
            name={props.name}
            className="quizBox"
            onWheel={(e) => e.target.blur()}
          />
        </FormGroup>
      </td>
      <td>
        <strong id={props.outputId} className="answerText unselectable"></strong>
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

function formatFuList(agari, ignoreFuAnswer) {
  const output = [];
  output.push(<p></p>);
  if (ignoreFuAnswer) {
    output.push(<p style={{ color: "white" }}>Set to ignore Fu on limit hands</p>);
  }
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

function generateHanAndFuQuiz(isHanQuiz, isFuQuiz, agari, ignoreFuAnswer) {
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
        tooltipContent={formatFuList(agari, ignoreFuAnswer)}
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
  //Initialise JSX array for calculation steps
  const calculationSteps = [<br />];
  var calculationStepsDealer = [<br />];

  //Initialise Point totals
  var basicPoints,
    pointValue,
    pointValueDealer,
    unroundedPointValue,
    pointMultiplier = 0;

  const isTsumo = agari.isTsumo;
  const isDealer = agari.isDealer;
  const isKiriageMangan = options.kiriageMangan;

  const testHonba = options.testHonba;
  const honbaSticks = agari.honbaSticks;
  const honbaPoints = honbaSticks * 300;
  const honbaPointsPerPlayer = getHonbaPoints(isTsumo, honbaPoints);

  //Calculate base points as a function of han and fu
  //Any calculation steps are also pushed into calculationSteps which will be displayed to the user
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

      //KiriageMangan is a mode which rounds up points for certain han/fu values
      if (isKiriageMangan) {
        if (
          (agari.han === 3 && agari.fu === "60") ||
          (agari.han === 4 && agari.fu === "30")
        ) {
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

  //Work out final points based on whether winner is dealer / whether it was tsumo
  pointMultiplier = getBasicPointsMultiplier(isTsumo, isDealer);
  unroundedPointValue = basicPoints * pointMultiplier;
  pointValue = Math.ceil(unroundedPointValue / 100) * 100;
  var winTypeString = getWinTypeText(isTsumo, isDealer);

  addCalculationSteps(
    calculationSteps,
    winTypeString,
    unroundedPointValue,
    pointMultiplier,
    pointValue
  );

  if (isTsumo && !isDealer) {
    pointValueDealer = Math.ceil((basicPoints * 2) / 100) * 100;

    addCalculationSteps(
      calculationStepsDealer,
      "Tsumo (dealer)",
      basicPoints * 2,
      2,
      pointValueDealer
    );
  }

  if (testHonba && honbaSticks > 0) {
    pointValue = pointValue + honbaPointsPerPlayer;
    pointValueDealer = pointValueDealer + honbaPointsPerPlayer;

    calculationSteps.push(
      <p>{format("Honba: {} (+{})", pointValue, honbaPointsPerPlayer)}</p>
    );
    calculationStepsDealer.push(
      <p>{format("Honba: {} (+{})", pointValueDealer, honbaPointsPerPlayer)}</p>
    );
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

function getBasicPointsMultiplier(isTsumo, isDealer) {
  if (isTsumo && isDealer) {
    return 2;
  }
  if (!isTsumo && !isDealer) {
    return 4;
  }
  if (!isTsumo && isDealer) {
    return 6;
  }
  if (isTsumo && !isDealer) {
    return 1;
  }
}

function getWinTypeText(isTsumo, isDealer) {
  if (isTsumo && isDealer) {
    return "Dealer Tsumo";
  }
  if (!isTsumo && !isDealer) {
    return "Ron (non-dealer)";
  }
  if (!isTsumo && isDealer) {
    return "Dealer Ron";
  }
  if (isTsumo && !isDealer) {
    return "Tsumo (non-dealer)";
  }
}

function getHonbaPoints(isTsumo, honbaPoints) {
  if (isTsumo) {
    return honbaPoints / 3;
  } else {
    return honbaPoints;
  }
}

function addCalculationSteps(
  calculationSteps,
  winTypeString,
  unroundedPointValue,
  pointMultiplier,
  pointValue
) {
  calculationSteps.push(
    <p>
      {format(
        "{}: {} (x{})",
        winTypeString,
        unroundedPointValue,
        pointMultiplier
      )}
    </p>
  );

  if (unroundedPointValue !== pointValue) {
    calculationSteps.push(
      <p>
        {format(
          "Round up: {} (+{})",
          pointValue,
          pointValue - unroundedPointValue
        )}
      </p>
    );
  }
}

export { QuizPanel };
