function startSettings() {
    window.location.href = "./html/settings.html";
}

const gameSettings = {
    theme: "code",
    player: "blue",
    cards: "16"
};


const themeContainer = document.querySelector<HTMLDivElement>("._themes-c");
const themeOptions = document.querySelectorAll<HTMLLIElement>("[data-theme]");

const playerContainer = document.querySelector<HTMLDivElement>("._player-c");
const playerOptions = document.querySelectorAll<HTMLLIElement>("[data-player]");

const cardContainer = document.querySelector<HTMLDivElement>("._board-size-c");
const cardOptions = document.querySelectorAll<HTMLLIElement>("[data-cards]");

const themeImg = document.querySelector<HTMLImageElement>("#themeImage");

const themeD = document.querySelector<HTMLParagraphElement>("#themeDisplay")
const playerD = document.querySelector("#playerDisplay")
const boardD = document.querySelector("#boardDisplay")

themeOptions.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        const selectedTheme = themeOption.dataset.theme;

        if (!selectedTheme || !themeContainer) return;
        if (!themeD) return
        themeD.textContent = selectedTheme;
        gameSettings.theme = selectedTheme;
        updateThemeImage()
        const chosenIndicator =
            themeOption.querySelector<HTMLImageElement>(".choose-indicator");
        
        
        if (chosenIndicator) {
            updateIndicator(chosenIndicator, themeContainer);
        }
    });
});

playerOptions.forEach((playerOption) => {

    playerOption.addEventListener("click", () => {
        const selectedPlayer = playerOption.dataset.player;

        if (!selectedPlayer || !playerContainer) return;
        if (!playerD) return
        playerD.textContent = selectedPlayer;
        gameSettings.player = selectedPlayer;

        const chosenIndicator =
            playerOption.querySelector<HTMLImageElement>(".choose-indicator");
        if (chosenIndicator) {
            updateIndicator(chosenIndicator, playerContainer);
        }
    });
});

cardOptions.forEach((cardOption) => {

    cardOption.addEventListener("click", () => {
        const selectedCards = cardOption.dataset.cards;

        if (!selectedCards || !cardContainer) return;
        if (!boardD) return
        boardD.textContent = selectedCards+ " " + "cards";
        gameSettings.cards = selectedCards;

        const chosenIndicator =
            cardOption.querySelector<HTMLImageElement>(".choose-indicator");
        if (chosenIndicator) {
            updateIndicator(chosenIndicator, cardContainer);
        }
    });

});

function updateIndicator(
    chosenIndicator: HTMLImageElement,
    container: HTMLDivElement
) {

    const indicators =
        container.querySelectorAll<HTMLImageElement>(".choose-indicator");

    indicators.forEach((indicator) => {
        indicator.classList.add("d-none");
    });

    chosenIndicator.classList.remove("d-none");
}

function updateThemeImage() {
    if (!themeImg) return;
    switch (gameSettings.theme) {
            case "gaming":
                themeImg.src = "../../src/assets/img/settings_page/Theme Visual_Gaming.png";
                break;

            case "da":
                themeImg.src = "../../src/assets/img/settings_page/Theme Visual_DA.png";
                break

            case "code":
                themeImg.src = "../../src/assets/img/settings_page/Theme Visual_Code.png";
                break

            default:
                themeImg.src = "../../src/assets/img/settings_page/Theme Visual_Code.png";
                break;
        }
}

function startGame() {
    window.location.href = "./game.html";
}