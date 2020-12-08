// variables

const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
let members = require("./members.json");
const app = express();



app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");


app.use(express.json()); //Handle json data
app.use(express.urlencoded({ extended: false })); //Handle form data


// loading the main page
app.get("/", (req, res) => {
    res.render("main");
});

// adding the blog to the file
app.post("/blogs", (req, res) => {

    // check if the request has title and content
    if (req.body.title.trim().length === 0 || req.body.content.trim().length === 0) {
        
        res.render("main", { error: "You must enter a title and content !!!" });
    } else {
       
        let postedBlog = { name: req.body.title, content: req.body.content };
        members.push(postedBlog);
        fs.writeFile("members.json", JSON.stringify(members), (err, data) =>{});
        res.redirect("/");
        
    }
});

// page to show all blogs 
app.get("/watchAll", (req, res) => {
    members = JSON.parse(fs.readFileSync("members.json"));
    res.render("watchAll", { members });
});


// deleting a blog
app.get("/watchAll/:name", (req, res) => {
    
    const updatedMembers = members.filter((member) => member.name !== req.params.name);
    fs.writeFileSync("members.json", JSON.stringify(updatedMembers));
    res.redirect("/watchAll");

});

app.listen(PORT);
