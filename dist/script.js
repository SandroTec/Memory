"use strict";
function startSettings() {
    window.location.href = "./html/settings.html";
}
const gameSettings = {
    theme: "code",
    player: "blue",
    cards: "16"
};
console.log("script geladen");
const themeContainer = document.querySelector("._themes-c");
const themeOptions = document.querySelectorAll("[data-theme]");
const playerContainer = document.querySelector("._player-c");
const playerOptions = document.querySelectorAll("[data-player]");
const cardContainer = document.querySelector("._board-size-c");
const cardOptions = document.querySelectorAll("[data-cards]");
themeOptions.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        console.log("geklickt");
        const selectedTheme = themeOption.dataset.theme;
        if (!selectedTheme || !themeContainer)
            return;
        gameSettings.theme = selectedTheme;
        const chosenIndicator = themeOption.querySelector(".choose-indicator");
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
        if (!selectedPlayer || !playerContainer)
            return;
        gameSettings.player = selectedPlayer;
        const chosenIndicator = playerOption.querySelector(".choose-indicator");
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
        if (!selectedCards || !cardContainer)
            return;
        gameSettings.cards = selectedCards;
        const chosenIndicator = cardOption.querySelector(".choose-indicator");
        console.log(chosenIndicator);
        if (chosenIndicator) {
            updateIndicator(chosenIndicator, cardContainer);
        }
    });
});
function updateIndicator(chosenIndicator, container) {
    const indicators = container.querySelectorAll(".choose-indicator");
    indicators.forEach((indicator) => {
        indicator.classList.add("d-none");
    });
    chosenIndicator.classList.remove("d-none");
}
