import * as express from "express";
import * as fs from "fs";
import * as webpack from "webpack";
import expressConig from "./config/express"
import routes from "./config/routes";
let app = express();

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  const config = require("../webpack/webpack.config.dev-client.js");
  const compiler = webpack(config);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require("webpack-hot-middleware")(compiler));
}


// Bootstrap passport config
// TODO: passport implement

// Bootstrap application settings
expressConig(app);

// Bootstrap routes
routes(app);

app.listen(app.get("port"));