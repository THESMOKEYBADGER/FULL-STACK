import express from "express"

//initialize port and app
const app = express()
const port = 3100;


//initialize server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


//handle initial get request 
app.get("/", (req,res) => {
    res.send("<h1>Hello</h1>")
})

app.get("/about-us", (req,res)=> {
    res.send("about us!")
})

app.get("/contact-us", (req,res)=> {
    res.send("my phone number \n 0849297732")
})

app.post("/form", (req,res) => {
    
})
