export const MODULE_ID = "pf2e-chances";

export const registerSettings = () => {
  game.settings.register(MODULE_ID, "disable-chatcard-chances", {
    name: "Disable the chances on the chatcard",
    hint: "The module won't show the bar chances in chat anymore",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "disable-modifiers-dialog-chances", {
    name: "Disable the chances on the roll dialog",
    hint: "The module won't show the bar chances in the roll dialog anymore (the little window that opens wth all the modifiers)",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "disable-tooltips", {
    name: "Disable the tooltip",
    hint: "The module won't show the tooltip when you hover on the bars",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

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
    hint: "Hides only the number",
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "hide-degree-labels", {
    name: "Hide the degree labels",
    hint: "Hides only the string (like Fail or your custom)",
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

  game.settings.register(MODULE_ID, "critical-failure-label", {
    name: "Set Critical Failure custom label",
    hint: "Set a custom label, leave blank to hide",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: "CrFail",
  });

  game.settings.register(MODULE_ID, "critical-failure-color", {
    name: "Set Critical Failure custom color",
    hint: "Set an RGB hexadecimal color like #FFFFFF",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
  });

  game.settings.register(MODULE_ID, "failure-label", {
    name: "Set Failure custom label",
    hint: "Set a custom label, leave blank to hide",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: "Fail",
  });

  game.settings.register(MODULE_ID, "failure-color", {
    name: "Set Failure custom color",
    hint: "Set an RGB hexadecimal color like #FFFFFF",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
  });

  game.settings.register(MODULE_ID, "success-label", {
    name: "Set Success custom label",
    hint: "Set a custom label, leave blank to hide",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: "Succ",
  });

  game.settings.register(MODULE_ID, "success-color", {
    name: "Set Success custom color",
    hint: "Set an RGB hexadecimal color like #FFFFFF",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
  });

  game.settings.register(MODULE_ID, "critical-success-label", {
    name: "Set Critical Success custom label",
    hint: "Set a custom label, leave blank to hide",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: "Crit",
  });

  game.settings.register(MODULE_ID, "critical-success-color", {
    name: "Set Critical Success custom color",
    hint: "Set an RGB hexadecimal color like #FFFFFF",
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
  });
};
