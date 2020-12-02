'use strict'
const express = require("express");
const exphbs = require("express-handlebars");
const port = process.env.PORT || 3000;

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");
app.use(express.json());   
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/weather", (req, res) => {
    
    //checking if there is a body of the request
    if (req.body.cityName.length == 0) {
        
        res.status(400);
        res.send("<h1>You need to enter a city name</h1>");
        res.end();
    }
    const cityName = req.body.cityName;
    
    res.status(200);
    res.send(cityName);
    res.end();
});

app.listen(port, () => console.log("Server started."));
