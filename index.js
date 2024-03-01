const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
//////////////////////////////////////
// FILES

// Blocking, synchronous way
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOutput = `This is what we know about the avocado" ${textInput}\nCreated on: ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOutput);
// console.log("File written!");

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(`Error: ${err}`);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     if (err) return console.log(`Error: ${err}`);
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       if (err) return console.log(`Error: ${err}`);
//       console.log(data3);
//       fs.writeFile(
//         "./txt/result.txt",
//         `${data2} \n${data3}`,
//         "utf-8",
//         (err) => {
//           if (err) return console.log(`Error: ${err}`);
//           console.log("File has been written!");
//         }
//       );
//     });
//   });
// });
// console.log("Reading data...");

//////////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const slugs = productData.map((element) =>
  slugify(element.productName, { lower: true })
);
console.log(slugs);
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(url.parse(req.url, true));
  //OVERVIEW page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = productData
      .map((element) => replaceTemplate(cardTemplate, element))
      .join("");
    const output = overviewTemplate.replace(/{%PRODUCT_CARDS%/g, cardsHTML);
    res.end(output);
  }
  //PRODUCT page
  else if (pathname === "/product") {
    const product = productData.find((item) => query.id == item.id);
    console.log(product);
    const output = replaceTemplate(productTemplate, product);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(output);
  }
  //API page
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  //NOT FOUND page
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "Secret-header": "Buy me a coffee",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Listening for the request!");
});
