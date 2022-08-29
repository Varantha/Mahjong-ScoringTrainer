import React from "react";
import { Hand } from "./Hand";
import { Melds } from "./Melds.js";
import { Col, Card, CardBody, Row } from "reactstrap";

function TilePanel(props) {
  const agari = props.agari;

  return (
    <Card>
      <CardBody className="primary-color">
        <Row>
          <Col className="col-md-auto">
            <Hand agari={agari} />
          </Col>
          <Col className="col-md-auto">
            <Melds agari={agari} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export { TilePanel };
