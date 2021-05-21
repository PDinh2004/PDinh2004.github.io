// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilter(increaseGreenByBlue);
    applyFilterNoBackground(blueFy);

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO: Create the applyFilter function here
function applyFilter(filterFunction){
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){

            var rgbString = image[r][c];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
        }
    }
}

// TODO: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){

            var rgbString = image[r][c];
            var rgbNumbers = rgbStringToArray(rgbString);

            if (image[r][c] === image[0][0]){
                image[r][c] = image[0][0];
            } else {
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[r][c] = rgbString;
            }
        }
    }
}

// TODO: Create filter functions
function reddify(array){
    array[RED] = 255;
}

function decreaseBlue(array){
    array[BLUE] = Math.max(array[BLUE] - 30, 0);
}

function increaseGreenByBlue(array){
    array[GREEN] = Math.min(array[GREEN] + array[BLUE], 255);
}

function blueFy(array){
    array[BLUE] = 255;
}

// CHALLENGE code goes below here