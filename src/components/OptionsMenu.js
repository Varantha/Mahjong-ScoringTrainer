import React from "react";
import { Collapse, CardBody, Card, Label, Input } from "reactstrap";

function OptionsMenu(props) {
  const options = props.options;
  const isOpen = props.menuOpen;

  return (
    <Collapse isOpen={isOpen} className="col-2 m-4">
      <Card>
        <CardBody>
          <Label check>
            <Input
              type="checkbox"
              value={options.pointSticks}
              onChange={props.changeOptions}
            />{" "}
            Extra point sticks
          </Label>
        </CardBody>
      </Card>
    </Collapse>
  );
}

export { OptionsMenu };
