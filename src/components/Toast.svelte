<script lang="ts">
  import {blur} from "svelte/transition";
  import { toast } from "../store";

  let text: string;
  let visible: boolean;
  let timeout: NodeJS.Timeout;

  $: if (visible) {
    setTimeout(() => {
      visible = false;
    }, 2000);
  }

  toast.subscribe((v) => {
    if (!v) {
      return;
    }
    clearTimeout(timeout);
    text = v;
    if (!visible) {
      visible = true;
    }
    toast.set("");
  });
</script>

{#if visible}
  <div transition:blur>
    <p>{text}</p>
  </div>
{/if}

<style lang="stylus">
    @import "./Toast"
</style>
