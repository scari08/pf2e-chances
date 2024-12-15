import { MODULE_ID } from "./consts.js";

export function chatCardDivBuilder(chances) {
  const degreesKeys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];
  const noPercentage = game.settings.get(MODULE_ID, "hide-percentage-labels");
  const noDegree = game.settings.get(MODULE_ID, "hide-degree-labels");

  const $divContainer = $(`<div></div>`, {
    "class": "pf2e-chances-chatcard-container",
    "css": {
      "--pf2e-chances-chatcard-container-height": !(noPercentage && noDegree) && "1.75em",
    },
  });

  degreesKeys.forEach((element) => {
    $(`<div></div>`, {
      "class": `pf2e-chances-chatcard-bar ${chances[element].selector}`,
      "data-tooltip": game.settings.get(MODULE_ID, "disable-tooltips") ? "" : `${chances[element].percentageString} ${chances[element].label}`,
      "data-tooltip-direction": "UP",
      "css": {
        "width": chances[element].percentageString,
        "color": chances[element].color,
      },
      "text": [!noPercentage && chances[element].percentageString, !noDegree && chances[element].label].filter(Boolean).join(" "),
      "appendTo": $divContainer,
    });
  });

  return $divContainer;
}

export function modifiersDialogDivBuilder(chances) {
  const degreesKeys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];
  const noPercentage = game.settings.get(MODULE_ID, "hide-percentage-labels");
  const noDegree = game.settings.get(MODULE_ID, "hide-degree-labels");

  const $divContainer = $(`<div></div>`, {
    "class": "pf2e-chances-chatcard-container",
    "css": {
      "--pf2e-chances-chatcard-container-height": !(noPercentage && noDegree) && "1.9em",
    },
  });

  degreesKeys.forEach((element) => {
    $(`<div></div>`, {
      "class": `pf2e-chances-chatcard-bar ${chances[element].selector}`,
      "data-tooltip": game.settings.get(MODULE_ID, "disable-tooltips") ? "" : `${chances[element].percentageString} ${chances[element].label}`,
      "data-tooltip-direction": "UP",
      "css": {
        "width": chances[element].percentageString,
        "color": chances[element].color,
      },
      "text": [!noPercentage && chances[element].percentageString, !noDegree && chances[element].label].filter(Boolean).join(" "),
      "appendTo": $divContainer,
    });
  });

  return $divContainer;
}
