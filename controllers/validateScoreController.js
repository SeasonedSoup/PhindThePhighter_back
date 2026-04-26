const jwt = require('jsonwebtoken');
const {prisma} = require('../lib/prisma');
require('dotenv').config();

//final verif
async function verifyWinningCondition(req, res) {
    const gameData = req.gameData
    const requiredLength = await prisma.phighterLocations.count({
        where: {
            title: gameData.map
        }
    });

    if (requiredLength !== gameData.phighters.length) return res.status(400).send('Total Phighters in map does not match with how many phighters you have found') 
    
    if ((Date.now() - gameData.timeStarted) - gameData.pauseTime < 0) return res.status(400).send('Negative number time does not match'); 

    next();
} 

module.exports = {
    verifyWinningCondition
}