Hooks.once("ready", () => {
  Hooks.on("preCreateChatMessage", async (chatMessage) => {

    if (!chatMessage.flags || !chatMessage.flags.pf2e || !chatMessage.flags.pf2e.modifiers || !chatMessage.flags.pf2e.context.dc) return;

    let dc = 10 + (chatMessage.flags.pf2e.context.dc.value ?? chatMessage.flags.pf2e.context.dc.parent?.dc?.value ?? 0);
    let modifier = 10; //adding artificial 10 to be safe from negative dcs and modifiers
    chatMessage.flags.pf2e.modifiers.forEach((e) => (modifier += e.modifier));
    const diff = dc - modifier;
    const chances = [0, 0, 0, 0];

    chancesCalculation(diff, chances);

    const div = document.createElement("div");
    div.style.cssText = "display:flex;margin:8px 0 8px 0;height:24px";
    div.innerHTML = `<div style="display:flex;justify-content:center;overflow:hidden;border-bottom:12px solid;color:red;width:${chances[0]}%;">${chances[0]}%CrFail</div>
    <div style="display:flex;justify-content:center;overflow:hidden;border-bottom:12px solid;color:hotpink;width:${chances[1]}%;">${chances[1]}%Fail</div>
    <div style="display:flex;justify-content:center;overflow:hidden;border-bottom:12px solid;color:blue;width:${chances[2]}%;">${chances[2]}%Succ</div>
    <div style="display:flex;justify-content:center;overflow:hidden;border-bottom:12px solid;color:green;width:${chances[3]}%;">${chances[3]}%Crit</div>`;

    const flavor = chatMessage.flavor;
    const $flavor = $(`<div>${flavor}</div>`);
    $flavor.find("div.result.degree-of-success").before(div);
    const newFlavor = $flavor.html();
    await chatMessage.updateSource({ flavor: newFlavor });
  });});

function chancesCalculation(diff, chances) {
  if (diff >= 11) {
    chances[0] = 5 * Math.min(diff - 10, 19);
    if (diff <= 20) {
      chances[1] = 45;
      chances[2] = 95 - chances[0] - chances[1];
      chances[3] = 5;
    } else if (diff < 30) {
      chances[1] = 95 - chances[0];
      chances[2] = 5;
    } else {
      chances[1] = 5;
    }
  } else if (diff < 11) {
    chances[3] = 5 * Math.min(Math.abs(diff - 11), 19);
    if (diff > 1) {
      chances[2] = 50;
      chances[1] = 95 - chances[2] - chances[3];
      chances[0] = 5;
    } else if (diff > -9) {
      chances[2] = 95 - chances[3];
      chances[1] = 5;
    } else {
      chances[2] = 5;
    }
  }
}
