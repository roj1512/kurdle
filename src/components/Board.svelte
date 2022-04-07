<script lang="ts">
  import { board } from "../store";
  import type { Board } from "../store";
  import BoardRow from "./BoardRow.svelte";
  import Tile from "./Tile.svelte";

  let boardSubscribtion: Board;

  board.subscribe((v) => {
    boardSubscribtion = v;
  });
</script>

<div>
  {#each boardSubscribtion as tiles}
    <BoardRow>
      {#each tiles as tile, i}
        <Tile text={tile.value} comparison={tile.comparison} />
      {/each}
    </BoardRow>
  {/each}
</div>

<style lang="stylus">
  @import "./Board"
</style>
