import express from "express";
import bodyParser from "body-parser";
//the 3 lines of code here are used to dynamically determine the file path and save it as __dirname, ALWAYS relative to the computer on which its hosted 
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let bandName = ""

app.use(bodyParser.urlencoded({extended: true}));

function bandNameGenerator(req,res,next){
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator)



app.get("/", (req,res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req,res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}<h2/>`);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

