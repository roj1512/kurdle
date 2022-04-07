<script lang="ts">
  import { insert, backspace, submit } from "../board";
  import Key from "./Key.svelte";
  import KeyboardRow from "./KeyboardRow.svelte";
  import { shift } from "../store";

  let rows: (string | string[])[][];

  shift.subscribe((v) => {
    rows = [
      [
        "ق",
        "و",
        "ە",
        v ? "ڕ" : "ر",
        "ت",
        v ? "ێ" : "ی",
        ["ئ", "ئـ"],
        v ? "ع" : "ح",
        "ۆ",
        "پ",
      ],
      [
        "ا",
        v ? "ش" : "س",
        "د",
        "ف",
        v ? "غ" : "گ",
        ["ه", "هـ"],
        "ژ",
        "ک",
        v ? "ڵ" : "ل",
      ],
      ["ز", "خ", v ? "چ" : "ج", "ڤ", "ب", "ن", "م"],
      ["✅", v ? "⬇️" : "⬆️", "❌"],
    ];
  });

  const allowedKeys = "قوەرڕتیێئحعۆپاشدفگغهژکلڵزخجچڤبنم".split("");

  window.onkeypress = (ev) => {
    if (allowedKeys.includes(ev.key)) {
      insert(ev.key);
    }
  };

  window.onkeyup = async (ev) => {
    switch (ev.key) {
      case "Backspace": {
        backspace();
        break;
      }
      case "Enter": {
        await submit();
        break;
      }
      case "Shift": {
        shift.set(false);
        break;
      }
    }
  };

  window.onkeydown = async (ev) => {
    switch (ev.key) {
      case "Enter": {
        ev.preventDefault();
        break;
      }
      case "Shift": {
        shift.set(true);
        break;
      }
    }
  };
</script>

<div>
  {#each rows as keys}
    <KeyboardRow>
      {#each keys as key}
        {#if Array.isArray(key)}
          <Key key={key[0]} text={key[1]} />
        {:else}
          <Key {key} text={key} />
        {/if}
      {/each}
    </KeyboardRow>
  {/each}
</div>

<style lang="stylus">
  @import "./Keyboard"
</style>
