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
export {};
