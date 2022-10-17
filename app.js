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
            item.className += getShipPartClass(i , j);
            container.appendChild(item);
        }
    }
}

function getShipPartClass(x, y)
{
    return `square-${x}-${y} `;
}

function getContainer(id)
{
    return document.getElementById(id);
}

function getShipRandomPosition() 
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

            var position = getShipRandomPosition();
            
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
            const shipPartClass = '.' + getShipPartClass(x, y);
            const square = battleField.querySelector(shipPartClass);
            if (shipCoordinates[x][y])
            {
                square.className += "square-ship ";
            }
        }
    }
}

function createShips()
{

    var squaresCount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    var userShipCoordinates = createShipCoordinates(squaresCount);
    var computerShipCoordinates = createShipCoordinates(squaresCount);
    var userBattleField = getContainer("player-grid-container");
    var computerBattleField = getContainer("computer-grid-container");
    createShipSquares(userShipCoordinates, userBattleField);
    createShipSquares(computerShipCoordinates, computerBattleField);
}

function startSinglePlayerMode()
{    
    shipPlacementGeneration();
    createShips();
}

startSinglePlayerMode();