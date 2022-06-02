const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path")
let temp;
const sign = (payload) => {
  const privateKey = fs.readFileSync(path.join(__dirname, "keys", "rsa_private_key.pem"))
  let token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
  temp = payload
  return token
}
const verify = (token) => {
  const publicKey = fs.readFileSync(path.join(__dirname, "keys", "rsa_public_key.pem"))
  const res = jwt.verify(token, publicKey);
  return {
    result: res,
    isValid: res === temp
  }
}

module.exports = {
  sign,
  verify
}