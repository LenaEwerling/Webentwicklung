const count = document.querySelector('span');
const button = document.querySelector('button');
button.addEventListener('click', function () {
  count.textContent = parseInt(count.textContent) + 1;
});

const express = require("express");
//const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.get("/test", (req, res) => {
  res.send("Test bestanden");
})

//app.get("/", (req, res) => {
//  res.redirect("/index.html")
//})

app.post("/comment", (reg, res) => {
  console.log("Kommentar: " + req.body.textarea);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
