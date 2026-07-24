import {
    CODE_IMAGES,
    GAMING_IMAGES,
    DA_IMAGES,

    CODE_CARD_BACK,
    GAMING_CARD_BACK,
    DA_CARD_BACK,

    CODE_PLAYER_ICONS,
    GAMING_PLAYER_ICONS,
    DA_PLAYER_ICONS,


} from "./load-images.js";

import {
    createCard,
    updateCurrentPlayerDisplay,
} from "./template.js";

type Theme = "code" | "gaming" | "da";

type Player = "blue" | "orange";

type ExitBtn = "default" | "hover";

type Card =  {
    id : number,
    pairId : number,
    imgSrc : string,
    isFlipped : boolean,
    isFound : boolean,
}

type GameSettings = {
    theme: Theme;
    player: Player;
    cards: string;
};

// get game settings from session storage
function loadGameSettings(): GameSettings {
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
const GAME_BODY = document.querySelector<HTMLBodyElement>("#gameBody");
const PLAY_GROUND = document.querySelector<HTMLDivElement>("#playGround")!;

if (GAME_BODY) {
    GAME_BODY.classList.add(`theme-${GAME_SETTINGS.theme}`);
}

const THEME_IMGS: Record<Theme, string[]> = {
    code: CODE_IMAGES,
    gaming: GAMING_IMAGES,
    da: DA_IMAGES
};

const PLAYER_ICONS = {
    code: CODE_PLAYER_ICONS,
    gaming: GAMING_PLAYER_ICONS,
    da: DA_PLAYER_ICONS
};

let currentPlayer: Player;


const CURRENT_THEME_IMGS = THEME_IMGS[GAME_SETTINGS.theme];

//select images from img array
function getImages(): string[] {
    const PAIR_AMOUNT = Number(GAME_SETTINGS.cards)/2;
    const SELECTED_IMGS:string[] = [];
    for (let i = 0; i < PAIR_AMOUNT; i++) {
        SELECTED_IMGS.push(CURRENT_THEME_IMGS[i]);
    }
    return SELECTED_IMGS;
}

function initaliseCard(id: number, pairId: number, imgSrc: string): Card {
    return {
        id,
        pairId,
        imgSrc,
        isFlipped: false,
        isFound: false
    };
}

function createCardPair(image: string, id: number, pairId: number): Card[] {
    return [
        initaliseCard(id, pairId, image),
        initaliseCard(id + 1, pairId, image)
    ];
}

function createPairs(): Card[] {
    const selectedImages = getImages();
    const pairedCards: Card[] = [];

    let id = 0;
    let pairId = 0;

    selectedImages.forEach(image => {
        pairedCards.push(...createCardPair(image, id, pairId));
        id += 2;
        pairId++;
    });

    return pairedCards;
}

// Shuffle cards using Fischer-Yates Shuffle
function shuffleCards():Card[] {
    const GAME_PAIRS:Card[] = createPairs();
    for (let i = GAME_PAIRS.length-1; i > 0; i--) {
        const RANDOME_INDEX = Math.floor(Math.random() * (i+1));
        [GAME_PAIRS[i], GAME_PAIRS[RANDOME_INDEX]] = 
        [GAME_PAIRS[RANDOME_INDEX], GAME_PAIRS[i]];
    }
    return GAME_PAIRS;
}

// places the cards on the board
function placeCards() {
    const CARDS = shuffleCards();
    let htmlBuffer = "";  
    CARDS.forEach((card) => {
        htmlBuffer += createCard(card);
    });
    PLAY_GROUND.innerHTML = htmlBuffer;
    if(GAME_SETTINGS.cards == "36") {
        PLAY_GROUND.classList.add("grid6x");
    } else {PLAY_GROUND.classList.add("grid4x");}
    initCardEventListeners();
}

function initCardEventListeners() {
    const CARD_ELEMENTS = document.querySelectorAll<HTMLDivElement>("[data-card-id]");
    CARD_ELEMENTS.forEach(cardElement => {
        cardElement.addEventListener("click", () => {      
            const CARD_JSON = cardElement.getAttribute("data-card-object");
            if (CARD_JSON) {
                const CARD_BY_ID = JSON.parse(CARD_JSON) as Card;
                handleCardClick(CARD_BY_ID);
            }
        });
    });
}

let firstSelectedCard:Card | null = null;
let cardsSelected:boolean = false;

// master function to handle card click
async function handleCardClick(card:Card) {
    if (card.isFlipped || card.isFound || cardsSelected) return;
    turnCard(card);
    if (firstSelectedCard == null) {
        firstSelectedCard = card;
        const FIRST_FLIPPED_CARD = document.querySelector<HTMLDivElement>(`[data-card-id="${card.id}"]`)!;
        FIRST_FLIPPED_CARD.style.cursor = "not-allowed";
        return;
    } 
    if (firstSelectedCard.id == card.id) return;
    const IS_MATCH = await compareCards(card, firstSelectedCard);
    if (IS_MATCH) {
        handlePair(card, firstSelectedCard)
    } else {
        hideCards(card, firstSelectedCard);
        changePlayer();
    }
    if (checkGameOver()) {
        determineWinner();
    }
    firstSelectedCard = null;    
}

function turnCard(card: Card) {
    card.isFlipped = true;
    const CARD_ELEMENT = document.querySelector(`[data-card-id="${card.id}"]`);
    CARD_ELEMENT?.classList.add("is-flipped");
}

async function compareCards(card:Card, cardToCompare:Card):Promise<boolean> {
    const DELAY = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    //compares first safed card  id to the second card pairId
    cardsSelected = true;
    if (card.pairId == cardToCompare.pairId) {
        return true;
    } else {
        await DELAY(1000);
        return false;
    }
}

function hideCards(card: Card, firstSelectedCard: Card) {
    document.querySelector(`[data-card-id="${card.id}"]`)?.classList.remove("is-flipped");
    document.querySelector(`[data-card-id="${firstSelectedCard.id}"]`)?.classList.remove("is-flipped");
    card.isFlipped = false;
    firstSelectedCard.isFlipped = false;
    return;
}

const PLAYER_PAIRS:Record<Player, number> = {
    blue: 0,
    orange: 0
}
let scoreDisplayB = document.querySelector("#scoreDisplayB");
let scoreDisplayO = document.querySelector("#scoreDisplayO");

function handlePair(card:Card, firstSelectedCard:Card) {
    const CARD_ELEMENT = document.querySelector<HTMLDivElement>(`[data-card-id="${card.id}"]`);
    const FIRST_CARD_ELEMENT = document.querySelector<HTMLDivElement>(`[data-card-id="${firstSelectedCard.id}"]`);
    PLAYER_PAIRS[currentPlayer]++;
    card.isFound = true;
    firstSelectedCard.isFound = true;
    cardsSelected = false;
    if (!scoreDisplayB || !scoreDisplayO) return
    scoreDisplayB.textContent = `${PLAYER_PAIRS.blue}`;
    scoreDisplayO.textContent = `${PLAYER_PAIRS.orange}`;
    if (!CARD_ELEMENT || !FIRST_CARD_ELEMENT) return
    changeCard(CARD_ELEMENT, FIRST_CARD_ELEMENT, card);
    return;
}

function changeCard(CARD_ELEMENT:HTMLDivElement, FIRST_CARD_ELEMENT:HTMLDivElement, card:Card) {
    CARD_ELEMENT.setAttribute("data-card-object", JSON.stringify(card));
    CARD_ELEMENT.style.cursor = "not-allowed";
    FIRST_CARD_ELEMENT.setAttribute("data-card-object", JSON.stringify(firstSelectedCard));
    FIRST_CARD_ELEMENT.style.cursor = "not-allowed";
    return
}

function changePlayer() {
    cardsSelected = false;
    if (currentPlayer == "orange") {
        currentPlayer = "blue";
    } else currentPlayer = "orange";
    updateCurrentPlayerDisplay();
}

function checkGameOver() {
    const POSSIBLE_PAIRS = Number(GAME_SETTINGS.cards)/2;
    const PAIRS_LEFT = POSSIBLE_PAIRS - (PLAYER_PAIRS.blue + PLAYER_PAIRS.orange)
    if (PAIRS_LEFT != 0) {return false}
    else return true;
}

const SCORE_ICON_O = document.querySelector<HTMLImageElement>("#scorePlayerIconO");
const SCORE_ICON_B = document.querySelector<HTMLImageElement>("#scorePlayerIconB");

function initaliseScoreBoard() {
    const SCORE_ICONS = PLAYER_ICONS[GAME_SETTINGS.theme]
    if(!SCORE_ICON_B || !SCORE_ICON_O) return;
    SCORE_ICON_B.src = SCORE_ICONS.blue;
    SCORE_ICON_O.src = SCORE_ICONS.orange;
}

const EXIT_GAME_BTN = document.querySelector<HTMLButtonElement>("#exitBtn");
const EXIT_DIALOG = document.querySelector<HTMLDialogElement>("#exitDialog");
const CONFIRM_EXIT_BTN = document.querySelector<HTMLButtonElement>("#confirmExitBtn");
const CANCEL_EXIT_BTN = document.querySelector<HTMLButtonElement>("#cancelExitBtn");


const EXIT_ICON_DEFAULT = "../assets/img/game_page/exit-icon.png";
const EXIT_ICON_RED = "../assets/img/game_page/gaming-theme/header/exit-icon-red.png";
const EXIT_ICON_BLUE = "../assets/img/game_page/da-theme/header/exit-icon-blue.png";

const EXIT_ICON = document.querySelector<HTMLImageElement>("#exitIcon");
let cancelBtnText = document.querySelector<HTMLParagraphElement>(".btn_txt_cancel");
let confirmBtnText = document.querySelector<HTMLParagraphElement>(".btn_txt_confirm");

function initaliseExitIcon() {
    if(!EXIT_ICON || !cancelBtnText || !confirmBtnText) return;
    switch (GAME_SETTINGS.theme) {
        case "gaming":
            cancelBtnText.innerText = "No, back to game";
            confirmBtnText.innerText = "Yes, quit game";
            break;
    
        case "da":
            EXIT_ICON.src = EXIT_ICON_BLUE;
            break;
    
        default:
            EXIT_ICON.src = EXIT_ICON_DEFAULT
            break;
    }
}

EXIT_GAME_BTN?.addEventListener("click", () => {
    if(!EXIT_DIALOG) return;
    EXIT_DIALOG.showModal();
})

EXIT_GAME_BTN?.addEventListener("mouseenter", () => {
    if(!EXIT_ICON_RED || !EXIT_ICON) return;
    if (GAME_SETTINGS.theme == "gaming") {
        EXIT_ICON.src = EXIT_ICON_RED;
    }
    if (GAME_SETTINGS.theme == "da") {
        EXIT_ICON.src = EXIT_ICON_DEFAULT;
    }
})

EXIT_GAME_BTN?.addEventListener("mouseleave", () => {
    if(!EXIT_ICON_RED || !EXIT_ICON) return;
    if (GAME_SETTINGS.theme == "gaming") {
        EXIT_ICON.src = EXIT_ICON_DEFAULT;
    }
    if (GAME_SETTINGS.theme == "da") {
        EXIT_ICON.src = EXIT_ICON_BLUE;
    }
})

CONFIRM_EXIT_BTN?.addEventListener("click", () => {
    if(!EXIT_DIALOG) return;
    EXIT_DIALOG.close();
    endGame()
})

CANCEL_EXIT_BTN?.addEventListener("click", () => {
    if(!EXIT_DIALOG) return;
    EXIT_DIALOG.close();
})

function endGame() {
    window.location.href = "./settings.html";
}

function determineWinner() {
    if (PLAYER_PAIRS.blue > PLAYER_PAIRS.orange) {
        loadEndscreen("blue", PLAYER_PAIRS.blue, PLAYER_PAIRS.orange);
    } else if (PLAYER_PAIRS.blue < PLAYER_PAIRS.orange) {
        loadEndscreen("orange", PLAYER_PAIRS.blue, PLAYER_PAIRS.orange);
    } else {
        loadEndscreen("draw", PLAYER_PAIRS.blue, PLAYER_PAIRS.orange);
    }
}

function saveGameWinner(gameWinner:string, scoreB:number, scoreO:number) {
    sessionStorage.setItem("winning player:", JSON.stringify(gameWinner));
    sessionStorage.setItem("blue score:" , JSON.stringify(scoreB));
    sessionStorage.setItem("orange score:" , JSON.stringify(scoreO));
    sessionStorage.setItem("theme:", JSON.stringify(GAME_SETTINGS.theme));
    sessionStorage.setItem("playerIconBlue:", JSON.stringify(PLAYER_ICONS[GAME_SETTINGS.theme].blue));
    sessionStorage.setItem("playerIconOrange:", JSON.stringify(PLAYER_ICONS[GAME_SETTINGS.theme].orange));
}

function loadEndscreen(winner:string, scoreB:number, scoreO:number) {
    saveGameWinner(winner, scoreB, scoreO);
    window.location.href = "./endscreen.html";
}

function initaliseHeader() {
    initaliseScoreBoard();
    initaliseExitIcon();
}

function init() {
    initaliseHeader();
    placeCards();
    updateCurrentPlayerDisplay();
}

init();
export {};