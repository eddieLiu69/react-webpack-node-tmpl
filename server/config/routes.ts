/**
 * Routes for express app
 */
import * as comments from "../controllers/comments";
import * as todos from "../controllers/todos";
import * as express from "express";
import * as _ from "lodash";
import * as path from "path";
// const compiled_app_module_path = path.resolve(__dirname, "../../", "public", "assets", "server.js");
const compiled_app_module_path = path.resolve(__dirname, "../../", "build", "server.js");
const App = require(compiled_app_module_path);

const routes = (app) => {
  app.get("/api/comments", (req, res) => {    
    comments.getComments(req, res);
  });
  
  app.post("/api/comments", (req, res) => {
    comments.createComments(req, res);
  });
  
  app.get("/api/todos", todos.getTodos);

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.get("*", App.default());
};
export default routes;