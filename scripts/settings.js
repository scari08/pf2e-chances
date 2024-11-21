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

  game.settings.register(MODULE_ID, "hide-percentage-labels", {
    name: "Hide the percentage number labels",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "vague-mode", {
    name: "Vague mode",
    hint: "Shows only failure vs success rate, with as little info as possible",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });
};
