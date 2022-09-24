import React from "react";

import { Col, Container } from "reactstrap";

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
      <Col fluid className="infoRow">
        <div className="infoTitle">Uradora indicators</div>
        <div className="infoElement">
          {agari.uraDoraIndicators.map((tile) => generateTileImage(tile))}
        </div>
      </Col>
    );

  return (
    <div>
      <Col className="infoPanel">
        <span className="infoContainer bgcolor-1">
          <Col fluid className="infoRow">
            <div className="infoTitle">Round</div>
            <div className="infoElement">{agari.roundWind}</div>
          </Col>
          <Col fluid className="infoRow">
            <div className="infoTitle">Seat Wind</div>{" "}
            <div className="infoElement">
              {generateTileImage(agari.seatWind)}
            </div>
          </Col>
          <Col fluid className="infoRow">
            <div className="infoTitle">Dora indicators</div>
            <div className="infoElement">
              {agari.doraIndicators.map((tile) => generateTileImage(tile))}
            </div>
          </Col>
          {uraDoras}
          <Col fluid className="infoRow">
            <div className="infoTitle">Tsumo</div>
            <div className="infoElement">
              {agari.isTsumo === true ? "Yes" : "No"}
            </div>
          </Col>
          <Col fluid className="infoRow">
            <div className="infoTitle">Riichi</div>
            <div className="infoElement">
              {agari.isRiichi === true ? "Yes" : "No"}
            </div>
          </Col>
          {optionalElements}
        </span>
      </Col>
    </div>
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
