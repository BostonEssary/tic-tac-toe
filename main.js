const playerFactory = (name, piece) => {
    const getName = () => {return name}
    const getPiece = () => {return piece}
    const setName = (newName) => {name = newName}
    const getMove = (emptySpots) => {
        var move = emptySpots[Math.floor(Math.random()*emptySpots.length)]
        return move
    }
    return {getName, getPiece, setName, getMove}
}



const GameBoard = () => {
    const logicBoard = [0,1,2,3,4,5,6,7,8]

    const placePiece = (playerPiece, spot, currentBoard) => {
        currentBoard[spot] = playerPiece
    }

    const getBoard = (currentBoard) => {
        return logicBoard
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

    const getEmptySpots = (currentBoard) => {
        const emptySpots = []
        for(i = 0; i < currentBoard.length; i++){
            if(Number.isInteger(currentBoard[i])){
                emptySpots.push(i)
            }
        }
        return emptySpots
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

    

    return {logicBoard, placePiece, getPlacedPiece, getXPieces, getOPieces, getEmptySpots, getBoard}
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
    const createNameForm = (player, currentBoard) => {
        let formDiv = document.createElement("div")
        formDiv.classList.add("form-div")
        let formHeading = document.createElement("h2")
        let inputField = document.createElement("INPUT")
        let submitButton = document.createElement("button")
        formHeading.textContent = "What is your name, challenger?"
        submitButton.textContent = "Submit"
        inputField.setAttribute("type", "text")
        inputField.id = "name-field"
        formDiv.append(formHeading)
        formDiv.append(inputField)
        formDiv.append(submitButton)

        submitButton.addEventListener("click", (e) => {
            player.setName(inputField.value)
            console.log(player.getName())
            document.getElementById("board").classList.remove("hidden")
            formDiv.classList.add("hidden")
            
    })

        document.body.prepend(formDiv) 
    }
    
    return {drawBoard, createNameForm}
}



const Game = () => {
    let roundCount = 1
    let player1 = playerFactory("", "X");
    let player2 = playerFactory("Comptuer", "O");
    let game = GameBoard();
    let board = game.getBoard()
    let controller = displayController()
    let visualBoard = document.getElementById("board")
    let currentPlayer = player1;
    let spots = document.getElementsByClassName("spot")
    let winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8],[2, 4, 6] ,[3, 4, 5], [6,7,8]]
    let alertModalContainer = document.getElementById("alert-modal")
    let alertModal = document.getElementById("alert-modal-text")
    let resetButton = document.createElement("button")
    alertModalContainer.append(resetButton)
    resetButton.textContent = "reset-button"

    resetButton.addEventListener("click", (e) => {
        
        for(i = 0; i < spots.length; i++){
            spots[i].textContent = ""
            board[i] = i
        }
    
       alertModalContainer.classList.add("hidden")
       console.log(board)
       roundCount = 1
    })
    
 

    const namesForm = () => {  
        
        controller.createNameForm(player1)
        controller.drawBoard(board)
        
    }

    let checker = (arr, target) => target.every(v => arr.includes(v));
    
    const checkForTie = (currentBoard) => {
        if(roundCount >= 9){
            alertModal.textContent = `Game is a tie`
            alertModalContainer.classList.remove("hidden")
            board = game.logicBoard
        }
    }


    const checkForWinner = (currentBoard) => {
        let xPieceLocations = game.getXPieces(board)
        let oPieceLocations = game.getOPieces(board)
        
        for (i=0; i < winningCombos.length; i++){
            if (checker(xPieceLocations, winningCombos[i])) {
                alertModal.textContent = `${player1.getName()} has won`
                alertModalContainer.classList.remove("hidden")
            }
            else if (checker(oPieceLocations, winningCombos[i])) {
                alertModal.textContent = `${player2.getName()} has won`
                alertModalContainer.classList.remove("hidden")
                board = game.logicBoard
            }
        }
    }

    const switchRound = () => {
        checkForWinner(board);
        checkForTie()
        if (roundCount % 2 === 0){
            currentPlayer = player1
        }
        else {
            
            currentPlayer = player2
            let move = player2.getMove(game.getEmptySpots(board))
            let visualSpot = document.getElementById(`spot-${move}`)
            visualSpot.textContent = currentPlayer.getPiece();
            game.placePiece(currentPlayer.getPiece(), move, board )
            checkForWinner(board);
            roundCount++
            currentPlayer = player1
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
    namesForm()
    addClickHandler(board)
    
}

Game()
