import { slingshot, tripleSlingshot, laser, bigSlingshot} from "../Player/base.js";
import { enemies } from "../Enemies/base.js";
import { createEnemies, drawEnemies, drawHitboxes, enemyAttack, updateEnemies, removeDeadEnemies, clearEnemies, damageEnemy } from "../Enemies/aiEnemies.js";
import { addScore, updScore, score, resetScore } from "./score.js";
import { mapDescription, drawMap } from "./maps.js";
import { plains } from "./plains.js";
import { win, lose, whateverTheHeckThisIs, } from "./music.js";
import { zombieBossId, createZombieBoss, updateBossbar } from "../Boss/bossfight.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundImage = new Image();
backgroundImage.src = './Assets/Art/plains.png';

let wave = 0;
let level = 1; //idk if we are using wave or level
let waveActive = false;
let powerUpping = false;

let BossActive = false;

let enemyList = [];
let playerDead = false;
let deathMessage;

let powerupStorage;
let gameState;
let game = false;
let lastAttackTime = 0;
export { level };
const basePlayerStats = {
    maxHealth: 100,
    equippedWeapon: slingshot,
    x: 400,
    y: 400,
    color: "black",
    damageBoost: 0,
    attackSpeedBoost: 0,
    burstChanceBoost: 0,
    projectileSpeedBoost: 0,
    walkSpeedBoost: 0,
    healthBoost: 0,
    speed: 5,
    direction: "forwards"
};
const player = {
        x: 400,
        y: 400,
        image: {
            backwards: "./Assets/Art/jacques-front.png",
            forwards: "./Assets/Art/jacques-back.png",
            left: "./Assets/Art/jacques-side2.png",
            right: "./Assets/Art/jacques-side.png"
            },
        d: 5,
        direction: basePlayerStats.direction,
        color: basePlayerStats.color,
        equippedWeapon: basePlayerStats.equippedWeapon,
        maxHealth: basePlayerStats.maxHealth,
        damageBoost: basePlayerStats.damageBoost,
        attackSpeedBoost: basePlayerStats.attackSpeedBoost,
        burstChanceBoost: basePlayerStats.burstChanceBoost,
        projectileSpeedBoost: basePlayerStats.projectileSpeedBoost,
        walkSpeedBoost: basePlayerStats.walkSpeedBoost,
        healthBoost: basePlayerStats.healthBoost,
        speed: basePlayerStats.speed,
        health: basePlayerStats.maxHealth
};



export { player };
function drawPlayerHitbox(X, Y) {
    ctx.strokeStyle = player.color;
    ctx.beginPath();
    ctx.arc(X, Y, 24, 0, Math.PI * 2);
    ctx.stroke();
}
export function createPlayer(playerObject) {
    const playerhitbox = document.getElementById("canvas").getContext("2d");
    let playerSprite;
    if (!playerSprite){
        playerSprite = new Image();
        playerSprite.onerror = () => { playerSprite.spriteError = true;};
        if (playerObject.direction == "backwards"){
            playerSprite.src = playerObject.image.backwards;
        }else if (playerObject.direction == "left"){
            playerSprite.src = playerObject.image.left;
        }else if (playerObject.direction == "right"){
            playerSprite.src = playerObject.image.right;
        }else{
            playerSprite.src = playerObject.image.forwards;
        }
    }
        const sprite = playerSprite;


        if (sprite && sprite.complete && !sprite.spriteError && sprite.naturalWidth > 0) {
            ctx.drawImage(sprite, playerObject.x-30, playerObject.y-30, 60, 60);
        } else {
            ctx.fillStyle = playerObject.color;
            ctx.beginPath();
            ctx.arc(playerObject.x, playerObject.y, 24, 0, Math.PI * 2);
            ctx.fill();
        }

}

function addWave() {
    const waveElement = document.getElementById('waveNumber');
    if (waveElement) {
        waveElement.innerText = "Wave: " + wave;
    }
}

/*function addCooldownIndicator(x, y, width, height, cooldown) {
    //make z index highest
    ctx.globalCompositeOperation = 'source-over';
    if (!player.canShoot) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(x, y, width, 15);
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, width * player.cooldown / cooldown, height);
    } else {
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, width, 15);
    }

    
}*/

const extraDeathTexts = ["You are SUPER dead", "This is hard!", "Buff slingshot", "Jacques my GOAT", "My name Jacques", "Also try Island Battle", "Cologne", "Hands off folders", "Jock dumb dumb", "How did you die", "you are ULTRA DEAD"];
function updHealth(health, maxHealth) {
   const healthElement = document.getElementById("healthCanvas");
   const healthCtx = healthElement.getContext("2d");
   healthCtx.clearRect(0, 0, 200, 30);
   healthCtx.fillStyle = 'lightGreen';
   healthCtx.fillRect(0, 0, health * (200 / maxHealth), 30);
   if (health <= 0) {
       //death screen and text over healthbar
       healthCtx.fillStyle = 'black';
       healthCtx.font = '20px Arial';

       if (Math.random()*100 < 10){
            deathMessage = extraDeathTexts[Math.floor(Math.random() * extraDeathTexts.length)];
        }else{
            deathMessage = 'You are dead';
        }
        healthCtx.fillText(deathMessage, 0, 20);
    document.getElementById("deathScreen").style.opacity = "1";
    //stop (game, movement, delete all enemies) and then restart game after 5 seconds
    playerDead = true;
    player.color = "#FF0000";
    //lose.play();
    game = false;
    resetScore();
    enemyList = [];

    setTimeout(() => {
        wave = 0;
        player.health = player.maxHealth;
        player.x = 400;
        player.y = 400;
        player.color = "black";
        player.equippedWeapon = basePlayerStats.equippedWeapon;
        player.damageBoost = basePlayerStats.damageBoost;
        player.attackSpeedBoost = basePlayerStats.attackSpeedBoost;
        player.burstChanceBoost = basePlayerStats.burstChanceBoost;
        player.projectileSpeedBoost = basePlayerStats.projectileSpeedBoost;
        player.walkSpeedBoost = basePlayerStats.walkSpeedBoost;
        player.healthBoost = basePlayerStats.healthBoost;
        player.speed = basePlayerStats.speed;
        document.getElementById("deathScreen").style.opacity = "0";
        waveActive = false;
        playerDead = false;
        //lose.stop();
        game = true;
    }, 5000);
    
   }
}

const stats = ["damageBoost", "attackSpeedBoost", "projectileSpeedBoost", "walkSpeedBoost", "healthBoost"];
// burst chance is kinda useless
function powerUp() {
    // Function to handle power-ups
    document.getElementById("powerUpInfo").style.opacity = "1";
    // random boost to a random stat
    const amount1 = Math.floor(Math.random() * 50) + 10;
    const amount2 = Math.floor(Math.random() * 50) + 10;
    const amount3 = Math.floor(Math.random() * 50) + 10;
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    document.getElementById("optionOne").innerText = `Increase ${randomStat} by ${amount1}%`;
    document.getElementById("optionOne").style.backgroundColor = "lightgreen";
    const randomStat2 = stats[Math.floor(Math.random() * stats.length)];
    document.getElementById("optionTwo").innerText = `Increase ${randomStat2} by ${amount2}%`;
    document.getElementById("optionTwo").style.backgroundColor = "lightgreen";
    const randomStat3 = stats[Math.floor(Math.random() * stats.length)];
    document.getElementById("optionThree").innerText = `Increase ${randomStat3} by ${amount3}%`;
    document.getElementById("optionThree").style.backgroundColor = "lightgreen";
    return {
        randomStat1: randomStat,
        randomStat2: randomStat2,
        randomStat3: randomStat3,
        amount1: amount1,
        amount2: amount2,
        amount3: amount3
    }
}
function randomStat(stat, amount){
    if (stat == "damageBoost") {player.damageBoost = 10+(player.damageBoost*1+amount);
    }else if (stat == "attackSpeedBoost") {player.attackSpeedBoost = 10+(player.attackSpeedBoost*1+amount);
    }else if (stat == "burstChanceBoost") {player.burstChanceBoost = 10+(player.burstChanceBoost*1+amount);
    }else if (stat == "projectileSpeedBoost") {player.projectileSpeedBoost = 10+(player.projectileSpeedBoost*1+amount);
    }else if (stat == "walkSpeedBoost") {player.walkSpeedBoost = 10+(player.walkSpeedBoost*1+amount);
    }else if (stat == "healthBoost") {player.healthBoost = 10+(player.healthBoost*1+amount)}
    }

function levelUp() {
    let viewportWidth = window.innerWidth;
    const killwallElement = document.getElementById('killwall');
        if (killwallElement) {
            killwallElement.style.width = (score % 3000) * (viewportWidth / 3000) + 'px';
        }
    }

const baseGameState = {
        player: {
            maxHealth: 100,
            equippedWeapon: slingshot,
            x: 400,
            y: 400,
        },
        map: {
            currentMap: plains,
        },
        settings: { //SET THESE TO ONE PLEASE I WAS JUST HAVING FUN
            sprintMultiplier: 1, // Multiplier for sprinting speed, set to 1 because this sum random bs that should not be in the game and should only be used for leisure and testing so sprinting is not op if you didn't make this game and youre here i recommend you do not set this to a number higher than 3 because it can cause some pretty crazy speed and make the game unplayable but if you want to have fun with it go ahead just make sure you can find your character again. Example: sprintMultiplier: 2 means sprinting makes you twice as fast. (used on movement lines)
            beamofLight: 1 //divides attack cooldown and makes a massive beam of light if you want to have fun with it go ahead. Example: beamofLight: 1000 means your attack cooldown is divided by 1000 and you become a god. 1000 is probably the best if you want a light beam (used on projectile lines)
        }
    }
export function initializeGame() {
    drawMap(baseGameState.map.currentMap);
    createPlayer(player);
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
function handleKeyDown(e) {if (!keysDown[e.key.toLowerCase()]) {keysDown[e.key.toLowerCase()] = true;}}
let debug = false;
function handleKeyDownToggle(e) {
    switch (e.key.toLowerCase()) {
        case "f3":
            if (!debug) {document.getElementById("debug").style.opacity = "1";
            }else{document.getElementById("debug").style.opacity = "0";}
            debug = !debug;
            break;
}
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
updateBossbar(createZombieBoss().health);
if (BossActive == true) {updateBossbar(createZombieBoss().health);} // this is just to initialize the bossbar when the boss fight starts, it will be updated in the main loop after every attack and every time the boss takes damage.
let startCutscene = false;
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImage.complete) {ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);}
    if (game == true) {
        if (!startCutscene){
            gameState = initializeGame();
            startCutscene = true;
            mapDescription(gameState.map.currentMap, 4000);
        }
        drawMap(gameState.map.currentMap);
        createPlayer(player);
        let sprinting = keysDown["shift"]; //sprinting when shift is held down
        

        //player stats
        const currentStats = {
            maxHealth: player.maxHealth*(1 + 0.01*player.healthBoost),
            equippedWeapon: player.equippedWeapon,
            speed: player.speed*(1 + 0.01*player.walkSpeedBoost),
            damage: player.equippedWeapon.baseDamage*(1 + 0.01*player.damageBoost),
            attackCooldown: player.equippedWeapon.baseAttackSpeed/(1 + 0.01*player.attackSpeedBoost),
            burstChance: player.equippedWeapon.baseBurstChance*(1 + player.burstChanceBoost),
            projectileSpeed: player.equippedWeapon.baseProjectileSpeed*(1 + 0.01*player.projectileSpeedBoost),
        };
        updHealth(player.health, currentStats.maxHealth);
        //addCooldownIndicator(player.x, player.y + 20, 20, 5, currentStats.attackCooldown);
        levelUp();
        if (keysDown["enter"]) {mapDescription(gameState.map.currentMap, 0);}

        const size = 24;
        let differenceSpeed = currentStats.speed;
        if (sprinting) {differenceSpeed *= baseGameState.settings.sprintMultiplier;} // Increase speed when sprinting
        if (keysDown["w"]) {
            if (player.y > 0+size) {player.y -= differenceSpeed;} // Move up
            player.direction = "forwards";
        }
        if (keysDown["a"]) {
            if (player.x > 0+size) {player.x -= differenceSpeed;} // Move left
            player.direction = "left";
        }
        if (keysDown["s"]) {
            if (player.y < canvas.height-size) {player.y += differenceSpeed;} // Move down
            player.direction = "backwards";
        }
        if (keysDown["d"]) {
            if (player.x < canvas.width-size) {player.x += differenceSpeed;} // Move right
            player.direction = "right";
        }
        let directionX = 0;
        let directionY = 0;
        if ((keysDown["arrowup"] || keysDown["arrowdown"] || keysDown["arrowleft"] || keysDown["arrowright"]) || (keysDown["i"] || keysDown["j"] || keysDown["k"] || keysDown["l"])) {
            if ((Date.now() - lastAttackTime) >= (currentStats.attackCooldown/baseGameState.settings.beamofLight)) { // Attack cooldown
                if (keysDown["arrowup"] || keysDown["i"]) {directionY = -1;}
                if (keysDown["arrowdown"] || keysDown["k"]) {directionY = 1;}
                if (keysDown["arrowleft"] || keysDown["j"]) {directionX = -1;}
                if (keysDown["arrowright"] || keysDown["l"]) {directionX = 1;}
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
            if (!playerDead) {
            waveActive = false;
            if (wave < plains.waves.length) {
                if (wave > 0) {
                    if (!powerUpping){
                        addScore(100);
                        powerupStorage = powerUp();
                        powerUpping = true
                        player.health = currentStats.maxHealth;
                    }else{
                    if ((keysDown["1"] || keysDown["2"] || keysDown["3"])){
                        if (keysDown["1"]){
                            randomStat(powerupStorage.randomStat1, powerupStorage.amount1);
                        }else if (keysDown["2"]){
                            randomStat(powerupStorage.randomStat2, powerupStorage.amount2);
                        }else if (keysDown["3"]){
                            randomStat(powerupStorage.randomStat3, powerupStorage.amount3);

                        }
                        document.getElementById("powerUpInfo").style.opacity = "0";
                        updHealth(player.health, currentStats.maxHealth);
                        enemyList = createEnemies(enemyList, plains.waves[wave]);
                        wave++;
                        waveActive = true;
                        powerUpping = false;
                        addWave();
                    }
                }
                }else{
                    enemyList = createEnemies(enemyList, plains.waves[wave]);
                    wave++;
                    waveActive = true;
                    addWave();
                }
            } else {
                document.getElementById("winScreen").style.opacity = "1";
                //win.play();
                game = false;
                enemyList = [];
                setTimeout(() => {
                    resetScore();
                    wave = 0;
                    waveActive = false;
                    game = true;
                    player.maxHealth = basePlayerStats.maxHealth
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
                    document.getElementById("winScreen").style.opacity = "0";
                    initializeGame();
                    //win.stop();
                }, 5000);
            }
        } 
        }else {

            const before = enemyList.length;
            updateEnemies(enemyList);
            if (keysDown["u"]) { drawHitboxes(enemyList); drawPlayerHitbox(player.x, player.y);}
            if (debug){
                document.getElementById("attackspeed").innerText = "Attack Cooldown: "+ currentStats.attackCooldown + ", " + player.attackSpeedBoost;
                document.getElementById("speed").innerText = "Speed: "+ currentStats.speed + " px/t";
                document.getElementById("damagedisplay").innerText = "Damage: " + currentStats.damage;
                document.getElementById("burstchance").innerText = "Burst Chance: "+ currentStats.burstChance;
                document.getElementById("maxhealth").innerText = "Max Health: "+ currentStats.maxHealth;
                document.getElementById("projectilespeed").innerText = "Projectile Speed: "+ currentStats.projectileSpeed + " px/t";
                document.getElementById("healthdisplay").innerText = "Health: "+ player.health;
                document.getElementById("enemycount").innerText = "Enemies: "+ enemyList.length;
            }
            const after = removeDeadEnemies(enemyList).length;
            addScore(before - after); // +1 for every enemy killed
            enemyList = removeDeadEnemies(enemyList);
        }
    } else {
        //whateverTheHeckThisIs.stop();
    }
    requestAnimationFrame(main);
}
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keydown', handleKeyDownToggle);
document.addEventListener('keyup', handleKeyUp);
game = true;
//setup music to play on first user interaction
function startMusicOnFirstInteraction() {
    whateverTheHeckThisIs.play();
    // Remove listeners after first interaction
    document.removeEventListener('click', startMusicOnFirstInteraction);
    document.removeEventListener('keydown', startMusicOnFirstInteraction);
    document.removeEventListener('touchstart', startMusicOnFirstInteraction);
}

// Wait for user interaction
document.addEventListener('click', startMusicOnFirstInteraction);
document.addEventListener('keydown', startMusicOnFirstInteraction);
document.addEventListener('touchstart', startMusicOnFirstInteraction);

main();