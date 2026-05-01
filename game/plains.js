
export const plains = {
    name: 'Plains',
    description: 'A vast expanse of grassland with rolling hills and scattered trees. The plains are home to a variety of---zombies???',
    imageLink: "art/plains.png",
    enemies: [// Enemy count
    { // 1
        name: 'Zombie',
        description: 'A slow-moving undead creature that craves brains.',
        imageLink: "art/normal-zombie1.png",
        health: 50,
        damage: 10,
        speed: 1, // 1 pixel per tick
        attackSpeed: 1, // 1 attack per second
        id: 1
    },
    { // 2
        name: 'Fast Zombie',
        description: 'A fast-moving undead creature that craves brains.',
        imageLink: "art/speedy-zombie1.png",
        health: 30,
        damage: 5,
        speed: 1.5, // 1.5 pixels per tick
        attackSpeed: 1.5, // 1.5 attacks per second
        id: 2
    },
    { // 3
        name: 'Tank Zombie',
        description: 'A slow-moving undead creature that is very tough.',
        imageLink: "art/tank-zombie1.png",
        health: 100,
        damage: 20,
        speed: 0.75, // 0.75 pixels per tick
        attackSpeed: 0.25, // 1 attack every 4 seconds
        id: 3
    },
    { // 4
        name: 'Skeleton',
        description: 'A very strong creature that is really good all round.',
        imageLink: "art/skeleton.png",
        health: 200,
        damage: 50,
        speed: 1.25, // 1.25 pixels per tick
        attackSpeed: 1, // 1 attack per second
        id: 4
    },
    { // 5
        name: 'Mage',
        description: 'A powerful spellcaster that can shoot devastating magic attacks.',
        imageLink: "art/mage-warlock.png",
        health: 75,
        damage: 25,
        speed: 1, // 1 pixel per tick
        attackSpeed: 1, // 1 attack per second
        id: 5
    }],
    // Wave Layouts
    waves: [
        // 1
    { 
        waveNumber: 1,
        enemies: [
            { 
                id: 1, 
                count: 1 
            },
        ]
    },
        // 2
    { 
        waveNumber: 2,
        enemies: [
            { 
                id: 1, 
                count: 1
            },
            { 
                id: 2, 
                count: 1 
            },
        ]
    },
        // 3
    { 
        waveNumber: 3,
        enemies: [
            { 
                id: 1, 
                count: 2
            },
            { 
                id: 2, 
                count: 1
            },
        ]
    },  
 ] /* Angus add more waves here:
    ID list:
            1 - Zombie
            2 - Fast Zombie
            3 - Tank Zombie
            4 - Skeleton
            5 - Mage
            */
};
