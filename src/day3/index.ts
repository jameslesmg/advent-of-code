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
  let rs: number = 0;
  const r: number = i.length;
  const c: number = i[0].length;
  const rG: RegExp = /\d/;
  const s: Set<string> = new Set();
  const nI: number[][] = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (let ix: number = 0; ix < r; ix++) {
    for (let jx: number = 0; jx < c; jx++) {
      if (rG.exec(i[ix][jx]) || i[ix][jx] === '.') continue

      for (const [dx, dy] of nI) {
        let nR: number = ix + dx;
        let nC: number = jx + dy;

        if (nR >= 0 && nR < r && nC >= 0 && nC < c && rG.exec(i[nR][nC])) {
          while (nC > 0 && rG.exec(i[nR][nC - 1])) {
            nC -= 1;
          }

          s.add(`${nR},${nC}`);
        }
      }
    }
  }

  for (const cd of s) {
    let [r, c] = cd.split(",").map(Number);
    let t: string = '';

    while (c < i[r].length && rG.exec(i[r][c])) {
      t += i[r][c];
      c += 1;
    }

    rs += +t;
  }

  return rs;
};

const pT = (): number => {
  let rs: number = 0;
  const rG: RegExp = /\d/;

  for (let r: number = 0; r < i.length; r++) {
    const rw: string = i[r];

    for (let c: number = 0; c < rw.length; c++) {
      const cv: string = rw[c];
      const cs: Set<string> = new Set();

      if (cv !== "*") continue;

      for (let cr of [r - 1, r, r + 1]) {
        for (let cc of [c - 1, c, c + 1]) {
          if (cr < 0 || cr >= i.length || cc < 0 || cc >= rw.length || !rG.exec(i[cr][cc])) continue;

          while (cc > 0 && rG.exec(i[cr][cc - 1])) {
            cc--;
          }

          cs.add(`${cr},${cc}`);
        }
      }

      if (cs.size !== 2) {
        continue;
      }

      const ns: number[] = [];

      for (const cd of cs) {
        let [cr, cc] = cd.split(",").map(Number);
        let s: string = "";

        while (cc < rw.length && rG.exec(i[cr][cc])) {
          s += i[cr][cc];
          cc++;
        }

        ns.push(+s);
      }

      rs += ns[0] * ns[1];
    }
  }

  return rs;

};

export default main();