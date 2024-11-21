export const MODULE_ID = "pf2e-chances";

class Degree {
  _value = 0;
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.percentageString = value;
  }
  _percentageString = "0%";
  get percentageString() {
    return this._percentageString;
  }
  set percentageString(value) {
    this._percentageString = Number(value / 100).toLocaleString(undefined, { style: "percent" });
  }

  constructor(selector, label) {
    this.selector;
    this.label;
  }
}

export class Chances {
  criticalFailure = new Degree("critical-failure", "CrFail");
  failure = new Degree("failure", "fail");
  success = new Degree("success", "Succ");
  criticalSuccess = new Degree("critical-success", "Crit");

  constructor(diff) {
    if (diff >= 11) {
      this.criticalFailure.value = 5 * Math.min(diff - 10, 19);
      if (diff <= 20) {
        this.failure.value = 45;
        this.success.value = 95 - this.criticalFailure.value - this.failure.value;
        this.criticalSuccess.value = 5;
      } else if (diff < 30) {
        this.failure.value = 95 - this.criticalFailure.value;
        this.success.value = 5;
      } else {
        this.failure.value = 5;
      }
    } else if (diff < 11) {
      this.criticalSuccess.value = 5 * Math.min(Math.abs(diff - 11), 19);
      if (diff > 1) {
        this.success.value = 50;
        this.failure.value = 95 - this.success.value - this.criticalSuccess.value;
        this.criticalFailure.value = 5;
      } else if (diff > -9) {
        this.success.value = 95 - this.criticalSuccess.value;
        this.failure.value = 5;
      } else {
        this.success.value = 5;
      }
    }
  }
}
