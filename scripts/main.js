Hooks.once("ready", () => {
  renderTemplate(`modules/pf2e-chances/templates/chances-chatcard.hbs`);
  Hooks.on("preCreateChatMessage", async (chatMessage) => {
    if (!chatMessage.flags || !chatMessage.flags.pf2e || !chatMessage.flags.pf2e.modifiers || !chatMessage.flags.pf2e.context.dc) return;

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

    chancesCalculation(diff, chances);

    const chancesChatcardHTML = await renderTemplate(`modules/pf2e-chances/templates/chances-chatcard.hbs`, { chances: chances });

    const flavor = chatMessage.flavor;
    const $flavor = $(`<div>${flavor}</div>`);
    $flavor.find("div.result.degree-of-success").before(chancesChatcardHTML);
    const newFlavor = $flavor.html();
    await chatMessage.updateSource({ flavor: newFlavor });
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
