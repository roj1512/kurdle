import { writable } from "svelte/store";
import { cache } from "./utils";

export type Board = {
  value: string;
  comparison: number;
}[][];

export interface Finished {
  finished: boolean;
  found: boolean;
  id: number;
}

export const board = writable<Board>([
  [
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
  ],
  [
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
  ],
  [
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
  ],
  [
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
  ],
  [
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
  ],
  [
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
    { value: "", comparison: -1 },
  ],
]);

export const currentRow = writable(0);

export const includedSet = writable(new Set<string>());

export const excludedSet = writable(new Set<string>());

export const finished = writable<Finished>({
  finished: false,
  found: false,
  id: 0,
});

export const toast = writable("");

export const shift = writable(false);

cache({ shift, board, currentRow, finished, excludedSet, includedSet });
