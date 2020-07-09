// grid.js creates a grid that changes direction after passing fft threshold.
// Author: Juan Eduardo Flores

let toggle = false;
let xdir = 1;
let tsnap = 0;
let psnap = 0;
let nsnap = 0;
GLOBAL = () => {
  xdir = -xdir;
  tsnap = time;
};
TOGGLE = (bin) => {
  if (a.fft[bin] && !toggle) {
    toggle = true;
    GLOBAL();
  } else if (!a.fft[bin] && toggle) {
    toggle = false;
  }
};
changeDirection = (bin, time, speed) => {
  let value;
  TOGGLE(bin);
  tinc = (time * speed % 1) - tsnap * speed % 1;
  if (xdir == 1) {
    value = time * speed % 1;
    if (nsnap) {
      value = (1 - Math.abs(nsnap)) + tinc;
      psnap = value;
    }
  } else if (xdir == -1) {
    diff = (1 - (tsnap * speed % 1)) * -1;
    value = diff + -tinc;
    nsnap = value;
    if (psnap) {
      diff = (1 - psnap) * -1;
      value = diff + -tinc;
      nsnap = value;
    }
  }
  return value;
};
shape(2, 0.01, 0.001).scrollY(0.25)
  .add(shape(2, 0.01, 0.001).scrollY(-0.25))
  .scrollY(() => changeDirection(0, time, 0.25))
  .add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(0.25)
    .add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(-0.25))
    .scrollX(() => changeDirection(0, time, 0.25)))
  .repeat(3, 3).out(o0);
