const enemies = {
    zombie: {
        id: 'zombie',
        name: 'Zombie',
        health: 100,
        attack: 10,
        imageLink: './assets/zombie.png',
        speed: 1
    },
    fastZombie: {
        id: 'fastZombie',
        name: 'Fast Zombie',
        health: 50,
        attack: 5,
        imageLink: './assets/fast_zombie.png',
        speed: 1.5
    },
    tankZombie: {
        id: 'tankZombie',
        name: 'Tank Zombie',
        health: 200,
        attack: 15,
        imageLink: './assets/tank_zombie.png',
        speed: 0.75
    },
    skeleton: {
        id: 'skeleton',
        name: 'Skeleton',
        health: 150,
        attack: 35,
        imageLink: './assets/skeleton.png',
        speed: 1.25
    },
    mage: {
        id: 'mage',
        name: 'Mage',
        health: 80,
        attack: 20,
        viewRange: 200,
        attackSpeed: 1.5,
        imageLink: './assets/mage.png',
        speed: 1
    }
}
export { enemies };