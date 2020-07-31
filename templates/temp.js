main = new P5();
canvas = main.createCanvas(main.windowWidth / 2, main.windowHeight / 2);
canvas.position((main.windowWidth / 2) - main.windowWidth / 4, (main.windowHeight / 2) - main.windowHeight / 4);
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
main.frameRate(20);
main.draw = () => {
  main.background(0);
  main.textSize(120);
  main.fill(255);
  main.textAlign(main.CENTER, main.CENTER);
  ran = main.floor(main.random(10));
  ch = nums[ran].toString();
  main.text(ch, main.windowWidth / 4, main.windowHeight / 4);
  main.noLoop();
};
main.windowResized = () => {
  main.resizeCanvas(main.windowWidth / 2, main.windowHeight / 2);
};
main.hide();
s0.init({ src: main.canvas });
main.noLoop();

a.show();
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
src(s0).scrollY(() => changeDirection(0, time, 0.05)).scrollX(() => changeDirection(0, time * 0, 0.05)).add(
  shape(2, 0.01, 0.001).scrollY(0.25)
    .add(shape(2, 0.01, 0.001).scrollY(-0.25))
    .scrollY(() => changeDirection(0, time, 0.05))
    .add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(0.25)
      .add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(-0.25))
      .scrollX(() => changeDirection(0, time * 0, 0.05))).add(o1))
  .repeat(4, 4).out(o0);
