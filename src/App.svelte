<script lang="ts">
  import Results from "./components/Results.svelte";
  import { finished } from "./store";
  import Toast from "./components/Toast.svelte";
  import Board from "./components/Board.svelte";
  import Keyboard from "./components/Keyboard.svelte";

  let finishedSubscription: boolean;

  finished.subscribe((v) => {
    finishedSubscription = v.finished;
  });
</script>

<main>
  <Board />
  {#if finishedSubscription}
    <Results />
  {:else}
    <Keyboard />
  {/if}
</main>

<Toast />

<style lang="stylus">
  @import "./App"
</style>
