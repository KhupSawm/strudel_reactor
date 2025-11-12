export const stranger_tune = `setcps(0.7);

<p1_Radio>p1: n("0 2 4 6 7 6 4 2")
  .scale("<c3:major>/2")
  .s("supersaw")
  .distort(0.7)
  .superimpose((x) => x.detune("<0.5>"))
  .lpenv(perlin.slow(3).range(1, 4))
  .lpf(perlin.slow(2).range(100, 2000))
  .gain(vol);
<p2_Radio>p2: "<a1 e2>/8".clip(0.8).struct("x*8").s("supersaw").note().gain(vol);
// Grabbed from Hacker News: https://news.ycombinator.com/item?id=44939874
// @version 1.2`;

export const phonk_loop = `
// Drift Phonk inspired loop
s("bd ~ sn ~ bd ~ sn").gain(vol)
  | s("~ hh ~ hh ~ hh ~ hh").gain(vol)
  | s("~ ~ oh ~ ~ ~ oh ~").gain(vol)
  .tempo(90)
`;
    
