import { MODULE_ID } from "./consts.js";

export function chatCardDivBuilder(chances) {
  const degreesKeys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];

  const $divContainer = $(`<div></div>`, {
    "class": "pf2e-chances-chatcard-container",
  });

  degreesKeys.forEach((element) => {
    let text = game.settings.get(MODULE_ID, "hide-percentage-labels") ? "" : chances[element].percentageString;
    text += game.settings.get(MODULE_ID, "hide-degree-labels") ? "" : ` ${chances[element].label}`;
    $(`<div></div>`, {
      "class": `pf2e-chances-chatcard-bar ${chances[element].selector}`,
      "data-tooltip": game.settings.get(MODULE_ID, "disable-tooltips") ? "" : `${chances[element].percentageString} ${chances[element].label}`,
      "data-tooltip-direction": "UP",
      "css": {
        "width": chances[element].percentageString,
        "color": chances[element].color,
      },
      "text": text,
      "appendTo": $divContainer,
    });
  });

  return $divContainer;
}
