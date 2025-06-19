import { MODULE_ID } from "./consts.js";

export function chatCardDivBuilder(chances) {
  const degreesKeys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];
  const noPercentage = game.settings.get(MODULE_ID, "hide-percentage-labels");
  const noDegree = game.settings.get(MODULE_ID, "hide-degree-labels");

  const divContainer = document.createElement("div");
  divContainer.className = "pf2e-chances-chatcard-container";
  divContainer.style.setProperty("--pf2e-chances-chatcard-container-height", !(noPercentage && noDegree) && "1.65em");

  degreesKeys.forEach((element) => {
    const barDiv = document.createElement("div");
    barDiv.className = `pf2e-chances-chatcard-bar ${chances[element].selector}`;
    barDiv.setAttribute("data-tooltip", game.settings.get(MODULE_ID, "disable-tooltips") ? "" : `${chances[element].percentageString} ${chances[element].label}`);
    barDiv.setAttribute("data-tooltip-direction", "UP");
    barDiv.style.width = chances[element].percentageString;
    barDiv.style.color = chances[element].color;
    barDiv.textContent = [!noPercentage && chances[element].percentageString, !noDegree && chances[element].label].filter(Boolean).join(" ");
    divContainer.appendChild(barDiv);
  });

  return divContainer;
}

export function modifiersDialogDivBuilder(chances) {
  const degreesKeys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];
  const noPercentage = game.settings.get(MODULE_ID, "hide-percentage-labels");
  const noDegree = game.settings.get(MODULE_ID, "hide-degree-labels");

  const divContainer = document.createElement("div");
  divContainer.className = "pf2e-chances-chatcard-container";
  divContainer.style.setProperty("--pf2e-chances-chatcard-container-height", !(noPercentage && noDegree) && "1.9em");

  degreesKeys.forEach((element) => {
    const barDiv = document.createElement("div");
    barDiv.className = `pf2e-chances-chatcard-bar ${chances[element].selector}`;
    barDiv.setAttribute("data-tooltip", game.settings.get(MODULE_ID, "disable-tooltips") ? "" : `${chances[element].percentageString} ${chances[element].label}`);
    barDiv.setAttribute("data-tooltip-direction", "UP");
    barDiv.style.width = chances[element].percentageString;
    barDiv.style.color = chances[element].color;
    barDiv.textContent = [!noPercentage && chances[element].percentageString, !noDegree && chances[element].label].filter(Boolean).join(" ");
    divContainer.appendChild(barDiv);
  });

  return divContainer;
}
