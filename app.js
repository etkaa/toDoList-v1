const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const date = require(__dirname + "/date.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const items = ["Buy food", "Cook dinner"];
const workItems = [];

app.get("/", (req, res) => {

    const day = date.getDate();

    res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.post("/", (req, res) => {
    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.post("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});    
  });

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
