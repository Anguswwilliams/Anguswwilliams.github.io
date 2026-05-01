let score = 0;
export function updScore(score) {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Score: ${score}`;
}

export function addScore(points) {
    score += points;
    updScore(score);
}