const playerFactory = (name, piece) => {
    const getName = () => {return name}
    const getPiece = () => {return piece}

    return {getName, getPiece}
}

const GameBoard = () => {
    const logicBoard = [0,1,2,3,4,5,6,7,8]

    const placePiece = (playerPiece, spot, currentBoard) => {
        currentBoard[spot] = playerPiece
    }

    return {logicBoard, placePiece}
}

const displayController = () => {

    const drawBoard = (currentBoard) => {
        let count = 0;
        const board = document.getElementById("board")

        currentBoard.forEach(piece => {
            let div = document.createElement("div");
            div.setAttribute("data-spot", count)
            div.id = `spot-${count}`
            div.classList.add("spot")
            if(Number.isInteger(piece)){
                div.textContent = "test"
            }
            else {
                div.textContent = piece
            }
            
            board.append(div)
            count++
        });
    }

    return {drawBoard}
}



const Game = () => {
    let roundCount = 1
    let player1 = playerFactory("Boston", "X");
    let player2 = playerFactory("Cassie", "O");
    let game = GameBoard();
    let board = game.logicBoard
    let controller = displayController()
    let switchUserButton = document.createElement("button")
    switchUserButton.textContent = "switch player"
    document.body.append(switchUserButton)
    controller.drawBoard(board)
    let currentPlayer = player1;
    let spots = document.getElementsByClassName("spot")

    switchUserButton.addEventListener("click", (e) => {
        currentPlayer = player1
    })
    
    

    const checkForWinner = () => {
        
    }

    const switchRound = () => {
        
        if (roundCount % 2 === 0){
            currentPlayer = player1
        }
        else {
            currentPlayer = player2
        }
    }
    
    const addClickHandler = () => {
        for(i = 0; i < spots.length; i++){
            spots[i].addEventListener("click", (e) => {
                e.target.textContent = currentPlayer.getPiece()
                game.placePiece(currentPlayer.getPiece(), e.target.dataset.spot, board )
                switchRound()
                roundCount++
                console.log(board)
                
            })
            console.log("blah")
        }
    }

    
    addClickHandler()
    
    
    
    
}

Game()