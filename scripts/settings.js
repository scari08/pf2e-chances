export const MODULE_ID = "pf2e-chances";

export const registerSettings = () => {
  game.settings.register(MODULE_ID, "visibility-choice", {
    name: "Who can see the chances bar?",
    hint: "Default means that players can see the chances, only if they have the information (based on the system Pathfinder Second Edition setting -Metagame Information-)",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    choices: {
      default: "Default",
      gm: "Only gm",
      all: "Everyone",
    },
    default: "default",
  });
};
