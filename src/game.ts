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


const gameBody = document.querySelector<HTMLBodyElement>("#gameBody");
const playGround = document.querySelector<HTMLDivElement>("#playGround")!;

if (gameBody) {
    gameBody.classList.add(`theme-${gameSettings.theme}`);
}


//code-theme images:
const codeCardBack = "../../src/assets/img/game_page/code-theme/main/card/basic_card_back.png";

const codePlayerIconB = "../../src/assets/img/game_page/code-theme/header/player_label_blue.png";
const codePlayerIconO = "../../src/assets/img/game_page/code-theme/header/player_label_orange.png";

const codePlayerIcons = {
    blue: codePlayerIconB,
    orange: codePlayerIconO
}

const codeExitDefaultBtn = "../../src/assets/img/game_page/code-theme/header/exit_game_default.png";
const codeExitHoverBtn = "../../src/assets/img/game_page/code-theme/header/exit_game_hover.png";

const codeExitBtns = {
    default: codeExitDefaultBtn,
    hover: codeExitHoverBtn
}

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

const gamingCardBack = "../../src/assets/img/game_page/gaming-theme/main/card/basic_card_back.png";

const gamingPlayerIconB = "../../src/assets/img/game_page/gaming-theme/header/chess_pawn_blue.png";
const gamingPlayerIconO = "../../src/assets/img/game_page/gaming-theme/header/chess_pawn_orange.png";

const gamingPlayerIcons = {
    blue: gamingPlayerIconB,
    orange: gamingPlayerIconO
}

const gamingExitDefaultBtn = "../../src/assets/img/game_page/gaming-theme/header/exit_game_default.png";
const gamingExitHoverBtn = "../../src/assets/img/game_page/gaming-theme/header/exit_game_hover.png";

const gamingExitBtns = {
    default: gamingExitDefaultBtn,
    hover: gamingExitHoverBtn
}


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

const daCardBack = "../../src/assets/img/game_page/da-theme/main/card/basic_card_back.png";


const daPlayerIconB = "../../src/assets/img/game_page/da-theme/header/chess_pawn_blue.png";
const daPlayerIconO = "../../src/assets/img/game_page/da-theme/header/chess_pawn_orange.png";

const daPlayerIcons = {
    blue: daPlayerIconB,
    orange: daPlayerIconO
}

const daExitDefaultBtn = "../../src/assets/img/game_page/da-theme/header/exit_game_default.png";
const daExitHoverBtn = "../../src/assets/img/game_page/da-theme/header/exit_game_hover.png";

const daExitBtns = {
    default: daExitDefaultBtn,
    hover: daExitHoverBtn
}

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

const cardBacks: Record<Theme, string> = {
    code: codeCardBack,
    gaming: gamingCardBack,
    da: daCardBack
};

const playerIcons = {
    code: codePlayerIcons,
    gaming: gamingPlayerIcons,
    da: daPlayerIcons
};

let currentPlayer: Player;

const exitButtons = {
    code: codeExitBtns,
    gaming: gamingExitBtns,
    da: daExitBtns
};


// functions needed for memory:

// get the number of needed pairs for game

const currentThemeImages = themeImages[gameSettings.theme];
const currentCardBack = cardBacks[gameSettings.theme];


function getImages(): string[] {
    const pairAmount = Number(gameSettings.cards)/2;
    const selectedImages:string[] = [];
    
    for (let i = 0; i < pairAmount; i++) {
        selectedImages.push(currentThemeImages[i]);
    }
    return selectedImages;
}

function createPairs():string[] {
    const selectedImages = getImages();
    const pairedImages:string[] = [];

    selectedImages.forEach(image => {
        pairedImages.push(image, image);
    });
    return pairedImages;
}

function shuffleCards():string[] {
    const gamePairs:string[] = createPairs();
    //loop from last item to the first 
    // and swap them with a randome item from the array
    for (let i = gamePairs.length-1; i > 0; i--) {
        const randomeIndex = Math.floor(Math.random() * (i+1));
        //Fischer-Yates Shuffle
        [gamePairs[i], gamePairs[randomeIndex]] = 
        [gamePairs[randomeIndex], gamePairs[i]];
    }
    return gamePairs;
}

function placeCards() {
    //inital function to add the cards to the board
    //by using cards from GameSettings
    const cards = shuffleCards();

    cards.forEach((image) => {
        playGround.innerHTML += createCard(image)
    })
}

function createCard(image:string):string {
    return `
        <div class="card">
            <img class="card d-none" src="${image}" alt="game card">
            <img class="card " src="${currentCardBack}" alt="game card">
        </div>
    `;
}


const currentPlayerDisplay = document.querySelector("#currentPlayerDisplay")!;

function determinePlayer() {
    //inital first player by using GameSettings player
    currentPlayer = gameSettings.player;
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const icon = playerIcons[gameSettings.theme][currentPlayer];
       currentPlayerDisplay.innerHTML = `Current Player:    
       <img src="${icon}" alt="player icon">`;
}

let firstSelectedCard:Card | null = null;

function handleCardClick(card:Card) {
    //is card found? -> return
    //is card flipped? -> return
    if (card.isFound || card.isFlipped) return
    //turn card animation
    turnCard(card);

    //first flipped card? 
    if (firstSelectedCard == null) {
        firstSelectedCard = card;
        return;
    } 
    if (compareCards(card, firstSelectedCard)) {
        handlePair(card, firstSelectedCard)
    } else {
        hideCards(card, firstSelectedCard);
        changePlayer();
    }
    
    firstSelectedCard = null;
    
}

function turnCard(card:Card) {
    //turn the card by changeing to the actuall image 
    card.isFlipped = true;
    card.imgSrc = "";
}



function compareCards(card:Card, cardToCompare:Card) {
    //compares first safed card  id to the second card pairId
    if (card.pairId == cardToCompare.pairId) {
        return true;
    } else return false;
}


function hideCards(card:Card, firstSelectedCard:Card) {
    //turns cards back when no pair found
    card.isFlipped = false;
    firstSelectedCard.isFlipped = false
    return;
}


function handlePair(card:Card, firstSelectedCard:Card) {
    //pairs++ if compareCards is true
    card.isFound = true;
    firstSelectedCard.isFound = true
    //player does not change by returning back 
    //a boolean(false) 
    return;
}

function changePlayer():Player {
    if (currentPlayer == "orange") {
        currentPlayer = "blue";
    } else currentPlayer = "orange";
    return currentPlayer;
}

function checkGameOver() {
    //checks how many cards left
    //ends game when no cards left
}

const scoreIconO = document.querySelector<HTMLImageElement>("#scorePlayerIconO");
const scoreIconB = document.querySelector<HTMLImageElement>("#scorePlayerIconB");

function initaliseScoreBoard() {
    const scoreIcons = playerIcons[gameSettings.theme]
    if(!scoreIconB || !scoreIconO) return;
    scoreIconB.src = scoreIcons.blue;
    scoreIconO.src = scoreIcons.orange;
}

const exitGameBtnImage = document.querySelector<HTMLImageElement>("#exitBtnImage");

const exitGameBtn = document.querySelector<HTMLButtonElement>("#exitBtn");

function initaliseExitButton() {
    const exitBtn = exitButtons[gameSettings.theme]
    if (!exitGameBtnImage || !exitGameBtn) return;
    exitGameBtnImage.src = exitBtn.default;
    exitGameBtn.addEventListener("mouseenter", () => {
        exitGameBtnImage.src = exitBtn.hover;
    })
    exitGameBtn.addEventListener("mouseleave", () => {
        exitGameBtnImage.src = exitBtn.default;
    })
}

exitGameBtn?.addEventListener("click", () => {
    endGame();
})


function endGame() {
    //function to end the game and go back to settings.
    window.location.href = "./settings.html";
}

function initaliseHeader() {
    initaliseScoreBoard();
    initaliseExitButton();
}

function init() {
    initaliseHeader();
    placeCards();
    determinePlayer();
}


init();
export {};