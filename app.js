function createUserGrid()
{
    const container = document.getElementById("player-grid-container");
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            var item = document.createElement("div");
            item.id = i + " " + j;
            item.className = "square ";
            //item.innerHTML = i + " " + j;
            container.appendChild(item);
        }
    }
}

function createComputerGrid()
{
    const container = document.getElementById("computer-grid-container");
    for(let i = 0; i < 10; i++)
    {
        for(let j = 0; j < 10; j++)
        {
            var item = document.createElement("div");
            item.id = i + " " + j + " computer";
            item.className = "square " + "square-shot ";
            container.appendChild(item);
        }
    }
}

function getRandomStart()
{
    return Math.floor(Math.random() * 10);
}

function getRandomDirection()
{
    return Math.random() > 0.5;
}

function createShipCoordinates(squaresCount)
{
    var shipCoordinates = [];
    
    for(let ship = 0; ship < squaresCount.length; ship++)
    {
        var start_row = getRandomStart();
        var start_col = getRandomStart();

        var isHorizontal = getRandomDirection();
        
        if (isHorizontal)
        {
            if(10 - squaresCount[ship] >= start_col)
            {
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push(start_row + " " + start_col);
                    start_col++;
                }
            }
            else
            {
                start_col = 10 - squaresCount[ship];
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push(start_row + " " + start_col);
                    start_col++;
                }
            }
        }
        else
        {
            if(10 - squaresCount[ship] >= start_row)
            {
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push(start_row + " " + start_col);
                    start_row++;
                }
            }
            else
            {
                start_row = 10 - squaresCount[ship];
                for (let length = 0; length < squaresCount[ship]; length++)
                {   
                    shipCoordinates.push(start_row + " " + start_col);
                    start_row++;
                }
            }
        }
    }

    return shipCoordinates;
}

function createShipSquares(shipCoordinates, isUser)
{
    for (let i = 0; i < shipCoordinates.length; i++) 
    {
        for (let x = 0; x < 10; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                if (isUser)
                {
                    const square = document.getElementById(x + " " + y);
                    if(square.id === shipCoordinates[i])
                    {
                        square.className = "square " + "square-ship ";
                    }
                }
                else
                {
                    const square = document.getElementById(x + " " + y + " computer");
                    if(square.id === shipCoordinates[i] + " computer")
                    {
                        square.className = "square " + "square-shot " + "square-ship ";
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

    createShipSquares(shipCoordinates, true);
}

function createComputerShips()
{
    var squaresCount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    var shipCoordinates = createShipCoordinates(squaresCount);

    createShipSquares(shipCoordinates, false);
}

createUserGrid();
createUserShips();
createComputerGrid();
createComputerShips();