const {prisma} = require('../lib/prisma')

async function main() {
    const map = await prisma.map.create({
        data: {
            title: 'BoggioSKatePark'
        }
    })
    const phighter = await prisma.phighterLocations.createMany({
        data: [
            {name: 'Coil', coordX: 0.753, coordY: 0.726, mapId: 1 },
            {name: 'Medkit', coordX: 0.591, coordY: 0.127, mapId: 1 },
            {name: 'Sword', coordX: 0.131, coordY: 0.682, mapId: 1 }
        ],
        skipDuplicates: true
    })
    console.log("Seed tested successfully");
}


main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });