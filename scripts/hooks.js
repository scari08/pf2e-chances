import { registerSettings } from "./settings.js";
import { MODULE_ID } from "./consts.js";

Hooks.on("init", () => {
  registerSettings();
});
