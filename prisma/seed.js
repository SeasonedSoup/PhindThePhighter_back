const {prisma} = require('../lib/prisma')

async function main() {
    const map = await prisma.map.createMany({
        data: [
            {title: 'BoggioSkatePark'} ,
            {title: 'RobloxMuseum'},
            {title: 'CraterdustCapital'}
        ],
        skipDuplicates: true
    })
    const phighter = await prisma.phighterLocations.createMany({
        data: [
            {name: 'Coil', coordX: 0.753, coordY: 0.726, mapId: 1 },
            {name: 'Medkit', coordX: 0.591, coordY: 0.127, mapId: 1 },
            {name: 'Sword', coordX: 0.131, coordY: 0.682, mapId: 1 },
            {name: 'Katana', coordX: 0.909, coordY: 0.824, mapId: 2 },
            {name: 'Biograft', coordX: 0.075, coordY: 0.249, mapId: 2 },
            {name: 'Shuriken', coordX: 0.022, coordY: 0.956, mapId: 2 },
            {name: 'Vinestaff', coordX: 0.515, coordY: 0.295, mapId: 2 },
            {name: 'Skateboard', coordX: 0.680, coordY: 0.284, mapId: 3 },
            {name: 'Banhammer', coordX: 0.718, coordY: 0.561, mapId: 3 },
            {name: 'Subspace', coordX: 0.980, coordY: 0.965, mapId: 3 },
            {name: 'Valk', coordX: 0.870, coordY: 0.732, mapId: 3 },
            {name: 'Rocket', coordX: 0.046, coordY: 0.043, mapId: 3 },
        ],
        skipDuplicates: true
    })
    console.log("Seed tested successfully", phighter, map);
}


main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });