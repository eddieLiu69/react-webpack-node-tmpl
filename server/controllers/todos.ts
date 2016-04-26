import * as path from "path";
import * as fs from "fs";

const COMMENTS_FILE = path.join(__dirname, "..", "..", "todos.json");

export const getTodos = (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data: any) => res.json(JSON.parse(data)));
}

// export const createComments = (req, res) => {
//   fs.readFile(COMMENTS_FILE, (err, data: any) => {
//     let comments = JSON.parse(data),
//       newComment = {
//         key: Date.now(),
//         author: req.body.author,
//         text: req.body.text,
//       };
    
//     comments.push(newComment);
//     fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), (err) => res.json(comments));
//   });
// }