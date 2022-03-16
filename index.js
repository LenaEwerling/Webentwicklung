const express = require("express");
//const cookieParser = require("cookie-parser");

// wird benötigt um formular daten lesen zu können
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", express.static("./public"))
// const count = document.querySelector('span');
// const button = document.querySelector('button');
// button.addEventListener('click', function () {
//   count.textContent = parseInt(count.textContent) + 1;
// });

app.get("/test", (req, res) => {
  res.send("Test bestanden");
})

//app.get("/", (req, res) => {
//  res.redirect("/index.html")
//})

app.post("/comment", (req, res) => {
  console.log("Kommentar: " + req.body.textarea);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
