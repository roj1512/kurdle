<script lang="ts">
  import Board from "./Board.svelte";
  import { board, finished, toast } from "../store";
  import type { Finished } from "../store";
  import { fetchId } from "../api";

  let comparisons: string;
  let finishedSubscription: Finished;

  $: attempts = comparisons.split("\n").length;
  $: text = `کوردڵ ${finishedSubscription.id} ${attempts}/6\n\n${comparisons}`;

  board.subscribe((v) => {
    comparisons = v
      // Remove empty rows.
      .filter((v) => v.map((v) => v.value).join("") != "")
      // Convert the board to comparison lists.
      .map((v) => v.map((v) => v.comparison))
      // Relpace comparison numbers with emojis.
      .map((v) => v.map((v) => (v == 2 ? "🟩" : v == 1 ? "🟨" : "⬛️")))
      // Convert the emoji lists to string.
      .map((v) => v.join(""))
      // Join the emoji lists.
      .join("\n");
  });

  finished.subscribe(async (v) => {
    finishedSubscription = v;
    try {
      if (v.id != (await fetchId())) {
        localStorage.clear();
        location.reload();
      }
    } catch (_err) {}
  });
</script>

<div>
  <ul>
    <li>
      <button
        on:click={() =>
          navigator.clipboard.writeText(text) &&
          toast.set("ئەنجامەکان لەبەر گیرانەوە.")}
        ><i class="fa-solid fa-2x fa-copy" /></button
      >
    </li>
    <li>
      <a
        href="https://twitter.com/share?text={encodeURIComponent(text)}"
        target="_blank"
        rel="noreferrer"><i class="fa-brands fa-2x fa-twitter" /></a
      >
    </li>
    <li>
      <a href="https://github.com/roj1512/kurdle" target="_blank"
        ><i class="fa-brands fa-2x fa-github" /></a
      >
    </li>
    <li>
      <button
        on:click={() => {
          localStorage.clear();
          location.reload();
        }}><i class="fa-solid fa-2x fa-redo" /></button
      >
    </li>
  </ul>
</div>

<style lang="stylus">
  @import "./Results"
</style>
