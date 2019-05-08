/**
 * First we are getting all of the elements that we'll need
 * to access throughout this script. These are the elements
 * that the user will be interacting with.
 *
 * pixelSize - hard-coded value that contains the width and height of each pixel in the table.
 * sizePicker - is the form that contains the size elements
 * colorPicker - is the input that contains the color
 * inputWidth - is the input that contains the width (number of columns)
 * inputHeight - is the input that contains the height (number of rows)
 */
const pixelSize = 20;
const sizePicker = document.getElementById('sizePicker');
const colorPicker = document.getElementById('colorPicker');
const inputWidth = document.getElementById('inputWidth');
const inputHeight = document.getElementById('inputHeight');
const pixelCanvas = document.getElementById('pixelCanvas');

/**
 * Adding an event listener that will stop the submission of the
 * grid size form, and then start making the grid.
 */
sizePicker.addEventListener('submit', function(event) {
    event.preventDefault();
    makeGrid();
});

/**
 * @description Creates a pixel grid based on the users input.
 * @return void
 *
 * This function will populate the pixelCanvas (HTML Table)
 * with the number of rows and columns specified by the
 * inputHeight and inputWidth (HTML Inputs) respectively.
 */
function makeGrid() {

    /**
     * We get our height and width, which are the number of rows and columns
     * that we will use to generate our pixel canvas table.
     */
    let height = inputHeight.value;
    let width = inputWidth.value;

    /**
     * We need to make sure that the grid size is reasonable. So we are checking
     * to see if the grid is wider or higher than the browser window.
     */
    const browserSize = getBrowserSize();
    if (browserSize.width < pixelSize * width) {
        const limit = Math.floor(browserSize.width / pixelSize);
        return alert(`Canvas exceeds browser width. Maximum grid width is ${limit}.`);

    } else if (browserSize.height < pixelSize * height) {
        const limit = Math.floor(browserSize.height / pixelSize);
        return alert(`Canvas exceeds browser height. Maximum grid height is ${limit}.`);
    }

    /** This is the element that we're storing our table rows/columns in. */
    const tableBody = document.createElement('tbody');

    /**
     * Here we are building each row by creating a table row element (tr),
     * then we are adding the cells (td) after we have assigned an event
     * listener that changes the cells background color when clicked. Then
     * the row is added to the tables body.
     */
    for (let row = 0; row < height; row++) {
        const tableRow = document.createElement('tr');

        for (let column = 0; column < width; column++) {
            const tableColumn = document.createElement('td');

            tableColumn.addEventListener('click', changeCellColor);

            tableRow.append(tableColumn);
        }

        tableBody.append(tableRow);
    }

    /**
     * Finally we clear out the previous canvas and add our newly created canvas.
     */
    pixelCanvas.innerHTML = '';
    pixelCanvas.append(tableBody);
}

/**
 * @description Retrieves the current width and height of the browsers viewable area.
 * @returns {{width: number, height: number}}
 */
function getBrowserSize() {
    return {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    };
}

/**
 * @description Event listener that changes the background color of an HTML Element.
 * @param {Event} event
 */
function changeCellColor(event) {
    event.srcElement.style.backgroundColor = colorPicker.value;
}