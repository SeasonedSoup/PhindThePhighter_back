const {prisma} = require('../lib/prisma')

async function main() {
    const map = await prisma.map.create({
        data: {
            title: 'BoggioSKatePark'
        }
    })
    const phighter = await prisma.phighterLocations.create({
        data: {
            name: 'Coil',
            coordX: 0.753,
            coordY: 0.726,
            mapId: 1
        }
    })

    console.log(map);
    console.log(phighter);
    console.log("Seed tested successfully");
}


main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });