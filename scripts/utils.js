import { MODULE_ID } from "./consts.js";

export function chatCardStringBuilder(chances) {
  //temp html builder before refactor
  const keys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];
  let divBarString = `<div class="pf2e-chances-chatcard-container">
  `; //start container div
  keys.forEach((element) => {
    divBarString += `<div class="pf2e-chances-chatcard-bar ${chances[element].selector}" `; //start bar div and classes
    divBarString += `style="width: ${chances[element].percentageString}; color: ${chances[element].color}">`; //style
    divBarString += game.settings.get(MODULE_ID, "hide-percentage-labels") ? `` : `${chances[element].percentageString}`; //content
    divBarString += `${chances[element].label}</div>
    `; //close bar div
  });
  divBarString += `</div>`; //close container div
  return divBarString;
}

export function chatCardDivBuilder(chances) {
  const degreesKeys = game.settings.get(MODULE_ID, "hide-crits") ? ["totalFailure", "totalSuccess"] : ["criticalFailure", "failure", "success", "criticalSuccess"];

  const $divContainer = $(`<div>`).addClass("pf2e-chances-chatcard-container");

  degreesKeys.forEach((element) => {
    let text = game.settings.get(MODULE_ID, "hide-percentage-labels") ? "" : chances[element].percentageString;
    text += chances[element].label;
    $(`<div></div>`, {
      "class": `pf2e-chances-chatcard-bar ${chances[element].selector}`,
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
