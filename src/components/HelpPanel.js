import React, { useEffect, useRef, useState } from "react";
import MarkdownView, { GlobalConfiguration } from 'react-showdown';

import 'showdown-katex';

require('../extensions/MarkdownTiles.js');

const showdownKatex = GlobalConfiguration.getExtension('showdownKatex')[0];
const markdownTiles = GlobalConfiguration.getExtension('markdowntiles')[0];


function HelpPanel(props) {
  const onClickOutside = props.onClickOutside;
  const isOpen = props.isOpen;

  const ref = useRef(null);

  const [mdContent, setMdContent] = useState('');
  const mdFilePath = require('../helpPages/scoring.md');

  useEffect(() => {
    fetch(mdFilePath)
      .then((response) => response.text())
      .then((text) => setMdContent(text))
      .catch((error) => console.error('Error loading markdown file:', error));
  }, [mdFilePath]);

  var elementExists = document.getElementById("mySidenav");
  if (elementExists) {
    if (isOpen) {
      document.getElementById("mySidenav").style.width = "60%";
      document.getElementById("mySidenav").style.minWidth = "620px";
      document.getElementById("mySidenav").style.paddingLeft = "60px";
    } else {
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("mySidenav").style.minWidth = "0px";
      document.getElementById("mySidenav").style.paddingLeft = "0px";
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

  return <div id="mySidenav" class="sidenav">
    <MarkdownView
      markdown={mdContent}
      options={{ tables: true, emoji: true, parseImgDimensions: true}}
      extensions= {[showdownKatex,markdownTiles]}
    />
  </div>;
}

export { HelpPanel };
