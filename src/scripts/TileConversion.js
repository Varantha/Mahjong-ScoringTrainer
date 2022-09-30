const tilesPath = process.env.PUBLIC_URL + "/assets/tiles/";

/**
 * @param {string} tileString - A tile represented as one number and one letter (for the suit) e.g. 5s|1h|8p etc.
 * @returns {string} - The URL of the tile required
 */
export function tileToPath(tileString) {
  const number = tileString[0];
  const suit = tileString[1];
  var returnPath = "";
  if (number === "f") {
    returnPath = tilesPath + "Back.svg";
  } else {
    switch (suit) {
      case "s":
        returnPath = tilesPath + "Sou" + number + ".svg";
        break;
      case "p":
        returnPath = tilesPath + "Pin" + number + ".svg";
        break;
      case "m":
        returnPath = tilesPath + "Man" + number + ".svg";
        break;
      case "h":
        var lookupArray = [
          "East",
          "South",
          "West",
          "North",
          "Haku",
          "Hatsu",
          "Chun",
        ];
        returnPath = tilesPath + lookupArray[number - 1] + ".svg";
        break;
      default:
        throw new Error(suit + " is not a valid suit");
    }
  }
  return returnPath;
}

/**
 * @param {string} windName - The name of the wind e.g. East, West, North, South
 * @returns {string} - The URL of the wind tile image
 */
export function windToPath(windName) {
  windName = windName.toUpperCase();
  var acceptedWinds = ["EAST", "WEST", "NORTH", "SOUTH"];
  if (!acceptedWinds.includes(windName)) {
    throw new Error(windName + " is not a valid wind");
  }
  var returnPath = tilesPath + windName + ".svg";
  return returnPath;
}

/**
 * @param {string} tileString - A list of tiles in the spmh notation e.g. 22888s056677p456m
 * @returns {array} - An array of the tiles as singular tiles. e.g. [2s,2s,8s,8s,8s]
 */
export function tileStringToArray(tileString) {
  const returnArray = [];
  const suitOrder = ["s", "p", "m", "h"];
  const regexp = /(?:([\df]*)s)*(?:([\df]*)p)*(?:([\df]*)m)*(?:([\df]*)h)*/g;
  const array = [...tileString.matchAll(regexp)];

  var sou = array[0][1] == null ? [] : array[0][1];
  var pin = array[0][2] == null ? [] : array[0][2];
  var man = array[0][3] == null ? [] : array[0][3];
  var honours = array[0][4] == null ? [] : array[0][4];

  var tiles = [sou, pin, man, honours];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      returnArray.push(tiles[i][j] + suitOrder[i]);
    }
  }
  return returnArray;
}

/**
 * @param {string} tileString - A list of tiles in the spmh notation with docorators e.g. 22888s05c667f7p456m (c and f are decarators)
 * @returns {object} - An Object containing a tile string where f replaces the letters of flipped tiles and a "called" matrix for the tiles which are called in the hand
 * The called matrix has the same length as the number of tiles in the original array with a 1 set in the tile position where the called tile appears
 * e.g. input "6c66s" will give a tile array [0,1,0]
 */
export function extractDecoratorsFromTileString(tileString) {
  //Process f decorator
  const tileStringArr = Array.from(tileString);
  var copyStringArr = [...tileStringArr];
  var f_index = copyStringArr.indexOf("f");
  while (f_index > -1) {
    tileStringArr.splice(f_index + 1, 1);
    copyStringArr.splice(f_index, 1);
    f_index = copyStringArr.indexOf("f");
  }
  const newTileString = tileStringArr.join("");

  //process c decorator
  const noOfTiles = newTileString.replace(/[^\d]/, "").length;
  const calledMatrix = new Array(noOfTiles - 1).fill(0);

  const tilesWithoutSuit = newTileString.replace(/[^\dc]/, "");
  const tilesWithoutSuitArr = Array.from(tilesWithoutSuit);

  var c_index = tilesWithoutSuitArr.indexOf("c");
  while (c_index > -1) {
    calledMatrix[c_index] = 1;
    tilesWithoutSuitArr.splice(c_index, 1);
    c_index = tilesWithoutSuitArr.indexOf("c");
    console.log(calledMatrix);
    console.log(tilesWithoutSuitArr);
  }

  const outputTileString = newTileString.replaceAll("c", "");

  let output = { tileString: outputTileString, calledMatrix: calledMatrix };
  console.log(output);
  return output;
}
