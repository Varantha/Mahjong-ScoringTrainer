import React from "react";

import * as YakuConverter from "../scripts/YakuConversion";

import { Container } from "reactstrap";

function Answer(props) {
  const agari = props.agari;
  const show = props.showAnswer;

  let output = [];

  output.push(<Container fluid>Fu: {agari.fu}</Container>);
  output.push(<Container fluid>Han: {agari.han}</Container>);
  output.push(<Container fluid>Point Value: {agari.pointValue}</Container>);

  for (let i = 0; i < agari.yakusAchieved.length; i + i + 2) {
    output.push(
      <Container fluid>
        Yaku: {YakuConverter.YakuIdToName(agari.yakusAchieved[i])}
      </Container>
    );
  }

  if (show) {
    return output;
  } else {
    return;
  }
}

export { Answer };
