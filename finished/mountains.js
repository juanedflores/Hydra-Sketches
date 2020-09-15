// mountains.js
// Juan Eduardo Flores

let toggle = false;
let xdir = 1;
let tsnap = 0;
let psnap = 0;
let nsnap = 0;
let ran = 1;
let frequency = 40;
let t1 = 0.01;
let t2 = 0.01;
let t3 = 0.01;
let t4 = 0.01;
GLOBAL = () => {
  xdir = -xdir;
  tsnap = time;
  frequency = Math.floor(Math.random() * 20);
  t1 = Math.random() % 0.25;
  t2 = Math.random() % 0.15;
  t3 = Math.random() % 0.05;
  t4 = Math.random() % 0.01;
  ran = Math.random();
};
TOGGLE = (bin) => {
  if (a.fft[bin] && !toggle) {
    toggle = true;
    GLOBAL();
  } else if (!a.fft[bin] && toggle) {
    toggle = false;
  }
};
HIGH = (bin, v) => {
  TOGGLE(bin);
  if (toggle) {
    return v;
  } else {
    return 0;
  }
};
LOW = (bin, v) => {
  TOGGLE(bin);
  if (!toggle) {
    return v;
  } else {
    return 0;
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
shape(2, () => LOW(0, t1) + t1, 0.001).scrollY(0.25, () => HIGH(0, time % 1)).modulate(osc(() => HIGH(0, t1 * 6000), 0.1, 0)).add(shape(2, () => LOW(0, t2) + t2, 0.001).scrollY(-0.25, () => LOW(0, t2 * 10)).modulate(osc(() => HIGH(0, t2 * 6000), 0.1, 0))).scrollY(() => changeDirection(0, time, 0.25)).add(shape(2, () => LOW(0, t3) + t3, 0.001).modulate(osc(() => HIGH(0, t3 * 6000), 0.1, 0)).rotate(Math.PI / 2).scrollX(0.25, () => LOW(0, t3 * 10)).add(shape(2, () => LOW(0, t4) + t4, 0.001).modulate(osc(() => HIGH(0, t4 * 6000), 0.1, 0)).rotate(Math.PI / 2).scrollX(-0.25, () => LOW(0, t4 * 10))).scrollX(() => changeDirection(0, time, 0.25))).repeat(() => LOW(0, ran * 10) + ran * 10, () => LOW(0, ran * 10) + ran * 10).blend(shape(() => HIGH(0, ran + 20) + 0.001, () => HIGH(0, ran), 0.2).modulate(noise(4, 0))).invert().add(shape(4, 0.3, 0.001)).invert().out(o0);
