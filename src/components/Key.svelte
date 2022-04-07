<script lang="ts">
  import { submit, backspace, insert } from "../board";
  import { excludedSet, includedSet, shift } from "../store";

  export let key: string;
  export let text: string;

  let included: boolean;
  let excluded: boolean;

  $: excludedSet.subscribe((v) => {
    excluded = v.has(key);
  });

  $: includedSet.subscribe((v) => {
    included = v.has(key);
  });

  async function keyPress() {
    switch (key) {
      case "✅": {
        await submit();
        break;
      }
      case "❌": {
        backspace();
        break;
      }
      case "⬆️": {
        shift.set(true);
        break;
      }
      case "⬇️": {
        shift.set(false);
        break;
      }
      default: {
        insert(key);
        break;
      }
    }
  }
</script>

<button on:click={keyPress} class={included ? "incl" : excluded ? "excl" : ""}>
  {text || key}
</button>

<style lang="stylus">
  @import "./Key"
</style>
