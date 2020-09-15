toggles = [];
states = [];

dir = 1;
t_snapshot = 0;
psnap = 0;
nsnap = 0;

GET_STATE = bin => {
  if (a.fft[bin] && !states[bin]) {
    states[bin] = true; // HIGH
  } else if (!a.fft[bin] && states[bin]) {
    states[bin] = false; // LOW
  }
  return states[bin];
};

TOGGLE = bin => {
  if (a.fft[bin] && !states[bin]) {
    states[bin] = true; // HIGH
    toggles[bin] = !toggles[bin];
  } else if (!a.fft[bin] && states[bin]) {
    states[bin] = false; // LOW
  }
  return toggles[bin];
};

HIGH = (bin, vt, vf) => {
  st = GET_STATE(bin);
  if (st) {
    return vt;
  } else {
    return vf;
  }
};

LOW = (bin, vt, vf) => {
  st = GET_STATE(bin);
  if (!st) {
    return vt;
  } else {
    return vf;
  }
};

HIGHEST = (bin, vt, vf) => {
  const values = [];
  for (let i = 0; i < states.length; i++) {
    values.push(a.fft[i]);
  }
  var maxIndex = 0;
  let max = values[maxIndex];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
      maxIndex = i;
    }
  }
  st = GET_STATE(bin);
  if (maxIndex == bin && st) {
    return vt;
  } else {
    return vf;
  }
};

LOWEST = (bin, vt, vf) => {
  const values = [];
  for (let i = 0; i < states.length; i++) {
    values.push(a.fft[i]);
  }
  var minIndex = 0;
  let min = values[minIndex];
  for (let i = 1; i < values.length; i++) {
    if (values[i] < min) {
      min = values[i];
      minIndex = i;
    }
  }
  st = GET_STATE(bin);
  if (minIndex == bin && st) {
    return vt;
  } else {
    return vf;
  }
};

CHANGE_DIR = (bin, time) => {
  let value;
  lastState = states[bin];
  st = GET_STATE(bin);
  if (st && st != lastState) {
    dir = -dir;
    t_snapshot = time;
  }
  let t_increment = (time % 1) - (t_snapshot % 1);
  if (dir == 1) {
    value = time % 1;
    if (nsnap) {
      value = 1 - Math.abs(nsnap) + t_increment;
      psnap = value;
    }
  } else if (dir == -1) {
    diff = (1 - (t_snapshot % 1)) * -1;
    if (psnap) {
      diff = (1 - psnap) * -1;
    }
    value = diff + -t_increment;
    nsnap = value;
  }
  return value % 1;
};

a.show();
a.setCutoff(5);

squaresize = 0.11;
size = 0.1;
GLOBAL = () => {
  st = GET_STATE(0);
  if (st) {
    size = HIGHEST(3, 0.1 * a.fft[0], 0.1); // ADD THIS LATER
    squaresize = a.fft[0]; // START WITH THIS IN THE BEGINNING // ADJUST THE RANGE
    squaresize = Math.random() * 0.2; // ADD THIS LATER; SPORADIC
  }
  return 0;
};

solid(() => GLOBAL())
  .add(
    shape(4, size, 0.001)
      .add(shape(4, () => size, 0.001).scrollX(() => -squaresize))
      .add(shape(4, () => size, 0.001).scrollX(() => squaresize))
      .add(shape(4, () => size, 0.001).scrollY(() => -squaresize))
      .add(shape(4, () => size, 0.001).scrollY(() => squaresize))
      .add(
        shape(4, () => size, 0.001)
          .scrollX(() => -squaresize)
          .scrollY(() => -squaresize)
      )
      .add(
        shape(4, () => size, 0.001)
          .scrollX(() => squaresize)
          .scrollY(() => -squaresize)
      )
      .add(
        shape(4, () => size, 0.001)
          .scrollY(() => squaresize)
          .scrollX(() => -squaresize)
      )
      .add(
        shape(4, () => size, 0.001)
          .scrollY(() => squaresize)
          .scrollX(() => squaresize)
      )
  )
  .diff(
    shape(() => HIGHEST(3, 5, 4), 0.3, 0.001)
      .color(
        1,
        () => HIGHEST(3, 0, 1),
        () => HIGHEST(3, 0, 1)
      )
      .brightness(({ time }) => Math.sin(time / 8)) // ADD THIS LATER
      .rotate(() => HIGHEST(3, (time / 4) % 360, 0))
  )
  .rotate(({ time }) => (time / 8) % 360)
  // .rotate(({ time }) => (((time / 8) % 360) * dir))
  // .rotate(({ time }) => (((time / 8) % 360) * dir * a.fft[0]) / 4)
  .out();
