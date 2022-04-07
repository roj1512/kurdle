<script lang="ts">
  import { insert, backspace, submit } from "../board";
  import Key from "./Key.svelte";
  import KeyboardRow from "./KeyboardRow.svelte";

  let rows = [
    ["ق", "و", "ە", "ر", "ت", "ڕ", "ی", "ێ", ["ئ", "ئـ"], "ح", "ع", "ۆ", "پ"],
    ["ا", "س", "ش", "د", "ف", "گ", "غ", ["ه", "هـ"], "ژ", "ک", "ل", "ڵ"],
    ["✅", "ز", "خ", "ج", "چ", "ڤ", "ب", "ن", "م", "❌"],
  ];

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
    }
  };

  window.onkeydown = async (ev) => {
    switch (ev.key) {
      case "Enter": {
        ev.preventDefault();
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
