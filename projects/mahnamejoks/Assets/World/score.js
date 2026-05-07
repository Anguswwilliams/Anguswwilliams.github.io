let score = 0;
export { score }
export function updScore(score) {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Score: ${score}`;
}

export function addScore(points, multiplier = 1) {
    
    score += points;
    updScore(score);
}

export function resetScore() {
    score = 0;
    updScore(score);
}