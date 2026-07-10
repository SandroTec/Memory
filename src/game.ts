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
    "../../src/assets/img/game_page/code-theme/main/card/html_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/css_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/typescript_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/javascript_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/angular_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/bootstrap_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/console_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/django_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/git_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/git_hub_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/firebase_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/node_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/python_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/react_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/sass_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/vs_code_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/vueJS_card.png",
    "../../src/assets/img/game_page/code-theme/main/card/sql_card.png",
];

//gaming-theme images:

const gamingImages = [
    "../../src/assets/img/game_page/gaming-theme/main/card/ass_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/banana_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/controller_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/circle_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/dice_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/game_boy_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/level_up_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/mario_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/minecraft_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/pacman_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/pacman2_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/play_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/puzzle_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/symbol_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/snake_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/square_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/star_card",
    "../../src/assets/img/game_page/gaming-theme/main/card/triangle_card",
]

//DA-theme images:

const daImages = [
    "../../src/assets/img/game_page/da-theme/main/card/basket_card",
    "../../src/assets/img/game_page/da-theme/main/card/chef_card",
    "../../src/assets/img/game_page/da-theme/main/card/code_a_cuisine_card",
    "../../src/assets/img/game_page/da-theme/main/card/curtansie_card",
    "../../src/assets/img/game_page/da-theme/main/card/daBubble_card",
    "../../src/assets/img/game_page/da-theme/main/card/egg_card",
    "../../src/assets/img/game_page/da-theme/main/card/flower_card",
    "../../src/assets/img/game_page/da-theme/main/card/green_symbol_card",
    "../../src/assets/img/game_page/da-theme/main/card/join_logo_card",
    "../../src/assets/img/game_page/da-theme/main/card/poke_ball_card",
    "../../src/assets/img/game_page/da-theme/main/card/poll_app_card",
    "../../src/assets/img/game_page/da-theme/main/card/pollo_loco_card",
    "../../src/assets/img/game_page/da-theme/main/card/sakura_ramen_card",
    "../../src/assets/img/game_page/da-theme/main/card/sharky_card",
    "../../src/assets/img/game_page/da-theme/main/card/smiley_card",
    "../../src/assets/img/game_page/da-theme/main/card/soup_card",
    "../../src/assets/img/game_page/da-theme/main/card/tic_tac_toe_card",
    "../../src/assets/img/game_page/da-theme/main/card/violet_symbol_card",
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