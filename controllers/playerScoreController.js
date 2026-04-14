const { prisma } = require("../lib/prisma");

async function createPlayerScore(req, res) {
    const name = req.body.name
    const score = req.body.score

    if (name.length > 16 || name.length < 1) {
        return res.status(400).json({message: "Invalid name created. try again"});
    }

    try {
        await prisma.playerScore.create({
            data: {
                name: name,
                timeTakenMs: score,
                mapId: 1 //tbc
            }
        })

        return res.status(201).json({message: "Name created successfully"});
    } catch (err) {
        console.error("Error", err)
        return res.status(400).json({error: "Error creating score"});
    }
    
}

module.exports = {
    createPlayerScore
}