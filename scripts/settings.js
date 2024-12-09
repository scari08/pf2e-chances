export const MODULE_ID = "pf2e-chances";

export const registerSettings = () => {
  game.settings.register(MODULE_ID, "disable-chatcard-chances", {
    name: game.i18n.localize(`${MODULE_ID}.settings.disable-chatcard-chances.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.disable-chatcard-chances.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "disable-modifiers-dialog-chances", {
    name: game.i18n.localize(`${MODULE_ID}.settings.disable-modifiers-dialog-chances.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.disable-modifiers-dialog-chances.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "disable-tooltips", {
    name: game.i18n.localize(`${MODULE_ID}.settings.disable-tooltips.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.disable-tooltips.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "visibility-choice", {
    name: game.i18n.localize(`${MODULE_ID}.settings.visibility-choice.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.visibility-choice.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    choices: {
      default: game.i18n.localize(`${MODULE_ID}.settings.visibility-choice.choices.default`),
      gm: game.i18n.localize(`${MODULE_ID}.settings.visibility-choice.choices.gm`),
      all: game.i18n.localize(`${MODULE_ID}.settings.visibility-choice.choices.all`),
    },
    default: "default",
  });

  game.settings.register(MODULE_ID, "hide-percentage-labels", {
    name: game.i18n.localize(`${MODULE_ID}.settings.hide-percentage-labels.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.hide-percentage-labels.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "hide-degree-labels", {
    name: game.i18n.localize(`${MODULE_ID}.settings.hide-degree-labels.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.hide-degree-labels.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "hide-crits", {
    name: game.i18n.localize(`${MODULE_ID}.settings.hide-crits.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.hide-crits.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(MODULE_ID, "critical-failure-label", {
    name: game.i18n.localize(`${MODULE_ID}.settings.critical-failure-label.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.critical-failure-label.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: game.i18n.localize(`${MODULE_ID}.settings.critical-failure-label.default`),
  });

  game.settings.register(MODULE_ID, "critical-failure-color", {
    name: game.i18n.localize(`${MODULE_ID}.settings.critical-failure-color.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.critical-failure-color.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: new foundry.data.fields.ColorField(),
  });

  game.settings.register(MODULE_ID, "failure-label", {
    name: game.i18n.localize(`${MODULE_ID}.settings.failure-label.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.failure-label.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: game.i18n.localize(`${MODULE_ID}.settings.failure-label.default`),
  });

  game.settings.register(MODULE_ID, "failure-color", {
    name: game.i18n.localize(`${MODULE_ID}.settings.failure-color.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.failure-color.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: new foundry.data.fields.ColorField(),
  });

  game.settings.register(MODULE_ID, "success-label", {
    name: game.i18n.localize(`${MODULE_ID}.settings.success-label.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.success-label.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: game.i18n.localize(`${MODULE_ID}.settings.success-label.default`),
  });

  game.settings.register(MODULE_ID, "success-color", {
    name: game.i18n.localize(`${MODULE_ID}.settings.success-color.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.success-color.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: new foundry.data.fields.ColorField(),
  });

  game.settings.register(MODULE_ID, "critical-success-label", {
    name: game.i18n.localize(`${MODULE_ID}.settings.critical-success-label.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.critical-success-label.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: String,
    default: game.i18n.localize(`${MODULE_ID}.settings.critical-success-label.default`),
  });

  game.settings.register(MODULE_ID, "critical-success-color", {
    name: game.i18n.localize(`${MODULE_ID}.settings.critical-success-color.name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.critical-success-color.hint`),
    scope: "world",
    config: true,
    requiresReload: false,
    type: new foundry.data.fields.ColorField(),
  });
};
