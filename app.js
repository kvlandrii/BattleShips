function shipPlacementGeneration()
{
    createGrid(getContainer("player-grid-container"));
    createGrid(getContainer("computer-grid-container"));
}

function createGrid(container)
{
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            var item = document.createElement("div");
            item.className = "square ";
            item.className += getSquareClass(i , j);
            container.appendChild(item);
        }
    }
}

function getSquareClass(x, y)
{
    return `square-${x}-${y} `;
}

function getContainer(id)
{
    return document.getElementById(id);
}

function getRandomPosition() 
{
    return { 
        x : Math.floor(Math.random() * 10),
        y : Math.floor(Math.random() * 10),
        isHorizontal : isHorizontal = Math.random() > 0.5 
    }
}

function getArray(x, y)
{
    var array = new Array(x);
    for(let i = 0; i < y; i++)
    {
        array[i] = new Array(y);
    }
    return array;
}

function createShipCoordinates(squaresCount)
{
    var shipCoordinates = getArray(10, 10);
    var occupiedSquares = getArray(12, 12);

    for(let ship = 0; ship < squaresCount.length; ship++)
    {
        const nextPosition = function(position)
        {
            return position.isHorizontal
                ? { x: position.x + 1, y: position.y, isHorizontal: position.isHorizontal }
                : { x: position.x, y: position.y + 1, isHorizontal: position.isHorizontal };
        };

        let retry = true;
        while (retry)
        {
            retry = false;
            let tempCoordinates = [];

            var position = getRandomPosition();
            
            for (let length = 0; length < squaresCount[ship]; length++)
            {
                if (position.x < 0 || position.x > 9
                    || position.y < 0 || position.y > 9
                    || occupiedSquares[position.x + 1][position.y + 1]
                    )
                {
                    retry = true;
                    break;
                }
                tempCoordinates.push({ x: position.x, y: position.y });
                position = nextPosition(position);
            }

            if (!retry)
            {
                for (let i = 0; i < squaresCount[ship]; i++)
                {
                    shipCoordinates[tempCoordinates[i].x][tempCoordinates[i].y] = true;
                    console.log(`ship - ${ship}, position: {x: ${tempCoordinates[i].x}, y: ${tempCoordinates[i].y} }`);
                }

                for (let i = 0; i < squaresCount[ship]; i++)
                {
                    var x = tempCoordinates[i].x + 1;
                    var y = tempCoordinates[i].y + 1;
                    occupiedSquares[x - 1][y - 1] = true;
                    occupiedSquares[x - 1][y] = true;
                    occupiedSquares[x - 1][y + 1] = true;
                    occupiedSquares[x][y - 1] = true;
                    occupiedSquares[x][y] = true;
                    occupiedSquares[x][y + 1] = true;
                    occupiedSquares[x + 1][y - 1] = true;
                    occupiedSquares[x + 1][y] = true;
                    occupiedSquares[x + 1][y + 1] = true;
                }
            }
        }
    }

    return shipCoordinates;
}

function createShipSquares(shipCoordinates, battleField)
{
    for (let x = 0; x < 10; x++)
    {
        for (let y = 0; y < 10; y++)
        {
            const squareClass = '.' + getSquareClass(x, y);
            const square = battleField.querySelector(squareClass);
            if (shipCoordinates[x][y])
            {
                square.className += "square-ship ";
            }
        }
    }
}

function createShotAccess(battleField, computerShipCoordinates, userShipCoordinates)
{
    const shotPlaces = getArray(10, 10);
    var userHits = 0;
    var computerHits = 0;

    for (let x = 0; x < 10; x++)
    {
        for (let y = 0; y < 10; y++)
        {
            const squareClass = "." + getSquareClass(x, y);
            const square = battleField.querySelector(squareClass);

            square.addEventListener("click", 
                function doShot() {
                    this.style.backgroundColor = computerShipCoordinates[x][y] ? "#ffa3a3" : "#b3b3ff";
                    userHits = computerShipCoordinates[x][y] ? (userHits + 1) : userHits;
                    if(userHits == 20)
                    {
                        whoWinner(".player-side");
                    } 
                    this.removeEventListener("click", doShot);

                    computerHits = computerTurn(shotPlaces, userShipCoordinates, computerHits);
                }
            );
        }
    }
}

function computerTurn(shotPlaces, userShipCoordinates, computerHits)
{
    let hit = true;
    while(hit)
    {
        var randomPosition = getRandomPosition();
        if(!shotPlaces[randomPosition.x][randomPosition.y])
        {
            const randomSquare = "." + getSquareClass(randomPosition.x, randomPosition.y);
            const field = getContainer("player-grid-container");
            const square = field.querySelector(randomSquare);
            square.style.backgroundColor = userShipCoordinates[randomPosition.x][randomPosition.y] ? "#ffa3a3" : "#b3b3ff";
            shotPlaces[randomPosition.x][randomPosition.y] = true;
            computerHits = userShipCoordinates[randomPosition.x][randomPosition.y] ? (computerHits + 1) : computerHits;
            if(computerHits == 20)
            {
                whoWinner(".computer-side");
            }
            hit = false;
        }
    }
    return computerHits;
}


function whoWinner(s)
{
    const side = document.querySelector(s);
    const winnerMsg = document.createElement("div");
    winnerMsg.innerHTML = "WINNER";
    side.appendChild(winnerMsg);
}

function createShips()
{
    var squaresCount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    var userShipCoordinates = createShipCoordinates(squaresCount);
    var computerShipCoordinates = createShipCoordinates(squaresCount);
    var userBattleField = getContainer("player-grid-container");
    var computerBattleField = getContainer("computer-grid-container");
    createShipSquares(userShipCoordinates, userBattleField);
    //createShipSquares(computerShipCoordinates, computerBattleField);
    createShotAccess(computerBattleField, computerShipCoordinates, userShipCoordinates);
}

function startSinglePlayerMode()
{    
    shipPlacementGeneration();
    createShips();
}

startSinglePlayerMode();