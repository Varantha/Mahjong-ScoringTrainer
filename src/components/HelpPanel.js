import React, { useEffect, useRef, useState } from "react";
import MarkdownView, { GlobalConfiguration } from 'react-showdown';

import 'showdown-katex';
import { useTranslation } from '../i18n/I18nContext';
// Pre-import markdown files to ensure bundlers include them reliably
import scoringEn from '../helpPages/scoring.en.md';
import scoringJa from '../helpPages/scoring.ja.md';
import scoringKo from '../helpPages/scoring.ko.md';
import scoringZhCn from '../helpPages/scoring.zh_cn.md';

require('../extensions/MarkdownTiles.js');

const showdownKatex = GlobalConfiguration.getExtension('showdownKatex')[0];
const markdownTiles = GlobalConfiguration.getExtension('markdowntiles')[0];

function HelpPanel(props) {
  const { currentLanguage } = useTranslation();
  const onClickOutside = props.onClickOutside;
  const isOpen = props.isOpen;

  const ref = useRef(null);

  const [mdContent, setMdContent] = useState('');

  useEffect(() => {
    const mdMap = {
      en: scoringEn,
      ja: scoringJa,
      ko: scoringKo,
      zh_cn: scoringZhCn
    };

    const loadHelpFile = async () => {
      try {
        const mdFilePath = mdMap[currentLanguage] || mdMap.en;
        const response = await fetch(mdFilePath);
        const text = await response.text();
        setMdContent(text);
      } catch (error) {
        console.error('Error loading help file:', error);
      }
    };

    loadHelpFile();
  }, [currentLanguage]);

  var elementExists = document.getElementById("mySidenav");
  if (elementExists) {
    if (isOpen) {
      document.getElementById("mySidenav").classList.remove("closedSideNav");
    } else {
      document.getElementById("mySidenav").classList.add("closedSideNav");
    }
  }

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

  return <div id="mySidenav" class="sidenav closedSideNav">
    <MarkdownView
      markdown={mdContent}
      options={{ tables: true, emoji: true, parseImgDimensions: true}}
      extensions= {[showdownKatex,markdownTiles]}
    />
  </div>;
}

export { HelpPanel };
