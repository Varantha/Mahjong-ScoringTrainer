import React from "react";

function WinRate(props) {
  const correctAnswers = props.correctAnswers;
  const wrongAnswers = props.wrongAnswers;

  return (
    <div className="winRatePanel">
      <label className="correctAnswer spaced unselectable">Correct: {correctAnswers} </label>
      <label className="wrongAnswer spaced unselectable"> Wrong: {wrongAnswers}</label>{" "}
      Success rate:{" "}
      {Math.round(
        (correctAnswers / Math.max(correctAnswers + wrongAnswers, 1)) * 100
      )}
      %
    </div>
  );
}

export { WinRate };
