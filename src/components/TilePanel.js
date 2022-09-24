import React from "react";
import { Hand } from "./Hand";
import { Melds } from "./Melds.js";
import { Col } from "reactstrap";

function TilePanel(props) {
  const agari = props.agari;

  return (
    <div>
      <Col className="tilePanel">
        <span className="allTiles bgcolor-1">
          <Hand agari={agari} />
          <Melds agari={agari} />
        </span>
      </Col>
    </div>
  );
}

export { TilePanel };
