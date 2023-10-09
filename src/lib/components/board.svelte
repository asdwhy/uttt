<script lang="ts">
    import { PlayerSymbol, Game } from '$lib/types';
    import { createEventDispatcher } from 'svelte';

    let game = new Game();
    let drawVec: [number, number]; // vector to help determine how to draw the winning line.

    const dispatch = createEventDispatcher();
    $: {
        if(!game.state.ongoing) {
            dispatch('gameover', game.state);
        }
    }

    function cellClicked(row: number, col: number): () => void {
        return () => {
            game.select(row, col);

            if(game.state.from && game.state.to) {
                drawVec = [game.state.to.row - game.state.from.row, game.state.to.col - game.state.from.col];
            }

            game = game; // force svelte reactive update
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg viewBox="0 0 100 100" class:game-over={game.state.win}>
    <!-- boxes -->
    <rect on:click={cellClicked(0, 0)} x="0" y="0" class:selected={game.board[0][0]}/>
    <rect on:click={cellClicked(0, 1)} x="33.33%" y="0" class:selected={game.board[0][1]}/>
    <rect on:click={cellClicked(0, 2)} x="66.66%" y="0" class:selected={game.board[0][2]}/>

    <rect on:click={cellClicked(1, 0)} x="0" y="33.33%" class:selected={game.board[1][0]}/>
    <rect on:click={cellClicked(1, 1)} x="33.33%" y="33.33%" class:selected={game.board[1][1]}/>
    <rect on:click={cellClicked(1, 2)} x="66.66%" y="33.33%" class:selected={game.board[1][2]}/>

    <rect on:click={cellClicked(2, 0)} x="0" y="66.66%" class:selected={game.board[2][0]}/>
    <rect on:click={cellClicked(2, 1)} x="33.33%" y="66.66%" class:selected={game.board[2][1]}/>
    <rect on:click={cellClicked(2, 2)} x="66.66%" y="66.66%" class:selected={game.board[2][2]}/>

    <!-- grid lines -->
    <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="black"/>
    <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="black"/>
    <line x1="0%" y1="33.33%" x2="100%" y2="33.33%" stroke="black"/>
    <line x1="0%" y1="66.66%" x2="100%" y2="66.66%" stroke="black"/>
    
    <!-- moves -->
    {#each game.moves as {row, col}}
        {#if game.board[row][col] === PlayerSymbol.X}
            <path class="x-marker" d={`M${5 + col*33} ${5 + row*33} L${28 + 33*col} ${28+33*row}`} />
            <path class="x-marker" d={`M${28 + col*33} ${5 + row*33} L${5 + 33*col} ${28+33*row}`}/>
        {:else}
            <path class="o-marker" d={`M ${5 + 33*col} ${16.5 + 33*row} A 1 1 0 0 0 ${28 +33*col} ${16.5 + 33*row}`} />
            <path class="o-marker" d={`M ${28 + 33*col} ${16.5 + 33*row} A 1 1 0 0 0 ${5 +33*col} ${16.5 + 33*row}`} />
        {/if}
    {/each}

    <!-- winner line -->
    {#if game.state.win && game.state.from && game.state.to && drawVec}
        <path class="win-line" d={`
            M
            ${(drawVec[1] == 0) ? 16.5 + 33*game.state.from.col : (drawVec[1] > 0) ? 3 +33*game.state.from.col : 30 +33*game.state.from.col} 
            ${(drawVec[0] == 0) ? 16.5 + 33*game.state.from.row : (drawVec[0] > 0) ? 3 +33*game.state.from.row : 30 +33*game.state.from.row}
            L 
            ${(drawVec[1] == 0) ? 16.5 + 33*game.state.to.col : (drawVec[1] > 0) ? 30 +33*game.state.to.col : 3 +33*game.state.to.col} 
            ${(drawVec[0] == 0) ? 16.5 + 33*game.state.to.row : (drawVec[0] > 0) ? 30 +33*game.state.to.row : 3 +33*game.state.to.row}`} />
    {/if}
    <!-- 
        pseudo code for drawing line
        
        draw_line(from, to):
            v := from - to
            
            if v_0 == 0:
                draw y level from middle of square
            elseif v_0 > 0:
                draw y level from top of square (i.e. 5)
            elseif v_0 < 0:
                draw y level from bottom of square (i.e. 28)

            if v_1 == 0:
                draw x level from middle of square
            elseif v_1 > 0:
                draw x level from left of square (i.e. 5)
            elseif v_1 < 0:
                draw x level from right of square (i.e. 28)

     -->
</svg>

<style>
    svg {
        background-color: white;
    }

    rect {
        width: 33.33%;
        height: 33.33%;
        fill: white;
    }

    rect:hover {
        fill: blue;
        opacity: 0.1;
    }
    
    .selected {
        pointer-events: none;
    }

    .game-over {
        pointer-events: none;
    }

    .o-marker {
        fill:none; 
        stroke:crimson; 
        stroke-width: 2;

        stroke-dasharray: 36.2;
        stroke-dashoffset: 36.2;
        animation: draw 0.2s linear forwards;
    }

    .win-line {
        fill: none; 
        stroke:darkgreen; 
        stroke-width: 3;
        stroke-linecap: round; 

        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        animation: draw 1s linear forwards;
    }

    .x-marker {
        fill: none; 
        stroke:darkblue; 
        stroke-width: 2;
        stroke-linecap: round;

        stroke-dasharray: 33.3;
        stroke-dashoffset: 33.3;
        
        animation: draw 0.2s linear forwards;
    }

    @keyframes draw {
        to {
            stroke-dashoffset: 0;
        }
    }
</style>
