"use strict";
const winner = JSON.parse(sessionStorage.getItem("winningPlayer:") || '""');
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
const winnerDisplay = document.querySelector("#winnerDisplay");
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
    winnerDisplay.innerHTML = winner;
}
function init() {
    initaliseScoreBoard();
    initaliseScores();
    initaliseWinner();
}
init();
