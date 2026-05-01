import { slingshot, tripleSlingshot, laser, bigSlingshot} from "./player/base.js";
import { enemies } from "./enemies/base.js";
import { createEnemies, drawEnemies, drawHitboxes, enemyAttack, updateEnemies, removeDeadEnemies, clearEnemies, damageEnemy } from "./aiEnemies.js";
import {addScore, updScore } from "./score.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let enemyList = [];
level = 1;
let gameState;
let game = false;
let lastAttackTime = 0;
export var level;
const basePlayerStats = {
    maxHealth: 100,
    equippedWeapon: bigSlingshot,
    x: 400,
    y: 400,
    damageBoost: 0,
    attackSpeedBoost: 0,
    burstChanceBoost: 0,
    projectileSpeedBoost: 0,
    walkSpeedBoost: 0,
    HealthBoost: 0,
    speed: 5
};
const player = {
        x: 400,
        y: 400,
        image: null,
        d: 5,
        equippedWeapon: basePlayerStats.equippedWeapon,
        maxHealth: basePlayerStats.maxHealth,
        damageBoost: basePlayerStats.damageBoost,
        attackSpeedBoost: basePlayerStats.attackSpeedBoost,
        burstChanceBoost: basePlayerStats.burstChanceBoost,
        projectileSpeedBoost: basePlayerStats.projectileSpeedBoost,
        walkSpeedBoost: basePlayerStats.walkSpeedBoost,
        HealthBoost: basePlayerStats.HealthBoost,
        speed: basePlayerStats.speed,
        health: basePlayerStats.maxHealth
};
export { player };
function createPlayer(X, Y) {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(X, Y, 24, 0, Math.PI * 2);
    ctx.fill();
}

const tutorial = {
    color1: "#000000",
    color2: "#b2b2b2",
    color3: "#5d5dd5",
}

const map1 = {
    color1: "#000000",
    color2: "#851d03",
    color3: "#ff9451",
}
function drawMap(map) {
    document.getElementById("canvas").style.backgroundImage = `url(${map})`;
}
const baseGameState = {
        player: {
            maxHealth: 100,
            equippedWeapon: slingshot,
            x: 400,
            y: 400,
        },
        map: {
            currentMap: "plains",
        },
        settings: { //SET THESE TO ONE PLEASE I WAS JUST HAVING FUN
            sprintMultiplier: 1, // Multiplier for sprinting speed, set to 1 because this sum random bs that should not be in the game and should only be used for leisure and testing so sprinting is not op if you didn't make this game and youre here i recommend you do not set this to a number higher than 3 because it can cause some pretty crazy speed and make the game unplayable but if you want to have fun with it go ahead just make sure you can find your character again. Example: sprintMultiplier: 2 means sprinting makes you twice as fast. (used on movement lines)
            beamofLight: 1 //divides attack cooldown and makes a massive beam of light if you want to have fun with it go ahead. Example: beamofLight: 1000 means your attack cooldown is divided by 1000 and you become a god. 1000 is probably the best if you want a light beam (used on projectile lines)
        }
    }
function initializeGame() {
    drawMap(baseGameState.map.currentMap);
    document.getElementById("canvas").style.backgroundImage = `url(./art/plains.png)`;
    createPlayer(player.x, player.y);
    return {
        player: {
            maxHealth: 100,
            equippedWeapon: slingshot,
            x: 400,
            y: 400,
        },
        map: {
            currentMap: "plains",
        }
    }
}
export { initializeGame };
//movement
const keysDown = {};
function handleKeyDown(e) {
    if (!keysDown[e.key.toLowerCase()]) {
        keysDown[e.key.toLowerCase()] = true;
    }
}
function handleKeyUp(e) {
    if (keysDown[e.key.toLowerCase()]) {
    keysDown[e.key.toLowerCase()] = false;
}
}
let projectiles = [];
function createProjectile(x, y, radius, color, damage, xdir, ydir, speed) {
    projectiles.push({
        radius: radius,
        color: color,
        damage: damage,
        x: x,
        y: y,
        xdir: xdir,
        ydir: ydir,
        speed: speed
    });
}
function projectileCooldown() {
    function canshootTrue() {canShoot = true;}
    canShoot = false;
    setTimeout(canshootTrue, 500);
}
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if ((game == true)) {
        const gameState = initializeGame();
        drawMap("./art/plains.png");
        if (keysDown["enter"]) {
            mapDescription();
        }
        /*if (keysDown["u"]) {
            drawHitboxes(enemyList);
        }*/
        let sprinting = keysDown["shift"]; //sprinting when shift is held down
        //player stats
        const currentStats = {
            maxHealth: player.maxHealth*(1 + player.HealthBoost),
            equippedWeapon: player.equippedWeapon,
            speed: player.speed*(1 + player.walkSpeedBoost),
            damage: player.equippedWeapon.baseDamage*(1 + player.damageBoost),
            attackCooldown: player.equippedWeapon.baseAttackSpeed/(1 + player.attackSpeedBoost),
            burstChance: player.equippedWeapon.baseBurstChance*(1 + player.burstChanceBoost),
            projectileSpeed: player.equippedWeapon.baseProjectileSpeed*(1 + player.projectileSpeedBoost),
        };
        const size = 24;
        let differenceSpeed = currentStats.speed;
        if (sprinting) {differenceSpeed *= baseGameState.settings.sprintMultiplier;} // Increase speed when sprinting
        if (keysDown["w"]) {
            if (player.y > 0+size) {player.y -= differenceSpeed;} // Move up
        }
        if (keysDown["a"]) {
            if (player.x > 0+size) {player.x -= differenceSpeed;} // Move left
        }
        if (keysDown["s"]) {
            if (player.y < canvas.height-size) {player.y += differenceSpeed;} // Move down
        }
        if (keysDown["d"]) {
            if (player.x < canvas.width-size) {player.x += differenceSpeed;} // Move right
        }
        let directionX = 0;
        let directionY = 0;
        if ((keysDown["arrowup"] || keysDown["arrowdown"] || keysDown["arrowleft"] || keysDown["arrowright"]) || (keysDown[" i"] || keysDown["j"] || keysDown["k"] || keysDown["l"])) {
            if ((Date.now() - lastAttackTime) > (currentStats.attackCooldown/baseGameState.settings.beamofLight)) { // Attack cooldown
                if (keysDown["arrowup"] || keysDown["i"]) {
                    directionY = -1;
                }
                if (keysDown["arrowdown"] || keysDown["k"]) {
                    directionY = 1;
                }
                if (keysDown["arrowleft"] || keysDown["j"]) {
                    directionX = -1;
                }
                if (keysDown["arrowright"] || keysDown["l"]) {
                    directionX = 1;
                }
            createProjectile(player.x, player.y, 5, 'red', currentStats.damage, directionX, directionY, currentStats.projectileSpeed); // both ways to shoot for accessibility
            directionX = 0;
            directionY = 0;
            lastAttackTime = Date.now();
        }

    }
        for (const p of projectiles) {
            p.x += p.xdir * p.speed;
            p.y += p.ydir * p.speed;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ///ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
            if (damageEnemy(enemyList, p.x, p.y, p.damage)) { //damages enemy and checks if it was hit
                projectiles.splice(projectiles.indexOf(p), 1); //goodbye projectile now enemies dont get two shot
            };
            ctx.fill();
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                projectiles.splice(projectiles.indexOf(p), 1);
            }
        }
        if (enemyList.length == 0) {
        enemyList = createEnemies(enemyList);
        updateEnemies(enemyList);
        } else {
        updateEnemies(enemyList);
        addScore(enemyList.length-removeDeadEnemies(enemyList).length); //+1 for every enemy killed
        enemyList = removeDeadEnemies(enemyList);
        }
    }
    requestAnimationFrame(main);
}
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
game = true;
main();