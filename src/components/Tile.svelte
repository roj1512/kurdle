<script lang="ts">
  import { blur, slide , scale} from "svelte/transition";

  export let text: string;
  export let comparison: number;

  const aliases = {
    ئ: "ئـ",
    ه: "هـ",
  };
</script>

<div
  class={comparison == 2
    ? "green"
    : comparison == 1
    ? "yellow"
    : comparison == 0
    ? "light"
    : ""}
>
  {#if text}
    <p transition:scale>
      {aliases[text] || text}
    </p>
  {/if}
</div>

<style lang="stylus">
  @import "./Tile"
</style>
