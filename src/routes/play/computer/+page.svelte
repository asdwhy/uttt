<script lang="ts">
    import Board from "$lib/components/board.svelte";
    import type { Evaluation } from "$lib/types";

    // let ultimateGame = new Game();

    function subGame(row: number, col: number): (e: CustomEvent<Evaluation>) => void {
        return (e: CustomEvent<Evaluation>) => {
            console.log(`game ${row}, ${col} has result`);
            console.log(e.detail);
        }
    }
</script>

<p>this is the play computer page</p>

<div class="ultimate-board">
    <Board on:gameover={subGame(0,0)}></Board>
    <Board on:gameover={subGame(0,1)}></Board>
    <Board on:gameover={subGame(0,2)}></Board>
    <Board on:gameover={subGame(1,0)}></Board>
    <Board on:gameover={subGame(1,1)}></Board>
    <Board on:gameover={subGame(1,2)}></Board>
    <Board on:gameover={subGame(2,0)}></Board>
    <Board on:gameover={subGame(2,1)}></Board>
    <Board on:gameover={subGame(2,2)}></Board>
</div>


<style>
    .ultimate-board {
        --board-size: 400px;
        height: var(--board-size);
        width: var(--board-size);

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 5px;
        background-color: black;
    }
</style>