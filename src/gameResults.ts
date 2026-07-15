const winner = JSON.parse(sessionStorage.getItem("winning player:") || '""');
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

let winnerDisplay = document.querySelector("#winnerDisplay");
let helpMsg = document.querySelector("#helpMsg");

//code-theme:
const codeFont = "";

const codeWinnerImgB = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_blue.png";

const codeWinnerImgO = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_orange.png";

const winnerImagesCode = {
    blue: codeWinnerImgB,
    orange: codeWinnerImgO
} 

//gaming-theme:
const gamingFont = "";

const gamingWinnerImgB = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";

const gamingWinnerImgO = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";

const winnerImagesGaming = {
    blue: gamingWinnerImgB,
    orange: gamingWinnerImgO
} 

//da-theme:
const daFont = "";

const daWinnerImgB = "";

const daWinnerImgO = "";

const winnerImagesDa = {
    blue: daWinnerImgB,
    orange: daWinnerImgO
} 

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
    if(!helpMsg) return;
    if (winner == "draw") {
        helpMsg.textContent = "It's a"
    } else {
        helpMsg.textContent = "The winner is"
    }
    
    winnerDisplay.textContent =  `${winner}`;
}

function init() {
    initaliseScoreBoard();
    initaliseScores();
    initaliseWinner();
}

init();