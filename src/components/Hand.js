import React from 'react';
import * as TileConversion from "../scripts/TileConversion"

const imageWidth = 80

function Hand (props)  {
    const initialHandString = props.agari.hand
    const winningTile = props.agari.winningTile

    const handString = removeWinningTileFromHand(initialHandString, winningTile)
    console.log(props)

    let hand = TileConversion.tileStringToArray(handString)

    const tileImages = hand.map((tile, index) => (
      <img
        src={TileConversion.tileToPath(tile)}
        width={imageWidth}
        key={index}
        alt={tile}
        class="tile"
      />
    ))

    //push on winning tile
    tileImages.push(
        <img
        src={TileConversion.tileToPath(winningTile)}
        width={imageWidth}
        alt={winningTile}
        class="winningTile"
      />
    )

    return tileImages
}

function removeWinningTileFromHand(handstring, winningTile){
    var strippedHand = ""

    const number = winningTile[0]
    const suit = winningTile[1]
    let pattern = "((" + number + ")[\\d]*" + suit + ")"
    var regex = new RegExp(pattern, "g");
    const array = [...handstring.matchAll(regex)]

    const index = array[0].index

    strippedHand = handstring.slice(0, index) + handstring.slice(index+1);

    return strippedHand
}

export {Hand}

