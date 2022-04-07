import {
  board,
  currentRow,
  includedSet,
  excludedSet,
  finished,
  toast,
} from "./store";
import type { Board } from "./store";
import { compare, fetchId } from "./api";
import { fixToSubmit } from "./utils";

let boardSubscribtion: Board;
let currentRowSubscribtion: number;

board.subscribe((v) => {
  boardSubscribtion = v;
});

currentRow.subscribe((v) => {
  currentRowSubscribtion = v;
});

export function insert(char: string) {
  board.update((v) => {
    // Convert the board to value lists and get the index of the first empty value.
    const empty = v[currentRowSubscribtion].map((v) => v.value).indexOf("");
    if (empty != -1) {
      v[currentRowSubscribtion][empty].value = char;
      return v;
    }
    return v;
  });
}

export function backspace() {
  board.update((v) => {
    const { length } = v[currentRowSubscribtion]
      .map((v) => v.value)
      .filter((v) => v);
    if (length != 0) {
      v[currentRowSubscribtion][length - 1].value = "";
    } else {
      toast.set("هیچت نەنووسیوە.");
    }
    return v;
  });
}

export async function submit() {
  const word = fixToSubmit(
    boardSubscribtion[currentRowSubscribtion].map((v) => v.value).join("")
  );
  if (word.length != 5) {
    toast.set("خانەی بەتاڵت ماوە.");
    return;
  }
  const { valid, comparison } = await compare(word);
  if (!valid) {
    toast.set("لەناو لیستی وشەکاندا نییە.");
    return;
  }
  // Change keyboard key colors.
  for (const i in comparison) {
    if (comparison[i] == 0) {
      excludedSet.update((v) => {
        v.add(word[i]);
        return v;
      });
    }
  }
  for (const i in comparison) {
    if (comparison[i] != 0) {
      includedSet.update((v) => {
        v.add(word[i]);
        return v;
      });
    }
  }
  // Change tile colors.
  board.update((v) => {
    v[currentRowSubscribtion].forEach((v, i) => {
      v.comparison = comparison[i];
    });
    return v;
  });
  // Move to next row.
  currentRow.update((v) => {
    v++;
    return v;
  });
  // Act if the word was guessed or no tiles left.
  const comparisons = boardSubscribtion
    .map((v) => v.map((v) => v.comparison))
    .filter((v) => v.reduce((p, c) => p + c) > -1);
  const found = comparisons.flat().join("").endsWith("22222");
  if (found || comparisons.length == 6) {
    finished.set({ finished: true, found, id: await fetchId() });
    if (found) {
      toast.set("هەر بژیت!");
    }
  }
}
