"use strict";
const winner = JSON.parse(sessionStorage.getItem("winningPlayer:") || '""');
const scoreB = JSON.parse(sessionStorage.getItem("blue score:") || "0");
const scoreO = JSON.parse(sessionStorage.getItem("orange score:") || "0");
const theme = JSON.parse(sessionStorage.getItem("theme:") || "code");
const endscreenBody = document.querySelector("#gameBody");
if (endscreenBody) {
    endscreenBody.classList.add(`theme-${theme}`);
}
