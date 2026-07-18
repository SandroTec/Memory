import {
    codeImages,
    gamingImages,
    daImages,

    codeCardBack,
    gamingCardBack,
    daCardBack,

    codePlayerIcons,
    gamingPlayerIcons,
    daPlayerIcons,

    codeExitBtns,
    gamingExitBtns,
    daExitBtns,

    codeBackToGameBtns,
    gamingBackToGameBtns,
    daBackToGameBtns,

    codeEndGame,
    gamingEndGame,
    daEndGameBtns
} from "./loadImages.js";

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

const backToGameButtons = {
    code: codeBackToGameBtns,
    gaming: gamingBackToGameBtns,
    da: daBackToGameBtns
}

const endGameButtons = {
    code: codeEndGame,
    gaming: gamingEndGame,
    da: daEndGameBtns
}


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
    if(gameSettings.cards == "36") {
        playGround.classList.add("grid6x");
    } else {playGround.classList.add("grid4x");}

    initCardEventListeners();
}

function createCard(card: Card): string {
    const cardJson = JSON.stringify(card);

    return `
        <div class="card" data-card-id="${card.id}" data-card-object='${cardJson}'>
            <div class="card_inner">
                <img class="card_img card_front" src="${card.imgSrc}" alt="game card">
                <img class="card_img card_back" src="${currentCardBack}" alt="game card">
            </div>
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
    if (card.isFlipped) return;
    if (card.isFound) return;
    if (cardsSelected) return;
    //turn card animation
    turnCard(card);

    //first flipped card? 
    if (firstSelectedCard == null) {
        firstSelectedCard = card;
        const firstFlippedCard = document.querySelector<HTMLDivElement>(`[data-card-id="${card.id}"]`)!;
        firstFlippedCard.style.cursor = "not-allowed";
        return;
    } 
    if (firstSelectedCard.id == card.id) return;
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

function turnCard(card: Card) {
    card.isFlipped = true;
    const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
    cardElement?.classList.add("is-flipped");
}


async function compareCards(card:Card, cardToCompare:Card):Promise<boolean> {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    //compares first safed card  id to the second card pairId
    cardsSelected = true;
    if (card.pairId == cardToCompare.pairId) {
        return true;
    } else {
        await delay(1000);
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

const playerPairs:Record<Player, number> = {
    blue: 0,
    orange: 0
}
let scoreDisplayB = document.querySelector("#scoreDisplayB");
let scoreDisplayO = document.querySelector("#scoreDisplayO");

function handlePair(card:Card, firstSelectedCard:Card) {
    const cardElement = document.querySelector<HTMLDivElement>(`[data-card-id="${card.id}"]`);
    const firstCardElement = document.querySelector<HTMLDivElement>(`[data-card-id="${firstSelectedCard.id}"]`);
    //pairs++ if compareCards is true
    playerPairs[currentPlayer]++;
    card.isFound = true;
    firstSelectedCard.isFound = true;
    cardsSelected = false;
    if (!scoreDisplayB || !scoreDisplayO) return
    scoreDisplayB.textContent = `${playerPairs.blue}`;
    scoreDisplayO.textContent = `${playerPairs.orange}`;
    if (!cardElement || !firstCardElement) return
    cardElement.setAttribute("data-card-object", JSON.stringify(card));
    cardElement.style.cursor = "not-allowed";
    firstCardElement.setAttribute("data-card-object", JSON.stringify(firstSelectedCard));
    firstCardElement.style.cursor = "not-allowed";
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
const exitDialog = document.querySelector<HTMLDialogElement>("#exitDialog");
const confirmExitBtn = document.querySelector<HTMLImageElement>("#confirmExitBtn");
const cancelExitBtn = document.querySelector<HTMLImageElement>("#cancelExitBtn");

function initaliseExitButton() {
    const exitBtn = exitButtons[gameSettings.theme];
    
    if (!exitGameBtnImage || !exitGameBtn) return;
    exitGameBtnImage.src = exitBtn.default;
    exitGameBtn.addEventListener("mouseenter", () => {
        exitGameBtnImage.src = exitBtn.hover;
    })
    exitGameBtn.addEventListener("mouseleave", () => {
        exitGameBtnImage.src = exitBtn.default;
    })
}

function initaliseBackToGameButton() {
    const backToGameBtn = backToGameButtons[gameSettings.theme];
    if (!cancelExitBtn) return;
    cancelExitBtn.src = backToGameBtn.default;
    cancelExitBtn.addEventListener("mouseenter", () => {
        cancelExitBtn.src = backToGameBtn.hover;
    })
    cancelExitBtn.addEventListener("mouseleave", () => {
        cancelExitBtn.src = backToGameBtn.default;
    })
}

function initaliseEndGameButton() {
    if (!confirmExitBtn) return;
    if (gameSettings.theme == "da") {
        const endGameBtn = endGameButtons[gameSettings.theme];

        confirmExitBtn.src = endGameBtn.default;
        confirmExitBtn.addEventListener("mouseenter", () => {
            confirmExitBtn.src = endGameBtn.hover;
        })
        confirmExitBtn.addEventListener("mouseleave", () => {
            confirmExitBtn.src = endGameBtn.default;
        })
    }else {
    const endGameBtn = endGameButtons[gameSettings.theme];
    
    confirmExitBtn.src = endGameBtn;
    confirmExitBtn.addEventListener("mouseenter", () => {
        confirmExitBtn.classList.add(`bg-color-${gameSettings.theme}`);
    })
    confirmExitBtn.addEventListener("mouseleave", () => {
        confirmExitBtn.classList.remove(`bg-color-${gameSettings.theme}`);
    })}
}

exitGameBtn?.addEventListener("click", () => {
    if(!exitDialog) return;
    exitDialog.showModal();
})

confirmExitBtn?.addEventListener("click", () => {
    if(!exitDialog) return;
    exitDialog.close();
    endGame()
})

cancelExitBtn?.addEventListener("click", () => {
    if(!exitDialog) return;
    exitDialog.close();
})

function endGame() {
    //function to end the game and go back to settings.
    window.location.href = "./settings.html";
}

function determineWinner() {
    if (playerPairs.blue > playerPairs.orange) {
        //blue wins
        loadEndscreen("blue", playerPairs.blue, playerPairs.orange);
    } else if (playerPairs.blue < playerPairs.orange) {
        //orange wins
        loadEndscreen("orange", playerPairs.blue, playerPairs.orange);
    } else {
        //draw
        loadEndscreen("draw", playerPairs.blue, playerPairs.orange);
    }
}

function saveGameWinner(gameWinner:string, scoreB:number, scoreO:number) {
    sessionStorage.setItem("winning player:", JSON.stringify(gameWinner));
    sessionStorage.setItem("blue score:" , JSON.stringify(scoreB));
    sessionStorage.setItem("orange score:" , JSON.stringify(scoreO));
    sessionStorage.setItem("theme:", JSON.stringify(gameSettings.theme));
    sessionStorage.setItem("playerIconBlue:", JSON.stringify(playerIcons[gameSettings.theme].blue));
    sessionStorage.setItem("playerIconOrange:", JSON.stringify(playerIcons[gameSettings.theme].orange));

}

function loadEndscreen(winner:string, scoreB:number, scoreO:number) {
    //load endscreen
    saveGameWinner(winner, scoreB, scoreO);
    window.location.href = "./endscreen.html";
}

function initaliseHeader() {
    initaliseScoreBoard();
    initaliseExitButton();
    initaliseBackToGameButton();
    initaliseEndGameButton();
}

function init() {
    initaliseHeader();
    placeCards();
    determinePlayer();
}


init();
export {};