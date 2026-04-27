const jwt = require("jsonwebtoken");
require("dotenv").config();

async function giveUserToken(req, res) {
    const mapId = req.body.mapId

    jwt.sign({timeStarted: Date.now(), phighters: [], pauseTime: 0, mapId: mapId},
        process.env.JWT_SECRET,
        {expiresIn: '10m'}, (err, token) => {
            if (err) {
                return res.status(401).json({error: "Error in processing the token has occured"})
            }
            return res.status(200).json({token});
        }
    )
}

async function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({error: 'Forbidden needs a Bearer Header'});
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.gameData = decoded
        next();
    } catch (err) {
        res.status(403).json({message: "Invalid or Expired Token"});
    }
}

module.exports = {giveUserToken, verifyToken}