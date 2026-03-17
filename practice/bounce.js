const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

let x = 0;
let vx = 1;
let vy = 1;
let y = 0;

function move(){
    ctx.clearRect(0,0,800,800);
    x = x + vx;
    y = y + vy;
    ctx.fillRect(X,y,50,50);
    requestAnimationFrame(move);
}

move();