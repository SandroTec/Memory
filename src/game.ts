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

export {};