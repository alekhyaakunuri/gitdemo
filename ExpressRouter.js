//Web application providing web services.
var s = require("http");
var fsref = require("fs");
var exp = require("express");
var router = exp.Router(); //Creates a router object by calling it's constructor.
var reqcount = 0;
function Track(request, response) {
  var today = new Date();
  console.log("received request on " + today);
  reqcount++;
  console.log("# of requests received " + reqcount);
  var str =
    "<html><body> * of requests received " + reqcount + "</body></html>";
  response.end(str);
}

var uname = "sanjay";
var pwd = "tmp001";
function Login(request, response) {
  // Track(request, response);  ok
  reqcount++;
  console.log("In Login...");
  fsref.readFile("Login.html", function (err, data) {
    //response.writeHead(200, {'Content-Type' : 'text/html'});
    if (err) {
      console.error("Unable to open the file...");
    } else {
      var filedata = data.toString();
      response.send(filedata);
    }
  });
}

function Authenticate(request, response) {
  //Track(request, response);
  reqcount++;
  console.log("In Authenticate...");
  body = "";
  request.on("data", (chunk) => {
    body += chunk.toString();
  }); //chunk will be in json format.
  request.on("end", () => {
    console.log("Data : " + body);
    var pairs = body.split("&");
    var u = pairs[0].split("=");
    var p = pairs[1].split("=");

    if (uname == u[1] && pwd == p[1]) {
      var resstr = "<html><body><b>Welcome Mr./Ms.  " + uname + "</B>"; //Dynamic HTML
      resstr += "<BR><B>Today = " + new Date() + "</b></body></html>"; //Dynamic HTML
      today = new Date();
      var logdata = uname + " logged in on " + today;
      fsref.appendFile("Login.log", logdata, function (err) {
        if (err) console.error("Unable to write logs");
        else console.log("userinfo logged successfully...");
      });
    } else {
      var resstr = "<html><body><b>Invalid username/password</b><br>"; //Static HTML
      resstr += "<b><a href='http://localhost:8081/'>Login again</a></b>"; //Static HTML
      resstr += "</body></html>";
    }
    response.send(resstr);

    //response.send('OK');
  });
}

router.get("/", Login);
router.post("/Authenticate/", Authenticate);
router.get("/Track", Track);

module.exports = router;

