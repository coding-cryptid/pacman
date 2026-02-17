//Board 
let gameBoard;
const rowCount = 21;
const colCount = 19;
const tileSize = 32;
const gameBoardWidth = colCount * tileSize;
const gameBoardHeight = rowCount * tileSize;
let context;

window.onload = function() {
    gameBoard = this.document.getElementById("gameBoard");
    gameBoard.height = gameBoardHeight;
    gameBoard.width = gameBoardWidth;
    context = gameBoard.getContext("2d");
}