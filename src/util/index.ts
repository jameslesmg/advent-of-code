import { readFileSync } from 'fs';
import * as path from 'path';

export const formatDay = (day: number | string) =>
  day.toString().padStart(2, '0');

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a decimeter to split the input by (false will omit the splitting and return the entire input)
 * @property {function(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export function parseInput(path: string): number[];
export function parseInput(path: string, options: { split: false }): string;
export function parseInput(path: string, options: {
  split: { delimiter?: string; mapper: false };
}): string[];
export function parseInput(path: string, options: { split: { delimiter: string } }): number[];
export function parseInput<T>(path: string, options: { split: SplitOptions<T> }): T[];
/**
 * Parse the input from {day}/input.txt
 * @param {SplitOptions} [split]
 */
export function parseInput<T>(path: string, {
  split,
}: { split?: SplitOptions<T> | false } = {}) {
  const input = readFileSync(
    path,
    {
      encoding: 'utf-8',
    }
  );

  if (split === false) return input;

  const splitted = input.split(split?.delimiter ?? '\n');
  const mapper = split?.mapper;

  return mapper === false
    ? splitted
    : splitted.map((...args) => mapper?.(...args) ?? Number(args[0]));
}
