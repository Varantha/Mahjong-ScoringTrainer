
const tilesPath = process.env.PUBLIC_URL + '/assets/tiles/';

/**
 * @param {string} tileString - A tile represented as one number and one letter (for the suit) e.g. 5s|1h|8p etc.
 * @returns {string} - The URL of the tile required
 */
export function tileToPath(tileString){
    const number = tileString[0]
    const suit = tileString[1]
    var returnPath = ""
    switch(suit){
        case 's':
            returnPath = tilesPath + "Sou" + number + ".svg"
        break;
        case 'p':
            returnPath = tilesPath + "Pin" + number + ".svg"
        break;
        case 'm':
            returnPath = tilesPath + "Man" + number + ".svg"
        break;
        case 'h':
            var lookupArray = ["East","South","West","North","Haku","Hatsu","Chun"]
            returnPath = tilesPath + lookupArray[number] + ".svg"
        break;
        case 'f':
            returnPath = tilesPath + "Back.svg"
        break;
        default:
            throw new Error(suit + ' is not a valid suit');
    }
    return returnPath
}

/**
 * @param {string} windName - The name of the wind e.g. East, West, North, South
 * @returns {string} - The URL of the wind tile image
 */
 export function windToPath(windName){
    var acceptedWinds = ["East","West","North","South"] 
    if(!(windName in acceptedWinds)){
        throw new Error(windName + ' is not a valid wind');
    }
    var returnPath = tilesPath + windName + ".svg"
    return returnPath
}


/**
 * @param {string} tileString - A list of tiles in the spmh notation e.g. 22888s056677p456m
 * @returns {array} - An array of the tiles as singular tiles. e.g. [2s,2s,8s,8s,8s] 
 */
 export function tileStringToArray(tileString){
    const returnArray = []
    const suitOrder = ["s","p","m","g"]
    const regexp = /(?:(\d*)s)*(?:(\d*)p)*(?:(\d*)m)*(?:(\d+)h)*/g
    const array = [...tileString.matchAll(regexp)]

    var sou = array[0][1] == null ? [] : array[0][1]
    var pin = array[0][2] == null ? [] : array[0][2]
    var man = array[0][3] == null ? [] : array[0][3]
    var honours = array[0][4] == null ? [] : array[0][4]

    var tiles = [sou,pin,man,honours]

    for (let i = 0; i < 4; i++) {
        for(let j = 0; j < tiles[i].length; j++){
            returnArray.push(tiles[i][j] + suitOrder[i])
        }    
    }
    return returnArray
}