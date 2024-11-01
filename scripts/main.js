Hooks.once("ready", () => {
  //TODO dedicated hooks and loading file
  loadTemplates([`modules/pf2e-chances/templates/chances-chatcard.hbs`]);
  Hooks.on("preCreateChatMessage", (chatMessage) => {
    //don't await in "preCreateChatMessage"
    if (!chatMessage.isCheckRoll || !chatMessage.flags?.pf2e?.modifiers || !chatMessage.flags?.pf2e?.context?.dc) return;
    
    const visibility = getVisibility(chatMessage);
    let dc = 10 + (chatMessage.flags.pf2e.context.dc.value ?? chatMessage.flags.pf2e.context.dc.parent?.dc?.value ?? 0);
    let modifier = 10; //adding artificial 10 to be safe from negative dcs and modifiers
    chatMessage.flags.pf2e.modifiers.forEach((e) => (modifier += e.enabled ? e.modifier : 0));
    const diff = dc - modifier;
    const chances = [
      {
        value: 0,
        degree: "critical-failure",
        label: "CrFail",
      },
      {
        value: 0,
        degree: "failure",
        label: "Fail",
      },
      {
        value: 0,
        degree: "success",
        label: "Succ",
      },
      {
        value: 0,
        degree: "critical-success",
        label: "Crit",
      },
    ];

    chancesCalculation(diff, chances); //TODO dedicated utility func file for future new calculations

    const chancesChatcardString = `<div class="pf2e-chances-chatcard-container">
    <div class="pf2e-chances-chatcard-line ${chances[0].degree}" style="width: ${chances[0].value}%;">${chances[0].value}%${chances[0].label}</div>
    <div class="pf2e-chances-chatcard-line ${chances[1].degree}" style="width: ${chances[1].value}%;">${chances[1].value}%${chances[1].label}</div>
    <div class="pf2e-chances-chatcard-line ${chances[2].degree}" style="width: ${chances[2].value}%;">${chances[2].value}%${chances[2].label}</div>
    <div class="pf2e-chances-chatcard-line ${chances[3].degree}" style="width: ${chances[3].value}%;">${chances[3].value}%${chances[3].label}</div>
    </div>`;
    const chancesChatcardDiv = $(chancesChatcardString)[0];
    chancesChatcardDiv.setAttribute("data-visibility", visibility);

    const flavor = chatMessage.flavor;
    const $flavor = $(`<div>${flavor}</div>`);
    $flavor.find("div.result.degree-of-success").before(chancesChatcardDiv);
    const newFlavor = $flavor.html();
    chatMessage.updateSource({ flavor: newFlavor });
  });

  Hooks.on("renderChatMessage", async (chatMessage, $chatCard) => {
    if (!chatMessage.flags || !chatMessage.flags.pf2e || !chatMessage.flags.pf2e.modifiers || !chatMessage.flags.pf2e.context.dc) return;
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
  });
});

function chancesCalculation(diff, chances) {
  if (diff >= 11) {
    chances[0].value = 5 * Math.min(diff - 10, 19);
    if (diff <= 20) {
      chances[1].value = 45;
      chances[2].value = 95 - chances[0].value - chances[1].value;
      chances[3].value = 5;
    } else if (diff < 30) {
      chances[1].value = 95 - chances[0].value;
      chances[2].value = 5;
    } else {
      chances[1].value = 5;
    }
  } else if (diff < 11) {
    chances[3].value = 5 * Math.min(Math.abs(diff - 11), 19);
    if (diff > 1) {
      chances[2].value = 50;
      chances[1].value = 95 - chances[2].value - chances[3].value;
      chances[0].value = 5;
    } else if (diff > -9) {
      chances[2].value = 95 - chances[3].value;
      chances[1].value = 5;
    } else {
      chances[2].value = 5;
    }
  }
}

function getVisibility(chatMessage) {
  // If the chat message's actor doesn't belong to a player and we aren't showing roll breakdowns and it's not a flat check
  if (!chatMessage.actor.hasPlayerOwner && !game.pf2e.settings.metagame.breakdowns && chatMessage.flags.pf2e.context.type != "flat-check") {
    return "gm";
  }

  // If the DC is visible
  if (chatMessage.flags.pf2e.context.dc.visible) {
    return "all";
  }

  // If the chat message is an attack roll
  if (chatMessage.flags.pf2e.context.type == "attack-roll") {
    // Get the target
    let target = fromUuidSync(chatMessage.flags.pf2e.context.target?.actor);

    // Does the target exist, does it not have a player owner, and are we showing check dcs
    if(target && !target.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the target exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if(target && target.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
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
    if(target && !target.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the target exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if(target && target.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  // If the chat message is a saving throw
  if (chatMessage.flags.pf2e.context.type == "saving-throw") {
    // Get the origin
    let origin = fromUuidSync(chatMessage.flags.pf2e.context.origin?.actor);

    // Does the origin exist, does it not have a player owner, and are we showing check dcs
    if(origin && !origin.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the origin exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if(origin && origin.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  // If the chat message is a skill check
  if (chatMessage.flags.pf2e.context.type == "skill-check") {
    // Get the target
    let target = fromUuidSync(chatMessage.flags.pf2e.context.target?.actor);

    // Does the target exist, does it not have a player owner, and are we showing check dcs
    if(target && !target.hasPlayerOwner && game.pf2e.settings.metagame.dcs) {
      return "all";
    }

    // Does the target exist, does it have a player owner, does the chat message's actor not have a player owner, and are we showing roll breakdowns
    if(target && target.hasPlayerOwner && !chatMessage.actor.hasPlayerOwner && game.pf2e.settings.metagame.breakdowns) {
      return "all";
    }
  }

  return "gm";
}
