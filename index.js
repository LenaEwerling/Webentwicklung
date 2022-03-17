const express = require("express");
//const cookieParser = require("cookie-parser");

// wird benötigt um formular daten lesen zu können
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const oneDay = 1000 * 60 * 60 * 24;
var session;

app.use(expressSession({
  secret: "thisismysecretkeyfcdshuovdfcbhvu",
  saveUninitialized:true,
  cookie: {maxAge: oneDay},
  resave: false
}));

app.use("/", express.static("./public"))

app.get("/", (req, res) => {
  session = req.session;
  if(session.userid){
    console.log("session steht");
    res.send();
  }
  else {
    res.sendFile("./index.html", {root:"./public"})
  }
})

const comment = [];

class Kommentar {
  constructor(comment, user){
    this.comment = comment;
    this.user = user;
    this.id = Kommentar.anzahlKommentare;
    Kommentar.anzahlKommentare++;
  }
  static anzahlKommentare = 0;
}

app.post("/comment", (req, res) => {
  console.log("Kommentar: " + req.body.textarea);
  if (req.body.textarea != "") {
    var com = new Kommentar(req.body.textarea, req.cookies.username)
    //just for task:
    saveCommentInUser(com);
    comment.push(com);
    console.log(Kommentar.anzahlKommentare);
    console.log(com.id);
  }
  res.redirect('back');
  res.send;
})

function saveCommentInUser(com){
  console.log("hallo Funktion!");
  for(let i = 0; i < userarray.length; i++){
    if(userarray[i].name == com.user){
      userarray[i].comments.push(com.id);
      console.log(userarray[i]);
    };
  };
}

app.get("/comment", (req, res) => {
  res.json(comment);
})

app.post("/favs", (req, res) => {
  console.log("in der fav-methode!");
  console.log(req.body);
  for(let i = 0; i < comment.length; i++){
    if (req.body[i] == "on") {
      console.log(i);
      var user = session.userid;
      for(let j = 0; j < userarray.length; j++){
        if(userarray[j].name == user){
          var isIn = false;
          for(let k = 0; k < userarray[j].favs.length; k++){
            if (userarray[j].favs[k] == i){
              isIn = true;
            }
          }
          if (!isIn){
            userarray[j].addFavs(i);
          }
          console.log(userarray[j]);
        };
      };
    }
  }
  //console.log(res.json(req.body));
  res.redirect('back');
})

app.get("/favs", (req, res) => {
  var x = req.session.userid;
  var y;
  for(let i = 0; i < userarray.length; i++){
    if(userarray[i].name == x){
      y = userarray[i].favs;
    };
  };
  res.send(y);
});

const userarray = [];
//const ArrayList<Nutzer> user = new ArrayList<Nutzer>();


class Nutzer {
  constructor(name, passw) {
    this.name = name;
    this.passw = passw;
    this.favs = [];
    this.comments = [];
  }
  addFavs(kommentarId){
    this.favs.push(kommentarId);
  }
  addComments(kommentarId){
    this.comments.push(kommentarId);
  }
}

var vorhanden = false;
var fehlermeldung = "";
var redirection = "back";

app.post("/login", (req, res) => {
  const user = new Nutzer(req.body.username, req.body.password);
  if (req.body.newUser) {
    if(userarray.length == 0){
      //console.log("länge = 0");
      userarray.push(user);
      redirection = "./loggedin.html";
      //redirection = "./cookietest?username=" + user.name;
      //console.log(redirection);
    }
    else {
      for(let i = 0; i < userarray.length; i++){
        if(user.name == userarray[i].name){
          //console.log("fehler!");
          fehlermeldung = "Name schon vergeben!";
          vorhanden = true;
          redirection = "back";
        }
      }
      if(!vorhanden){
        //console.log("nicht vorhanden!");
        userarray.push(user);
        redirection = "./loggedin.html";
      }
      else {
        //console.log("vorhanden");
      }
      //console.log(userarray);
    }
  }
  else {
    if(userarray.length == 0){
      console.log("länge = 0");
      fehlermeldung = "User nicht vorhanden!"
      redirection = "./loggedin.html";
    }
    for(let i = 0; i < userarray.length; i++){
      if(user.name == userarray[i].name){
        //console.log("gefunden!");
        if (user.passw == userarray[i].passw){
            redirection = "./loggedin.html";
        }
        else {
          fehlermeldung = "Passwort falsch!";
          redirection = "back";
        }
      }
  }
}
  console.log(req.body.username);
  if (redirection == "./loggedin.html") {
    res.cookie("username", user.name);
    session=req.session;
    session.userid=user.name;
    console.log(req.session);
    //console.log("cookies: " + req.cookies.username);
  }
  res.redirect(redirection),
  res.send;
});


app.get("/loginfehlgeschlagen", (req, res) => {
  console.log(fehlermeldung);
  res.send(fehlermeldung);
});


app.get("/cookies", (req, res) => {
  //console.log("Username: " + req.cookies.username);
  //var x = req.cookies.username;
  var x = req.session.userid;
  res.send(x);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
