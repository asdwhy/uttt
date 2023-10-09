<script>
    import { goto } from '$app/navigation';
    import gifSrc from '$lib/assets/uttt.gif';
</script>

<main class="container">
    <h1>Ultimate Tic Tac Toe</h1>

    <div class="btn-tbl">
        <button>Play Online</button>
        <button>Play a friend</button>
        <button on:click={() => goto("/play/computer")}>Play Computer</button>
        <button>How to Play</button>
    </div>

    <center>
        From <a href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe">Wikipedia</a>: 
        Ultimate tic-tac-toe is a board game composed of nine tic-tac-toe boards aranged in a 3 x 3 grid.
        Players take turns playing on the smaller tic-tac-toe boards until one of them wins on the larger board.
    </center>

    <img src="{gifSrc}" alt="Ultimate Tic Tac Toe"/>

</main>


<style>
    .container {
        width: 60%;
        margin: auto;
        padding: 5rem 0rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container > :not(:last-child) {
        margin-bottom: 2rem;
    }
</style>