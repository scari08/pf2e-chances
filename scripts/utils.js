export function chancesCalculation(diff, chances) {
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
