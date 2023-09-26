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

    const getPlacedPiece = (index, currentBoard) => {
        return currentBoard[index]
    }

    const getXPieces = (currentBoard) => {
        const xPieceIndexes = []
        for(i = 0; i < currentBoard.length; i++){
            if(currentBoard[i] == "X"){
                xPieceIndexes.push(i)
            }
        }
        return xPieceIndexes
    }

    const getOPieces = (currentBoard) => {
        const oPieceIndexes = []
        for(i = 0; i < currentBoard.length; i++){
            if(currentBoard[i] == "O"){
                oPieceIndexes.push(i)
            }
        }
        return oPieceIndexes
    }

    return {logicBoard, placePiece, getPlacedPiece, getXPieces, getOPieces}
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
                div.textContent = null
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
    controller.drawBoard(board)
    let currentPlayer = player1;
    let spots = document.getElementsByClassName("spot")
    let winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8],[2, 4, 6] ,[3, 4, 5], [6,7,8]]
    let alertModal = document.getElementById("alert-modal")

    let checker = (arr, target) => target.every(v => arr.includes(v));
    
    const checkForTie = (currentBoard) => {
        if(roundCount >= 9){
            alert("game is a tie")
        }
    }
    const checkForWinner = (currentBoard) => {
        let xPieceLocations = game.getXPieces(board)
        let oPieceLocations = game.getOPieces(board)
        
        for (i=0; i < winningCombos.length; i++){
            if (checker(xPieceLocations, winningCombos[i])) {
                alertModal.textContent = "Player 1 has won"
                alertModal.classList.remove("hidden")
            }
            else if (checker(oPieceLocations, winningCombos[i])) {
                alert("Player 2 has won")
            }
        }
    }

    const switchRound = () => {
        console.log(roundCount)
        checkForWinner(board);
        checkForTie()
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
                let data = e.target.dataset.spot
                console.log(data)
                if (Number.isInteger(board[data])){
                    e.target.textContent = currentPlayer.getPiece()
                    game.placePiece(currentPlayer.getPiece(), e.target.dataset.spot, board )
                    switchRound()
                    roundCount++
                }
                else {
                    alert("Spot Taken")
                }    
            })
        }
    }

    addClickHandler(board)
    
}

Game()
