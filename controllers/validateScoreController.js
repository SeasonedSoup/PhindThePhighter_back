const {prisma} = require('../lib/prisma');
require('dotenv').config();

afterAll(async () => {
  await prisma.$disconnect();
});

//final verif
async function verifyWinningCondition(req, res, next) {
    console.log("VERIFYING");
    const gameData = req.gameData
    try {
        const requiredLength = await prisma.phighterLocations.count({
        where: {
            mapId: Number(gameData.mapId)
        }
        });

        if (requiredLength !== gameData.phighters.length) return res.status(400).send('Total Phighters in map does not match with how many phighters you have found') 
    
        if ((Date.now() - gameData.timeStarted) - gameData.pauseTime < 0) return res.status(400).send('Negative number time does not match'); 

        next();
    } catch (err) {
        return res.status(400).send('Error finding count of phighters');
    }
} 

module.exports = {
    verifyWinningCondition
}