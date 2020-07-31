// A
shape(4, 0.50, 0.001).invert().mask(shape(4, 0.1, 0.001).scale(1, 6, 0.8).rotate(Math.PI / 2.75).scrollX(-0.1).add(shape(4, 0.1, 0.001).scale(1, 6, 0.8).rotate(Math.PI / -2.75).scrollX(0.1)).add(shape(4, 0.1, 0.001).scale(1, 3, 0.8))).out();

// E
shape(4, 0.50, 0.001).invert().mask(shape(4, 0.1, 0.001).scale(1, 5, 0.8).add(shape(4, 0.1, 0.001).scale(1, 5, 0.8).scrollY(0.2)).add(shape(4, 0.1, 0.001).scale(1, 5, 0.8).scrollY(-0.2)).add(shape(4, 0.1, 0.001).scale(1, 5, 0.8).rotate(Math.PI / 2).scrollX(0.2))).out();

// I
shape(4, 0.50, 0.001).invert().mask(shape(4, 0.1, 0.001).scale(1, 6, 0.8).rotate(Math.PI / 2).add(shape(4, 0.1, 0.001).scale(1, 6, 0.8).scrollY(0.2)).add(shape(4, 0.1, 0.001).scale(1, 6, 0.8).scrollY(-0.2))).out();

// O
shape(4, 0.50, 0.001).invert().mask(shape(25, 0.5, 0.001).mask(shape(25, 0.5, 0.001).invert().scale(0.7))).out();

// U
shape(4, 0.50, 0.001).invert().mask(shape(18, 0.5, 0.001).mask(shape(4, 0.30, 0.001).scale(1, 4, 1).scrollY(-0.15)).mask(shape(25, 0.5, 0.001).invert().scale(0.7)).add(shape(4, 0.15, 0.001).scale(1, 0.99, 2).scrollX(0.25).scrollY(0.15)).add(shape(4, 0.15, 0.001).scale(1, 0.99, 2).scrollX(-0.25).scrollY(0.15))).out();

shape(18, 0.5, 0.001).mask(shape(4, 0.30, 0.001).scale(1, 4, 1).scrollY(-0.15)).mask(shape(25, 0.5, 0.001).invert().scale(0.7)).add(shape(4, 0.15, 0.001).scale(1, 0.51, 2).scrollX(0.215).scrollY(0.15)).add(shape(4, 0.15, 0.001).scale(1, 0.51, 2).scrollX(-0.215).scrollY(0.15));

/*
 * Guide Lines
 */
shape(2, 0.01, 0.001).scrollY(0.25).add(shape(2, 0.01, 0.001).scrollY(-0.25)).add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(0.25)).add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(-0.25)).invert().out(o1);

src(o0).blend(o1).out(o2);

render(o0);
