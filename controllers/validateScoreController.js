const {prisma} = require('../lib/prisma');
const jwt = require('jsonwebtoken')
require('dotenv').config();

//final verif
async function verifyWinningCondition(req, res) {
    const gameData = req.gameData
    try {
        const requiredLength = await prisma.phighterLocations.count({
        where: {
            mapId: Number(gameData.mapId)
        }
        });

        if (requiredLength !== gameData.phighters.length) return res.status(400).send('Total Phighters in map does not match with how many phighters you have found') 
    
        const serverScore = Date.now() - gameData.timeStarted - 3000 //countdownms
        
        const newToken = jwt.sign({timeStarted: gameData.timeStarted, phighters: gameData.phighters, mapId: gameData.mapId, score: serverScore},
                                process.env.JWT_SECRET,
                                {expiresIn: '10m'}
                        );
        
        return res.json({token: newToken, score: serverScore});
    } catch (err) {
        return res.status(400).send('Error finding count of phighters');
    }
} 

module.exports = {
    verifyWinningCondition
}