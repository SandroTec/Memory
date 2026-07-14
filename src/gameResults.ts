const winner = JSON.parse(sessionStorage.getItem("winningPlayer:") || '""');
const scoreB = JSON.parse(sessionStorage.getItem("blue score:") || "0");
const scoreO= JSON.parse(sessionStorage.getItem("orange score:") || "0");
const theme = JSON.parse(sessionStorage.getItem("theme:") || "code");
const playerIconBlue = JSON.parse(sessionStorage.getItem("playerIconBlue:") || '""');
const playerIconOrange = JSON.parse(sessionStorage.getItem("playerIconOrange:") || '""');

const endscreenBody = document.querySelector<HTMLBodyElement>("#gameBody");

const scoreIconO = document.querySelector<HTMLImageElement>("#scoreIconO");
const scoreIconB = document.querySelector<HTMLImageElement>("#scoreIconB");

let endScoreDisplayB = document.querySelector<HTMLParagraphElement>("#endScoreDisplayB");
let endScoreDisplayO = document.querySelector<HTMLParagraphElement>("#endScoreDisplayO");

const winnerDisplay = document.querySelector<HTMLParagraphElement>("#winnerDisplay");

if (endscreenBody) {
    endscreenBody.classList.add(`theme-${theme}`);
}

function initaliseScoreBoard() {
    if(!scoreIconB || !scoreIconO) return;
    scoreIconB.src = playerIconBlue;
    scoreIconO.src = playerIconOrange;
}

function initaliseScores() {
    if( !endScoreDisplayB || !endScoreDisplayO) return;
    endScoreDisplayB.textContent = `${scoreB}`;
    endScoreDisplayO.textContent = `${scoreO}`;
}

function initaliseWinner() {
    if(!winnerDisplay || !winner) return;
    winnerDisplay.innerHTML = winner;
}

function init() {
    initaliseScoreBoard();
    initaliseScores();
    initaliseWinner();
}

init();