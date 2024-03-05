const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (!err) {
  //       res.end(data);
  //     } else {
  //       console.log(err);
  //     }
  //   });
  // Solution 2
  //   const readStream = fs.createReadStream("test-filel.txt");
  //   readStream.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readStream.on("end", () => {
  //     res.end();
  //   });
  //   readStream.on("error", (error) => {
  //     res.statusCode = 500;
  //     console.log(error);
  //     res.end("File not found");
  //   });
  //Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started.");
});
