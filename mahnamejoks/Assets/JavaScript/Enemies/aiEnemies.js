import { player } from "./main.js";
import { plains } from "./plains.js";
import { enemies } from "./enemies/base.js";

export function createEnemies(lst) {
    const enemies = plains.enemies;
    
    for (let i = 0; i < plains.waves[i].enemies[i].count; i++) {
        const enemy = enemies[i];
        lst.push({
            name: enemies[enemy.id].name,
            speed: enemies[enemy.id].speed,
            description: enemies[enemy.id].description,
            imageLink: enemies[enemy.id].imageLink,
            health: enemies[enemy.id].health,
            damage: enemies[enemy.id].damage,
            attackSpeed: enemies[enemy.id].attackSpeed,
            x: Math.random() * 600, 
            y: Math.random() * 600, 
        });  
    }
    return lst;
}

export function drawHitboxes(enemyInstances) {
    const ctx = document.getElementById("canvas").getContext("2d");
    for (const enemy of enemyInstances) {
        ctx.strokeStyle = "clear";
        ctx.strokeRect(enemy.x, enemy.y, 48, 48);
        //enemy.enemySprite = new Image();
        ///enemy.enemySprite.src = enemies[enemy.id].imageLink;
        //ctx.drawImage(enemy.enemySprite, enemy.x - 24, enemy.y - 24, 48, 48);
    }
}

///export function drawEnemies(enemyInstances) {
    const ctx = document.getElementById("canvas").getContext("2d");
    for (const enemy of enemyInstances) {
        
        enemy.enemySprite = new Image();
        enemy.enemySprite.src = enemies[enemy.id].imageLink;
        ctx.drawImage(enemy.enemySprite, enemy.x - 24, enemy.y - 24, 48, 48);
        
 }
///}

export function enemyAttack(enemyInstances) {
    for (const enemy of enemyInstances) {
        if (enemy.x -24 - player.x < 2 && enemy.y - 24 - player.y < 2) {
            player.health -= enemy.damage; 
        }
    
    }
}


export function moveEnemies(enemyInstances) {
    for (const enemy of enemyInstances) {
        if (enemy.x + 24 < player.x) {
            enemy.x += enemy.speed; 
        }
        if (enemy.x + 24 > player.x) {
            enemy.x -= enemy.speed; 
        }
        if (enemy.y + 24 < player.y) {
            enemy.y += enemy.speed; 
        }
        if (enemy.y + 24 > player.y) {
            enemy.y -= enemy.speed; 
        }
    }
}

export function updateEnemies(enemyInstances) {
    
    drawHitboxes(enemyInstances);
    drawEnemies(enemyInstances);
    moveEnemies(enemyInstances);
    enemyAttack(enemyInstances);
    
}

export function removeDeadEnemies(enemyInstances) {
    return enemyInstances.filter(enemy => enemy.health > 0);
}

export function clearEnemies(enemyInstances) {
    return [];
}



export function damageEnemy(enemyInstances, x, y, damage) {
    for  (const enemy of enemyInstances) {
        if (x > enemy.x && x < enemy.x + 48 && y > enemy.y && y < enemy.y + 48) {
            enemy.health -= damage;
            return true; // Enemy was hit
            
        }
    }
}

/////////DAMAGE BASED ON ENEMY POSITION, HITBOX SCRIPT AT TOP