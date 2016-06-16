    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
window.onload = function() {
    //Screen adjustment
    const ULTIMATE_WIDTH=1280;
    const ULTIMATE_HEIGHT=720;
    //I will use this too value as anchor for every other objects in the game
    var scaleRatio =  window.devicePixelRatio / 3; //set the DPR

    var aspectRatioDevice =  windowWidth/windowHeight;
    var aspectRatioSafeZone = ULTIMATE_WIDTH / ULTIMATE_HEIGHT;
    var extraWidth = 0, extraHeight = 0;
    if (aspectRatioSafeZone < aspectRatioDevice) {
        // have to add game pixels vertically in order to fill the device screen
        windowWidth = aspectRatioSafeZone * windowHeight;
    } else {
        // have to add game pixels horizontally
        windowHeight = 1/ aspectRatioSafeZone * windowWidth;
    }
    var widthRatio = windowWidth/ ULTIMATE_WIDTH, heightRatio = windowHeight / ULTIMATE_HEIGHT; // really important value
    
    var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, '', "game");
    // console.log("width of window is: " + window.innerWidth + "window height is: " + window.innerHeight +  "device pixel ratio is: " + devicePixelRatio);
    console.log("Width of world is: " + windowWidth + " Height of world is: " + windowHeight );
    console.log("Width Ratio is: " + widthRatio +"Height Ratio is: " + heightRatio);

    // global variables stored here
    game.global = {
        // for scaling every objects in the game
        widthRatio : widthRatio, 
        heightRatio : heightRatio
    };

    //Game states
    game.state.add('Boot', Boot);
    game.state.add('Preload',Preload);
    //game.state.add(Menu, menu);
    game.state.add('Play', Play);

    //Start the game
    game.state.start("Boot");

    // field.a.setTo(scaleRatio, scaleRatio);// set all assets to be according to ratio 


};