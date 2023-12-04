import * as path from "path";
import { parseInput } from "../util";

const i = parseInput(path.join(__dirname, "input.txt"), { split: { mapper: false } });

function main() {
  const rO = pO();
  const rT = pT();

  console.log('P1: ', rO);
  console.log('P2: ', rT);

  return true;
}

const pO = (): number => {
  let s: number = 0;

  for (let ix: number = 0; ix < i.length; ix++) {
    const [a, b]: number[][] = i[ix].split(':')[1].trim().split(' | ').map((t) => t.split(' ').map(Number).filter(t => t > 0));
    const cc: number = b.reduce((p, c) => p + (a.includes(c) ? 1 : 0), 0);

    if (cc > 0) s += Math.pow(2, cc - 1);
  }

  return s;
};

const pT = (): number => {
  let s: Record<number, number> = {}

  for (let ix: number = 0; ix < i.length; ix++) {
    if (!(ix in s)) s[ix] = 1;

    const [a, b]: number[][] = i[ix].split(':')[1].trim().split(' | ').map((t) => t.split(' ').map(Number).filter(t => t > 0));
    const cc: number = b.filter(t => a.includes(t)).length;

    for (let x: number = ix + 1; x <= ix + cc; x++) {
      s[x] = (s[x] || 1) + s[ix];
    }
  }

  /**
   * @prompts for ChatGPT
   * Sum all values in a object?
   */
  return Object.values(s).reduce((a, v) => (a + v), 0);
};

export default main();