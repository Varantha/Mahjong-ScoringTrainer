import React from "react";
import { Collapse, Label, Input } from "reactstrap";

function OptionsMenu(props) {
  const options = props.options;
  const isOpen = props.menuOpen;

  return (
    <Collapse isOpen={isOpen} className="OptionsMenu">
      <Label check>
        <Input
          type="checkbox"
          value={options.pointSticks}
          onChange={props.changeOptions}
        />{" "}
        Extra point sticks
      </Label>
    </Collapse>
  );
}

export { OptionsMenu };
