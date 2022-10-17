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
    
    for(let ship = 0; ship < squaresCount.length; ship++)
    {
        var position = getShipRandomPosition();
    
        if (position.isHorizontal)
        {
            if(10 - squaresCount[ship] >= position.x)
            {
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates[position.y][position.x] = true;
                    position.x++;
                }
            }
            else
            {
                position.x = 10 - squaresCount[ship];
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates[position.y][position.x] = true;
                    position.x++;
                }
            }
        }
        else
        {
            if(10 - squaresCount[ship] >= position.y)
            {
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates[position.y][position.x] = true;
                    position.y++;
                }
            }
            else
            {
                position.y = 10 - squaresCount[ship];
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates[position.y][position.x] = true;
                    position.y++;
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