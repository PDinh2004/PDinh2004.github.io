// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter();




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO: Create the applyFilter function here
function applyFilter(){
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){

            var rgbString = rgbStringToArray(image[r][c]);
            rgbString[0] = 255;
            rgbString = rgbArrayToString(rgbString);
            image[r][c] = rgbString;
            console.log(rgbString);

        }
    }
}

// TODO: Create the applyFilterNoBackground function
function reddify(array){
    array[0] = 255;
}

// TODO: Create filter functions


// CHALLENGE code goes below here
