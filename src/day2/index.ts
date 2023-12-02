import * as path from "path";
import { parseInput } from "../util";

const i = parseInput(path.join(__dirname, "input.txt"), { split: { mapper: false } });

/**
 * @comment Don't use AI for 2 day of weekend
 * @returns 
 */
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
    const gg: string[] = i[ix].split(': ')[1].split('; ');
    let c: boolean = false;

    for (const g of gg) {
      const m: Record<string, number> = {
        red: 0,
        green: 0,
        blue: 0,
      };

      for (const r of g.split(', ')) {
        const [v, k]: string[] = r.split(' ');
        m[k] = parseInt(v);
      }

      if (m.red > 12 || m.green > 13 || m.blue > 14) {
        c = true;
        break;
      }
    }

    if (!c) s += ix + 1;
  }

  return s;
};

const pT = (): number => {
  let s: number = 0;

  for (let ix: number = 0; ix < i.length; ix++) {
    const gg: string[] = i[ix].split(': ')[1].split('; ');
    const mm: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const g of gg) {
      const m: Record<string, number> = {
        red: 0,
        green: 0,
        blue: 0,
      };

      for (const r of g.split(', ')) {
        const [v, k]: string[] = r.split(' ');
        m[k] = parseInt(v);
      }

      for (const s in mm) {
        mm[s] = Math.max(mm[s], m[s]);
      }
    }

    s += mm.red * mm.green * mm.blue;
  }

  return s;
};

export default main();