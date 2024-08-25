

function createPlayer(name,choice) {
    let score = 0;
    let turn = document.querySelector(".turn");
    const getScore = () => score;
    const giveScore = function() {
        console.log(`Point for ${name}!`);
        score++;
    }
    function reset() {
        score = 0;
    }
    return {choice,getScore,giveScore,reset};
}


function gameBoard() {
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    const square = [];
    let topScore = 0;
    let turnFirstPlayer = true;
    let turn = document.querySelector(".turn");
    const game = document.querySelector(".gameboard");
    player1 = createPlayer("player1",null);
    player2 = createPlayer("player2",null); 
    document.querySelector(".reset").addEventListener("click",play)

    function buildBoard() {
        let buttonX = document.getElementById("x");
        let buttonO = document.getElementById("o");
        document.querySelector(".choice").style.display = "block";
        

        buttonX.addEventListener("click",function() {
            player1.choice = buttonX.innerText;
            player2.choice = buttonO.innerText;   
            document.querySelector(".choice").style.display = "none";
            turn.textContent = turnFirstPlayer == true ? `Player 1's (${player1.choice})  turn!` : `Player 2's (${player2.choice}) turn!`;

        });
        
        buttonO.addEventListener("click",function() {
            player1.choice = buttonO.innerText;
            player2.choice = buttonX.innerText;
            document.querySelector(".choice").style.display = "none";
            turn.textContent = turnFirstPlayer == true ? `Player 1's (${player1.choice})  turn!` : `Player 2's (${player2.choice}) turn!`;

        });
        game.innerHTML = '';
    }

    function populateBoard() {
        game.innerHTML = '';
        board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        square.splice(0, square.length)

        //populate board
        for (let i = 0; i < 9; i++) {
            square.push(document.createElement("div"));
            game.appendChild(square[i]);
            square[i].textContent = board[i];
            // if (ready) {
                square[i].addEventListener("click",function() {                    
                    if (turnFirstPlayer) {
                        setBoard(player1.choice,i+1);
                    }
                    else {
                        console.log(player2.choice)
                        setBoard(player2.choice,i+1);
                    }
                    console.log(main.getBoard());
                    turnFirstPlayer = !turnFirstPlayer;
                    turn.textContent = turnFirstPlayer == true ? `Player 1's (${player1.choice}) turn!` : `Player 2's (${player2.choice}) turn!`;
                    checkWin();
                });
            // }
        }
    }

    function play() {
        buildBoard();
        populateBoard();
    }

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
        square[pos-1].textContent = player;
    }
    function checkWin() {
        for (let i in winCombo) {
            if (square[winCombo[i][0]-1].textContent === square[winCombo[i][1]-1].textContent && square[winCombo[i][0]-1].textContent === square[winCombo[i][2]-1].textContent) {
                switch (square[winCombo[i][0]-1].textContent) {
                    case player1.choice: 
                        player1.giveScore();
                        if (player1.getScore() === 3) {
                            turn.textContent = `The winner is Player 1 (${player1.choice})`;
                            turn.style.color = "green";

                            player1.reset();
                            document.querySelector(".reset").style.visibility = "visible";
                            break;
                        }
                        else {
                            turn.textContent = `Point for Player 1 (${player1.choice})!`;
                            turn.style.color = "green";

                            setTimeout(main.populateBoard,2000);
                            setTimeout(() => {
                                turn.textContent = turnFirstPlayer == true ? `Player 1's (${player1.choice})  turn!` : `Player 2's (${player2.choice}) turn!`;
                                turn.style.color = "black";

                            },2000);
                            break;
                        }
                        
                    case player2.choice:
                        if (player2.getScore() === 3) {
                            turn.textContent = `The winner is Player 2 (${player2.choice})`;
                            turn.style.color = "green";
                            player2.reset();
                            document.querySelector(".reset").style.visibility = "visible";
                            break;
                        }
                        else {
                            player2.giveScore();
                            turn.textContent = `Point for Player 2 (${player2.choice})!`;
                            turn.style.color = "green";

                            setTimeout(main.populateBoard,2000);
                            setTimeout(() => {
                                turn.textContent = turnFirstPlayer == true ? `Player 1's (${player1.choice})  turn!` : `Player 2's (${player2.choice}) turn!`;
                                turn.style.color = "black";
                            },2000);
                            break;
                        }
                    case ' ':
                        continue;
                }
            }
        }
    }
    function endRound() {
        game.innerHTML = '';
        game.appendChild(document.createElement("button"));
        play();
    }
    return {board,play,populateBoard,buildBoard,getBoard,setBoard,checkWin}
}

const main = gameBoard();
main.play();