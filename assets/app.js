var timeout;
var left = 0;
var width = 50, height = 72, delay = 150, frames = 10;
var totallen = 500;


$(document).ready(function() {
    var image = $('#sheet');

    //center strip image
    center(image);

    $('#animate').on('click', animate);
    $('#step').on('click', step);
    $('#pause').on('click', pause);
    $('#stop').on('click', stop);

    $('#sheet').on('error', function() {
        alert('Invalid image. Please place your image inside the assets folder and check for typos');
        $('#sheet').attr('src', 'assets/default.png');
    });
    $('#anim').on('error', function() {
        $('#anim').attr('src', 'assets/default.png');
    });

    
});

function animate() {
    stop();

    //setup variables
    width = parseInt($('#width').val());
    height = $('#height').val();
    delay = parseFloat($('#delay').val());
    frames = $('#frames').val();
    if(!isNumber(width) || !isNumber(height) || !isNumber(delay) || !isNumber(frames)) {
        alert('At least one of your entries is not a number');
        return;
    }
    if(width == 0 || height == 0 || delay == 0 || frames == 0) {
        alert('All your values must be greater than 0');
        return;
    }
    totallen = width * frames;

    //change img's
    var imgloc = 'assets/' + $('#file').val();

    $('#sheet').attr('src', imgloc);
    $('#anim').attr('src', imgloc);

    //adjust animation cropper width
    $('#anim-cropper').css('width', width + "px")
                    .css('height', height + "px")
                    .css('margin-left', -width/2 + "px");

    //run animation
    timeout = setTimeout(animator, delay);
}
function pause() {
    window.clearTimeout(timeout);
}
function stop() {
    pause();
    $('#anim').css('margin-left', "0px");
}

function animator() {
    step();

    timeout = setTimeout(animator, delay);
}
function step() {
    left += width;
    left %= totallen;
    $('#anim').css('margin-left', (-left));
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function center(object) {
    var newmargin = object.css('width').substring(0, object.css('width').length - 2);
    newmargin /= -2;
    object.css('margin-left', newmargin);
}