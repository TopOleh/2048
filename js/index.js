function bindTable() {
    var table = document.getElementById('js-tfe__table');
    var rows = table.getElementsByClassName('tfe-table__row');

    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows.length; j++) {
            var number = generateEvenNumber(4, [2, 4]);
            rows[j].appendChild(generateNewCell(number));
        }
    }

    bindArrowActions();

}

// buildNewTable
function buildNewTable(matrix) {
    var table = document.getElementById('js-tfe__table');
    table.innerHTML = '';

    for (var rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        var matrixCells = matrix[rowIndex];
        var tr = document.createElement('tr');
        tr.className = 'tfe-table__row';

        for (var cellIndex = 0; cellIndex < matrixCells.length; cellIndex++) {
            var td = document.createElement('td');
            td.innerText = matrixCells[cellIndex];
            td.className = 'tfe-table__column' + ' tfe-table__column-' + matrixCells[cellIndex];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

// getMatrix
function getCurrentMatrix() {
    var rows = document.getElementsByClassName('tfe-table__row');
    var currentMatrix = [];

    for (var i = 0; i < rows.length; i++) {
        var tRow = rows[i];
        var cells = tRow.getElementsByClassName('tfe-table__column');
        var row = [];
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];
            row.push(+cell.innerText);
        }
        currentMatrix.push(row);
    }

    return currentMatrix;
}

function bindArrowActions() {
    var arrowUp = document.getElementsByClassName('tfe-controller__arrow-up');
    var arrowDown = document.getElementsByClassName('tfe-controller__arrow-down');
    var arrowLeft = document.getElementsByClassName('tfe-controller__arrow-left');
    var arrowRight = document.getElementsByClassName('tfe-controller__arrow-right');

    arrowUp[0].addEventListener('click', function (e) {
        e.preventDefault();
        var array = getCurrentMatrix();

        console.log(addNumbersUp(array));
    });


    arrowDown[0].addEventListener('click', function (e) {
        e.preventDefault();
        var array = getCurrentMatrix();

        console.log(addNumbersDown(array));
    });

    arrowLeft[0].addEventListener('click', function (e) {
        e.preventDefault();
        var array = getCurrentMatrix();

        console.log(addNumbersLeft(array));
    });

    arrowRight[0].addEventListener('click', function (e) {
        e.preventDefault();
        var array = getCurrentMatrix();

        console.log(addNumbersRight(array));
    });

    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        console.log('event', e)
        if (e.keyCode === 38) {
            var array = getCurrentMatrix();
            console.log(addNumbersUp(array));
        }

        if (e.keyCode === 40) {
            var array = getCurrentMatrix();
            console.log(addNumbersDown(array));
        }

        if (e.keyCode === 37) {
            var array = getCurrentMatrix();
        }

        if (e.keyCode === 39) {
            var array = getCurrentMatrix();
            console.log(addNumbersRight(array));
        }

    });
}
// Touch screen handler
touchEventsHandler();
function touchEventsHandler() {
    var xDown = null;
    var yDown = null;

    document.addEventListener('touchstart', function (event) {
        event.preventDefault();
        var firstTouch = event.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    });



    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if ( !xDown || !yDown ) {
            return;
        }

        var array = getCurrentMatrix();

        var xUp = event.touches[0].clientX;
        var yUp = event.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if( Math.abs(xDiff) > Math.abs(yDiff) ) {
            if (xDiff > 0) {
                console.log('left :');
                addNumbersLeft(array);
            } else {
                console.log('right :');
                addNumbersRight(array);
            }
        } else {
            if (yDiff > 0) {
                console.log('Up :');
                addNumbersUp(array);
            } else {
                console.log('down :');
                addNumbersDown(array);
            }
        }

        xDown = null;
        yDown = null;
    });
}
// CALCULATIONS
function addNumbersUp(array) {
    var result = array.map(function(row, rowIndex, matrix) {
        var nextRow = matrix[rowIndex + 1];

        var newLine = row.map(function(cell, cellIndex) {
            // Check for the last row
            if (nextRow === undefined) {
                return cell;
            }
            var nextRowCell = nextRow[cellIndex];
            var newCell;
            if (cell === nextRowCell) {
                newCell = cell + nextRowCell;
                nextRow[cellIndex] = 0;
            } else {
                newCell = cell;
            }
            return newCell;
        });
        return newLine;
    });

    var futureMatrix = reshuffleMatrixUpDown(result);
    futureMatrix = showNewNumbers(futureMatrix);
    buildNewTable(futureMatrix);
}

function addNumbersDown(array) {
    var result = array.reverse().map(function(row, rowIndex, matrix) {
        var nextRow = matrix[rowIndex + 1];

        var newLine = row.map(function(cell, cellIndex) {
            // Check for the last row
            if (nextRow === undefined) {
                return cell;
            }
            var nextRowCell = nextRow[cellIndex];
            var newCell;
            if (cell === nextRowCell) {
                newCell = cell + nextRowCell;
                nextRow[cellIndex] = 0;
            } else {
                newCell = cell;
            }
            return newCell;
        });
        return newLine;
    });
    var futureMatrix = reshuffleMatrixUpDown(result).reverse();
    futureMatrix = showNewNumbers(futureMatrix);
    buildNewTable(futureMatrix);
}

function addNumbersLeft(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var row = array[i];
        var newRow = [];

        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var nextCell = row[j + 1];
            if (nextCell === undefined) {
                newRow.push(cell);
                break;
            }
            var newCell;
            if (cell === nextCell) {
                newCell = cell + nextCell;
                row[j + 1] = 0;
            } else {
                newCell = cell;
            }

            newRow.push(newCell);
        }

        result.push(newRow);
    }

    var futureMatrix = [];
    for (var i = 0; i < result.length; i++) {
        var row = result[i];
        var newRowF = [];

        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var nextCell = row[j + 1];

            if (nextCell === undefined) {
                newRowF.push(cell);
                break;
            }

            var newCell;
            if (cell === 0) {
                newCell = nextCell;
                row[j + 1] = 0;
            } else {
                newCell = cell;
            }

            newRowF.push(newCell);
        }
        futureMatrix.push(newRowF);
    }
    // var futureMatrix = reshuffleMatrixLeftRight(result);
    futureMatrix = showNewNumbers(futureMatrix);
    buildNewTable(futureMatrix);
}

function addNumbersRight(array) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
        var row = array[i].reverse();
        var newRow = [];

        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var nextCell = row[j + 1];
            if (nextCell === undefined) {
                newRow.push(cell);
                break;
            }
            var newCell;
            if (cell === nextCell) {
                newCell = cell + nextCell;
                row[j + 1] = 0;
            } else {
                newCell = cell;
            }

            newRow.push(newCell);
        }
        newRow = newRow.reverse();
        result.push(newRow);
    }

    var futureMatrix = [];
    for (var i = 0; i < result.length; i++) {
        var row = result[i].reverse();
        var newRowF = [];

        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var nextCell = row[j + 1];

            if (nextCell === undefined) {
                newRowF.push(cell);
                break;
            }

            var newCell;
            if (cell === 0) {
                newCell = nextCell;
                row[j + 1] = 0;
            } else {
                newCell = cell;
            }

            newRowF.push(newCell);
        }
        futureMatrix.push(newRowF.reverse());
    }
    // var futureMatrix = reshuffleMatrixLeftRight(result);
    futureMatrix = showNewNumbers(futureMatrix);
    buildNewTable(futureMatrix);
}

// Reshuffle matrix -> against zeros move next number
function reshuffleMatrixUpDown(array) {
    return array.map(function(row, rowIndex, matrix) {
        var nextRow = matrix[rowIndex + 1];

        var newLine = row.map(function(cell, cellIndex) {
            if (nextRow === undefined) {
                return cell;
            }

            if (cell === 0) {
                cell = nextRow[cellIndex];
                nextRow[cellIndex] = 0;
            }

            return cell;
        });
        return newLine;
    });
}

// GENERATE CELL
function generateNewCell(val) {
    var cell = document.createElement('td');

    cell.className = 'tfe-table__column' + ' tfe-table__column-' + val;
    cell.innerText = val;

    return cell;
}

// GENERATE NUMBER
function generateEvenNumber(max, possibleNumbers) {
    var evenNumber =  Math.floor(Math.random() * (max - 1) + 2);

    if (possibleNumbers.indexOf(evenNumber) !== -1) {
        return evenNumber;
    }
    if (max !== 0) {
        return generateEvenNumber(max, possibleNumbers);
    }
}

// MAX VALUE ON THE BOARD
function getMaxNumber() {
    var cells = document.getElementsByClassName('tfe-table__column'),
        cellsNumbers = [];

    for (var i = 0; i < cells.length; i++) {
        cellsNumbers.push(+cells[i].innerText);
    }

    return cellsNumbers.reduce(function (max, current) {
        return Math.max(max, current);
    }, 0);
}

// RANDOM ADD NUMBER TO THE TABLE
function showNewNumbers(array) {
    var max = getMaxNumber();
    var addedNumber = false;

    return array.map(function(row, rowIndex, matrix) {
        var newLine = row.map(function(cell, cellIndex) {
            if (addedNumber) {
                return cell;
            }
            var changeZero = false;

            if (cell === 0) {
                changeZero = Math.random() > 0.5;
            }

            if (changeZero) {
                cell = generateEvenNumber(max, [2, 4]);
                addedNumber = true;
            }

            return cell;
        });
        return newLine;
    });
}

bindTable();