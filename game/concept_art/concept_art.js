const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "darkgrey";
ctx.fillRect(0, 0, 800, 800);

// Doors
ctx.fillStyle = "#8B4513";
ctx.fillRect(300, 0, 200, 20);
ctx.fillRect(300, 780, 200, 20);

// Monsters
ctx.fillStyle = "#00FF00";
ctx.beginPath();
ctx.arc(350, 110, 24, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(450, 110, 24, 0, Math.PI * 2);
ctx.fill();

// Player
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(400, 690, 24, 0, Math.PI * 2);
ctx.fill();