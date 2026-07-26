import "./scss/main.scss";

const START_BUTTON = document.querySelector<HTMLButtonElement>("#startButton");

const CONTROLLER_IMG = document.querySelector<HTMLImageElement>("#controllerImage");
const BLACK_ARROW = document.querySelector<HTMLImageElement>("#blackArrow");

START_BUTTON?.addEventListener("click", () => {
    window.location.href = "/src/html/settings.html";
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


type GameSettings = {
    theme: string;
    player: string;
    cards: string;
};

function loadGameSettings(): GameSettings {
    const STORED_SETTINGS = sessionStorage.getItem("gameSettings");
    if (STORED_SETTINGS) {
        return JSON.parse(STORED_SETTINGS);
    }
    return {
        theme: "code",
        player: "blue",
        cards: "16"
    };
}

const GAME_SETTINGS = loadGameSettings();

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


// Initaliseing game settings.
function initialiseSettings() {
    selectTheme(GAME_SETTINGS.theme);
    selectPlayer(GAME_SETTINGS.player);
    selectBoardSize(GAME_SETTINGS.cards);
}

/**
 * Applies the selected theme to the game settings and updates the UI.
 * @param selectedTheme The selected game theme.
 */
function selectTheme(selectedTheme: string) {
    if (!THEME_CONTAINER || !THEME_D) return;
    THEME_D.textContent = selectedTheme.toUpperCase();
    GAME_SETTINGS.theme = selectedTheme;
    updateThemeImage(selectedTheme);
    const SELECTED_OPTION = document.querySelector<HTMLLIElement>(`[data-theme="${selectedTheme}"]`);
    if (!SELECTED_OPTION) return;
    const CHOSEN_INDICATOR =
        SELECTED_OPTION.querySelector<HTMLImageElement>(".choose-indicator");
    const LIST_INDICATOR =
        SELECTED_OPTION.querySelector<HTMLImageElement>(".circle-indicator");
    if (CHOSEN_INDICATOR && LIST_INDICATOR) {
        updateIndicator(CHOSEN_INDICATOR, THEME_CONTAINER);
        updateSecondIndicator(LIST_INDICATOR, THEME_CONTAINER);
    }
}

THEME_OPTIONS.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        const SELECTED_THEME = themeOption.dataset.theme;
        if (!SELECTED_THEME) return;
        selectTheme(SELECTED_THEME);
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

/**
 * Applies the selected starting player and updates the UI.
 *
 * @param selectedPlayer The selected starting player.
 */
function selectPlayer(selectedPlayer: string) {
    if (!PLAYER_CONTAINER || !PLAYER_D) return;

    PLAYER_D.textContent = selectedPlayer.toUpperCase();
    GAME_SETTINGS.player = selectedPlayer;

    const SELECTED_OPTION = document.querySelector<HTMLLIElement>(
        `[data-player="${selectedPlayer}"]`
    );

    if (!SELECTED_OPTION) return;

    const CHOSEN_INDICATOR =
        SELECTED_OPTION.querySelector<HTMLImageElement>(".choose-indicator");

    const LIST_INDICATOR =
        SELECTED_OPTION.querySelector<HTMLImageElement>(".circle-indicator");

    if (CHOSEN_INDICATOR && LIST_INDICATOR) {
        updateIndicator(CHOSEN_INDICATOR, PLAYER_CONTAINER);
        updateSecondIndicator(LIST_INDICATOR, PLAYER_CONTAINER);
    }
}

PLAYER_OPTIONS.forEach((playerOption) => {
    playerOption.addEventListener("click", () => {
        const SELECTED_PLAYER = playerOption.dataset.player;
        if (!SELECTED_PLAYER) return;

        selectPlayer(SELECTED_PLAYER);
    });
});

/**
 * Applies the selected board size and updates the UI.
 * @param selectedCards The selected number of cards.
 */
function selectBoardSize(selectedCards: string) {
    if (!CARD_CONTAINER || !BOARD_D) return;
    BOARD_D.textContent = `${selectedCards} CARDS`;
    GAME_SETTINGS.cards = selectedCards;
    const SELECTED_OPTION = document.querySelector<HTMLLIElement>(`[data-cards="${selectedCards}"]`);
    if (!SELECTED_OPTION) return;
    const CHOSEN_INDICATOR =
        SELECTED_OPTION.querySelector<HTMLImageElement>(".choose-indicator");
    const LIST_INDICATOR =
        SELECTED_OPTION.querySelector<HTMLImageElement>(".circle-indicator");
    if (CHOSEN_INDICATOR && LIST_INDICATOR) {
        updateIndicator(CHOSEN_INDICATOR, CARD_CONTAINER);
        updateSecondIndicator(LIST_INDICATOR, CARD_CONTAINER);
    }
}

CARD_OPTIONS.forEach((cardOption) => {
    cardOption.addEventListener("click", () => {
        const SELECTED_CARDS = cardOption.dataset.cards;
        if (!SELECTED_CARDS) return;

        selectBoardSize(SELECTED_CARDS);
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
            indicator.src = "/assets/img/settings_page/indicator_for_list.png";
        });
        listIndicator.src = "/assets/img/settings_page/indicator_circle.png";
}

function updateThemeImage(selectedTheme:string) {
    if (!THEME_IMG) return;
    switch (selectedTheme) {
            case "gaming":
                THEME_IMG.src = "/assets/img/settings_page/Theme Visual_Gaming.png";
                break;
            case "da":
                THEME_IMG.src = "/assets/img/settings_page/Theme Visual_DA.png";
                break
            case "code":
                THEME_IMG.src = "/assets/img/settings_page/Theme Visual_Code.png";
                break
            default:
                THEME_IMG.src = "/assets/img/settings_page/Theme Visual_Code.png";
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

initialiseSettings();

export {};