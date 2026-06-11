export const zombieBossId = 5;

export function createZombieBoss({ x = 400, y = 200 } = {}) {
  return { // these are the bosses stats, you can change them however if you want to make the game basically impossible or really easy, i dont really care.
    id: zombieBossId,
    name: 'zombiepng',
    speed: 0.95,
    health: 10000,
    damage: 35,
    attackSpeed: 2500,
    imageLink: '../Art/zombie.png',
    x,
    y,
    recentAttack: Date.now(),
    enemySprite: null
  };
}

export function updateBossbar(health) {
   
   //jock be helpful and fix main.js
   document.getElementById("bossName").innerText = "ZOMBIE.PNG";
   const bossbarElement = document.getElementById("bossHealthCanvas");
   const bossbarCtx = bossbarElement.getContext("2d");
   bossbarCtx.clearRect(0, 0, 400, 30);
   bossbarCtx.fillStyle = 'red';
   bossbarCtx.fillRect(0, 0, 400, 30);
   bossbarCtx.fillStyle = 'yellow';
   bossbarCtx.fillRect(0, 0, health/10000 * (400), 30); 
}