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
const homeButton = document.querySelector("#homeButton");
let buttonImage = document.querySelector("#buttonImage");
const scoreContainer = document.querySelector("#scoreContainer");
const codeKonfettiImage = document.querySelector("#codeKonfettiImage");
const codeWinnerImgB = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_blue.png";
const codeDrawImage = "../../src/assets/img/game_page/code-theme/endscreen/draw_icon.png";
const codeWinnerImgO = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_orange.png";
const codeHomeButtonImage = "../../src/assets/img/game_page/code-theme/endscreen/home_button.png";
const winnerImagesCode = {
    blue: codeWinnerImgB,
    orange: codeWinnerImgO,
    draw: codeDrawImage
};
const gamingWinnerImgB = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";
const gamingDrawImage = "../../src/assets/img/game_page/gaming-theme/endscreen/draw_icon.png";
const gamingWinnerImgO = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";
const gamingHomeButtonImage = "../../src/assets/img/game_page/gaming-theme/endscreen/home_button.png";
const winnerImagesGaming = {
    blue: gamingWinnerImgB,
    orange: gamingWinnerImgO,
    draw: gamingDrawImage
};
const daWinnerImgB = "../../src/assets/img/game_page/da-theme/endscreen/chess_pawn_blue.png";
const daDrawImage = "../../src/assets/img/game_page/da-theme/endscreen/draw_icon.png";
const daWinnerImgO = "../../src/assets/img/game_page/da-theme/endscreen/chess_pawn_orange.png";
const daHomeButtonImage = "../../src/assets/img/game_page/da-theme/endscreen/home_button.png";
const winnerImagesDa = {
    blue: daWinnerImgB,
    orange: daWinnerImgO,
    draw: daDrawImage
};
const themeImages = {
    code: winnerImagesCode,
    gaming: winnerImagesGaming,
    da: winnerImagesDa
};
const currentWinnerThemeImage = themeImages[theme];
if (endscreenBody) {
    endscreenBody.classList.add(`theme-${theme}`);
}
const scoreDisplayContainer = document.querySelector("#scoreDisplayContainer");
if (scoreDisplayContainer) {
    scoreDisplayContainer.classList.add(`score-container-${theme}`);
}
function initaliseHeadline() {
    const headlineImage = document.querySelector("#headlineImage");
    const headline = document.querySelector("h1");
    if (theme == "code") {
        headline?.classList.add("d-none");
        headlineImage?.classList.remove("d-none");
    }
    else {
        headline?.classList.remove("d-none");
        headlineImage?.classList.add("d-none");
    }
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
    endScoreDisplayB.classList.add("blue");
    endScoreDisplayO.textContent = `${scoreO}`;
    endScoreDisplayO.classList.add("orange");
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
function initaliseWinnerImage() {
    if (!winnerImageDisplay)
        return;
    winnerImageDisplay.src = currentWinnerThemeImage[winner];
    if (theme == "code" && winner != "draw") {
        codeKonfettiImage?.classList.remove("d-none");
    }
}
function hideScore() {
    if (!scoreContainer)
        return;
    scoreContainer.classList.add("d-none");
}
function initaliseHomeBtn() {
    if (!buttonImage)
        return;
    switch (theme) {
        case "code":
            buttonImage.src = codeHomeButtonImage;
            break;
        case "gaming":
            buttonImage.src = gamingHomeButtonImage;
            break;
        case "da":
            buttonImage.src = daHomeButtonImage;
            break;
        default:
            buttonImage.src = codeHomeButtonImage;
            break;
    }
}
homeButton?.addEventListener("click", () => {
    endGame();
});
function endGame() {
    window.location.href = "./settings.html";
}
function initaliseBgColor() {
    if (theme != "da")
        return;
    endscreenBody?.classList.add("da-bg-endscreen");
}
async function init() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    initaliseBgColor();
    initaliseHeadline();
    initaliseScoreBoard();
    initaliseScores();
    await delay(2000);
    initaliseWinnerImage();
    initaliseWinner();
    initaliseHomeBtn();
    hideScore();
}
init();
