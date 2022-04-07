import type { Writable } from "svelte/store";

export function cache(writables: Record<string, Writable<any>>) {
  for (const [key, writable] of Object.entries(writables)) {
    const cache = JSON.parse(localStorage.getItem(key));
    if (cache != null) {
      if (key.endsWith("Set")) {
        writable.set(new Set(cache));
      } else {
        writable.set(cache);
      }
    }
    writable.subscribe((v) => {
      localStorage.setItem(key, JSON.stringify(v instanceof Set ? [...v] : v));
    });
  }
}

export function fixToSubmit(toSubmit: string) {
  return toSubmit.replace(/ه/g, "ھ");
}
