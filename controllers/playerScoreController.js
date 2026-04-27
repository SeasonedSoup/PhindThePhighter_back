const { prisma } = require("../lib/prisma");

async function createPlayerScore(req, res) {
    const name = req.body.name
    const score = req.gameData.score
    const mapId = req.gameData.mapId

    if (name.length > 16 || name.length < 1) {
        return res.status(400).json({message: "Invalid name submitted. try again"});
    }

    if (score < 0 ) {
         return res.status(400).json({message: "Invalid score submitted. try again"});
    }
    try {
        await prisma.playerScore.create({
            data: {
                name: name.trim(),
                timeTakenMs: score,
                mapId: Number(mapId)
            }
        })

        return res.status(201).json({message: "Name created successfully", score: score});
    } catch (err) {
        console.error("Error", err)
        return res.status(400).json({error: "Error creating score"});
    }
}

async function getTopTenMap(req, res) {
    try {
        const result = await prisma.playerScore.findMany({
            where: {
                mapId: Number(req.params.mapId)
            },
            take: 10,
            orderBy: {timeTakenMs : 'asc'}
        })

        return res.status(200).json(result);
    } catch (err) {
        return res.status(404).json({error: "Error fetching score or mapId does not exist"});
    }
}

async function getTopHundredLb(req, res) {

    console.log("fetching")
    try {
        const result = await prisma .playerScore.findMany({
            where: {
                mapId: Number(req.params.mapId)
            }, 
            take: 100, 
            orderBy: {timeTakenMs: 'asc'}
        })

        return res.status(200).json(result);
    } catch (err) {
        console.log(err)
        return res.status(404).json({error: "Error fetching score or mapId does not exist"});
    }
}

module.exports = {
    createPlayerScore,
    getTopTenMap,
    getTopHundredLb
}