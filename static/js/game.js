window.onload = function() {
    const ULTIMATE_WIDTH=1280;
    const ULTIMATE_HEIGHT=720;
    //I will use this too value as anchor for every other objects in the game
    var scaleRatio =  window.devicePixelRatio / 3; //set the DPR
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
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
    var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    // console.log("width of window is: " + window.innerWidth + "window height is: " + window.innerHeight +  "device pixel ratio is: " + devicePixelRatio);
    console.log("Width of world is: " + windowWidth + " Height of world is: " + windowHeight );
    console.log("Width Ratio is: " + widthRatio +"Height Ratio is: " + heightRatio);


    function preload () {
        game.load.image('field', 'static/images/field.png');
        game.load.image('player1', 'static/images/player1.png');
        game.load.image('player2', 'static/images/player2.png');
        game.load.image('ball', 'static/images/ball.png');
    }

    // field.scaleRatio.setTo(scaleRatio, scaleRatio);// set all assets to be according to ratio 
    var players ;
    var ball;
    function create () {
        var field = game.add.sprite(0, 0, 'field');
        field.width = game.world.width;
        field.height = game.world.height;
        players = game.add.group(); // this initialize a players group with missing params
        for (var i = 0; i < 11; i++) {
            player = players.create(widthRatio * game.world.randomX, heightRatio * game.world.randomY, 'player1');
            var scaleX = (widthRatio)*0.25;
            var scaleY = (heightRatio)*0.25;
            player.scale.setTo(scaleX,scaleY);
        };
        for (var i = 0; i < 11; i++) {
            player = players.create(widthRatio * game.world.randomX, heightRatio * game.world.randomY, 'player2');
            var scaleX = (widthRatio)*0.25;
            var scaleY = (heightRatio)*0.25;
            player.scale.setTo(scaleX,scaleY);
        };
        ball = game.world.create(widthRatio * game.world.randomX, heightRatio * game.world.randomY, 'ball');
        var scaleX = (widthRatio)*0.25;
        var scaleY = (heightRatio)*0.25;
        ball.scale.setTo(scaleX,scaleY);
    }

    function update () {

    }

};