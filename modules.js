// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./test-module");
const myCalculator = new C();
console.log(myCalculator.add(2, 4));

// const calc2 = require("./test-module-2");
const { add } = require("./test-module-2");
console.log(add(2, 6));

require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
