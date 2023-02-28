const crypto = require("crypto");// importing crypto module
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");// takinf sha256 algo
  hash.update(inputs.sort().join("")); //helloworld ,worldhello concatenating and sorting he inputs
  return hash.digest("hex");// generating input in hash form
};

//result = cryptoHash("world", "hello");
module.exports = cryptoHash;
//console.log(result);