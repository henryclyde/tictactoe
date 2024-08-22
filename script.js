

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


function gameBoard() {
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let topScore = 0;
    let turnFirstPlayer = true;
    let square = [];

    
    function buildBoard() {
        board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        square = [];
        const game = document.querySelector(".gameboard");
        let buttonX = document.getElementById("x");
        let buttonO = document.getElementById("o");
        player1 = createPlayer("player1",null);
        player2 = createPlayer("player2",null); 

        buttonX.addEventListener("click",function() {
            player1.choice = buttonX.innerText;
            player2.choice = buttonO.innerText;   
            document.querySelector(".choice").style.visibility = "hidden";
        });
        
        buttonO.addEventListener("click",function() {
            player1.choice = buttonO.innerText;
            player2.choice = buttonX.innerText;
            document.querySelector(".choice").style.visibility = "hidden";
        });
        game.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            square.push(document.createElement("div"));
            game.appendChild(square[i]);
            square[i].textContent = board[i];
            // if (ready) {
                document.querySelector(".turn").textContent = turnFirstPlayer == true ? "Player 1's turn!" : "Player 2's turn!";
                square[i].addEventListener("click",function() {
                    if (turnFirstPlayer) {
                        setBoard(player1.choice,i+1);
                        console.log(main.getBoard());
                        checkWin();
                        turnFirstPlayer = !turnFirstPlayer;
                    }
                    else {
                        console.log(player2.choice)
                        setBoard(player2.choice,i+1);
                        console.log(main.getBoard());
                        checkWin();
                        turnFirstPlayer = !turnFirstPlayer;
                    }
                });
            // }
        }
        return {square};
    }
    function play() {
        buildBoard();
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
                        // buildBoard();
                        board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
                        square = [];
                        break;
                    case player2.choice:
                        player2.giveScore();
                        // buildBoard();
                        board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
                        square = [];
                        break;
                    case ' ':
                        continue;
                }
            }
        }
    }
    return {board,play,buildBoard,getBoard,setBoard,checkWin}
}

const main = gameBoard();



// main.setBoard(player1.choice,9);
// main.setBoard(player1.choice,7);
// main.setBoard(player1.choice,8);





// main.buildBoard();
main.play();