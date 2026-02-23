//board 
let gameBoard;
const rowCount = 21;
const colCount = 19;
const tileSize = 32;
const gameBoardWidth = colCount * tileSize;
const gameBoardHeight = rowCount * tileSize;
let context;

//images
let blueGhostImage;
let redGhostImage;
let pinkGhostImage;
let orangeGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;
let powerPellet;

const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X3XX XXX X XXX XX3X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X3XXXXXX X XXXXXX3X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set();
const foods = new Set();
const pellets = new Set();
const ghosts = new Set();
let pacman;

const direction = ['U', 'D', 'L', 'R']

//load functions
window.onload = function() {
    gameBoard = this.document.getElementById("gameBoard");
    gameBoard.height = gameBoardHeight;
    gameBoard.width = gameBoardWidth;
    context = gameBoard.getContext("2d");

    loadImages();
    loadMap();
    update();
    document.addEventListener("keyup", movePacman);

}

function loadImages() {
    wallImage = new Image();
    wallImage.src = "./images/wall.png";

    blueGhostImage = new Image();
    blueGhostImage.src = "./images/blueGhost.png";

    redGhostImage = new Image();
    redGhostImage.src = "./images/redGhost.png";

    pinkGhostImage = new Image();
    pinkGhostImage.src = "./images/pinkGhost.png";

    orangeGhostImage = new Image();
    orangeGhostImage.src = "./images/orangeGhost.png";

    pacmanUpImage = new Image();
    pacmanUpImage.src = "./images/pacmanUp.png";

    pacmanDownImage = new Image();
    pacmanDownImage.src = "./images/pacmanDown.png";

    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./images/pacmanLeft.png";

    pacmanRightImage = new Image();
    pacmanRightImage.src = "./images/pacmanRight.png";
}

function loadMap() {
    walls.clear();
    foods.clear();
    pellets.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;

            if (tileMapChar === "X") {
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);
            }
            else if (tileMapChar === "b") {
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar === "r") {
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar === "p") {
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar === "o") {
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar === "P") {
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar === " ") {
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
            else if (tileMapChar === "3") {
                const power = new Block(powerPellet, x + 10, y + 10, 8, 8);
                pellets.add(power);
            }
        }
    }
}

function update() {
    move();
    draw();
    setTimeout(update, 50);
}

function draw() {
    context.clearRect(0, 0, gameBoard.width, gameBoard.height);
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for (let ghost of ghosts.values()) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }
    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }
    context.fillStyle = "white";
    for (let food of foods.values()) {
        context.fillRect(food.x, food.y, food.width, food.height);
    }
    context.fillStyle = "white";
    for (let power of pellets.values()) {
        context.fillRect(power.x, power.y, power.width, power.height);
    }
}

function move() {
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    for (let wall of walls.values()) {
        if (collision(pacman, wall)) {
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }
}

function movePacman(e) {
    if (e.code == "ArrowUp" || e.code == "KeyW") {
        pacman.updateDirection("U");
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        pacman.updateDirection("D");
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        pacman.updateDirection("L");
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        pacman.updateDirection("R");
    }

    if (pacman.direction == "U") {
        pacman.image = pacmanUpImage;
    }
    else if (pacman.direction == "D") {
        pacman.image = pacmanDownImage;
    } 
    else if (pacman.direction == "L") {
        pacman.image = pacmanLeftImage;
    }
    else if (pacman.direction == "R") {
        pacman.image = pacmanRightImage;
    }
}

function collision(a, b) {
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y =y;
        this.width =width;
        this.height = height;

        this.startX = x;
        this.startY = y;

        this.direction = "R";
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()) {
            if (collision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity() {
        if(this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
        else if(this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize/4;
        }
        else if(this.direction == 'L') {
            this.velocityX = -tileSize/4;
            this.velocityY = 0;
        }
        else if(this.direction == 'R') {
            this.velocityX = tileSize/4;
            this.velocityY = 0;
        }
    }
}