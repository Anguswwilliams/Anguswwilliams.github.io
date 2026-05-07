import { slingshot, tripleSlingshot, laser, bigSlingshot} from "../Player/base.js";
import { enemies } from "../Enemies/base.js";
import { createEnemies, drawEnemies, drawHitboxes, enemyAttack, updateEnemies, removeDeadEnemies, clearEnemies, damageEnemy } from "../Enemies/aiEnemies.js";
import { addScore, updScore, score, resetScore } from "./score.js";
import { mapDescription, drawMap } from "./maps.js";
import { plains } from "./plains.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundImage = new Image();
backgroundImage.src = '/Assets/Art/plains.png';

let wave = 0;
let level = 1; //idk if we are using wave or level
let waveActive = false;




let enemyList = [];
let gameState;
let game = false;
let lastAttackTime = 0;
export { level };
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
        health: basePlayerStats.maxHealth,
        cooldown: 0,
        killwallActive: false
};

let ct = 0;
killwall = [];
let killwallFrameCount = 0;
let activationCount = 0;
//colours = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",  "#00FFFF", "#FF0080", "#8000FF", "#FF8000",  "#0080FF",  "#FF0080", "#0080FF", "#FF8080",];
export { player };
function createPlayer(X, Y) {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(X, Y, 24, 0, Math.PI * 2);
    ctx.fill();
}

function addWave() {
    const waveElement = document.getElementById('waveNumber');
    if (waveElement) {
        waveElement.innerText = "Wave: " + wave;
    }
}

function killWall(score) {
    let viewportWidth = window.innerWidth;
    
    // Activate killwall on multiples of 3000 (max 3 per wave cycle)
    for (let i = 0; i < 100; i++) {
        const threshold = 3000 * (i + 1);
        if (activationCount < 3 && score >= threshold && !killwall.includes(threshold)) {
            activationCount++;
            killwallFrameCount = 60;
            killwall.push(threshold);
            console.log(`Killwall activated for ${threshold} points! (uses left: ${3 - activationCount})`);
            break; // Only activate one at a time
        }
    }
    
    // Progress bar
    const killwallElement = document.getElementById('killwall');
    if (killwallElement) {
        killwallElement.style.width = (score % 3000) * (viewportWidth / 3000) + 'px';
    }
    
    // Run killwall effect for 60 frames (1 sec at 60fps)
    if (killwallFrameCount > 0) {
        
        killwallFrameCount--;
        if (enemies.length == 0) {
            ct += 1;

        }

        if (ct >= 3) {
            player.killwallActive = false;
            ct = 0;
        }

        // Shoot killing shots in every direction (36 rays, 10° apart)
        const numRays = 36;
        const killDamage = 9999;
        const projSpeed = 20;
        const projRadius = 3;
        for (let a = 0; a < numRays; a++) {
            const angle = (a / numRays) * Math.PI * 2;
            const dirX = Math.cos(angle);
            const dirY = Math.sin(angle);
            createProjectile(player.x, player.y, projRadius, '#0000FF', killDamage, dirX, dirY, projSpeed);
        }
        
        // Visual effect: Draw radial beams
        ctx.strokeStyle = '#0000FF';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.globalAlpha = killwallFrameCount / 60;
        for (let a = 0; a < numRays; a++) {
            const angle = (a / numRays) * Math.PI * 2;
            const endX = player.x + Math.cos(angle) * 100;
            const endY = player.y + Math.sin(angle) * 100;
            ctx.beginPath();
            ctx.moveTo(player.x, player.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        
        // Inner glow
        ctx.strokeStyle = '#6969fd';
        ctx.lineWidth = 4;
        for (let a = 0; a < numRays; a++) {
            const angle = (a / numRays) * Math.PI * 2;
            const endX = player.x + Math.cos(angle) * 50;
            const endY = player.y + Math.sin(angle) * 50;
            ctx.beginPath();
            ctx.moveTo(player.x, player.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }
}


function updHealth(health, maxHealth) {
   const healthElement = document.getElementById("healthCanvas");
   const healthCtx = healthElement.getContext("2d");
   healthCtx.clearRect(0, 0, 200, 30);
   healthCtx.fillStyle = 'green';
   healthCtx.fillRect(0, 0, health * (200 / maxHealth), 30);
   if (health <= 0) {
       //death screen and text over healthbar
       healthCtx.fillStyle = 'black';
       healthCtx.font = '20px Arial';
       healthCtx.fillText('You are dead', 50, 20);

    document.getElementById("deathScreen").style.opacity = "1";
    //stop (game, movement, delete all enemies) and then restart game after 5 seconds
    game = false;
    resetScore();
    enemyList = [];

    setTimeout(() => {
        wave = 1;
        waveActive = false;
        game = true;
        player.health = player.maxHealth;
        player.x = 400;
        player.y = 400;
        player.equippedWeapon = basePlayerStats.equippedWeapon;
        player.damageBoost = basePlayerStats.damageBoost;
        player.attackSpeedBoost = basePlayerStats.attackSpeedBoost;
        player.burstChanceBoost = basePlayerStats.burstChanceBoost;
        player.projectileSpeedBoost = basePlayerStats.projectileSpeedBoost;
        player.walkSpeedBoost = basePlayerStats.walkSpeedBoost;
        player.HealthBoost = basePlayerStats.HealthBoost;
        player.speed = basePlayerStats.speed;
        activationCount = 0;
        killwall = [];
        killwallFrameCount = 0;
        document.getElementById("deathScreen").style.opacity = "0";
        initializeGame();
    }, 5000);
   }
}

let stats = ["damageBoost", "attackSpeedBoost", "burstChanceBoost", "projectileSpeedBoost", "walkSpeedBoost", "HealthBoost"];

function powerUp() {
    // Function to handle power-ups
    document.getElementById("powerUpInfo").style.top = "center";
    // random boost to a random stat
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    document.getElementById("optionOne").innerText = `Increase ${randomStat} by 10%`;
    document.getElementById("optionOne").style.backgroundColor = "lightgreen";
    const randomStat2 = stats[Math.floor(Math.random() * stats.length)];
    document.getElementById("optionTwo").innerText = `Increase ${randomStat2} by 10%`;
    document.getElementById("optionTwo").style.backgroundColor = "lightgreen";
    const randomStat3 = stats[Math.floor(Math.random() * stats.length)];
    document.getElementById("optionThree").innerText = `Increase ${randomStat3} by 10%`;
    document.getElementById("optionThree").style.backgroundColor = "lightgreen";
    document.getElementById("optionOne").addEventListener("click", () => {
        randomStat(randomStat);
    });
    document.getElementById("optionTwo").addEventListener("click", () => {
        randomStat2(randomStat2);
    });
    document.getElementById("optionThree").addEventListener("click", () => {
        randomStat3(randomStat3);
    });

}

function randomStat(randomStat) {
    player[randomStat] += 0.1;
}

function randomStat2(randomStat) {
    
    player[randomStat] += 0.1;
}

function randomStat3(randomStat) {
    
    player[randomStat] += 0.1;
}

const baseGameState = {
        player: {
            maxHealth: 100,
            equippedWeapon: bigSlingshot,
            x: 400,
            y: 400,
        },
        map: {
            currentMap: plains,
        },
        settings: { //SET THESE TO ONE PLEASE I WAS JUST HAVING FUN
            sprintMultiplier: 1, // Multiplier for sprinting speed, set to 1 because this sum random bs that should not be in the game and should only be used for leisure and testing so sprinting is not op if you didn't make this game and youre here i recommend you do not set this to a number higher than 3 because it can cause some pretty crazy speed and make the game unplayable but if you want to have fun with it go ahead just make sure you can find your character again. Example: sprintMultiplier: 2 means sprinting makes you twice as fast. (used on movement lines)
            beamofLight: 100 //divides attack cooldown and makes a massive beam of light if you want to have fun with it go ahead. Example: beamofLight: 1000 means your attack cooldown is divided by 1000 and you become a god. 1000 is probably the best if you want a light beam (used on projectile lines)
        }
    }
export function initializeGame() {
    drawMap(baseGameState.map.currentMap);
    createPlayer(player.x, player.y);
    return {
        player: {
            maxHealth: 100,
            equippedWeapon: basePlayerStats.equippedWeapon,
            x: 400,
            y: 400,
        },
        map: {
            currentMap: plains,
        }
    }
}
//movement
const keysDown = {};
function handleKeyDown(e) {
    if (!keysDown[e.key.toLowerCase()]) {keysDown[e.key.toLowerCase()] = true;}
}
function handleKeyUp(e) {
    if (keysDown[e.key.toLowerCase()]) {keysDown[e.key.toLowerCase()] = false;}
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
    canShoot = false;
    setTimeout(() => {canShoot = true;}, currentStats.attackCooldown);
}
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
    if ((game == true)) {
        const gameState = initializeGame();
        drawMap(gameState.map.currentMap);
        
        if (keysDown["enter"]) {mapDescription(gameState.map.currentMap);}
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
        
        updHealth(player.health, currentStats.maxHealth);
        killWall(score);
        

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
        if ((keysDown["arrowup"] || keysDown["arrowdown"] || keysDown["arrowleft"] || keysDown["arrowright"]) || (keysDown["i"] || keysDown["j"] || keysDown["k"] || keysDown["l"])) {
            if ((Date.now() - lastAttackTime) >= (currentStats.attackCooldown/baseGameState.settings.beamofLight)) { // Attack cooldown
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
            //add cooldown indicator underneath the player depending on the weapon
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
    
        
        if (enemyList.length === 0) {

            if (wave <= plains.waves.length) {
                if (!waveActive) {
                    enemyList = createEnemies([], plains.waves[wave - 1]);
                    waveActive = true;
                    addWave();
                }
                updateEnemies(enemyList);
                waveActive = true;

            } else {
                document.getElementById("winScreen").style.opacity = "1";
                game = false;
                enemyList = [];
                setTimeout(() => {
                    resetScore();
                    wave = 1;
                    waveActive = false;
                    game = true;
                    player.health = player.maxHealth;
                    player.x = 400;
                    player.y = 400;
                    player.equippedWeapon = basePlayerStats.equippedWeapon;
                    player.damageBoost = basePlayerStats.damageBoost;
                    player.attackSpeedBoost = basePlayerStats.attackSpeedBoost;
                    player.burstChanceBoost = basePlayerStats.burstChanceBoost;
                    player.projectileSpeedBoost = basePlayerStats.projectileSpeedBoost;
                    player.walkSpeedBoost = basePlayerStats.walkSpeedBoost;
                    player.HealthBoost = basePlayerStats.HealthBoost;
                    player.speed = basePlayerStats.speed;
                    activationCount = 0;
                    killwall = [];
                    killwallFrameCount = 0;
                    document.getElementById("deathScreen").style.opacity = "0";
                    initializeGame();
                }, 5000);
            }
        } else {
            const before = enemyList.length;
            updateEnemies(enemyList);
            if (keysDown["u"]) { drawHitboxes(enemyList); }
            const after = removeDeadEnemies(enemyList).length;
            addScore(before - after); // +1 for every enemy killed
            enemyList = removeDeadEnemies(enemyList);
            if (enemyList.length === 0) {
                addScore(100);
                wave++;
                waveActive = false;
                addWave();
            }
        }
    }
    requestAnimationFrame(main);
}
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
game = true;
main();