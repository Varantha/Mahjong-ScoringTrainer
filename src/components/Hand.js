import React from "react";
import * as TileConversion from "../scripts/TileConversion";

function Hand(props) {

  const divs = document.querySelectorAll('.allTiles > .unique-row');
  function wrapDivs(divs, groupSize) {
    for (let i = 0; i < divs.length; i += groupSize) {
      // Create a new container div for each group of divs
      const newContainer = document.createElement('div');
      newContainer.className = 'wrapped-container';
  
      // Append divs in the group to the new container
      for (let j = 0; j < groupSize; j++) {
        if (divs[i + j]) {
          newContainer.appendChild(divs[i + j]);
        }
      }
  
      // Insert the new container after the last div in the group
      divs[i].parentNode.insertBefore(newContainer, divs[i + groupSize]);
    }
  }

  wrapDivs(divs, 3);

  const initialHandString = props.agari.hand;
  const winningTile = props.agari.winningTile;

  const handString = removeWinningTileFromHand(initialHandString, winningTile);

  let hand = TileConversion.tileStringToArray(handString);

  const tileImages = hand.map((tile, index) => (
    <div className="first-row unique-row">
      <img
      src={TileConversion.tileToPath(tile)}
      key={index}
      alt={tile}
      class="tile"
    />
    </div>
  ));

  //push on winning tile


  tileImages.push(
    <div className="first-row">
     <img
      src={TileConversion.tileToPath(winningTile)}
      alt={winningTile}
      class="tile winningTile"
    />
    </div>
 
  );



  return tileImages;
}

function removeWinningTileFromHand(handstring, winningTile) {
  var strippedHand = "";

  const number = winningTile[0];
  const suit = winningTile[1];
  let pattern = "((" + number + ")[\\d]*" + suit + ")";
  var regex = new RegExp(pattern, "g");
  const array = [...handstring.matchAll(regex)];

  const index = array[0].index;

  strippedHand = handstring.slice(0, index) + handstring.slice(index + 1);

  return strippedHand;
}

export { Hand };
