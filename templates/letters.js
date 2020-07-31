// E
shape(4, 0.50, 0.001).invert().mask(shape(4, 0.1, 0.001).scale(1, 5, 0.8).add(shape(4, 0.1, 0.001).scale(1, 5, 0.8).scrollY(0.2)).add(shape(4, 0.1, 0.001).scale(1, 5, 0.8).scrollY(-0.2)).add(shape(4, 0.1, 0.001).scale(1, 5, 0.8).rotate(Math.PI / 2).scrollX(0.2))).out();

/*
 * Guide Lines
 */
shape(2, 0.01, 0.001).scrollY(0.25).add(shape(2, 0.01, 0.001).scrollY(-0.25)).add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(0.25)).add(shape(2, 0.01, 0.001).rotate(Math.PI / 2).scrollX(-0.25)).invert().out(o1);

src(o0).blend(o1).out(o2);

render(o0);
