import * as path from "path";
import { parseInput } from "../util";

const i = parseInput(path.join(__dirname, "input.txt"), { split: false });

function main() {
  const rO = pO();
  const rT = pT();

  console.log('P1: ', rO);
  console.log('P2: ', rT);

  return true;
}

/**
 * @comment
 * Part 0 only using chatGPT to asking about searching
 * digitals in a string using test method
 */
const pO = (): number => {
  let s: number = 0;

  for (const st of i.split('\n')) {
    /**
     * @prompts Write a typescript function will do:
     * Using test method of Regex to find digitals in a string?
     */
    const ns: string[] = st.split('').filter((t) => /\d/.test(t));
    s += parseInt(ns[0] + ns[ns.length - 1]);
  }

  return s;
};

const pT = () => {
  let s: number = 0;

  for (const st of i.split('\n')) {
    const r = Array.from({ length: st.length }, (_, i) =>
      cM(st, i)
    ).join('');
    s += parseInt(r[0] + r[r.length - 1]);
  }

  return s;
}

/**
 * @prompts for ChatGPT
 * Generate a mapping digital and number?
 */
const mP: Record<string, string> = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
};

function cM(s: string, i: number): string {
  const dG = /\d/;

  /**
   * Just count number of chars manually (one -> 3, seven -> 7 :smile)
   */
  for (let l = 3; l <= 5; l++) {
    const sl = s.slice(i, i + l);

    if (sl in mP) {
      return mP[sl];
    }
  }

  return dG.exec(s[i]) ? s[i] : '';
}

export default main();
