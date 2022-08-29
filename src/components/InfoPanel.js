import React from "react";

import { Col, Card, CardBody, Container } from "reactstrap";

import * as TileConversion from "../scripts/TileConversion";

const imageWidth = 70;

function InfoPanel(props) {
  const agari = props.agari;
  const options = props.options;
  console.log(agari);

  const optionalElements = [];

  if (options.pointSticks === true) {
    optionalElements.push(
      <Container fluid className="infoRow">
        Riichi Sticks: {agari.riichiSticks}
      </Container>
    );
    optionalElements.push(
      <Container fluid className="infoRow">
        Honba Sticks: {agari.honbaSticks}
      </Container>
    );
  }

  const uraDoras =
    agari.uraDoraIndicators.length === 0 ? (
      []
    ) : (
      <Container fluid className="infoRow">
        Uradora indicators:{" "}
        {agari.uraDoraIndicators.map((tile) => generateTileImage(tile))}
      </Container>
    );

  return (
    <Col className="col-2 m-4">
      <Card className="border-0">
        <CardBody className="h-100 infoPanel infoPanelBorder">
          <Container fluid className="infoRow">
            Round: {agari.roundWind}
          </Container>
          <Container fluid className="infoRow">
            Seat Wind {generateTileImage(agari.seatWind)}
          </Container>
          <Container fluid className="infoRow">
            Dora indicators:{" "}
            {agari.doraIndicators.map((tile) => generateTileImage(tile))}
          </Container>
          {uraDoras}
          <Container fluid className="infoRow">
            Tsumo: {agari.isTsumo === true ? "Yes" : "No"}
          </Container>
          <Container fluid className="infoRow">
            Riichi: {agari.isRiichi === true ? "Yes" : "No"}
          </Container>
          {optionalElements}
        </CardBody>
      </Card>
    </Col>
  );
}

function generateTileImage(tile) {
  return (
    <img
      src={TileConversion.tileToPath(tile)}
      height={imageWidth}
      alt={tile}
      class="tile"
    />
  );
}

export { InfoPanel };

/*

"riichiSticks": Depends on state 
"honbaSticks": Depends on state
"roundWind": Yes - "EAST"
"seatWind": Yes - "3h"
"doraIndicator": Yes - "2h"
"isTsumo": Yes - False
"isRiichi": Yes - False


*/
