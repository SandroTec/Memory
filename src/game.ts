type Theme = "code" | "gaming" | "da";

type GameSettings = {
    theme: Theme;
    player: string;
    cards: string;
};

function loadGameSettings(): GameSettings {
    const storedSettings = sessionStorage.getItem("gameSettings");

    if (storedSettings) {
        return JSON.parse(storedSettings);
    }

    return {
        theme: "code",
        player: "blue",
        cards: "16"
    };
}

const gameSettings = loadGameSettings();

let currentPlayer = gameSettings.player;

const gameBody = document.querySelector<HTMLBodyElement>("#gameBody");
const playGround = document.querySelector<HTMLDivElement>("#playGround");

if (gameBody) {
    gameBody.classList.add(`theme-${gameSettings.theme}`);
}


//code-theme images:
const codeCardBack = "../../src/assets/img/game_page/code-theme/main/cards/basic_card_back.png" 

const codeImages = [
    "../../src/assets/img/game_page/code-theme/html_card.png",
    "../../src/assets/img/game_page/code-theme/css_card.png",
    "../../src/assets/img/game_page/code-theme/typescript_card.png",
    "../../src/assets/img/game_page/code-theme/javascript_card.png",
    "../../src/assets/img/game_page/code-theme/angular_card.png",
    "../../src/assets/img/game_page/code-theme/bootstrap_card.png",
    "../../src/assets/img/game_page/code-theme/console_card.png",
    "../../src/assets/img/game_page/code-theme/django_card.png",
    "../../src/assets/img/game_page/code-theme/git_card.png",
    "../../src/assets/img/game_page/code-theme/git_hub_card.png",
    "../../src/assets/img/game_page/code-theme/firebase_card.png",
    "../../src/assets/img/game_page/code-theme/node_card.png",
    "../../src/assets/img/game_page/code-theme/python_card.png",
    "../../src/assets/img/game_page/code-theme/react_card.png",
    "../../src/assets/img/game_page/code-theme/sass_card.png",
    "../../src/assets/img/game_page/code-theme/vs_code_card.png",
    "../../src/assets/img/game_page/code-theme/vueJS_card.png",
    "../../src/assets/img/game_page/code-theme/sql_card.png",
];

const gamingImages = [
    "../../src/assets/img/game_page/gaming-theme/ass_card",
    "../../src/assets/img/game_page/gaming-theme/banana_card",
    "../../src/assets/img/game_page/gaming-theme/controller_card",
    "../../src/assets/img/game_page/gaming-theme/circle_card",
    "../../src/assets/img/game_page/gaming-theme/dice_card",
    "../../src/assets/img/game_page/gaming-theme/game_boy_card",
    "../../src/assets/img/game_page/gaming-theme/level_up_card",
    "../../src/assets/img/game_page/gaming-theme/mario_card",
    "../../src/assets/img/game_page/gaming-theme/minecraft_card",
    "../../src/assets/img/game_page/gaming-theme/pacman_card",
    "../../src/assets/img/game_page/gaming-theme/pacman2_card",
    "../../src/assets/img/game_page/gaming-theme/play_card",
    "../../src/assets/img/game_page/gaming-theme/puzzle_card",
    "../../src/assets/img/game_page/gaming-theme/rectangle_card",
    "../../src/assets/img/game_page/gaming-theme/snake_card",
    "../../src/assets/img/game_page/gaming-theme/square_card",
    "../../src/assets/img/game_page/gaming-theme/star_card",
    "../../src/assets/img/game_page/gaming-theme/triangle_card",
]

const daImages = [
    "../../src/assets/img/game_page/gaming-theme/pacman_card",
]

const themeImages: Record<Theme, string[]> = {
    code: codeImages,
    gaming: gamingImages,
    da: daImages
};


// functions needed for memory:

// get the number of needed pairs for game
const currentThemeImages = themeImages[gameSettings.theme];
function getImages(): string[] {
    const pairAmount = Number(gameSettings.cards)/2;
    const selectedImages:string[] = [];
    
    for (let i = 0; i < pairAmount; i++) {
        selectedImages.push(currentThemeImages[i]);
    }
    return selectedImages;
}

function createCard() {
    return `
        <div class="card">
            
            ...
        </div>
    `;
}

function placeCards() {
    //inital function to add the cards to the board
    //by using cards from GameSettings
    switch (gameSettings.cards) {
        case "24":
            createCard(card);
            break;
        case "36":
            
            break;
    
        default:

            break;
    }
}

function shuffleCards() {
    //mix card pairs with an simple math.randome algo, 
}

function determinePlayer() {
    //inital first player by using GameSettings player
}

function handleCardClick(card) {
    //-> turn card
}

function turnCard(card) {
    //turn the card by changeing to the actuall image 
}

function hideCards() {
    //turns cards back when no pair found
}

function compareCards() {
    //compares first safed card  id to the second card id
    //cards need an id to compare them by that
}

function handlePair() {
    //pairs++ if compareCards is true
    //player does not change by returning back 
    //a boolean(false) 
}

function changePlayer() {
    //change current player when no pair is found
}

function checkGameOver() {
    //checks how many cards left
    //ends game when no cards left
}


export {};