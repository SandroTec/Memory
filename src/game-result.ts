type Theme = "code" | "gaming" | "da";
type Winner = "blue" | "orange" | "draw";

const WINNER:Winner = JSON.parse(sessionStorage.getItem("winning player:") || '""');
const SCORE_B = JSON.parse(sessionStorage.getItem("blue score:") || "0");
const SCORE_O= JSON.parse(sessionStorage.getItem("orange score:") || "0");
const THEME:Theme = JSON.parse(sessionStorage.getItem("theme:") || "code");
const PLAYER_ICON_BLUE = JSON.parse(sessionStorage.getItem("playerIconBlue:") || '""');
const PLAYER_ICON = JSON.parse(sessionStorage.getItem("playerIconOrange:") || '""');

const ENDSCREEN_BODY = document.querySelector<HTMLBodyElement>("#gameBody");

const SCORE_ICON_O = document.querySelector<HTMLImageElement>("#scoreIconO");
const SCORE_ICON_B = document.querySelector<HTMLImageElement>("#scoreIconB");

let endScoreDisplayB = document.querySelector<HTMLParagraphElement>("#endScoreDisplayB");
let endScoreDisplayO = document.querySelector<HTMLParagraphElement>("#endScoreDisplayO");

let winnerDisplay = document.querySelector("#winnerDisplay");
let helpMsg = document.querySelector("#helpMsg");
let winnerImageDisplay = document.querySelector<HTMLImageElement>("#winnerImageDisplay");

const HOME_BUTTON = document.querySelector<HTMLButtonElement>("#homeButton");
let buttonImage = document.querySelector<HTMLImageElement>("#buttonImage");

const SCORE_CONTAINER = document.querySelector<HTMLDivElement>("#scoreContainer");

//code-theme:
const CODE_HEADER_IMG = document.querySelector<HTMLImageElement>("#codeKonfettiImage");

const CODE_WINNER_IMG_B = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_blue.png";
const CODE_DRAW_IMG = "../../src/assets/img/game_page/code-theme/endscreen/draw_icon.png";
const CODE_WINNER_IMG_O = "../../src/assets/img/game_page/code-theme/endscreen/chess_pawn_orange.png";

const CODE_HOME_BTN_IMG = "../../src/assets/img/game_page/code-theme/endscreen/home_button.png";

const GAME_RESULT_IMAGES_CODE = {
    blue: CODE_WINNER_IMG_B,
    orange: CODE_WINNER_IMG_O,
    draw: CODE_DRAW_IMG
} 

//gaming-theme:
const GAMING_WINNER_IMG_B = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";
const GAMING_DRAW_IMG = "../../src/assets/img/game_page/gaming-theme/endscreen/draw_icon.png";
const GAMING_WINNER_IMG_O = "../../src/assets/img/game_page/gaming-theme/endscreen/winner_icon.png";

const GAMING_HOME_BTN_IMG = "../../src/assets/img/game_page/gaming-theme/endscreen/home_button.png";


const GAME_RESULT_IMAGES_GAMING = {
    blue: GAMING_WINNER_IMG_B,
    orange: GAMING_WINNER_IMG_O,
    draw: GAMING_DRAW_IMG
} 

//da-theme:
const DA_WINNER_IMG_B = "../../src/assets/img/game_page/da-theme/endscreen/chess_pawn_blue.png";
const DA_DRAW_IMG = "../../src/assets/img/game_page/da-theme/endscreen/draw_icon.png";
const DA_WINNER_IMG_O = "../../src/assets/img/game_page/da-theme/endscreen/chess_pawn_orange.png";

const DA_HOME_BTN_IMG = "../../src/assets/img/game_page/da-theme/endscreen/home_button.png";

const GAME_RESULT_IMAGES_DA = {
    blue: DA_WINNER_IMG_B,
    orange: DA_WINNER_IMG_O,
    draw: DA_DRAW_IMG
} 

const THEME_IMAGES = {
    code: GAME_RESULT_IMAGES_CODE,
    gaming: GAME_RESULT_IMAGES_GAMING,
    da: GAME_RESULT_IMAGES_DA
};

const CURENNT_WINNER_THEME_IMG = THEME_IMAGES[THEME];


if (ENDSCREEN_BODY) {
    ENDSCREEN_BODY.classList.add(`theme-${THEME}`);
}
const SCORE_DISPLAY_CONTAINER = document.querySelector("#scoreDisplayContainer");
if (SCORE_DISPLAY_CONTAINER) {
    SCORE_DISPLAY_CONTAINER.classList.add(`score-container-${THEME}`);
}

function initaliseBgColor() {
    if(THEME != "da") return
    ENDSCREEN_BODY?.classList.add("da-bg-endscreen")
}

function initaliseHeadline() {
    const HEADLINE_IMG = document.querySelector<HTMLImageElement>("#headlineImage");
    const HEADLINE = document.querySelector("h1");
    if (THEME == "code") {
        HEADLINE?.classList.add("d-none");
        HEADLINE_IMG?.classList.remove("d-none");
    } else {
        HEADLINE?.classList.remove("d-none");
        HEADLINE_IMG?.classList.add("d-none");
    }
}

function initaliseScoreBoard() {
    if(!SCORE_ICON_B || !SCORE_ICON_O) return;
    SCORE_ICON_B.src = PLAYER_ICON_BLUE;
    SCORE_ICON_O.src = PLAYER_ICON;
}

function initaliseScores() {
    if( !endScoreDisplayB || !endScoreDisplayO) return;
    endScoreDisplayB.textContent = `${SCORE_B}`;
    endScoreDisplayB.classList.add("blue");
    endScoreDisplayO.textContent = `${SCORE_O}`;
    endScoreDisplayO.classList.add("orange");

}

function initaliseWinner() {
    if(!winnerDisplay || !WINNER) return;
    if(!helpMsg) return;
    if (WINNER == "draw") {
        helpMsg.textContent = "it's a"
    } else {
        helpMsg.textContent = "the winner is"
    }
    if (WINNER == "orange") {
        winnerDisplay.classList.add("orange")
    } else if(WINNER == "blue") {
        winnerDisplay.classList.add("blue")
    }
    winnerDisplay.textContent =  `${WINNER}`;
}

function initaliseWinnerImage() {
    if(!winnerImageDisplay) return;
    winnerImageDisplay.src = CURENNT_WINNER_THEME_IMG[WINNER]
    if(THEME == "code" && WINNER != "draw") {CODE_HEADER_IMG?.classList.remove("d-none")}
}

function hideScore() {
    if (!SCORE_CONTAINER) return;
    SCORE_CONTAINER.classList.add("d-none");
}

function initaliseHomeBtn() {
    if (!buttonImage) return;
    switch (THEME) {
        case "code":
            buttonImage.src = CODE_HOME_BTN_IMG;
            break;
        case "gaming":
            buttonImage.src = GAMING_HOME_BTN_IMG;
            break;
        case "da":
            buttonImage.src = DA_HOME_BTN_IMG;
            break
        default:
            buttonImage.src = CODE_HOME_BTN_IMG;
            break;
    }
}

HOME_BUTTON?.addEventListener("click", () => {
    endGame();
})

function endGame() {
    window.location.href = "./settings.html";
}

async function init() {
    const DELAY = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    initaliseBgColor();
    initaliseHeadline();
    initaliseScoreBoard();
    initaliseScores();
    await DELAY(2000);
    initaliseWinnerImage();
    initaliseWinner();
    initaliseHomeBtn();
    hideScore();
}

init();