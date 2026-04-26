const jwt = require("jsonwebtoken");
require("dotenv").config();

async function giveUserToken(req, res) {
    jwt.sign({})
}

async function verifyToken(req, res) {
    
}

module.exports = {giveUserToken, verifyToken}