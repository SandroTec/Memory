import {
    CODE_CARD_BACK,
    GAMING_CARD_BACK,
    DA_CARD_BACK,

    CODE_PLAYER_ICONS,
    GAMING_PLAYER_ICONS,
    DA_PLAYER_ICONS,

    CURRENT_PLAYER_ICON
} from "./load-images.js";



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

const CARD_BACKS: Record<Theme, string> = {
    code: CODE_CARD_BACK,
    gaming: GAMING_CARD_BACK,
    da: DA_CARD_BACK
};

const PLAYER_ICONS = {
    code: CODE_PLAYER_ICONS,
    gaming: GAMING_PLAYER_ICONS,
    da: DA_PLAYER_ICONS
};

let currentPlayer: Player;
let currentPlayerIcons = CURRENT_PLAYER_ICON
const CURRENT_CARD_BACK = CARD_BACKS[GAME_SETTINGS.theme];

function createCard(card: Card): string {
    const CARD_JSON = JSON.stringify(card);
    return `
        <div class="card" data-card-id="${card.id}" data-card-object='${CARD_JSON}'>
            <div class="card_inner">
                <img class="card_img card_front" src="${card.imgSrc}" alt="game card">
                <img class="card_img card_back" src="${CURRENT_CARD_BACK}" alt="game card">
            </div>
        </div>
    `;
}

const CURENT_PLAYER_DISPLAY = document.querySelector("#currentPlayerDisplay")!;

function updateCurrentPlayerDisplay() {
    currentPlayer = GAME_SETTINGS.player;
    const ICON = PLAYER_ICONS[GAME_SETTINGS.theme][currentPlayer];
    if (GAME_SETTINGS.theme == "code") {
        CURENT_PLAYER_DISPLAY.innerHTML = `
            Current Player:    
                <img src="${ICON}" alt="player icon">
        `
    } else {
        CURENT_PLAYER_DISPLAY.innerHTML = `
            Current Player:    
            <div class="icon-container ${currentPlayer}-bg">
                <img src="${currentPlayerIcons}" alt="player icon">
            </div>
        `
    }
}

export {
    createCard,
    updateCurrentPlayerDisplay,

};
