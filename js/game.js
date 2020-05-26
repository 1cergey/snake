
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const ground = new Image();
ground.src = "/img/background.png"

const foodImg = new Image();
foodImg.src = "/img/food.png"

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    } else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    } else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}

function drawGame() {

    //ctx.drawImage(ground, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "gray";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    ctx.beginPath();
    ctx.moveTo(0, box * 3); // Начало линии 
    ctx.lineTo(canvas.width, box * 3); // Узел линии  
    ctx.stroke();
    ctx.fill();
  
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;

        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    switch (dir) {
        case "left": snakeX -= box;
            break;
        case "right": snakeX += box;
            break;
        case "up": snakeY -= box;
            break;
        case "down": snakeY += box;
            break;
        default:
            break;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);


}

let game = setInterval(drawGame, 100)