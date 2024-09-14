import * as TileConversion from "../scripts/TileConversion";
import ReactDOMServer from 'react-dom/server';


const showdown = require("showdown");

showdown.extension("markdowntiles", function() {
  return [
    {
      type: "lang",
      filter: function(text, converter, options) {
        const regex = /\^\^(.*?)\^\^/g;
        let match;

        let tileImages;

        while ((match = regex.exec(text)) !== null) {

          let hand = TileConversion.tileStringToArray(match[1]);

          tileImages = hand.map((tile, index) => (
              <img
                src={TileConversion.tileToPath(tile)}
                key={index}
                alt={tile}
                class="tile-small"
              />
          ));

          text = text.replace(match[0], ReactDOMServer.renderToStaticMarkup(tileImages));
        }
        return text;

      },
    },
  ];
});
