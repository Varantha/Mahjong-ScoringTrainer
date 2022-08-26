import React from 'react';
import * as TileConversion from "../scripts/TileConversion"

const imageWidth = 80

function Melds (props)  {
    const melds = props.agari.melds
    const tileImages = []

    var meldString = ""
    var calledArray = []

    console.log(melds)
    if(melds === undefined){
        return tileImages
    }

    for (let i = 0; i < melds.length; i++) {
        let meldObject = TileConversion.extractDecoratorsFromTileString(melds[i])
        meldString = meldObject.tileString
        calledArray = meldObject.calledMatrix
        console.log(meldString)
        console.log(calledArray)
        let hand = TileConversion.tileStringToArray(meldString)
        console.log(hand)
        
        for(let j = 0; j < hand.length; j++){
            if(calledArray[j] === 1){
                tileImages.push(<img
                    src={TileConversion.tileToPath(hand[j])}
                    width={imageWidth}
                    alt={hand[j]}
                    class="calledTile"
                  />)
            }else{
                tileImages.push(<img
                    src={TileConversion.tileToPath(hand[j])}
                    width={imageWidth}
                    alt={hand[j]}
                  />)
            }       
        }
    }
    console.log("tile images")
    console.log(tileImages)
    return tileImages
}

export {Melds}
