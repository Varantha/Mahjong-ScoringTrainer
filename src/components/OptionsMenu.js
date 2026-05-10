import React, { useEffect, useRef, useState } from 'react';
import { Collapse, Label, Input } from "reactstrap";
import { useTranslation } from '../i18n/I18nContext';


function OptionsMenu(props) {
  const { t, currentLanguage, changeLanguage, languages } = useTranslation();
  var options = props.options;
  const isOpen = props.menuOpen;
  const handName = props.handName;
  const onClickOutside = props.onClickOutside
  const [changesPending, setChangesPending] = useState(false);
  const [checkboxes, setCheckboxes] = useState({...options});

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            
          onClickOutside();
        }
    };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [onClickOutside]);

  useEffect(() => {
    // Check if the checkboxes object matches the options object
    const areEqual = Object.keys(checkboxes).every(
      (key) => checkboxes[key] === options[key]
    );
    setChangesPending(!areEqual);
  }, [checkboxes, options]);

  const handleCheckboxChange = (id) => {
    // Update the state by toggling the checkbox with the corresponding id
    setCheckboxes({
      ...checkboxes,
      [id]: !checkboxes[id],
    });
  };




  return (

    <div ref={ref} className="menu-wrap">
      <Collapse isOpen={isOpen} className="OptionsMenu">
      <h4>{t('options.title')}</h4>

      <MenuOption
      options={options}
      optionId="testHan"
      optionText={t('options.testHan')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <MenuOption
      options={options}
      optionId="testFu"
      optionText={t('options.testFu')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <MenuOption
      options={options}
      optionId="testPoints"
      optionText={t('options.testPoints')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <MenuOption
      options={options}
      optionId="kiriageMangan"
      optionText={t('options.kiriageMangan')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <br />
      <MenuOption
      options={options}
      optionId="testHonba"
      optionText={t('options.testHonba')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <br />
      <MenuOption
      options={options}
      optionId="ignoreFuOnLimit"
      optionText={t('options.ignoreFuOnLimit')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <MenuOption
      options={options}
      optionId="exactFu"
      optionText={t('options.exactFu')}
      changeOptions={props.changeOptions}
      size="small"
      handleCheckboxChange={handleCheckboxChange}
      />
      <br />
      <div className="menuOption small" style={{marginTop:'10px'}}>
        <Label htmlFor="languageSelect">{t('options.language')}</Label>
        <Input
          type="select"
          id="languageSelect"
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{ marginLeft: '10px', display: 'inline-block', width: 'auto' }}
        >
          {Object.entries(languages).map(([code, langData]) => (
            <option key={code} value={code}>
              {langData.name}
            </option>
          ))}
        </Input>
      </div>
      <br />
      <div className="link" style={{marginTop:'10px' }}>
      {t('footer.logIssues')}{" "}
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
      disabled={!changesPending}
      >
      {t('common.apply')}
      </button>
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
          onChange={() => props.handleCheckboxChange(props.optionId)}
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
