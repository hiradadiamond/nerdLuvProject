var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var formSubmit = require("./formSubmit.js");
var matchSubmit = require("./matchSubmit.js");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index", {
    name: "NerdLuv",
    url: "http://www.tutorialspoint.com",
  });
});

app.get("/signup", function (req, res) {
  res.render("index", {
    signup: true,
  });
});
app.get("/matches", function (req, res) {
  res.render("matchesform", {
    matchup: true,
  });
});
app.get("/matchesform", function (req, res) {
  res.render("matchesform", {
    matchup: true,
  });
});

app.post("/signup-submit", function (req, res) {
  formSubmit.formSubmit(req, res, function (success, error) {
    if (error) res.send("<h1>Error</h1>");
    res.render("signupSubmitFile", { name: req.body.name });
  });
});

app.post("/matches-submit", function (req, res) {
  var name = req.body.name;
  matchSubmit.matches(req, res, function (error, data) {
    if (error) res.send("<h1>Error</h1>");
    console.log("Server \n"+ data);
    res.render("matches", {data:data});
  });
});

var server = app.listen(1000, function () {
  console.log("Node Server is running");
});
