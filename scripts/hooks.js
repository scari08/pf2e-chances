import { registerSettings } from "./settings.js";
import { Chances, MODULE_ID } from "./consts.js";
import { chatCardDivBuilder, modifiersDialogDivBuilder } from "./utils.js";

Hooks.on("setup", () => {
  registerSettings();
});

Hooks.once("ready", () => {
  Hooks.on("preCreateChatMessage", displayChancesChatMessage);

  Hooks.on("renderChatMessageHTML", toggleDisplayChancesChatMessage);

  Hooks.on("renderCheckModifiersDialog", displayChancesModifiersDialog);
});

function displayChancesChatMessage(chatMessage) {
  if (!isChatMessageCheckRollWithDC(chatMessage) || game.settings.get(MODULE_ID, "disable-chatcard-chances")) return;

  const visibility = getVisibility(chatMessage);
  let dc = 10 + (chatMessage.flags.pf2e.context.dc.value ?? chatMessage.flags.pf2e.context.dc.parent?.dc?.value ?? 0);
  let modifier = 10; // adding artificial 10 to be safe from negative dcs and modifiers
  chatMessage.flags.pf2e.modifiers.forEach((e) => (modifier += e.enabled ? e.modifier : 0));
  const delta = dc - modifier;

  const chances = new Chances(delta);

  const chancesChatcardDiv = chatCardDivBuilder(chances);
  chancesChatcardDiv.setAttribute("data-visibility", visibility);

  const flavorDiv = document.createElement("div");
  flavorDiv.innerHTML = chatMessage.flavor;

  const resultDiv = flavorDiv.querySelector("div.result.degree-of-success");
  if (resultDiv) {
    resultDiv.parentNode.insertBefore(chancesChatcardDiv, resultDiv);
  } else {
    flavorDiv.appendChild(chancesChatcardDiv);
  }

  chatMessage.updateSource({ flavor: flavorDiv.innerHTML });
}

function toggleDisplayChancesChatMessage(chatMessage, chatCardElem) {
  if (!game.user.isGM || !isChatMessageCheckRollWithDC(chatMessage)) return;

  chatCardElem.addEventListener("click", function (event) {
    const container = event.target.closest(".pf2e-chances-chatcard-container");
    if (!container) return;
    event.stopPropagation();
    const val = container.getAttribute("data-visibility");
    container.setAttribute("data-visibility", val === "all" ? "gm" : "all");

    const flavorDiv = document.createElement("div");
    flavorDiv.innerHTML = chatMessage.flavor;
    const oldContainer = flavorDiv.querySelector(".pf2e-chances-chatcard-container");
    if (oldContainer) {
      oldContainer.replaceWith(container.cloneNode(true));
    }
    chatMessage.update({ flavor: flavorDiv.innerHTML });
  });
}

function displayChancesModifiersDialog(checkModifiersDialog) {
  if (checkModifiersDialog.context.dc?.value === undefined || (!game.user.isGM && game.settings.get(MODULE_ID, "visibility-choice") !== "all") || game.settings.get(MODULE_ID, "disable-modifiers-dialog-chances")) return;

  let dc = 10 + checkModifiersDialog.context.dc.value;
  let modifier = 10 + checkModifiersDialog.check.totalModifier; // adding artificial 10 to be safe from negative dcs and modifiers
  const delta = dc - modifier;
  const chances = new Chances(delta);

  const chancesChatcardDiv = modifiersDialogDivBuilder(chances);

  const dialog = document.querySelector(`div#app-${checkModifiersDialog.appId}`);
  if (dialog) {
    const rollButton = dialog.querySelector("button.roll");
    if (rollButton) {
      rollButton.parentNode.insertBefore(chancesChatcardDiv, rollButton);
    } else {
      dialog.appendChild(chancesChatcardDiv);
    }
    // Increase dialog height by 34px
    const currentHeight = parseInt(window.getComputedStyle(dialog).height, 10);
    dialog.style.height = currentHeight + 34 + "px";
  }
}

function getVisibility(chatMessage) {
  if (game.settings.get(MODULE_ID, "visibility-choice") !== "default") {
    return game.settings.get(MODULE_ID, "visibility-choice");
  }

  // If the chat message's actor doesn't belong to a player and we aren't showing roll breakdowns and it's not a flat check
  if (!chatMessage.actor.hasPlayerOwner && !game.pf2e.settings.metagame.breakdowns && chatMessage.flags.pf2e.context.type != "flat-check") {
    return "gm";
  }

  // If the DC is visible
  if (chatMessage.flags.pf2e.context.dc.visible || chatMessage.flags.pf2e.context.dc.visibility === "all") {
    return "all";
  }

  // If the chat message is an attack roll
  if (chatMessage.flags.pf2e.context.type == "attack-roll") {
    // Get the target
    let target = fromUuidSync(chatMessage.flags.pf2e.context.target?.actor);

    // Does the target exist, does it not have a player owner, and are we showing check dcs
    if (target && !target.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the target exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if (target?.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  // If the chat message is a flat check
  if (chatMessage.flags.pf2e.context.type == "flat-check") {
    // Are we showing dcs
    if (game.pf2e.settings.metagame.dcs) {
      return "all";
    }
  }

  // If the chat message is a perception check
  if (chatMessage.flags.pf2e.context.type == "perception-check") {
    // Get the target
    let target = fromUuidSync(chatMessage.flags.pf2e.context.target?.actor);

    // Does the target exist, does it not have a player owner, and are we showing check dcs
    if (target && !target.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the target exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if (target?.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  // If the chat message is a saving throw
  if (chatMessage.flags.pf2e.context.type == "saving-throw") {
    // Get the origin
    let origin = fromUuidSync(chatMessage.flags.pf2e.context.origin?.actor);

    // Does the origin exist, does it not have a player owner, and are we showing check dcs
    if (origin && !origin.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the origin exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if (origin?.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  // If the chat message is a skill check
  if (chatMessage.flags.pf2e.context.type == "skill-check") {
    // Get the target
    let target = fromUuidSync(chatMessage.flags.pf2e.context.target?.actor);

    // Does the target exist, does it not have a player owner, and are we showing check dcs
    if (target && !target.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the target exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if (target?.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  return "gm";
}

function isChatMessageCheckRollWithDC(chatMessage) {
  return chatMessage.isCheckRoll && chatMessage.flags?.pf2e?.modifiers && chatMessage.flags?.pf2e?.context?.dc;
}
