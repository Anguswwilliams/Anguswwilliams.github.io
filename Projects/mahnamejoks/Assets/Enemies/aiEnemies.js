import { player } from "../World/main.js";
import { plains } from "../World/plains.js";
import { enemies } from "./base.js";
import { zombieBossId, createZombieBoss, updateBossbar } from "../Boss/bossfight.js";
export function createEnemies(lst, waveDef) {
    if (!waveDef || !Array.isArray(waveDef.enemies)) return lst;

    for (const enemyGroup of waveDef.enemies) {
        // Boss special-case
        if (enemyGroup.id === zombieBossId) {
            for (let i = 0; i < enemyGroup.count; i++) {
                lst.push(createZombieBoss({
                    x: Math.random() * 700 + 50,
                    y: Math.random() * 700 + 50
                }));
            }
            continue;
        }

        const enemyType = plains.enemies.find(e => e.id === enemyGroup.id) || plains.enemies[0];
        for (let i = 0; i < enemyGroup.count; i++) {
            lst.push({
                id: enemyType.id,
                name: enemyType.name,
                speed: enemyType.speed,
                health: enemyType.health,
                damage: enemyType.damage,
                attackSpeed: enemyType.attackSpeed,
                imageLink: enemyType.imageLink,
                x: Math.random() * 700 + 50,
                y: Math.random() * 700 + 50,
                recentAttack: Date.now()
            });
        }
    }
    return lst;
}

export function drawHitboxes(enemyInstances) {
    const ctx = document.getElementById("canvas").getContext("2d");
    for (const enemy of enemyInstances) {
        ctx.strokeStyle = "clear";
        ctx.strokeRect(enemy.x, enemy.y, 48, 48);
    }
}

export function drawEnemies(enemyInstances) {
    const ctx = document.getElementById("canvas").getContext("2d");
    for (const enemy of enemyInstances) {
        if (!enemy.enemySprite) {
            enemy.enemySprite = new Image();
            enemy.enemySprite.onerror = () => { enemy.spriteError = true; };
            if (enemy.id === 0) {
                enemy.enemySprite.src = "./Assets/Art/normal-zombie1.png";
            } else if (enemy.id === 1) {
                enemy.enemySprite.src = "./Assets/Art/speedy-zombie1.png";
            } else if (enemy.id === 2) {
                enemy.enemySprite.src = "./Assets/Art/tank-zombie1.png";
            } else if (enemy.id === 3) {
                enemy.enemySprite.src = "./Assets/Art/skeleton.png";
            } else if (enemy.id === 4) {
                enemy.enemySprite.src = "./Assets/Art/mage-warlock.png";
            } else if (enemy.id === 5) {
                enemy.enemySprite.src = "/zombie.png";
            }
        }

        const sprite = enemy.enemySprite;
        if (sprite && sprite.complete && !sprite.spriteError && sprite.naturalWidth > 0) {
            ctx.drawImage(sprite, enemy.x - 40, enemy.y - 40, 120, 120);
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect(enemy.x - 24, enemy.y - 24, 48, 48);
        }

        /*console.log(enemy.id);
        console.log(enemy.name);
        console.log(enemy.health);
        console.log(plains.waves[0]);*/

        let bossHpCount = health => {
            const bossHpElement = document.getElementById("bossHP");
            bossHpElement.textContent = `${health}hp`;
        };

         if (enemy.id === 5) {
            bossHpCount(enemy.health);
        }
        if (enemy.id === 5) {
            document.getElementById("bossHealthCanvas").style.opacity = "1";
            document.getElementById("bossName").style.opacity = "1";
            document.getElementById("bossHP").style.opacity = "1";
                if (enemy.health <= 0 && enemy.id === 5) {
                    document.getElementById("bossHealthCanvas").style.opacity = "0";
                    document.getElementById("bossName").style.opacity = "0";
                    document.getElementById("bossHP").style.opacity = "0";
                }
        }
        else {
            document.getElementById("bossHealthCanvas").style.opacity = "0";
            document.getElementById("bossName").style.opacity = "0";
            document.getElementById("bossHP").style.opacity = "0";
        }
    }  
}

function showDamage() {
    const damageElement = document.getElementById("damage");
    damageElement.style.opacity = "0.5";
    setTimeout(() => {
        damageElement.style.opacity = "0";
    }, 100);
}

export function enemyCooldown(enemy) {
    enemy.attack = false;
    setTimeout(() => {enemy.attack = true;}, enemy.attackSpeed);
}

export function enemyAttack(enemyInstances) {
    for (const enemy of enemyInstances) {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy) - 24;
        if (distance <= 50 && ((Date.now() - enemy.recentAttack) >= enemy.attackSpeed)){
            player.health -= enemy.damage;
            enemy.recentAttack = Date.now();
            showDamage();
            return true;
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
        if ((x > enemy.x && x < enemy.x + 48) && (y > enemy.y && y < enemy.y + 48)) {
            enemy.health -= damage;
            if (enemy.id === zombieBossId) {updateBossbar(enemy.health);}
            return true;
        }
    }
}


/////////DAMAGE BASED ON ENEMY POSITION, HITBOX SCRIPT AT TOP