const START_BUTTON = document.querySelector("#startButton");
const CONTROLLER_IMG = document.querySelector("#controllerImage");
const BLACK_ARROW = document.querySelector("#blackArrow");
START_BUTTON?.addEventListener("click", () => {
    window.location.href = "./html/settings.html";
});
START_BUTTON?.addEventListener("mouseenter", () => {
    if (!CONTROLLER_IMG || !BLACK_ARROW || !START_BUTTON)
        return;
    CONTROLLER_IMG.style.rotate = "-16deg";
    BLACK_ARROW.style.height = "30px";
    START_BUTTON.style.transform = "scale(1.2, 1.2)";
});
START_BUTTON?.addEventListener("mouseleave", () => {
    if (!CONTROLLER_IMG || !BLACK_ARROW || !START_BUTTON)
        return;
    CONTROLLER_IMG.style.rotate = "0deg";
    BLACK_ARROW.style.height = "20px";
    START_BUTTON.style.transform = "scale(1, 1)";
});
const GAME_SETTINGS = {
    theme: "code",
    player: "blue",
    cards: "16"
};
const THEME_CONTAINER = document.querySelector("._themes-c");
const THEME_OPTIONS = document.querySelectorAll("[data-theme]");
const PLAYER_CONTAINER = document.querySelector("._player-c");
const PLAYER_OPTIONS = document.querySelectorAll("[data-player]");
const CARD_CONTAINER = document.querySelector("._board-size-c");
const CARD_OPTIONS = document.querySelectorAll("[data-cards]");
const THEME_IMG = document.querySelector("#themeImage");
const THEME_D = document.querySelector("#themeDisplay");
const PLAYER_D = document.querySelector("#playerDisplay");
const BOARD_D = document.querySelector("#boardDisplay");
THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        const SELECTED_THEME = themeOption.dataset.theme;
        if (!SELECTED_THEME || !THEME_CONTAINER || !THEME_D)
            return;
        THEME_D.textContent = SELECTED_THEME;
        THEME_D.textContent = THEME_D.textContent.toUpperCase();
        GAME_SETTINGS.theme = SELECTED_THEME;
        updateThemeImage(SELECTED_THEME);
        const CHOSEN_INDICATOR = themeOption.querySelector(".choose-indicator");
        const LIST_INDICATOR = themeOption.querySelector(".circle-indicator");
        if (CHOSEN_INDICATOR && LIST_INDICATOR) {
            updateIndicator(CHOSEN_INDICATOR, THEME_CONTAINER);
            updateSecondIndicator(LIST_INDICATOR, THEME_CONTAINER);
        }
    });
});
THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("mouseenter", () => {
        const SELECTED_THEME = themeOption.dataset.theme;
        if (!SELECTED_THEME || !THEME_CONTAINER)
            return;
        updateThemeImage(SELECTED_THEME);
    });
});
THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("mouseleave", () => {
        const SELECTED_THEME = GAME_SETTINGS.theme;
        if (!SELECTED_THEME || !THEME_CONTAINER)
            return;
        ;
        updateThemeImage(SELECTED_THEME);
    });
});
PLAYER_OPTIONS.forEach((playerOption) => {
    playerOption.addEventListener("click", () => {
        const SELECTED_PLAYER = playerOption.dataset.player;
        if (!SELECTED_PLAYER || !PLAYER_CONTAINER || !PLAYER_D)
            return;
        PLAYER_D.textContent = SELECTED_PLAYER;
        PLAYER_D.textContent = PLAYER_D.textContent.toLocaleUpperCase();
        GAME_SETTINGS.player = SELECTED_PLAYER;
        const CHOSEN_INDICATOR = playerOption.querySelector(".choose-indicator");
        const LIST_INDICATOR = playerOption.querySelector(".circle-indicator");
        if (CHOSEN_INDICATOR && LIST_INDICATOR) {
            updateIndicator(CHOSEN_INDICATOR, PLAYER_CONTAINER);
            updateSecondIndicator(LIST_INDICATOR, PLAYER_CONTAINER);
        }
    });
});
CARD_OPTIONS.forEach((cardOption) => {
    cardOption.addEventListener("click", () => {
        const SELECTED_CARDS = cardOption.dataset.cards;
        if (!SELECTED_CARDS || !CARD_CONTAINER || !BOARD_D)
            return;
        BOARD_D.textContent = SELECTED_CARDS + "CARDS";
        GAME_SETTINGS.cards = SELECTED_CARDS;
        const CHOSEN_INDICATOR = cardOption.querySelector(".choose-indicator");
        const LIST_INDICATOR = cardOption.querySelector(".circle-indicator");
        if (CHOSEN_INDICATOR && LIST_INDICATOR) {
            updateIndicator(CHOSEN_INDICATOR, CARD_CONTAINER);
            updateSecondIndicator(LIST_INDICATOR, CARD_CONTAINER);
        }
        ;
    });
});
function updateIndicator(chosenIndicator, container) {
    const INDICATORS = container.querySelectorAll(".choose-indicator");
    INDICATORS.forEach((indicator) => {
        indicator.classList.add("d-none");
    });
    chosenIndicator.classList.remove("d-none");
}
function updateSecondIndicator(listIndicator, themeContainer) {
    const INDICATORS = themeContainer.querySelectorAll(".circle-indicator");
    INDICATORS.forEach((indicator) => {
        indicator.src = "../../src/assets/img/settings_page/indicator_for_list.png";
    });
    listIndicator.src = "../../src/assets/img/settings_page/indicator_circle.png";
}
function updateThemeImage(selectedTheme) {
    if (!THEME_IMG)
        return;
    switch (selectedTheme) {
        case "gaming":
            THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_Gaming.png";
            break;
        case "da":
            THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_DA.png";
            break;
        case "code":
            THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_Code.png";
            break;
        default:
            THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_Code.png";
            break;
    }
    ;
}
function saveGameSettings() {
    sessionStorage.setItem("gameSettings", JSON.stringify(GAME_SETTINGS));
}
const GAME_START_BUTTON = document.querySelector("#startGame");
GAME_START_BUTTON?.addEventListener("click", () => {
    saveGameSettings();
    window.location.href = "./game.html";
});
GAME_START_BUTTON?.addEventListener("mouseenter", () => {
    if (!GAME_START_BUTTON)
        return;
    GAME_START_BUTTON.style.transform = "scale(1.2, 1.2)";
});
GAME_START_BUTTON?.addEventListener("mouseleave", () => {
    if (!GAME_START_BUTTON)
        return;
    GAME_START_BUTTON.style.transform = "scale(1, 1)";
});
export {};
