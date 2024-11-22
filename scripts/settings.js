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

  game.settings.register(MODULE_ID, "hide-crits", {
    name: "Hide the critical chances into their respective degree",
    hint: "This means there are only 2 bars, (crit fail + fail) vs (success + crit)",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });
};
