let x = "x";
let o = "o";

function createPlayer(choice) {
    let score = 0;
    const getScore = () => score;
    const giveScore = function() {
        console.log(`Point for ${this.choice}!`);
        return score++;
    }
    return {choice,getScore,giveScore};
}

const player1 = createPlayer(x);
const player2 = createPlayer(o);

function gameBoard() {
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let winCombo = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]
    let turn = 0; 
    function getBoard() {
        let viewBoard = board.map(x => x);
        viewBoard.splice(3,0,`\n`);
        viewBoard.splice(7,0,`\n`);
        return(viewBoard.join(""));
    }
    function setBoard(player, pos) {
        board[pos-1] = player;
    }
    function checkWin() {
        for (let i in winCombo) {
            console.log(winCombo[i]);
            if (board[winCombo[i][0]-1] == board[winCombo[i][1]-1] && board[winCombo[i][0]-1] == board[winCombo[i][2]-1]) {
                if (board[winCombo[i][0]-1] === player1.choice) player1.giveScore();
                else player2.giveScore();
                board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
                break;
            }
        }
    }
    
    return {board,turn,getBoard,setBoard,checkWin}
}

const main = gameBoard();

main.setBoard(player2.choice,1);
main.setBoard(player1.choice,2);
main.setBoard(player2.choice,3);
main.setBoard(player2.choice,4);
main.setBoard(player1.choice,5);
main.setBoard(player1.choice,6);
main.setBoard(player1.choice,7);
main.setBoard(player1.choice,8);
main.setBoard(player1.choice,9);

console.log(main.getBoard());
main.checkWin();
