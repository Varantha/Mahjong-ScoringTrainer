import React from "react";
import { Collapse, Label, Input, Tooltip } from "reactstrap";

function OptionsMenu(props) {
  const options = props.options;
  const isOpen = props.menuOpen;
  const [TooltipOpen, setTooltipOpen] = React.useState(false);

  return (
    <Collapse isOpen={isOpen} className="OptionsMenu">
      Test Options
      <br />
      <MenuOption
        options={options}
        optionId="testHan"
        optionText="Test Han"
        changeOptions={props.changeOptions}
        size="small"
      />
      <MenuOption
        options={options}
        optionId="testFu"
        optionText="Test Fu"
        changeOptions={props.changeOptions}
        size="small"
      />
      <MenuOption
        options={options}
        optionId="kiriageMangan"
        optionText="Kiriage Mangan Mode"
        changeOptions={props.changeOptions}
        size="small"
      />
      <br />
      <br />
      <div className="menuOption large">
        <button
          className="checkAnswer"
          id="applyButton"
          onClick={(e) => props.changeOptions(e)}
        >
          Apply
        </button>
        <Tooltip
          isOpen={TooltipOpen}
          className="hanTooltip"
          placement="right"
          target="applyButton"
          toggle={() => {
            setTooltipOpen(!TooltipOpen);
          }}
        >
          Applying these settings will refresh the hand
        </Tooltip>
      </div>
    </Collapse>
  );
}

function MenuOption(props) {
  const size = props.size;
  const divClass = ["menuOption", size].join(" ");
  return (
    <span className={divClass}>
      <Label check>
        <Input
          type="checkbox"
          id={props.optionId}
          defaultChecked={props.options[props.optionId]}
          key={props.optionId}
        />{" "}
        {props.optionText}
      </Label>
    </span>
  );
}

export { OptionsMenu };

/*
<MenuOption
        options={options}
        optionId="pointSticks"
        optionText="Test Point Sticks"
        changeOptions={props.changeOptions}
        size="small"
      />
       */
