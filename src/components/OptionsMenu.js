import React from "react";
import { Collapse, Label, Input, Tooltip } from "reactstrap";

function OptionsMenu(props) {
  const options = props.options;
  const isOpen = props.menuOpen;
  const handName = props.handName;
  const [TooltipOpen, setTooltipOpen] = React.useState(false);

  return (

    <div className="menu-wrap">
      <Collapse isOpen={isOpen} className="OptionsMenu">
      <h4>Test Options</h4>

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
      <MenuOption
      options={options}
      optionId="testHonba"
      optionText="Include Honba Sticks"
      changeOptions={props.changeOptions}
      size="small"
      />
      <br />
      <div className="link" style={{marginTop:'10px' }}>
      Log issues on{" "}
      <a href="https://github.com/Varantha/Mahjong-ScoringTrainer/" style={{ color: "white" }}>GitHub</a>
      </div>
      <div style={{ color: "white" , marginTop:'10px' }} >
      Hand ID: {handName.replace(".json", "")}
      </div>
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
    </div>
   
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
