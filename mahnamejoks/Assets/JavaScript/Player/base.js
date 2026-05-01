
//Default Weapon
const slingshot = {
    name: 'Slingshot',
    description: 'A slingshot that can be used to launch projectiles.',
    imageLink: null,
    baseDamage: 5,
    baseAttackSpeed: 1000, //  1/attackSpeed = cooldown time in milliseconds 1500 is 1.5 seconds
    baseBurstChance: 0, // every extra is a 1% chance to fire an extra projectile 50 is a 50% chance to fire an extra projectile and 150 is a 50% chance to fire 3 and guaranteed 2 and so on.
    baseProjectileSpeed: 10 // 10 pixels per tick
}
//Archetypes
const laser =  {
    name: 'Laser',
    description: 'Laser balls!',
    imageLink: null,
    baseDamage: 20,
    baseAttackSpeed: 200,
    baseBurstChance: 0,
    baseProjectileSpeed: 100 // 100 pixels per tick
}
const bigSlingshot = {
    name: 'Big Slingshot',
    description: 'A big slingshot that can be used to launch bigger projectiles.',
    imageLink: null,
    baseDamage: 100,
    baseAttackSpeed: 4000,
    baseBurstChance: 0,
    baseProjectileSpeed: 15 // 15 pixels per tick
}
const tripleSlingshot = {
    name: 'Triple Slingshot',
    description: 'A slingshot that can be used to launch three projectiles at once.',
    imageLink: null,
    baseDamage: 5,
    baseAttackSpeed: 1500,
    baseBurstChance: 200, // Fires two extra projectiles 100% of the time
    baseProjectileSpeed: 10 // 10 pixels per tick
}
export { slingshot, tripleSlingshot, laser, bigSlingshot,};