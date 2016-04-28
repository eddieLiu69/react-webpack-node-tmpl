import * as path from "path";
import * as fs from "fs";
import {Request, Response} from 'express';

const TODO_FILE = path.join(__dirname, "..", "..", "todos.json");

export const getTodos = (req, res) => {
  fs.readFile(TODO_FILE, (err, data: any) => res.json(JSON.parse(data)));
}

export const createTodo = (req: Request, res: Response) => {
  fs.readFile(TODO_FILE, (err, data: any) => {
    let todos = JSON.parse(data),
      newTodo = {
        id: Date.now(),
        text: req.body.text,
      };

    todos.push(newTodo);
    fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 4), (err) => {
      res.json(todos);
    });
  });
}