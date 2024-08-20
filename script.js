

function createPlayer(name,choice) {
    let score = 0;
    const getScore = () => score;
    const giveScore = function() {
        console.log(`Point for ${name}!`);
        score++;
        if(score === 3) {
            player1.reset;
            player2.reset; 
            return `The winner is ${name}!`;           
        }
    }
    function reset() {
        score = 0;
    }
    return {choice,getScore,giveScore,reset};
}

const player1 = createPlayer("player1","x");
const player2 = createPlayer("player2","o");

function gameBoard() {
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let topScore = 0;

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
            if (board[winCombo[i][0]-1] === board[winCombo[i][1]-1] && board[winCombo[i][0]-1] === board[winCombo[i][2]-1]) {
                switch (board[winCombo[i][0]-1]) {
                    case player1.choice: 
                        player1.giveScore();
                        board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
                        break;
                    case player2.choice:
                        player2.giveScore();
                        board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
                        break;
                    case ' ':
                        continue;
                }
            }
        }
    }
    return {board,getBoard,setBoard,checkWin}
}

const main = gameBoard();



main.setBoard(player1.choice,9);
main.setBoard(player1.choice,7);
main.setBoard(player1.choice,8);

console.log(main.getBoard());
main.checkWin();



main.setBoard(player1.choice,9);
main.setBoard(player1.choice,7);
main.setBoard(player1.choice,8);
console.log(main.getBoard());

main.checkWin();

const game = document.querySelector(".gameboard");
for (let i = 0; i < 9; i++) {
    game.appendChild(document.createElement("div"));
}