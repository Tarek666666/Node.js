const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.json());



// homepage endpoint, will send back the form,
app.get("/", function (req, res) {
    res.setHeader("Content-Type", "text/html");
    const homeHtmlPage = fs.readFileSync(
        path.join(path.dirname(__filename), "index.html"),
        "UTF-8"
    );
    res.send(homeHtmlPage);
    res.end();

    // i wanted to get the data from the form that's why i sent in the res the html page and handle it in my server but i didn't have enough time
});

// creating a post
app.post("/blogs", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    // validate the request, checking if there is a title and a content
    if (typeof req.body.title == "undefined" || typeof req.body.content === "undefined") {
        res.status(400);
        res.send(
            "ooooooooops , there is something wrong with the request, it should have a title and content!!"
        );
        res.end();
    } else {
        // getting the title and content of the blog sent in the request body
        const title = req.body.title;
        const content = req.body.content;
        fs.writeFileSync(path.join(path.dirname(__filename), "/blogs", title), content, "utf8");
        res.status(201);
        res.send("Ok!");
        res.end();
    }
});

// updating a post, using the title as a parameter and the content key in the request's body
app.put("/posts/:title", function (req, res) {
    const title = req.params.title;
    isExist = fs.existsSync(path.join(path.dirname(__filename), "/blogs"), title);
    //checking if there is a file with the same name
    if (!isExist) {
        res.setHeader("Content-Type", "application/json");
        res.status(404);
        res.send("This post doesn't exist");
    } else {
        // validating the update request
        if (typeof req.body.content === "undefined") {
            res.setHeader("Content-Type", "application/json");
            res.status(404);
            res.send("Coulnd't find the post to update it");
            res.end();
        } else {
            fs.writeFileSync(
                path.join(path.dirname(__filename), "/blogs", title),
                req.body.content,
                "utf8"
            );
            res.status(200);
            res.send("updated");
            res.end();
        }
    }
});
// delete a post
app.delete("/blogs/:title", function (req, res) {
    const title = req.params.title;
    isExist = fs.existsSync(path.join(path.dirname(__filename), "/blogs", title));
    if (!isExist) {
        res.setHeader("Content-Type", "application/json");
        res.status(404);
        res.send("This post doesn't exist");
    } else {
        fs.unlinkSync(path.join(path.dirname(__filename), "/blogs", title));
        res.setHeader("Content-Type", "text/plain");
        res.status(200);
        res.send("post has been deleted");
        res.end();
    }
});

// reading a specific post

app.get("/blogs/:title", function (req, res) {
    const title = req.params.title;
    isExist = fs.existsSync(title);
    // if there is no such a post
    if (!isExist) {
        res.setHeader("Content-Type", "application/json");
        res.status(404);
        res.send("This post doesn't exist");
    } else {
        const post = fs.readFileSync(title);
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.send(post);
        res.end();
    }
});

// read all blogs,
app.get("/blogs", function (req, res) {
    let allBlogs = [];
    res.setHeader("Content-Type", "application/json");
    res.status(200);

    fs.readdir(path.join(path.dirname(__filename), "/blogs"), (err, data) => {
        if (err) {
            res.status(500);
            res.send(err);
            res.end();
        } else {
            data.forEach((blog) => {
                allBlogs.push({
                    title: blog,
                    content: fs.readFileSync(
                        path.join(path.dirname(__filename), "/blogs", `${blog}`),
                        "UTF-8"
                    ),
                });
            });

            // handle if there is no files at all

            if (allBlogs.length == 0) {
                res.status(404);
                res.send("There is no blogs");
                res.end();
            } else {
                res.setHeader("Content-Type", "application/json");
                res.status(200);
                res.send(allBlogs);
                res.end();
            }
        }
    });
});

app.listen(3000, () => {
    console.log(`Server running on port: ${PORT}`);
});
