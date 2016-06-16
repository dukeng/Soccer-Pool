var Play = function(game){
	console.log("Currently at play");
    var players1;
    var players2;
    var ball;
    //shortcuts for the constant 
    //REM: these params are recognized outside the scope of the prototype and the play.js
    widthRatio = game.global.ratio;
    heightRatio = game.global.ratio;
    scaleX = widthRatio * 0.07;
    scaleY = heightRatio * 0.07;
    objectRatio = game.global.objectRatio; // whenever put a new sprite needs to call this
    var input;
}


Play.prototype = {

	create: function () {
        //init the field
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

        //init a players group with missing params
        players1 = this.game.add.group(); 
        players2 = this.game.add.group();
        setPlayerPositions(players1, players2);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable physics on players
        this.game.physics.enable(players1, Phaser.Physics.ARCADE);
        this.game.physics.enable(players2, Phaser.Physics.ARCADE);
        // pass in a function to get run
        players1.forEach(function(item) {
            item.body.immovable = true;
        }, this);
        players2.forEach(function(item) {
            item.body.immovable = true;
        }, this);

        //init ball
        ball = this.game.world.create(objectRatio * 640, objectRatio * 360, 'ball');
        ball.scale.setTo(scaleX,scaleY);
        ball.anchor.setTo(0.5, 0.5);
        //enable physics mode on ball
        this.game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.drag.set(200);
        ball.body.maxVelocity.set(400);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1,1);

        //init arrow
        arrow = this.game.world.create(objectRatio * 400, objectRatio * 400, 'arrow');
        arrow.anchor.setTo(0.1, 0.5);
        arrow.scale.setTo(scaleX * 1.5, scaleY * 1.5);
        
        



        input = this.game.input.keyboard.createCursorKeys();
        //this makes the game excluded from input of the browser
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    },

    update: function () {
        //check collision
        this.game.physics.arcade.collide(ball, players1);
        this.game.physics.arcade.collide(ball, players2);
        arrow.x = ball.x;
        arrow.y = ball.y;
        arrow.angle = ball.angle;
        //input
        if (input.up.isDown){
            this.game.physics.arcade.accelerationFromRotation(ball.rotation, 200, ball.body.acceleration);
        }
        else{
            ball.body.acceleration.set(0);
        }
        if (input.left.isDown){
            ball.body.angularVelocity = -300;
        }
        else if (input.right.isDown){
            ball.body.angularVelocity = 300;
        }
        else{
            ball.body.angularVelocity = 0;
        }
    },

    render: function(){
        this.game.debug.spriteInfo(ball, 32, 32);
    }
}