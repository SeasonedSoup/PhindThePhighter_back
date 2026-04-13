const { prisma } = require('../lib/prisma');

const validateCoordinate = async (req, res) => {
    const coordinates = req.body.coordinates;
    const character = req.body.character;
    try {
        const answer = await prisma.phighterLocations.findUnique({
        where: {
            name: character
        },
        select: {
            coordX: true,
            coordY: true,
            name: true
        }
        })

        const tolerance = 0.050
        if (Math.abs(coordinates.x - answer.coordX) <= tolerance 
        && Math.abs(coordinates.y - answer.coordY) <= tolerance) {
            return res.status(200).json({message: `You found ${answer.name}`})
            } else {
                return res.status(200).json({message: `Wrong coordinates`})
            }
    } catch (err) {
        console.error(err)
    }

}

module.exports = {
    validateCoordinate
}

//X:1098, Y:826 coil loc
//add buffer / leeway