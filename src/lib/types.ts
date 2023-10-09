export class Move {
    row: number
    col: number

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    equals(move: Move): boolean {
        return move.row == this.row && move.col == this.col;
    }
}

export enum PlayerSymbol {
    X = 'x',
    O = 'o',
    Empty = ''
};

// Represents an evaluation of the game returned from 
export interface Evaluation {
    win?: PlayerSymbol,
    tie?: boolean,
    ongoing?: boolean,
    from?: Move,
    to?: Move
}

export class Game {
    board: [PlayerSymbol, PlayerSymbol, PlayerSymbol][]; // current board state
    moves: Move[]; // list of moves
    state: Evaluation; // current evaluation of game

    constructor() {
        this.board = [
            [PlayerSymbol.Empty, PlayerSymbol.Empty, PlayerSymbol.Empty], 
            [PlayerSymbol.Empty, PlayerSymbol.Empty, PlayerSymbol.Empty], 
            [PlayerSymbol.Empty, PlayerSymbol.Empty, PlayerSymbol.Empty]
        ];

        this.moves = [];
        this.state = {ongoing: true};
    }

    // Plays a move at (row, col)
    select(row: number, col: number) {
        if(!this.state.ongoing) { return; }
        this.board[row][col] = (this.moves.length % 2 == 0) ? PlayerSymbol.X : PlayerSymbol.O;

        this.moves.push(new Move(row, col));
        this.state = this.evaluate();
    }
    
    private evaluate(): Evaluation {
        let res = this.checkDiagonals();
        for (let i=0; i<3; i++) {
            res = res ?? this.checkRow(i) ?? this.checkColumn(i);
        }

        if(!res && this.moves.length == 9) {
            res = {tie: true};
        } else if(!res) {
            res = {ongoing: true}
        }

        return res;
    }

    private checkRow(row: number): Evaluation | undefined {
        if(this.board[row][0] == PlayerSymbol.Empty) return;
        if(this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2]) {
            return {
                win: this.board[row][0],
                ...this.fromTo(new Move(row, 0), new Move(row, 2))
            }
        }
    }

    private checkColumn(col: number): Evaluation | undefined {
        if(this.board[0][col] == PlayerSymbol.Empty) return;
        if(this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col]) {
            return {
                win: this.board[0][col],
                ...this.fromTo(new Move(0, col), new Move(2, col))
            }
        }
    }

    private checkDiagonals(): Evaluation | undefined  {
        if(this.board[1][1] == PlayerSymbol.Empty) return;
        if(this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
            return {
                win: this.board[1][1],
                ...this.fromTo(new Move(0, 0), new Move(2, 2))
            }
        }

        if(this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
            return {
                win: this.board[1][1],
                ...this.fromTo(new Move(2, 0), new Move(0, 2))
            }
        }
    }

    /**
     * Returns evaluation with (from, to) set such that from was selected first
     * and to was selected later. 
     */
    private fromTo(move1: Move, move2: Move): Evaluation {
        let m1First = this.moves.find((move) => (move.equals(move1)) || move.equals(move2))?.equals(move1);

        return {
            from: m1First ? move1: move2,
            to: m1First ? move2: move1
        };
    }
}


// class UltimateGame {
//     // subgames: Game[]
//     // board: string[]

//     constructor(subgames: Evaluation[]) {
//         if(subgames.length != 9) throw new Error("UltimateGame must be constructed from 9 Games");
//         super();
//         // this.subgames = subgames;
//     }

    

//     select(row: number, col: number) {
//         // if(!this.state.ongoing) { return; }
//         // this.board[row][col] = (this.moves.length % 2 == 0) ? PlayerSymbol.X : PlayerSymbol.O;

//         // this.moves.push(new Move(row, col));
//         // this.state = this.evaluate();
//     }

// }