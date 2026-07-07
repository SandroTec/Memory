function startSettings() {
    window.location.href = "./html/settings.html";
}

const gameSettings = {
    theme: "code",
    player: "blue",
    cards: "16"
};

console.log("script geladen");


const themeContainer = document.querySelector<HTMLDivElement>("._themes-c");
const themeOptions = document.querySelectorAll<HTMLLIElement>("[data-theme]");

const playerContainer = document.querySelector<HTMLDivElement>("._player-c");
const playerOptions = document.querySelectorAll<HTMLLIElement>("[data-player]");

const cardContainer = document.querySelector<HTMLDivElement>("._board-size-c");
const cardOptions = document.querySelectorAll<HTMLLIElement>("[data-cards]");

themeOptions.forEach((themeOption) => {

    themeOption.addEventListener("click", () => {
        console.log("geklickt");
        const selectedTheme = themeOption.dataset.theme;

        if (!selectedTheme || !themeContainer) return;

        gameSettings.theme = selectedTheme;

        const chosenIndicator =
            themeOption.querySelector<HTMLImageElement>(".choose-indicator");
        console.log(chosenIndicator);
        if (chosenIndicator) {
            updateIndicator(chosenIndicator, themeContainer);
        }
    });
});

playerOptions.forEach((playerOption) => {

    playerOption.addEventListener("click", () => {
        console.log("geklickt");
        const selectedPlayer = playerOption.dataset.player;

        if (!selectedPlayer || !playerContainer) return;

        gameSettings.player = selectedPlayer;

        const chosenIndicator =
            playerOption.querySelector<HTMLImageElement>(".choose-indicator");
            console.log(chosenIndicator);
        if (chosenIndicator) {
            updateIndicator(chosenIndicator, playerContainer);
        }
    });
});

cardOptions.forEach((cardOption) => {

    cardOption.addEventListener("click", () => {
        console.log("geklickt");
        const selectedCards = cardOption.dataset.cards;

        if (!selectedCards || !cardContainer) return;

        gameSettings.cards = selectedCards;

        const chosenIndicator =
            cardOption.querySelector<HTMLImageElement>(".choose-indicator");
        console.log(chosenIndicator);
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