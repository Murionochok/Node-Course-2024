const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("click", (x, y) => {
  console.log(`You have clicked at (${x};${y})`);
});

myEmitter.emit("click", 34, 158);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log(req.url);
  console.log("Another request received");
});

server.on("close", (req, res) => {
  console.log("Closed");
});

server.listen(8000, "127.0.0.1", () => console.log("Start server."));
