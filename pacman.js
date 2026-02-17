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

//load functions
window.onload = function() {
    gameBoard = this.document.getElementById("gameBoard");
    gameBoard.height = gameBoardHeight;
    gameBoard.width = gameBoardWidth;
    context = gameBoard.getContext("2d");

    loadImages();
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