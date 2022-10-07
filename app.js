function shipPlacementGeneration()
{
    createGrid(getContainer("player-grid-container"), true);
    createGrid(getContainer("computer-grid-container"), false);
}

function createGrid(container, isUser)
{
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            var item = document.createElement("div");
            if(isUser)
            {
                item.id = "user";
                item.id += " square-" + i + "-" + j;
            }
            else
            {
                item.id = "computer";
                item.id += " square-" + i + "-" + j;
            }
            item.className += " square";
            container.appendChild(item);
        }
    }
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

function createShipCoordinates(squaresCount)
{
    var shipCoordinates = [];
    
    for(let ship = 0; ship < squaresCount.length; ship++)
    {
        var position = getShipRandomPosition();
    
        if (position.isHorizontal)
        {
            if(10 - squaresCount[ship] >= position.x)
            {
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push("ship-part-" + position.y + "-" + position.x);
                    position.x++;
                }
            }
            else
            {
                position.x = 10 - squaresCount[ship];
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push("ship-part-" + position.y + "-" + position.x);
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
                    shipCoordinates.push("ship-part-" + position.y + "-" + position.x);
                    position.y++;
                }
            }
            else
            {
                position.y = 10 - squaresCount[ship];
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push("ship-part-" + position.y + "-" + position.x);
                    position.y++;
                }
            }
        }
    }

    return shipCoordinates;
}

function createShipSquares(shipCoordinates, battleField)
{
    for (let i = 0; i < shipCoordinates.length; i++) 
    {
        for (let x = 0; x < 10; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                if (battleField == getContainer("player-grid-container"))
                {
                    const square = document.getElementById("user square-" + x + "-" + y);
                    if("ship-part-" + x + "-" + y === shipCoordinates[i])
                    {
                        square.className += " square-ship";
                    }
                }
                else if (battleField == getContainer("computer-grid-container"))
                {
                    const square = document.getElementById("computer square-" + x + "-" + y);
                    if("ship-part-" + x + "-" + y === shipCoordinates[i])
                    {
                        square.className += " square-ship";
                    }
                }
            }
        }
    }
}

function createUserShips()
{
    var squaresCount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    var shipCoordinates = createShipCoordinates(squaresCount);
    var battleField = getContainer("player-grid-container");
    createShipSquares(shipCoordinates, battleField);
}

function createComputerShips()
{
    var squaresCount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    var shipCoordinates = createShipCoordinates(squaresCount);
    var battleField = getContainer("computer-grid-container");
    createShipSquares(shipCoordinates, battleField);
}

function startSinglePlayerMode()
{    
    shipPlacementGeneration();
    createUserShips();
    createComputerShips();
}

startSinglePlayerMode();
