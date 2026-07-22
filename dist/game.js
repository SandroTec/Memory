import { CODE_IMAGES, GAMING_IMAGES, DA_IMAGES, CODE_CARD_BACK, GAMING_CARD_BACK, DA_CARD_BACK, CODE_PLAYER_ICONS, GAMING_PLAYER_ICONS, DA_PLAYER_ICONS, CODE_EXIT_BTNS, GAMING_EXIT_BTNS, DA_EXIT_BTNS, CODE_BACK_TO_GAME_BTNS, GAMING_BACK_TO_GAME_BTNS, DA_BACK_TO_GAME_BTNS, CODE_END_GAME, GAMING_END_GAME, DA_END_GAME_BTNS, } from "./load-images.js";
import { createCard, updateCurrentPlayerDisplay, } from "./template.js";
function loadGameSettings() {
    const STORED_SETTINGS = sessionStorage.getItem("gameSettings");
    if (STORED_SETTINGS) {
        return JSON.parse(STORED_SETTINGS);
    }
    return {
        theme: "code",
        player: "blue",
        cards: "16"
    };
}
const GAME_SETTINGS = loadGameSettings();
const GAME_BODY = document.querySelector("#gameBody");
const PLAY_GROUND = document.querySelector("#playGround");
if (GAME_BODY) {
    GAME_BODY.classList.add(`theme-${GAME_SETTINGS.theme}`);
}
const THEME_IMGS = {
    code: CODE_IMAGES,
    gaming: GAMING_IMAGES,
    da: DA_IMAGES
};
const CARD_BACKS = {
    code: CODE_CARD_BACK,
    gaming: GAMING_CARD_BACK,
    da: DA_CARD_BACK
};
const PLAYER_ICONS = {
    code: CODE_PLAYER_ICONS,
    gaming: GAMING_PLAYER_ICONS,
    da: DA_PLAYER_ICONS
};
let currentPlayer;
const EXIT_BTNS = {
    code: CODE_EXIT_BTNS,
    gaming: GAMING_EXIT_BTNS,
    da: DA_EXIT_BTNS
};
const BACK_TO_GAME_BTNS = {
    code: CODE_BACK_TO_GAME_BTNS,
    gaming: GAMING_BACK_TO_GAME_BTNS,
    da: DA_BACK_TO_GAME_BTNS
};
const END_GAME_BTNS = {
    code: CODE_END_GAME,
    gaming: GAMING_END_GAME,
    da: DA_END_GAME_BTNS
};
const CURRENT_THEME_IMGS = THEME_IMGS[GAME_SETTINGS.theme];
function getImages() {
    const PAIR_AMOUNT = Number(GAME_SETTINGS.cards) / 2;
    const SELECTED_IMGS = [];
    for (let i = 0; i < PAIR_AMOUNT; i++) {
        SELECTED_IMGS.push(CURRENT_THEME_IMGS[i]);
    }
    return SELECTED_IMGS;
}
function initaliseCard(id, pairId, imgSrc) {
    return {
        id,
        pairId,
        imgSrc,
        isFlipped: false,
        isFound: false
    };
}
function createCardPair(image, id, pairId) {
    return [
        initaliseCard(id, pairId, image),
        initaliseCard(id + 1, pairId, image)
    ];
}
function createPairs() {
    const selectedImages = getImages();
    const pairedCards = [];
    let id = 0;
    let pairId = 0;
    selectedImages.forEach(image => {
        pairedCards.push(...createCardPair(image, id, pairId));
        id += 2;
        pairId++;
    });
    return pairedCards;
}
function shuffleCards() {
    const GAME_PAIRS = createPairs();
    for (let i = GAME_PAIRS.length - 1; i > 0; i--) {
        const RANDOME_INDEX = Math.floor(Math.random() * (i + 1));
        [GAME_PAIRS[i], GAME_PAIRS[RANDOME_INDEX]] =
            [GAME_PAIRS[RANDOME_INDEX], GAME_PAIRS[i]];
    }
    return GAME_PAIRS;
}
function placeCards() {
    const CARDS = shuffleCards();
    let htmlBuffer = "";
    CARDS.forEach((card) => {
        htmlBuffer += createCard(card);
    });
    PLAY_GROUND.innerHTML = htmlBuffer;
    if (GAME_SETTINGS.cards == "36") {
        PLAY_GROUND.classList.add("grid6x");
    }
    else {
        PLAY_GROUND.classList.add("grid4x");
    }
    initCardEventListeners();
}
function initCardEventListeners() {
    const CARD_ELEMENTS = document.querySelectorAll("[data-card-id]");
    CARD_ELEMENTS.forEach(cardElement => {
        cardElement.addEventListener("click", () => {
            const CARD_JSON = cardElement.getAttribute("data-card-object");
            if (CARD_JSON) {
                const CARD_BY_ID = JSON.parse(CARD_JSON);
                handleCardClick(CARD_BY_ID);
            }
        });
    });
}
let firstSelectedCard = null;
let cardsSelected = false;
async function handleCardClick(card) {
    if (card.isFlipped || card.isFound || cardsSelected)
        return;
    turnCard(card);
    if (firstSelectedCard == null) {
        firstSelectedCard = card;
        const FIRST_FLIPPED_CARD = document.querySelector(`[data-card-id="${card.id}"]`);
        FIRST_FLIPPED_CARD.style.cursor = "not-allowed";
        return;
    }
    if (firstSelectedCard.id == card.id)
        return;
    const IS_MATCH = await compareCards(card, firstSelectedCard);
    if (IS_MATCH) {
        handlePair(card, firstSelectedCard);
    }
    else {
        hideCards(card, firstSelectedCard);
        changePlayer();
    }
    if (checkGameOver()) {
        determineWinner();
    }
    firstSelectedCard = null;
}
function turnCard(card) {
    card.isFlipped = true;
    const CARD_ELEMENT = document.querySelector(`[data-card-id="${card.id}"]`);
    CARD_ELEMENT?.classList.add("is-flipped");
}
async function compareCards(card, cardToCompare) {
    const DELAY = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    cardsSelected = true;
    if (card.pairId == cardToCompare.pairId) {
        return true;
    }
    else {
        await DELAY(1000);
        return false;
    }
}
function hideCards(card, firstSelectedCard) {
    document.querySelector(`[data-card-id="${card.id}"]`)?.classList.remove("is-flipped");
    document.querySelector(`[data-card-id="${firstSelectedCard.id}"]`)?.classList.remove("is-flipped");
    card.isFlipped = false;
    firstSelectedCard.isFlipped = false;
    return;
}
const PLAYER_PAIRS = {
    blue: 0,
    orange: 0
};
let scoreDisplayB = document.querySelector("#scoreDisplayB");
let scoreDisplayO = document.querySelector("#scoreDisplayO");
function handlePair(card, firstSelectedCard) {
    const CARD_ELEMENT = document.querySelector(`[data-card-id="${card.id}"]`);
    const FIRST_CARD_ELEMENT = document.querySelector(`[data-card-id="${firstSelectedCard.id}"]`);
    PLAYER_PAIRS[currentPlayer]++;
    card.isFound = true;
    firstSelectedCard.isFound = true;
    cardsSelected = false;
    if (!scoreDisplayB || !scoreDisplayO)
        return;
    scoreDisplayB.textContent = `${PLAYER_PAIRS.blue}`;
    scoreDisplayO.textContent = `${PLAYER_PAIRS.orange}`;
    if (!CARD_ELEMENT || !FIRST_CARD_ELEMENT)
        return;
    changeCard(CARD_ELEMENT, FIRST_CARD_ELEMENT, card);
    return;
}
function changeCard(CARD_ELEMENT, FIRST_CARD_ELEMENT, card) {
    CARD_ELEMENT.setAttribute("data-card-object", JSON.stringify(card));
    CARD_ELEMENT.style.cursor = "not-allowed";
    FIRST_CARD_ELEMENT.setAttribute("data-card-object", JSON.stringify(firstSelectedCard));
    FIRST_CARD_ELEMENT.style.cursor = "not-allowed";
    return;
}
function changePlayer() {
    cardsSelected = false;
    if (currentPlayer == "orange") {
        currentPlayer = "blue";
    }
    else
        currentPlayer = "orange";
    updateCurrentPlayerDisplay();
}
function checkGameOver() {
    const POSSIBLE_PAIRS = Number(GAME_SETTINGS.cards) / 2;
    const PAIRS_LEFT = POSSIBLE_PAIRS - (PLAYER_PAIRS.blue + PLAYER_PAIRS.orange);
    if (PAIRS_LEFT != 0) {
        return false;
    }
    else
        return true;
}
const SCORE_ICON_O = document.querySelector("#scorePlayerIconO");
const SCORE_ICON_B = document.querySelector("#scorePlayerIconB");
function initaliseScoreBoard() {
    const SCORE_ICONS = PLAYER_ICONS[GAME_SETTINGS.theme];
    if (!SCORE_ICON_B || !SCORE_ICON_O)
        return;
    SCORE_ICON_B.src = SCORE_ICONS.blue;
    SCORE_ICON_O.src = SCORE_ICONS.orange;
}
const EXIT_GAME_BTN_IMG = document.querySelector("#exitBtnImage");
const EXIT_GAME_BTN = document.querySelector("#exitBtn");
const EXIT_DIALOG = document.querySelector("#exitDialog");
const CONFIRM_EXIT_BTN = document.querySelector("#confirmExitBtn");
const CANCEL_EXIT_BTN = document.querySelector("#cancelExitBtn");
function initaliseExitButton() {
    const EXIT_BTN = EXIT_BTNS[GAME_SETTINGS.theme];
    if (!EXIT_GAME_BTN_IMG || !EXIT_GAME_BTN)
        return;
    EXIT_GAME_BTN_IMG.src = EXIT_BTN.default;
    EXIT_GAME_BTN.addEventListener("mouseenter", () => {
        EXIT_GAME_BTN_IMG.src = EXIT_BTN.hover;
    });
    EXIT_GAME_BTN.addEventListener("mouseleave", () => {
        EXIT_GAME_BTN_IMG.src = EXIT_BTN.default;
    });
}
function initaliseBackToGameButton() {
    const BACK_TO_GAME_BTN = BACK_TO_GAME_BTNS[GAME_SETTINGS.theme];
    if (!CANCEL_EXIT_BTN)
        return;
    CANCEL_EXIT_BTN.src = BACK_TO_GAME_BTN.default;
    CANCEL_EXIT_BTN.addEventListener("mouseenter", () => {
        CANCEL_EXIT_BTN.src = BACK_TO_GAME_BTN.hover;
    });
    CANCEL_EXIT_BTN.addEventListener("mouseleave", () => {
        CANCEL_EXIT_BTN.src = BACK_TO_GAME_BTN.default;
    });
}
function initaliseEndGameButtonDa() {
    if (!CONFIRM_EXIT_BTN)
        return;
    if (GAME_SETTINGS.theme == "da") {
        const END_GAME_BTN = END_GAME_BTNS[GAME_SETTINGS.theme];
        CONFIRM_EXIT_BTN.src = END_GAME_BTN.default;
        CONFIRM_EXIT_BTN.addEventListener("mouseenter", () => {
            CONFIRM_EXIT_BTN.src = END_GAME_BTN.hover;
        });
        CONFIRM_EXIT_BTN.addEventListener("mouseleave", () => {
            CONFIRM_EXIT_BTN.src = END_GAME_BTN.default;
        });
    }
}
function initaliseEndGameButton() {
    if (!CONFIRM_EXIT_BTN)
        return;
    if (GAME_SETTINGS.theme != "da") {
        const END_GAME_BTN = END_GAME_BTNS[GAME_SETTINGS.theme];
        CONFIRM_EXIT_BTN.src = END_GAME_BTN;
        CONFIRM_EXIT_BTN.addEventListener("mouseenter", () => {
            CONFIRM_EXIT_BTN.classList.add(`bg-color-${GAME_SETTINGS.theme}`);
        });
        CONFIRM_EXIT_BTN.addEventListener("mouseleave", () => {
            CONFIRM_EXIT_BTN.classList.remove(`bg-color-${GAME_SETTINGS.theme}`);
        });
    }
}
EXIT_GAME_BTN?.addEventListener("click", () => {
    if (!EXIT_DIALOG)
        return;
    EXIT_DIALOG.showModal();
});
CONFIRM_EXIT_BTN?.addEventListener("click", () => {
    if (!EXIT_DIALOG)
        return;
    EXIT_DIALOG.close();
    endGame();
});
CANCEL_EXIT_BTN?.addEventListener("click", () => {
    if (!EXIT_DIALOG)
        return;
    EXIT_DIALOG.close();
});
function endGame() {
    window.location.href = "./settings.html";
}
function determineWinner() {
    if (PLAYER_PAIRS.blue > PLAYER_PAIRS.orange) {
        loadEndscreen("blue", PLAYER_PAIRS.blue, PLAYER_PAIRS.orange);
    }
    else if (PLAYER_PAIRS.blue < PLAYER_PAIRS.orange) {
        loadEndscreen("orange", PLAYER_PAIRS.blue, PLAYER_PAIRS.orange);
    }
    else {
        loadEndscreen("draw", PLAYER_PAIRS.blue, PLAYER_PAIRS.orange);
    }
}
function saveGameWinner(gameWinner, scoreB, scoreO) {
    sessionStorage.setItem("winning player:", JSON.stringify(gameWinner));
    sessionStorage.setItem("blue score:", JSON.stringify(scoreB));
    sessionStorage.setItem("orange score:", JSON.stringify(scoreO));
    sessionStorage.setItem("theme:", JSON.stringify(GAME_SETTINGS.theme));
    sessionStorage.setItem("playerIconBlue:", JSON.stringify(PLAYER_ICONS[GAME_SETTINGS.theme].blue));
    sessionStorage.setItem("playerIconOrange:", JSON.stringify(PLAYER_ICONS[GAME_SETTINGS.theme].orange));
}
function loadEndscreen(winner, scoreB, scoreO) {
    saveGameWinner(winner, scoreB, scoreO);
    window.location.href = "./endscreen.html";
}
function initaliseHeader() {
    initaliseScoreBoard();
    initaliseExitButton();
    initaliseBackToGameButton();
    initaliseEndGameButtonDa();
    initaliseEndGameButton();
}
function init() {
    initaliseHeader();
    placeCards();
    updateCurrentPlayerDisplay();
}
init();
