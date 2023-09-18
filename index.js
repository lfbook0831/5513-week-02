const http = require("http");
const fs = require("fs").promises;

const HTML_FILE = __dirname + "/page.html";
const JSON_FILE = __dirname + "/data.json";

  const requestListener = function (req, res) {
  console.log(`Incoming request: ${req.url}`);

     if (req.url === "/") {
    fs.readFile(HTML_FILE)
      .then((contents) => {
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.writeHead(200);
        res.end(contents);
      })
      .catch((error) => {
        res.writeHead(500);
        res.end("Internal Server Error");
      });

    } else if (req.url === "/data.json") { 

       fs.readFile(JSON_FILE)
      .then((contents) => {
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        res.writeHead(200);
        res.end(contents);
      })
      .catch((error) => {
        res.writeHead(500);
        res.end("Internal Server Error");
      });

  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

const server = http.createServer(requestListener);

const host = "0.0.0.0";
const port = "8080";

server.listen(port, host, () => {
  console.log("Server is running!");
});