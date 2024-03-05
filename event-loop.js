const fs = require("fs");
const crypto = require("crypto");
const { env } = require("node:process");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 5;
setTimeout(() => console.log("Set Timeout 1 finished"), 0);
setImmediate(() => console.log("Set Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("File has been read");
  setTimeout(() => console.log("Set Timeout 3 finished"), 3000);
  setTimeout(() => console.log("Set Timeout 2 finished"), 0);
  setImmediate(() => console.log("Set Immediate 2 finished"));

  process.nextTick(() => console.log("nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " Password encrypted1");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " Password encrypted2");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " Password encrypted3");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " Password encrypted4");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " Password encrypted4");
  });
});

console.log("Top level code");

//Top level
//st
//fs
//si
