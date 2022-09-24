import React from "react";
import * as TileConversion from "../scripts/TileConversion";

const imageWidth = 80;

function Melds(props) {
  const melds = props.agari.melds;
  const tileImages = [];

  var meldString = "";
  var calledArray = [];

  console.log(melds);
  if (melds === undefined) {
    return tileImages;
  }

  for (let i = 0; i < melds.length; i++) {
    let meldObject = TileConversion.extractDecoratorsFromTileString(melds[i]);
    meldString = meldObject.tileString;
    calledArray = meldObject.calledMatrix;
    let hand = TileConversion.tileStringToArray(meldString);
    let currentMeld = [];
    for (let j = 0; j < hand.length; j++) {
      if (calledArray[j] === 1) {
        currentMeld.push(
          <img
            src={TileConversion.tileToPath(hand[j])}
            width={imageWidth}
            alt={hand[j]}
            class="calledTile"
          />
        );
      } else {
        currentMeld.push(
          <img
            src={TileConversion.tileToPath(hand[j])}
            width={imageWidth}
            alt={hand[j]}
          />
        );
      }
    }
    tileImages.push(<span class="meld">{currentMeld}</span>);
  }
  return tileImages;
}

export { Melds };
