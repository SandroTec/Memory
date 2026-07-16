"use strict";
const winner = JSON.parse(sessionStorage.getItem("winning player:") || '""');
const scoreB = JSON.parse(sessionStorage.getItem("blue score:") || "0");
const scoreO = JSON.parse(sessionStorage.getItem("orange score:") || "0");
const theme = JSON.parse(sessionStorage.getItem("theme:") || "code");
const playerIconBlue = JSON.parse(sessionStorage.getItem("playerIconBlue:") || '""');
const playerIconOrange = JSON.parse(sessionStorage.getItem("playerIconOrange:") || '""');
const endscreenBody = document.querySelector("#gameBody");
const scoreIconO = document.querySelector("#scoreIconO");
const scoreIconB = document.querySelector("#scoreIconB");
let endScoreDisplayB = document.querySelector("#endScoreDisplayB");
let endScoreDisplayO = document.querySelector("#endScoreDisplayO");
let winnerDisplay = document.querySelector("#winnerDisplay");
let helpMsg = document.querySelector("#helpMsg");
let winnerImageDisplay = document.querySelector("#winnerImageDisplay");
const codeFont = "";
const codeWinnerImgB = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_blue.png";
const codeDrawImage = "../../src/assets/img/game_page/code-theme/endscreen/draw_icon.png";
const codeWinnerImgO = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_orange.png";
const winnerImagesCode = {
    blue: codeWinnerImgB,
    orange: codeWinnerImgO,
    draw: codeDrawImage
};
const gamingFont = "";
const gamingWinnerImgB = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";
const gamingDrawImage = "../../src/assets/img/game_page/gaming-theme/endscreen/draw_icon.png";
const gamingWinnerImgO = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";
const winnerImagesGaming = {
    blue: gamingWinnerImgB,
    orange: gamingWinnerImgO,
    draw: gamingDrawImage
};
const daFont = "";
const daWinnerImgB = "../../src/assets/img/game_page/da-theme/endscreen/chess_pawn_blue.png";
const daDrawImage = "../../src/assets/img/game_page/da-theme/endscreen/draw_icon.png";
const daWinnerImgO = "../../src/assets/img/game_page/da-theme/endscreen/chess_pawn_orange.png";
const winnerImagesDa = {
    blue: daWinnerImgB,
    orange: daWinnerImgO,
    draw: daDrawImage
};
if (endscreenBody) {
    endscreenBody.classList.add(`theme-${theme}`);
}
function initaliseScoreBoard() {
    if (!scoreIconB || !scoreIconO)
        return;
    scoreIconB.src = playerIconBlue;
    scoreIconO.src = playerIconOrange;
}
function initaliseScores() {
    if (!endScoreDisplayB || !endScoreDisplayO)
        return;
    endScoreDisplayB.textContent = `${scoreB}`;
    endScoreDisplayO.textContent = `${scoreO}`;
}
function initaliseWinner() {
    if (!winnerDisplay || !winner)
        return;
    if (!helpMsg)
        return;
    if (winner == "draw") {
        helpMsg.textContent = "it's a";
    }
    else {
        helpMsg.textContent = "the winner is";
    }
    if (winner == "orange") {
        winnerDisplay.classList.add("orange");
    }
    else if (winner == "blue") {
        winnerDisplay.classList.add("blue");
    }
    winnerDisplay.textContent = `${winner}`;
}
const themeImages = {
    code: winnerImagesCode,
    gaming: winnerImagesGaming,
    da: winnerImagesDa
};
const currentWinnerThemeImage = themeImages[theme];
function initaliseWinnerImage() {
    if (!winnerImageDisplay)
        return;
    winnerImageDisplay.src = currentWinnerThemeImage[winner];
}
async function init() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    initaliseScoreBoard();
    initaliseScores();
    await delay(2000);
    initaliseWinnerImage();
    initaliseWinner();
}
init();
