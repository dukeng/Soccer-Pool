var Play = function(game){
    var players1;
    var players2;
    //shortcuts for the constant 
    //REM: these params are recognized outside the scope of the prototype and the play.js
    //need to include this in sprite's position to scale properly
    objectRatio = game.global.objectRatio;
    scale = objectRatio * 0.2;
    var input; // get input keyboard
    var borders; //borders position
    var goals; // goal positions
    var desinatedPlayer;
}
var MINIMUM_VELOCITY = 20; // minimum velocity before sprites stop

var reset = true;
var setReset = false; // false before timer has been set

var notMoving = true; 

var strength  = 0; //strength of the shoot
var newScaleX = 0;

var score1 = 0; // players 1 score (default score right)
var score2 = 0; // players 2 score (default score left)
var elapsedTime;


//----DEBUG-TOOLS----//
var DEBUG_TEXT;
var DEBUG = false;

Play.prototype = {

	create: function () {
        //initialize the field
        var field = this.game.add.sprite(0, 0, 'field');
        var fieldRatio = field.width / field.height; 
        field.x = this.game.world.width /2;
        field.y = this.game.world.height * (500/700)/2 + this.game.global.upperSpace; 
        field.anchor.setTo(0.5,0.5); // set the middle of the field
        field.width = this.game.world.width - 50 * objectRatio;
        field.height = field.width / fieldRatio;

        //enable physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.8;

        // border and goal
        borders = this.game.add.group();
        goals = this.game.add.group();

        setBorderPosition(borders,goals, this.game, this.game.global.upperSpace, this.game.global.gameWidth);
        this.game.physics.p2.enable(borders);
        borders.forEach(function(item) {
            item.body.static = true;
        }, this);

        //Players
        players1 = this.game.add.group(); 
        players2 = this.game.add.group();
        //set positions of players
        setPlayerPositions(players1, players2, this.game.global.upperSpace);
        //enable physics on players
        this.game.physics.p2.enable(players1);
        this.game.physics.p2.enable(players2);
        players1.forEach(function(item) {
            item.body.damping = 0.8;
            item.body.fixedRotation = true;
            item.body.setZeroVelocity();
            item.body.setCircle((item.width )/2);
        }, this);
        players2.forEach(function(item) {
            item.body.damping = 0.8;
            item.body.fixedRotation = true;
            item.body.setZeroVelocity();
            item.body.setCircle((item.width )/2);
        }, this);    
        //initialize ball
        ball = this.game.world.create(objectRatio * 475 , objectRatio * 250 + this.game.global.upperSpace, 'ball');
        ball.scale.setTo(scale * 0.8);
        ball.anchor.setTo(0.5, 0.5);
        //enable physics mode on ball
        this.game.physics.p2.enable(ball);
        ball.body.setZeroVelocity();
        ball.body.collideWorldBounds = true;
        ball.body.damping = 0.8;
        //init arrow
        arrow = this.game.world.create(objectRatio * 400, objectRatio * 400, 'arrow');
        arrow.anchor.setTo(0.5, 0.65);
        arrow.scale.setTo(scale * 5.5, scale * 3.5);
        arrow.visible = false;
        newScaleX = scale; 
        
        //init star
        star = this.game.world.create(objectRatio * 400, objectRatio * 400, 'star');
        star.anchor.setTo(0.5, 0.5);
        star.scale.setTo(scale, scale);
        star.visible = false;
        
        circle = this.game.world.create(0,0, 'circle');
        circle.anchor.setTo(0.5, 0.5);
        circle.visible = false;

        //all kinds of scoreInfo
        scoreInfo = this.game.add.text(this.game.world.width /2,  40 * objectRatio  ,score1 +  " : " + score2, {
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
        });
        scoreInfo.anchor.setTo(0.5,0.5);
        scoreInfo.scale.setTo(scale * 7);
        turnInfo = this.game.add.text(this.game.world.width/2, 600 * objectRatio, "", {
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
        });
        teamTurn = 1;
        turnInfo.scale.setTo(scale * 7);
        //---initialize debug tools---//
        DEBUG_TEXT = this.game.add.text(this.game.world.width/2 - 400 * objectRatio, 600 * objectRatio, "", {
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
        });
        DEBUG_TEXT.scale.setTo(scale * 7);

        //this makes the game excluded from input of the browser
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR]);
        input = this.game.input.keyboard.createCursorKeys();
        //whenever user clicks the game will set the player to hit the ball
        this.game.input.onDown.add(this.choosePlayer, this);



    },

    choosePlayer: function(pointer){ // ball belongs to whom, pointer is the mouse click position
        var checkWithBodies;
        // set team bodies to check with
        if(teamTurn == 1) checkWithBodies = players1.children;
        else checkWithBodies = players2.children;
        // bodies contain array of bodies that overlap the point
        var bodies = this.game.physics.p2.hitTest(pointer.position, checkWithBodies);
        if(bodies.length === 0){
            DEBUG_TEXT.setText("Click on a player");
        } else{
            if(bodies.length !==1) DEBUG_TEXT.setText("Warning: overlap occurred");
            else{
                star.position = bodies[0].parent.sprite.position;
                star.visible = true;
                this.desinatedPlayer = bodies[0].parent;
                DEBUG_TEXT.setText("");
            }
        }
    },

    prepare: function(){
        if(this.desinatedPlayer !== undefined && notMoving){
            touchAt = this.game.input.activePointer.position;
            arrow.x = this.desinatedPlayer.x;
            arrow.y = this.desinatedPlayer.y;
            circle.x = this.desinatedPlayer.x;
            circle.y = this.desinatedPlayer.y;
            arrow.rotation = - Phaser.Math.angleBetweenPointsY(this.desinatedPlayer.sprite.position,touchAt);
            this.desinatedPlayer.rotation =  - Phaser.Math.angleBetweenPointsY(this.desinatedPlayer.sprite.position,touchAt);
            distance = Phaser.Point.distance(this.desinatedPlayer.sprite.position,touchAt) * objectRatio;
            if(distance <= 50 * objectRatio && distance > this.desinatedPlayer.sprite.width / 2 ){  // set the property of strength, circle and arrow
                strength = distance *1500;
                arrowRatio = arrow.width / arrow.height;
                arrow.height = distance * 2;
                arrow.width = arrowRatio * arrow.height;
                circle.width = distance * 2;
                circle.height = distance * 2;
                circle.visible = true;
                arrow.visible = true;
            } else if (distance <= this.desinatedPlayer.sprite.width / 2){
                circle.visible = false;
                arrow.visible = false;
                strength = 0;
            }
        }
    },
    shoot: function(){
        if(strength !== 0){
            this.desinatedPlayer.thrust(strength);
            this.desinatedPlayer.setZeroRotation();
            this.desinatedPlayer = undefined;
            strength = 0;
            arrow.visible = false; 
            circle.visible = false;
            star.visible = false;
            notMoving = false;
            if(teamTurn == 1 ) teamTurn = 0;
            else teamTurn = 1;

        }
    },

    goal1: function(){
        if(reset){
            score2++;
            reset = false;
            setReset = true;
            scoreInfo.setText(score1 + " : " + score2);
            tweenGoal(this.game);
        }
    },

    goal2: function(){
        if(reset){
            score1++;
            reset = false;
            setReset = true;
            scoreInfo.setText(score1 + " : " + score2);
            tweenGoal(this.game);
        }
    },

    resetGoal: function(){
        ball.body.x = 475 * objectRatio;
        ball.body.y = 250 * objectRatio + this.game.global.upperSpace;
        ball.body.setZeroRotation();
        setReset = false;
        reset = true;
    },

    update: function () {
        if(teamTurn == 1) turnInfo.setText("Team 1's turn");
        else turnInfo.setText("Team 2's turn");
        //check if goal
        if(goals.children[0].overlap(ball)) this.goal1();
        else if(goals.children[1].overlap(ball)) this.goal2();


        if(!notMoving){
            var movableObjects = {players1, players2, ball};
            forceToStop(movableObjects, forceStop);
            if(isFieldStable(movableObjects, isNotMoving)) notMoving = true;
        }
        // input
        if(!setReset){ // if not resetting
            if(getSpeed(ball) < 1){
                if(this.game.input.activePointer.isDown) this.prepare();
                else this.shoot();
            }else{
                arrow.visible = false;
                circle.visible = false;
                star.visible = false;
                ball.body.setZeroRotation();
            }
        } else{//reset the field after ball goes into goal
            if(notMoving){ // everything stops
                this.resetGoal();
            } 
        }
        if(DEBUG){ 
        }

    },

    render: function(){
        // this.game.debug.spriteInfo(ball, 32, 32);
    },



}