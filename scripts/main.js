Hooks.once("ready", () => {
  //TODO dedicated hooks and loading file
  loadTemplates([`modules/pf2e-chances/templates/chances-chatcard.hbs`]);
  Hooks.on("preCreateChatMessage", (chatMessage) => {
    //don't await in "preCreateChatMessage"
    if (!chatMessage.flags || !chatMessage.flags.pf2e || !chatMessage.flags.pf2e.modifiers || !chatMessage.flags.pf2e.context.dc) return;

    const visibility = game.pf2e.settings.metagame.dcs && game.pf2e.settings.metagame.breakdowns ? "all" : "gm";
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
    <div class="pf2e-chances-chatcard-line ${chances[1].degree}" style="width: ${chances[1].value}%;">${chances[1].value}%${chances[0].label}</div>
    <div class="pf2e-chances-chatcard-line ${chances[2].degree}" style="width: ${chances[2].value}%;">${chances[2].value}%${chances[0].label}</div>
    <div class="pf2e-chances-chatcard-line ${chances[3].degree}" style="width: ${chances[3].value}%;">${chances[3].value}%${chances[0].label}</div>
    </div>`;
    const chancesChatcardDiv = $(chancesChatcardString)[0];
    chancesChatcardDiv.setAttribute("data-visibility", visibility);

    Hooks.once("renderChatMessage", async (chatMessage, $chatCard) => {
      $chatCard.on("click", ".pf2e-chances-chatcard-container", (event) => {
        event.stopPropagation();
        event.currentTarget.setAttribute("data-visibility", "all");
      });
    }); //TODO click should modify other nongm client dom

    const flavor = chatMessage.flavor;
    const $flavor = $(`<div>${flavor}</div>`);
    $flavor.find("div.result.degree-of-success").before(chancesChatcardDiv);
    const newFlavor = $flavor.html();
    chatMessage.updateSource({ flavor: newFlavor });
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
