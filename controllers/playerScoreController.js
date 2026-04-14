const { prisma } = require("../lib/prisma");

async function createPlayerScore(req, res) {
    const name = req.body.name
    const score = req.body.score

    if (name.length > 16) {
        return res.status(400).json({message: "Name is too long try again"});
    }

    try {
        const result = await prisma.playerScore.create({
            data: {
                name: name,
                timeTakenMs: score,
                mapId: 1 //tbc
            }
        })
        if (!result) {
            return res.status(400).json({message: "Error creating score"});
        }

        return res.status(201).json({message: "Name created successfully"});
    } catch (err) {
        console.error("Error", err)
    }
    
}

module.exports = {
    createPlayerScore
}