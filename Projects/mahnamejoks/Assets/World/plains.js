
export const plains = {
    name: 'Plains',
    description: 'A vast expanse of grassland with rolling hills and scattered trees. The plains are home to a variety of---zombies???',
    imageLink: "./Assets/Art/plains.png",
    enemies: [// Enemy count
    { // 0
        name: 'Zombie',
        description: 'A slow-moving undead creature that craves brains.',
        imageLink: "./Assets/Art/normal-zombie1.png",
        health: 50,
        damage: 10,
        speed: 1, // 1 pixel per tick
        attackSpeed: 1000, // cooldown time; 1 attack per second
        id: 0
    },
    { // 1
        name: 'Fast Zombie',
        description: 'A fast-moving undead creature that craves brains.',
        imageLink: "./Assets/Art/speedy-zombie1.png",
        health: 30,
        damage: 5,
        speed: 1.5, // 1.5 pixels per tick
        attackSpeed: 1500, // 2 attacks per 3 seconds
        id: 1
    },
    { // 2
        name: 'Tank Zombie',
        description: 'A slow-moving undead creature that is very tough.',
        imageLink: "./Assets/Art/tank-zombie1.png",
        health: 100,
        damage: 20,
        speed: 0.75, // 0.75 pixels per tick
        attackSpeed: 4000, // 1 attack every 4 seconds
        id: 2
    },
    { // 3
        name: 'Skeleton',
        description: 'A very strong creature that is really good all round.',
        imageLink: "./Assets/Art/skeleton.png",
        health: 200,
        damage: 50,
        speed: 1.25, // 1.25 pixels per tick
        attackSpeed: 1000, // 1 attack per second
        id: 3
    },
    { // 4
        name: 'Mage', //nerf it later but yeah i gotta make this strong
        description: 'A powerful spellcaster that can shoot devastating magic attacks.',
        imageLink: "./Assets/Art/mage-warlock.png",
        health: 750,
        damage: 25,
        speed: 1, // 1 pixel per tick
        attackSpeed: 250, // 4 attacks per second
        id: 4
    }],
    // Wave Layouts
    waves: [
        { waveNumber: 1, enemies: [ { id: 0, count: 1 }, ] },
        { waveNumber: 2, enemies: [ { id: 0, count: 2 }, ] },
        { waveNumber: 3, enemies: [ { id: 0, count: 2 }, { id: 1, count: 1 } ] },
        { waveNumber: 4, enemies: [ { id: 0, count: 3 }, { id: 1, count: 2 } ] },
        { waveNumber: 5, enemies: [ { id: 0, count: 4 }, { id: 1, count: 3 } ] },
        { waveNumber: 6, enemies: [ { id: 0, count: 5 }, { id: 1, count: 3 } ] },
        { waveNumber: 7, enemies: [ { id: 0, count: 4 }, { id: 1, count: 4 }, { id: 2, count: 1 } ] },
        { waveNumber: 8, enemies: [ { id: 0, count: 4 }, { id: 1, count: 4 }, { id: 2, count: 2 } ] },
        { waveNumber: 9, enemies: [ { id: 0, count: 3 }, { id: 1, count: 4 }, { id: 2, count: 3 } ] },
        { waveNumber: 10, enemies: [ { id: 0, count: 3 }, { id: 1, count: 3 }, { id: 2, count: 4 }, { id: 3, count: 1 } ] },
        { waveNumber: 11, enemies: [ { id: 0, count: 3 }, { id: 1, count: 3 }, { id: 2, count: 4 }, { id: 3, count: 2 } ] },
        { waveNumber: 12, enemies: [ { id: 0, count: 2 }, { id: 1, count: 4 }, { id: 2, count: 4 }, { id: 3, count: 3 } ] },
        { waveNumber: 13, enemies: [ { id: 0, count: 2 }, { id: 1, count: 3 }, { id: 2, count: 4 }, { id: 3, count: 4 } ] },
        { waveNumber: 14, enemies: [ { id: 0, count: 1 }, { id: 1, count: 4 }, { id: 2, count: 4 }, { id: 3, count: 4 }, { id: 4, count: 1 } ] },
        { waveNumber: 15, enemies: [ { id: 0, count: 2 }, { id: 1, count: 4 }, { id: 2, count: 4 }, { id: 3, count: 5 }, { id: 4, count: 1 } ] },
        { waveNumber: 16, enemies: [ { id: 0, count: 2 }, { id: 1, count: 4 }, { id: 2, count: 5 }, { id: 3, count: 5 }, { id: 4, count: 2 } ] },
        { waveNumber: 17, enemies: [ { id: 0, count: 2 }, { id: 1, count: 3 }, { id: 2, count: 5 }, { id: 3, count: 6 }, { id: 4, count: 2 } ] },
        { waveNumber: 18, enemies: [ { id: 0, count: 3 }, { id: 1, count: 3 }, { id: 2, count: 4 }, { id: 3, count: 6 }, { id: 4, count: 3 } ] },
        { waveNumber: 19, enemies: [ { id: 0, count: 3 }, { id: 1, count: 3 }, { id: 2, count: 4 }, { id: 3, count: 5 }, { id: 4, count: 4 } ] },
        { waveNumber: 20, enemies: [ { id: 0, count: 3 }, { id: 1, count: 2 }, { id: 2, count: 4 }, { id: 3, count: 5 }, { id: 4, count: 5 } ] },
        { waveNumber: 21, enemies: [ { id: 0, count: 4 }, { id: 1, count: 3 }, { id: 2, count: 4 }, { id: 3, count: 5 }, { id: 4, count: 6 } ] },
        { waveNumber: 22, enemies: [ { id: 0, count: 4 }, { id: 1, count: 3 }, { id: 2, count: 5 }, { id: 3, count: 6 }, { id: 4, count: 7 } ] },
        { waveNumber: 23, enemies: [ { id: 0, count: 5 }, { id: 1, count: 3 }, { id: 2, count: 5 }, { id: 3, count: 7 }, { id: 4, count: 7 } ] },
        { waveNumber: 24, enemies: [ { id: 0, count: 5 }, { id: 1, count: 4 }, { id: 2, count: 5 }, { id: 3, count: 7 }, { id: 4, count: 8 } ] },
        { waveNumber: 25, enemies: [ { id: 0, count: 6 }, { id: 1, count: 5 }, { id: 2, count: 6 }, { id: 3, count: 8 }, { id: 4, count: 10 } ] },
        { waveNumber: 26, enemies: [ { id: 0, count: 3 }, { id: 5, count: 1 }] }

    ] /* Angus add more waves here:
    ID list:
            0 - Zombie
            1 - Fast Zombie
            2 - Tank Zombie
            3 - Skeleton
            4 - Mage
            5 - Zombie Boss
            */
};
