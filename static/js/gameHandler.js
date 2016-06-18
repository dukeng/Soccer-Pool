    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
window.onload = function() {
    //Screen adjustment
    const DESIRED_WIDTH=950;
    const DESIRED_HEIGHT=700; //we add additional 200 to make space for the button
    //I will use this too value as anchor for every other objects in the game
    var scaleRatio =  window.devicePixelRatio / 3; //set the DPR

    var aspectRatioDevice =  windowWidth/windowHeight;
    var aspectRatioSafeZone = DESIRED_WIDTH/DESIRED_HEIGHT;
    var extraWidth = 0, extraHeight = 0;
    if (aspectRatioSafeZone < aspectRatioDevice) {
        // have to add game pixels vertically in order to fill the device screen
        windowWidth = aspectRatioSafeZone * windowHeight;
    } else {
        // have to add game pixels horizontally
        windowHeight = 1/ aspectRatioSafeZone * windowWidth;
    }
    var widthRatio = windowWidth/ DESIRED_WIDTH, heightRatio = windowHeight / DESIRED_HEIGHT; // really important value
    
    var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, '', "game");
    // console.log("width of window is: " + window.innerWidth + "window height is: " + window.innerHeight +  "device pixel ratio is: " + devicePixelRatio);
    console.log("Width of world is: " + windowWidth + " Height of world is: " + windowHeight );
    console.log("Width Ratio is: " + widthRatio +"Height Ratio is: " + heightRatio);

    // global variables stored here
    game.global = {
        // for scaling every objects in the game
        ratio:  (windowWidth)/ (windowHeight * (500 / DESIRED_HEIGHT)), // field width / field height
        objectRatio : widthRatio, // this is the ratio in which objects have to be scaled according to the field
        upperSpace: 50 // space of the score
    };
    console.log("objectRatio and ratio is " + game.global.ratio + " " + game.global.objectRatio);

    //Game states
    game.state.add('Boot', Boot);
    // game.state.scale.refresh();
    console.log("got here");
    game.state.add('Preload',Preload);
    //game.state.add(Menu, menu);
    game.state.add('Play', Play);
    //Start the game
    game.state.start("Boot");

};