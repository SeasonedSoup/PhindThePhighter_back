const { prisma } = require('../lib/prisma');
const jwt = require('jsonwebtoken');

const validateCoordinate = async (req, res) => {
    const coordinates = req.body.coordinates;
    const character = req.body.character;
    const gameData = req.gameData

    try {
        const answer = await prisma.phighterLocations.findFirst({
        where: {
            name: character,
            mapId: gameData.mapId
        },
        select: {
            coordX: true,
            coordY: true,
            name: true
        }
        })

        if (!answer) {
            return res.status(404).json({message: `${character} does not exist`, status: 'Not Found'});
        }

        const tolerance = 0.075;
        const diffX = Math.abs(coordinates.x - answer.coordX)
        const diffY = Math.abs(coordinates.y - answer.coordY)
        const found = diffX <= tolerance && diffY <= tolerance
        const newChar = !gameData.phighters.includes(character)
        if (found && newChar) {   
              gameData.phighters.push(character);
        }
                

        const newToken = jwt.sign({timeStarted: gameData.timeStarted, phighters: gameData.phighters, mapId: gameData.mapId, score: null},
                process.env.JWT_SECRET,
                {expiresIn: '10m'}
                );

        return res.status(200).json(
            {
                message: found ? `You found ${answer.name}` : `Wrong coordinates ${answer.name} not found`, 
                status: found ? 'Found' : 'Not Found', 
                token: newToken
            }
        )

        
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = {
    validateCoordinate
}

//X:1098, Y:826 coil loc
//add buffer / leeway