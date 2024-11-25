export const MODULE_ID = "pf2e-chances";

class Degree {
  _value = 0;
  _percentageString = "0%";

  constructor(selector, label, color) {
    this.selector = selector;
    this.label = label;
    this.color = color;
  }

  /* Getters and Setters */
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.percentageString = value;
  }
  get percentageString() {
    return this._percentageString;
  }
  set percentageString(value) {
    this._percentageString = Number(value / 100).toLocaleString(undefined, { style: "percent" });
  }
}

/** Class that contains the 4 degrees of success, their value, label... */
export class Chances {
  criticalFailure = new Degree("critical-failure", "CrFail", game.settings.get(MODULE_ID, "critical-failure-color")); //future settings implementation(?)
  failure = new Degree("failure", "Fail", game.settings.get(MODULE_ID, "failure-color"));
  success = new Degree("success", "Succ", game.settings.get(MODULE_ID, "success-color"));
  criticalSuccess = new Degree("critical-success", "Crit", game.settings.get(MODULE_ID, "critical-success-color"));

  totalFailure = new Degree("failure", "Fail", game.settings.get(MODULE_ID, "failure-color"));
  totalSuccess = new Degree("success", "Succ", game.settings.get(MODULE_ID, "success-color"));

  /**
   * Assigns the chances of all 4 degree of success from the difference (delta) of the rollvsDC
   * @param {number} delta
   */
  constructor(delta) {
    this.calculateChances(delta);
    this.totalFailure.value = this.criticalFailure.value + this.failure.value;
    this.totalSuccess.value = this.success.value + this.criticalSuccess.value;
  }

  calculateChances(delta) {
    if (delta >= 11) {
      this.criticalFailure.value = 5 * Math.min(delta - 10, 19);
      if (delta <= 20) {
        this.failure.value = 45;
        this.success.value = 95 - this.criticalFailure.value - this.failure.value;
        this.criticalSuccess.value = 5;
      } else if (delta < 30) {
        this.failure.value = 95 - this.criticalFailure.value;
        this.success.value = 5;
      } else {
        this.failure.value = 5;
      }
    } else if (delta < 11) {
      this.criticalSuccess.value = 5 * Math.min(Math.abs(delta - 11), 19);
      if (delta > 1) {
        this.success.value = 50;
        this.failure.value = 95 - this.success.value - this.criticalSuccess.value;
        this.criticalFailure.value = 5;
      } else if (delta > -9) {
        this.success.value = 95 - this.criticalSuccess.value;
        this.failure.value = 5;
      } else {
        this.success.value = 5;
      }
    }
  }
}
