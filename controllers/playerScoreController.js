const { prisma } = require("../lib/prisma");

async function createPlayerScore(req, res) {
    const name = req.body.name
    const score = req.body.score

    if (name.length > 16 || name.length < 1) {
        return res.status(400).json({message: "Invalid name submitted. try again"});
    }

    if (score < 0 ) {
         return res.status(400).json({message: "Invalid score submitted. try again"});
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

async function getTopTenMap(req, res) {
    try {
        const result = await prisma.playerScore.findMany({
            where: {
                mapId: req.mapId
            },
            take: 10,
            orderBy: {timeTakenMs : 'asc'}
        })
    } catch (err) {
        return err
    }
}

module.exports = {
    createPlayerScore
}