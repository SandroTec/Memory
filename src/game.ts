type GameSettings = {
    theme: string;
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


// functions needed for memory:
function placeCards() {
    //inital function to add the cards to the board
    //by using cards from GameSettings
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