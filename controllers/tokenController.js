const jwt = require("jsonwebtoken");
require("dotenv").config();

async function giveUserToken(req, res) {
    jwt.sign({timeStarted: Date.now(), phighters: [], pauseTime: 0},
        process.env.JWT_SECRET,
        {expiresIn: '10m'}, (err, token) => {
            if (err) {
                return res.status(401).json({error: "Error in processing the token has occured"})
            }
            return res.json({token});
        }
    )

}

async function verifyToken(req, res) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader === null) {
        return res.status(403).json({error: 'Forbidden needs a Bearer Header'});
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("DECODED SUCCESS:", decoded); 

        req.gameData = decoded
        next();
    } catch (err) {
        res.status(403).json({message: "Invalid or Expired Token"});
    }
}

module.exports = {giveUserToken, verifyToken}