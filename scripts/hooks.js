import { registerSettings } from "./settings.js";
import { Chances, MODULE_ID } from "./consts.js";
import { chatCardDivBuilder, chatCardStringBuilder } from "./utils.js";

Hooks.on("init", () => {
  registerSettings();
});

Hooks.once("ready", () => {
  Hooks.on("preCreateChatMessage", displayChancesChatMessage);

  Hooks.on("renderChatMessage", toggleDisplayChancesChatMessage);

  Hooks.on("renderCheckModifiersDialog", displayChancesModifiersDialog);
});

function displayChancesChatMessage(chatMessage) {
  if (!isChatMessageCheckRollWithDC(chatMessage)) return;

  const visibility = getVisibility(chatMessage);
  let dc = 10 + (chatMessage.flags.pf2e.context.dc.value ?? chatMessage.flags.pf2e.context.dc.parent?.dc?.value ?? 0);
  let modifier = 10; //adding artificial 10 to be safe from negative dcs and modifiers
  chatMessage.flags.pf2e.modifiers.forEach((e) => (modifier += e.enabled ? e.modifier : 0));
  const delta = dc - modifier;

  const chances = new Chances(delta);
  const chancesChatcardDiv = chatCardDivBuilder(chances);

  const flavor = chatMessage.flavor;
  const $flavor = $(`<div>${flavor}</div>`);
  $flavor.find("div.result.degree-of-success").before(chancesChatcardDiv);
  const newFlavor = $flavor.html();
  chatMessage.updateSource({ flavor: newFlavor });
}

async function toggleDisplayChancesChatMessage(chatMessage, $chatCard) {
  if (!game.user.isGM || !isChatMessageCheckRollWithDC(chatMessage)) return;

  $chatCard.on("click", ".pf2e-chances-chatcard-container", (event) => {
    event.stopPropagation();
    let visibility = event.currentTarget.getAttribute("data-visibility");
    if (visibility === "all") visibility = "gm";
    else visibility = "all"; // really ugly but need to change how visibility is saved in the module
    const chancesChatcardDiv = $(event.currentTarget)[0];
    chancesChatcardDiv.setAttribute("data-visibility", visibility);
    const flavor = chatMessage.flavor;
    const $flavor = $(`<div>${flavor}</div>`);
    $flavor.find("div.pf2e-chances-chatcard-container").replaceWith(chancesChatcardDiv);
    const newFlavor = $flavor.html();
    chatMessage.update({ flavor: newFlavor });
  });
}

async function displayChancesModifiersDialog(checkModifiersDialog) {
  if (!game.user.isGM && game.settings.get(MODULE_ID, "visibility-choice") !== "all") return;

  let dc = 10 + (checkModifiersDialog.context.dc.value ?? checkModifiersDialog.context.dc.parent?.dc?.value ?? 0);
  let modifier = 10 + checkModifiersDialog.check.totalModifier; //adding artificial 10 to be safe from negative dcs and modifiers
  const delta = dc - modifier;
  const chances = new Chances(delta);

  const chancesChatcardString = chatCardStringBuilder(chances)
  const chancesChatcardDiv = $(chancesChatcardString)[0];
  const dialog = document.querySelector("div#app-" + checkModifiersDialog.appId);
  dialog.querySelector("button.roll").before(chancesChatcardDiv);
  dialog.style.height = parseInt(dialog.style.height) + 34 + "px";
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
    if (target && target.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
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
    if (target && target.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
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
    if (origin && origin.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
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
    if (target && target.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  return "gm";
}

function isChatMessageCheckRollWithDC(chatMessage) {
  return chatMessage.isCheckRoll && chatMessage.flags?.pf2e?.modifiers && chatMessage.flags?.pf2e?.context?.dc;
}
