function loadGameSettings() {
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
const gameBody = document.querySelector("#gameBody");
const playGround = document.querySelector("#playGround");
if (gameBody) {
    gameBody.classList.add(`theme-${gameSettings.theme}`);
}
const codeCardBack = "../../src/assets/img/game_page/code-theme/main/cards/basic_card_back.png";
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
const themeImages = {
    code: codeImages,
    gaming: gamingImages,
    da: daImages
};
const currentThemeImages = themeImages[gameSettings.theme];
function getImages() {
    const pairAmount = Number(gameSettings.cards) / 2;
    const selectedImages = [];
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
}
function determinePlayer() {
}
function handleCardClick(card) {
}
function turnCard(card) {
}
function hideCards() {
}
function compareCards() {
}
function handlePair() {
}
function changePlayer() {
}
function checkGameOver() {
}
export {};
