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
    for (var r = 0; r < image.lenth; r++){
        for (var c = 0; c < image[r].length; c++){
            console.log(image[r][c]);
        }
    }
}

var rgbString = rgbStringToArray(image[0][0]);
console.log(rgbString);

// TODO: Create the applyFilterNoBackground function


// TODO: Create filter functions


// CHALLENGE code goes below here
