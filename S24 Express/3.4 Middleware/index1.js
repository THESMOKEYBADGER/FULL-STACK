import express from "express";
import bodyParser from "body-parser"

//the 3 lines of code here are used to dynamically determine the file path and save it as __dirname, ALWAYS relative to the computer on which its hosted 
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/submit", (req,res) =>{

  console.log(req.body)

})
