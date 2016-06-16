var Play = function(game){
	console.log("Currently at play");
    var players;
    var ball;
    //shortcuts for the constant 
    widthRatio = game.global.ratio;
    heightRatio = game.global.ratio;
    scaleX = widthRatio * 0.07;
    scaleY = heightRatio * 0.07;
    objectRatio = game.global.objectRatio;
    var cursors;
}


Play.prototype = {

	create: function () {
		var field = this.game.add.sprite(0, 0, 'field');
        var fieldRatio = field.width / field.height;
        field.x = this.game.world.width / 2;
        field.y =  this.game.world.height * (720/920)/2;
        field.anchor.setTo(0.5,0.5);
        if (fieldRatio < widthRatio ) {
            field.height = this.game.world.height * (720/920);
            field.width = field.height * widthRatio;
        } else {
            field.width = this.game.world.width;
            field.height = field.width * 1/ widthRatio;
        }
        
        players = this.game.add.group(); // this initialize a players group with missing params
        for (var i = 0; i < 11; i++) {
        	player = players.create(objectRatio * 30 * i, objectRatio * 30 * i, 'player1');
            player.anchor.setTo(0.5, 0.5);
        	player.scale.setTo(scaleX,scaleY);
        };
        for (var i = 0; i < 11; i++) {
        	player = players.create( objectRatio * 40 * i + 100, objectRatio*  40 * i + 25, 'player2');
        	player.scale.setTo(scaleX,scaleY);
            player.anchor.setTo(0.5, 0.5);
        };

        // game.renderer.clearBeforeRender = false;
        // game.renderer.roundPixels = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        ball = this.game.world.create(objectRatio * 640, objectRatio * 360, 'ball');
        ball.scale.setTo(scaleX,scaleY);
        ball.anchor.setTo(0.5, 0.5);
        //enable physics mode on ball
        this.game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.drag.set(200);
        ball.body.maxVelocity.set(400);
        cursors = this.game.input.keyboard.createCursorKeys();
        //this makes the game excluded from input of the browser
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    },

    update: function () {
        if (cursors.up.isDown){
            this.game.physics.arcade.accelerationFromRotation(ball.rotation, 200, ball.body.acceleration);
        }
        else{
            ball.body.acceleration.set(0);
        }
        if (cursors.left.isDown){
            ball.body.angularVelocity = -300;
        }
        else if (cursors.right.isDown){
            ball.body.angularVelocity = 300;
        }
        else{
            ball.body.angularVelocity = 0;
        }
    }
}