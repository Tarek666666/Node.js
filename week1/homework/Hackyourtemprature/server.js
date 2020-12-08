"use strict";
const express = require("express");
const exphbs = require("express-handlebars");
const port = process.env.PORT || 3000;
const axios = require("axios");
const app = express();
const url = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = require("./sources/keys.json").API_KEY;

app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/weather", async (req, res) => {
    //checking if there is a body of the request
    console.log(req.body.cityName.length);
    if (req.body.cityName.length == 0) {
        res.status(400);
        res.render("index", { error: "You must enter a city name!!!" });
    } else {
        // if the request body is exist, then we send a request to the api with the city name that we got from the form
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=metric&appid=${API_KEY}`
            )
            .then((response) => {
                res.render("index", {
                    output: `The Temprature in ${response.data.name} is: ${response.data.main.temp}º`,
                });
            })
            .catch((err) => {
                res.status(400);
                res.render("index", { output: "City is not found!" });
            });
    }
});

app.listen(port, () => console.log("Server started."));
