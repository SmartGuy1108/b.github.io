const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let score = 0;
let gameObjects = [];

class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isDestroyed = false;
    }

    draw() {
        if (!this.isDestroyed) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    checkCollision(mouseX, mouseY) {
        if (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        ) {
            this.isDestroyed = true;
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    }
}

function initializeGame() {
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * (CANVAS_WIDTH - 50);
        let y = Math.random() * (CANVAS_HEIGHT - 50);
        let width = 50;
        let height = 50;
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        gameObjects.push(new Block(x, y, width, height, color));
    }
}

function update() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(obj => obj.draw());
    requestAnimationFrame(update);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    gameObjects.forEach(obj => obj.checkCollision(mouseX, mouseY));
});

initializeGame();
update();
