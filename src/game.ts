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

function createPairs():Card[] {
    const selectedImages = getImages();
    const pairedCards:Card[] = [];
    let id = 0;
    let pairId = 0;
    selectedImages.forEach(image => {
        
        const firstCard:Card = {
            id: id++,
            pairId: pairId,
            imgSrc: image,
            isFlipped: false,
            isFound: false
        }

        pairedCards.push(firstCard);
        

        const secondCard:Card = {
            id: id++,
            pairId: pairId++,
            imgSrc: image,
            isFlipped: false,
            isFound: false
        }

        pairedCards.push(secondCard);
        
    });
    return pairedCards;
}

function shuffleCards():Card[] {
    const gamePairs:Card[] = createPairs();
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
    const cards = shuffleCards();
    let htmlBuffer = "";

    cards.forEach((card) => {
        htmlBuffer += createCard(card);
    });
    
    playGround.innerHTML = htmlBuffer;

    initCardEventListeners();
}
function createCard(card:Card):string {
    const cardJson = JSON.stringify(card);
    return `
        <div class="card" data-card-id="${card.id}" data-card-object='${cardJson}'>
            <img class="card d-none" id="card${card.id}" src="${card.imgSrc}" alt="game card">
            <img class="card" id="cardBack${card.id}" src="${currentCardBack}" alt="game card">
        </div>
    `;
}

function initCardEventListeners() {
    const cardElements = document.querySelectorAll<HTMLDivElement>("[data-card-id]");
    
    cardElements.forEach(cardElement => {
        cardElement.addEventListener("click", () => {
            
            const cardJson = cardElement.getAttribute("data-card-object");
            if (cardJson) {
                const cardById = JSON.parse(cardJson) as Card;
                handleCardClick(cardById);
            }
        });
    });
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
let cardsSelected:boolean = false;
async function handleCardClick(card:Card) {
    //is card found? -> return
    //is card flipped? -> return
    if (card.isFound || card.isFlipped) return
    if (cardsSelected) return
    //turn card animation
    turnCard(card);

    //first flipped card? 
    if (firstSelectedCard == null) {
        firstSelectedCard = card;
        return;
    } 
    const isMatch = await compareCards(card, firstSelectedCard);
    if (isMatch) {
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

function turnCard(card:Card) {
    //turn the card by changeing to the actuall image 
    card.isFlipped = true;
    const flippedCard = document.querySelector("#card" + card.id);
    const cardBack = document.querySelector("#cardBack" + card.id);
    cardBack?.classList.add("d-none");
    flippedCard?.classList.remove("d-none");
}



async function compareCards(card:Card, cardToCompare:Card):Promise<boolean> {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    //compares first safed card  id to the second card pairId
    cardsSelected = true;
    if (card.pairId == cardToCompare.pairId) {
        await delay(2000);
        return true;
    } else {
        await delay(2000);
        return false;
    }
}


function hideCards(card:Card, firstSelectedCard:Card) {
    //turns cards back when no pair found
    const firstFlippedCard = document.querySelector("#card" + firstSelectedCard.id);
    const firstCardBack = document.querySelector("#cardBack" + firstSelectedCard.id);
    firstCardBack?.classList.remove("d-none");
    firstFlippedCard?.classList.add("d-none");
    card.isFlipped = false;
    const flippedCard = document.querySelector("#card" + card.id);
    const cardBack = document.querySelector("#cardBack" + card.id);
    cardBack?.classList.remove("d-none");
    flippedCard?.classList.add("d-none");
    card.isFlipped = false;
    firstSelectedCard.isFlipped = false
    return;
}

const playerPairs:Record<Player, number> = {
    blue: 0,
    orange: 0
}

function handlePair(card:Card, firstSelectedCard:Card) {
    //pairs++ if compareCards is true
    playerPairs[currentPlayer]++;
    card.isFound = true;
    firstSelectedCard.isFound = true
    cardsSelected = false;
    return;
}

function changePlayer() {
    cardsSelected = false;
    if (currentPlayer == "orange") {
        currentPlayer = "blue";
    } else currentPlayer = "orange";
    updateCurrentPlayerDisplay();
}


function checkGameOver() {
    const possiblePairs = Number(gameSettings.cards)/2;
    const pairsLeft = possiblePairs - (playerPairs.blue + playerPairs.orange)
    if (pairsLeft != 0) {return false}
    else return true;
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

function determineWinner() {

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