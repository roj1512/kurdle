const getPath = (file: string) => new URL(file, import.meta.url).pathname;

const words: string[] = (
  await Deno.readTextFile(getPath("ckb_5words.txt"))
).split(/\n/);
const supplementWords: string[] = (
  await Deno.readTextFile(getPath("ckb_5words_supplement.txt"))
).split(/\n/);

export function todayId() {
  return Math.floor(
    ((new Date().getTime() - new Date(1970, 1, 1).getTime()) /
        1000 /
        60 /
        60 /
        24 -
      18992 +
      195) %
      words.length,
  );
}

export function today() {
  return words[todayId()];
}

export function isValid(word: string) {
  return words.includes(word) || supplementWords.includes(word);
}

export function compare(target: string, word: string) {
  const toReturn = [];
  for (const i in word.split("")) {
    const letter = word[i];
    if (target[i] == letter) {
      toReturn.push(2);
    } else if (target.includes(letter)) {
      toReturn.push(1);
    } else {
      toReturn.push(0);
    }
  }
  return toReturn;
}
