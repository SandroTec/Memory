const START_BUTTON = document.querySelector<HTMLButtonElement>("#startButton");

const CONTROLLER_IMG = document.querySelector<HTMLImageElement>("#controllerImage");
const BLACK_ARROW = document.querySelector<HTMLImageElement>("#blackArrow");

START_BUTTON?.addEventListener("click", () => {
    window.location.href = "./html/settings.html";
});

START_BUTTON?.addEventListener("mouseenter", () => {
    if (!CONTROLLER_IMG || !BLACK_ARROW || !START_BUTTON) return;
    CONTROLLER_IMG.style.rotate = "-16deg";
    BLACK_ARROW.style.height = "30px";
    START_BUTTON.style.transform  =  "scale(1.2, 1.2)";
})

START_BUTTON?.addEventListener("mouseleave", () => {
    if (!CONTROLLER_IMG || !BLACK_ARROW || !START_BUTTON) return;
    CONTROLLER_IMG.style.rotate = "0deg";
    BLACK_ARROW.style.height = "20px"
    START_BUTTON.style.transform  =  "scale(1, 1)";
})

const GAME_SETTINGS = {
    theme: "code",
    player: "blue",
    cards: "16"
};

const THEME_CONTAINER = document.querySelector<HTMLDivElement>("._themes-c");
const THEME_OPTIONS = document.querySelectorAll<HTMLLIElement>("[data-theme]");

const PLAYER_CONTAINER = document.querySelector<HTMLDivElement>("._player-c");
const PLAYER_OPTIONS = document.querySelectorAll<HTMLLIElement>("[data-player]");

const CARD_CONTAINER = document.querySelector<HTMLDivElement>("._board-size-c");
const CARD_OPTIONS = document.querySelectorAll<HTMLLIElement>("[data-cards]");

const THEME_IMG = document.querySelector<HTMLImageElement>("#themeImage");
const THEME_D = document.querySelector<HTMLParagraphElement>("#themeDisplay");

const PLAYER_D = document.querySelector("#playerDisplay");
const BOARD_D = document.querySelector("#boardDisplay");

// select a theme
THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        const SELECTED_THEME = themeOption.dataset.theme;
        if (!SELECTED_THEME || !THEME_CONTAINER || !THEME_D) return;
        THEME_D.textContent = SELECTED_THEME;
        THEME_D.textContent = THEME_D.textContent.toUpperCase()
        GAME_SETTINGS.theme = SELECTED_THEME;
        updateThemeImage(SELECTED_THEME)
        const CHOSEN_INDICATOR = themeOption.querySelector<HTMLImageElement>(".choose-indicator");
        const LIST_INDICATOR = themeOption.querySelector<HTMLImageElement>(".circle-indicator");
        if (CHOSEN_INDICATOR && LIST_INDICATOR) {
            updateIndicator(CHOSEN_INDICATOR, THEME_CONTAINER);
            updateSecondIndicator(LIST_INDICATOR, THEME_CONTAINER);
        }
    });
});

// Hover effect for theme option selecting
THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("mouseenter", () => {
        const SELECTED_THEME = themeOption.dataset.theme;
        if (!SELECTED_THEME || !THEME_CONTAINER) return;
        updateThemeImage(SELECTED_THEME);
    });
});

THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("mouseleave", () => {
        const SELECTED_THEME = GAME_SETTINGS.theme;
        if (!SELECTED_THEME || !THEME_CONTAINER) return;;
        updateThemeImage(SELECTED_THEME);
    });
});

// select a player
PLAYER_OPTIONS.forEach((playerOption) => {
    playerOption.addEventListener("click", () => {
        const SELECTED_PLAYER = playerOption.dataset.player;
        if (!SELECTED_PLAYER || !PLAYER_CONTAINER || !PLAYER_D) return;
        PLAYER_D.textContent = SELECTED_PLAYER;
        PLAYER_D.textContent = PLAYER_D.textContent.toLocaleUpperCase();
        GAME_SETTINGS.player = SELECTED_PLAYER;
        const CHOSEN_INDICATOR = playerOption.querySelector<HTMLImageElement>(".choose-indicator");
        const LIST_INDICATOR = playerOption.querySelector<HTMLImageElement>(".circle-indicator");
        if (CHOSEN_INDICATOR && LIST_INDICATOR) {
            updateIndicator(CHOSEN_INDICATOR, PLAYER_CONTAINER);
            updateSecondIndicator(LIST_INDICATOR, PLAYER_CONTAINER);
        }
    });
});

// selected a board size
CARD_OPTIONS.forEach((cardOption) => {
    cardOption.addEventListener("click", () => {
        const SELECTED_CARDS = cardOption.dataset.cards;
        if (!SELECTED_CARDS || !CARD_CONTAINER || !BOARD_D) return;
        BOARD_D.textContent = SELECTED_CARDS + " CARDS";
        GAME_SETTINGS.cards = SELECTED_CARDS;
        const CHOSEN_INDICATOR = cardOption.querySelector<HTMLImageElement>(".choose-indicator");
        const LIST_INDICATOR = cardOption.querySelector<HTMLImageElement>(".circle-indicator");
        if (CHOSEN_INDICATOR && LIST_INDICATOR) {
            updateIndicator(CHOSEN_INDICATOR, CARD_CONTAINER);
            updateSecondIndicator(LIST_INDICATOR, CARD_CONTAINER);
        };
    });
});

// updates the yellow line indicator
function updateIndicator(
    chosenIndicator: HTMLImageElement,
    container: HTMLDivElement
    ) {
        const INDICATORS = container.querySelectorAll<HTMLImageElement>(".choose-indicator");
        INDICATORS.forEach((indicator) => {
            indicator.classList.add("d-none");
        });
        chosenIndicator.classList.remove("d-none");
}

// updates the circle indicator for the list 
function updateSecondIndicator(
    listIndicator:HTMLImageElement, 
    themeContainer: HTMLDivElement
    ) {
        const INDICATORS = themeContainer.querySelectorAll<HTMLImageElement>(".circle-indicator");
        INDICATORS.forEach((indicator) => {
            indicator.src = "../../src/assets/img/settings_page/indicator_for_list.png";
        });
        listIndicator.src = "../../src/assets/img/settings_page/indicator_circle.png";
}

function updateThemeImage(selectedTheme:string) {
    if (!THEME_IMG) return;
    switch (selectedTheme) {
            case "gaming":
                THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_Gaming.png";
                break;
            case "da":
                THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_DA.png";
                break
            case "code":
                THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_Code.png";
                break
            default:
                THEME_IMG.src = "../../src/assets/img/settings_page/Theme Visual_Code.png";
                break;
    };
}

//saves the game settings to the session storage to load them when the game starts.
function saveGameSettings() {
    sessionStorage.setItem(
        "gameSettings",
        JSON.stringify(GAME_SETTINGS)
    );
}

const GAME_START_BUTTON = document.querySelector<HTMLButtonElement>("#startGame");

GAME_START_BUTTON?.addEventListener("click", () => {
    saveGameSettings();
    window.location.href = "./game.html";
});

GAME_START_BUTTON?.addEventListener("mouseenter", () => {
    if (!GAME_START_BUTTON) return;
    GAME_START_BUTTON.style.transform =  "scale(1.2, 1.2)";
});

GAME_START_BUTTON?.addEventListener("mouseleave", () => {
    if (!GAME_START_BUTTON) return;
    GAME_START_BUTTON.style.transform =  "scale(1, 1)";
});

export {};