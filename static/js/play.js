var Play = function(game){
	console.log("Currently at play");
    var players1;
    var players2;
    var ball;
    //shortcuts for the constant 
    //REM: these params are recognized outside the scope of the prototype and the play.js
    //need to include this in sprite's position to scale properly
    objectRatio = game.global.objectRatio;
    scale = objectRatio * 0.2;
    var input; // get input keyboard
    var borders; //borders position
    var goals; // goal positions
    //all kinds of text
    var scoreInfo;
    var turn;

}

var reset = true;
var setReset = false; // false before timer has been set

var strength  = 0; //strength of the shoot
var newScaleX = 0;

var score1 = 0; // players 1 score (default score right)
var score2 = 0; // players 2 score (default score left)
var elapsedTime;


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

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // this.game.physics.p2.setImpactEvents(true);

        // border field for collision
        borders = this.game.add.group();
        goals = this.game.add.group();

        setBorderPosition(borders,goals, this.game, this.game.global.upperSpace);
        this.game.physics.enable(borders, Phaser.Physics.ARCADE);
        this.game.physics.enable(goals, Phaser.Physics.ARCADE);
        borders.forEach(function(item) {
            item.body.immovable = true;
        }, this);
        goals.forEach(function(item) {
            item.body.immovable = true;
        }, this);
        //Players
        players1 = this.game.add.group(); 
        players2 = this.game.add.group();
        //set positions of players
        setPlayerPositions(players1, players2, this.game.global.upperSpace);
        
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
        ball = this.game.world.create(objectRatio * 475 , objectRatio * 250 + this.game.global.upperSpace, 'ball');
        ball.scale.setTo(scale * 0.8);
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

        //all kinds of scoreInfo
        scoreInfo = this.game.add.text(this.game.world.width /2,  40 * objectRatio  ,score1 +  " : " + score2, {
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
        });
        scoreInfo.anchor.setTo(0.5,0.5);
        scoreInfo.scale.setTo(scale * 7);
        turn = this.game.add.text(this.game.world.width/2, 600 * objectRatio, "", {
            font: "30px Arial",
            fill: "#ff0044"
            
        });
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

    goal1: function(){
        if(reset){
            score2++;
            reset = false;
            scoreInfo.setText(score1 + " : " + score2);
        }
    },

    goal2: function(){
        if(reset){
            score1++;
            reset = false;
            scoreInfo.setText(score1 + " : " + score2);
        }
    },

    resetGoal: function(){
        ball.x = 475 * objectRatio;
        ball.y = 250 * objectRatio + this.game.global.upperSpace;
        ball.body.velocity.setTo(0);
    },

    chooseBall: function(){ // ball belongs to whom
        var minDistancefrom1 = Number.MAX_VALUE;
        var index1 = 0;
        for (var i = 0; i < players1.children.length; i++) {
            if(minDistancefrom1 > this.game.physics.arcade.distanceBetween(ball, players1.children[i])){
                minDistancefrom1 = this.game.physics.arcade.distanceBetween(ball, players1.children[i]);
                index1 = i;
            }
        };
        var minDistancefrom2 = Number.MAX_VALUE;
        var index2 = 0;
        for (var i = 0; i < players1.children.length; i++) {
            if(minDistancefrom2 > this.game.physics.arcade.distanceBetween(ball, players2.children[i])){
                minDistancefrom2 = this.game.physics.arcade.distanceBetween(ball, players2.children[i]);
                index2 = i;
            }
        };
        if(minDistancefrom2 > minDistancefrom1) turn.setText("Ball belongs to team 1");
        else turn.setText("Ball belongs to team 2");
    },

    update: function () {
        //check collision
        this.game.physics.arcade.collide(ball, players1);
        this.game.physics.arcade.collide(ball, players2); 
        this.game.physics.arcade.collide(ball, borders);

        if(this.game.physics.arcade.overlap(ball, goals.getAt(0),this.goal1) == true){
            if(setReset == false){ // set the timer
                elapsedTime = this.game.time.now;
                setReset = true;
                arrow.visible = false;
            }
        };
        if(this.game.physics.arcade.overlap(ball, goals.getAt(1),this.goal2) == true){
            if(setReset == false){ // set the timer
                elapsedTime = this.game.time.now;
                setReset = true;
                arrow.visible = false;
            }
        };

        //reset the field after goal
        if(setReset){
            if((this.game.time.now - elapsedTime) > 3800){ // check the timer
                reset = true;
                setReset = false;
                arrow.visible = true;
                this.resetGoal();

            }
        }
        
        arrow.x = ball.x;
        arrow.y = ball.y;
        arrow.angle = ball.angle;

        //input
        if(!setReset){
            if(ball.body.speed == 0){
                this.chooseBall();
                arrow.visible = true;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.prepare();  
                else{// if user intentionally wants to shoot
                    if(strength > 0 ) this.shoot();
                }
                if (input.left.isDown){
                    ball.body.angularVelocity = -150;
                }
                else if (input.right.isDown){
                    ball.body.angularVelocity = 150;
                }else{
                    ball.body.angularVelocity = 0;
                }
            }else{
                arrow.visible = false;
            }
        }

    },

    render: function(){
        // this.game.debug.spriteInfo(ball, 32, 32);
    },


}