var Play = function(game){
	console.log("Currently at play");
    var players1;
    var players2;
    var ball;
    //shortcuts for the constant 
    //REM: these params are recognized outside the scope of the prototype and the play.js
    //need to include this in sprite's position to scale properly
    objectRatio = game.global.objectRatio;
    scale = objectRatio * 0.17;
    var input; // get input keyboard

    var borders; //borders position

    var text;
}

var strength  = 0; //strength of the shoot
var newScaleX = 0;
Play.prototype = {

	create: function () {
        //initialize the field
        var field = this.game.add.sprite(0, 0, 'field');
        var fieldRatio = field.width / field.height; 
        field.x = this.game.world.width /2;
        field.y = this.game.world.height * (500/700)/2 + this.game.global.upperSpace; 
        field.anchor.setTo(0.5,0.5); // set the middle of the field
        field.width = this.game.world.width;
        field.height = field.width / fieldRatio;
        //configure actual height 
        // if (fieldRatio < this.game.global.ratio ) {
        //     field.height = this.game.world.height * (420/580);
        //     field.width = field.height * this.game.global.ratio;
        // } else {
        //     field.width = this.game.world.width;
        //     field.height = field.width * 1/ this.game.global.ratio;
        // }

        // border field for collision
        borders = this.game.add.group();
        setBorderPosition(borders);

        //init a players group with missing params
        players1 = this.game.add.group(); 
        players2 = this.game.add.group();
        //set positions of players
        setPlayerPositions(players1, players2, this.game.global.upperSpace);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable physics on players
        this.game.physics.enable(players1, Phaser.Physics.ARCADE);
        this.game.physics.enable(players2, Phaser.Physics.ARCADE);
        // pass in a function to get run
        players1.forEach(function(item) {
            item.body.immovable = true;
            // item.body.setCircle(item.width/2);
            // console.log("item width is "+ item.width);
        }, this);
        players2.forEach(function(item) {
            item.body.immovable = true;
            // item.body.setCircle(item.width/2);
        }, this);

        //init ball
        ball = this.game.world.create(objectRatio * 475 , objectRatio * 250 + this.game.global.upperSpace, 'ball');
        ball.scale.setTo(scale);
        ball.anchor.setTo(0.5, 0.5);
        //enable physics mode on ball
        this.game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.drag.set(200);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(0.8,0.8); // object's elasticity


        //init arrow
        arrow = this.game.world.create(objectRatio * 400, objectRatio * 400, 'arrow');
        arrow.anchor.setTo(0.2, 0.5);
        arrow.scale.setTo(scale * 0.5, scale * 1.5);
        newScaleX = scale; 
        input = this.game.input.keyboard.createCursorKeys();
        //this makes the game excluded from input of the browser
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        //all kinds of text
        text = this.game.add.text(this.game.world.width /2,  40 * objectRatio  , "Score ", {
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
        });
        text.anchor.setTo(0.5,0.5);
        text.scale.setTo(scale * 7);
    },

    
    prepare: function(){
        if(strength <= 1000){
            strength = strength + 20;
            newScaleX = newScaleX *1.01;
            arrow.scale.setTo(newScaleX, scale * 1.5);
        }
    },
    shoot: function(){
        this.game.physics.arcade.velocityFromAngle(ball.angle, strength, ball.body.velocity);
        strength = 0;
        newScaleX = scale;
        arrow.scale.setTo(scale, scale * 1.5);
    },

    checkGoal: function(){

    },

    update: function () {
        //check collision
        this.game.physics.arcade.collide(ball, players1);
        this.game.physics.arcade.collide(ball, players2); 
        this.game.physics.arcade.collide(ball, borders); 
        arrow.x = ball.x;
        arrow.y = ball.y;
        arrow.angle = ball.angle;
        //input
        if(ball.body.speed <= 0){
            arrow.visible = true;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                this.prepare();
            } else{
                if(strength > 0 ){ // if user intentionally wants to shoot
                    this.shoot();
                }
            }
            if (input.left.isDown){
                ball.body.angularVelocity = -150;
            }
            else if (input.right.isDown){
                ball.body.angularVelocity = 150;
            }
            else{
                ball.body.angularVelocity = 0;
            }
        }else{
            arrow.visible = false;
        }
    },

    render: function(){
        // this.game.debug.spriteInfo(ball, 32, 32);
    }

}