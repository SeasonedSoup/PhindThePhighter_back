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

        if ( diffX.toFixed(3) <= tolerance && diffY.toFixed(3) <= tolerance) {   
                if (!gameData.phighters.includes(character)) {
                    gameData.phighters.push(character);
                }
                

                const newToken = jwt.sign({timeStarted: gameData.timeStarted, phighters: gameData.phighters, mapId: gameData.mapId, score: null},
                        process.env.JWT_SECRET,
                        {expiresIn: '10m'}
                );

                return res.status(200).json({message: `You found ${answer.name}`, status: 'Found', token: newToken})
            } else {
                return res.status(200).json({message: `Wrong coordinates ${answer.name} not found`, status: 'Not Found'})
            }
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