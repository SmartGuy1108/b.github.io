const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const GRID_SIZE = 10;
const BLOCK_SIZE = CANVAS_WIDTH / GRID_SIZE;
let score = 0;

let grid = [];
for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = new Array(GRID_SIZE).fill(null);
}

function drawGrid() {
    ctx.strokeStyle = '#fff';
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * BLOCK_SIZE, 0);
        ctx.lineTo(i * BLOCK_SIZE, CANVAS_HEIGHT);
        ctx.moveTo(0, i * BLOCK_SIZE);
        ctx.lineTo(CANVAS_WIDTH, i * BLOCK_SIZE);
        ctx.stroke();
    }
}

class Block {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}

function placeBlock(x, y) {
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    grid[y][x] = new Block(x, y, color);
    checkCompleteLines();
}

function checkCompleteLines() {
    for (let y = 0; y < GRID_SIZE; y++) {
        if (grid[y].every(block => block !== null)) {
            for (let x = 0; x < GRID_SIZE; x++) {
                grid[y][x] = null;
            }
            score += GRID_SIZE;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    }
    for (let x = 0; x < GRID_SIZE; x++) {
        let completeColumn = true;
        for (let y = 0; y < GRID_SIZE; y++) {
            if (grid[y][x] === null) {
                completeColumn = false;
                break;
            }
        }
        if (completeColumn) {
            for (let y = 0; y < GRID_SIZE; y++) {
                grid[y][x] = null;
            }
            score += GRID_SIZE;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    }
}

function update() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid();
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (grid[y][x]) {
                grid[y][x].draw();
            }
        }
    }
    requestAnimationFrame(update);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const x = Math.floor(mouseX / BLOCK_SIZE);
    const y = Math.floor(mouseY / BLOCK_SIZE);
    placeBlock(x, y);
});

update();
