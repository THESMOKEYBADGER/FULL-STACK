import express from "express"

const app = express();
const port = 3000;

let currentDate = new Date();

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})



app.get("/", (req, res) => {

    let today = currentDate.getDay();
    let message = "";
    console.log(today)

    if (today === 0 || today === 6) {
        message = "Ahhhh the weekend, take it easy china."
    } else {
        message = "Shew, it's a weekday, time to rise and grind."
    }
    res.render("index.ejs", {
        message
    });
})

