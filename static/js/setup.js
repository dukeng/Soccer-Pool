/* This file contains helper methods and settings for play.js */

//setup border field
function setBorderPosition(border, goal, game, upperSpace, gameWidth ){
	//here are some hardcoded constants
	marginX = 30 * objectRatio;
	marginY = 40 * objectRatio; //  +35
	innerWidth = 885 * objectRatio;
	innerHeight = 420 * objectRatio;
	goalLength = 98 * objectRatio;
	goalWidth = 18 * objectRatio;
	offsetToGoal = 200 * objectRatio; // the height from top of the field to the goal
	OFFSETFROMSCREEN = 50 * objectRatio; // the screen does not appear to show the top 50 pixels

	game.physics.p2.setBounds(marginX - goalWidth ,marginY + upperSpace , gameWidth, innerHeight);

	// 6 borders
	var leftTopBlank = game.add.sprite(0, upperSpace + marginY , 'blank');
	leftTopBlank.height = (innerHeight - goalLength)/2;
	leftTopBlank.y  += leftTopBlank.height / 2;
	leftTopBlank.width = 30 * objectRatio;
	leftTopBlank.x = marginX - leftTopBlank.width /2;

	var leftBottomBlank = game.add.sprite(0,marginY + upperSpace + leftTopBlank.height + goalLength, 'blank');
	leftBottomBlank.height =(innerHeight - goalLength)/2;
	leftBottomBlank.y += leftBottomBlank.height/2;
	leftBottomBlank.width = 30 * objectRatio;
	leftBottomBlank.x = marginX - leftBottomBlank.width/2;

	var rightTopBlank = game.add.sprite(innerWidth + marginX,upperSpace + marginY,'blank');
	rightTopBlank.height = (innerHeight - goalLength)/2;
	rightTopBlank.y  += rightTopBlank.height / 2;
	rightTopBlank.width = 30 * objectRatio;
	rightTopBlank.x += rightTopBlank.width / 2;

	var rightBottomBlank = game.add.sprite(innerWidth + marginX, marginY + upperSpace + leftTopBlank.height + goalLength, 'blank');
	rightBottomBlank.height = (innerHeight - goalLength) /2;
	rightBottomBlank.y  += rightBottomBlank.height / 2;
	rightBottomBlank.width = 30 * objectRatio;
	rightBottomBlank.x += rightBottomBlank.width / 2;

	border.add(leftTopBlank);
	border.add(rightTopBlank);
	border.add(leftBottomBlank);
	border.add(rightBottomBlank);
	// enhance the width of border in case ball gets out
	border.forEach(function(item){
		item.width  = 30 * objectRatio;
	}, this);



	//Goal

	var leftGoal = game.add.sprite(0, OFFSETFROMSCREEN + upperSpace, 'goal');
	leftGoal.width = 20 * objectRatio;
	leftGoal.x = marginX - leftGoal.width - 10 * objectRatio; // hardcode the margin to push the goal back a little bit
	leftGoal.y += offsetToGoal;
	leftGoal.height = goalLength;
	leftGoal.y -= leftGoal.height/2;
	goal.add(leftGoal);

	var rightGoal = game.add.sprite(innerWidth + marginX, OFFSETFROMSCREEN + upperSpace, 'goal');
	rightGoal.y += offsetToGoal; 
	rightGoal.height = goalLength;
	rightGoal.width = 20 * objectRatio;
	rightGoal.x += 10 * objectRatio 
	rightGoal.y -= rightGoal.height /2;
	
	goal.add(rightGoal);


}

// setup for team's position
function setPlayerPositions(players1, players2, upperSpace){
	players1.create(75*objectRatio, 250*objectRatio, 'player1'); // goal keeper
	defenderX = 225;
	players1.create(defenderX*objectRatio, 175*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 325*objectRatio, 'player1');

	middlefieldX = 400;
	players1.create(middlefieldX*objectRatio, 150*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 350*objectRatio, 'player1');
	middField2X = 550;
	// players1.create(middField2X*objectRatio, 170*objectRatio, 'player1');
	// players1.create(middField2X*objectRatio, 330*objectRatio, 'player1');
	// attackX = 700; 
	// players1.create(attackX*objectRatio, 175*objectRatio, 'player1');
	// players1.create(attackX*objectRatio, 325*objectRatio, 'player1');
	players1.forEach(function(item) {
		item.scale.setTo(scale);
		item.anchor.setTo(0.5,0.5);
		item.y = item.y + upperSpace;
	}, this);

	players2.create(850*objectRatio, 250*objectRatio, 'player2');
	defX = 700;
	players2.create(defX*objectRatio, 250*objectRatio, 'player2');

	midX = 500;
	players2.create(midX*objectRatio, 150*objectRatio, 'player2');
	players2.create(midX*objectRatio, 250*objectRatio, 'player2');
	players2.create(midX*objectRatio, 350*objectRatio, 'player2');
	attX = 300;
	// players2.create(attX*objectRatio, 100*objectRatio, 'player2');
	// players2.create(attX*objectRatio, 200*objectRatio, 'player2');
	// players2.create(attX*objectRatio, 300*objectRatio, 'player2');
	// players2.create(attX*objectRatio, 400*objectRatio, 'player2');
	players2.forEach(function(item) {
		item.scale.setTo(scale);
		item.anchor.setTo(0.5,0.5);
		item.y = item.y + upperSpace;
	}, this);
}

function getSpeed(item){
	return Math.sqrt(item.body.velocity.x * item.body.velocity.x + item.body.velocity.y * item.body.velocity.y);
}

function isNotMoving(){ // check if every object in one group/ object has stopped moving
	var stop = true;
	if(this.children.length === 0){ // if the thing passed in is an object
		if(getSpeed(this) > MINIMUM_VELOCITY) stop = false;
	} else if (stop){				// if the thing passed in is a group
		this.forEach(function(item){
		if(getSpeed(item) > MINIMUM_VELOCITY){
			stop = false;
		}
	}, this);
	}
	return stop;
}

function isFieldStable(set, isNotMoving){
	for (var item in set ){ // set is an object containing groups/ object to check with
		if(!isNotMoving.call(set[item])) return false; // pass in each group in set
	}
	return true;
}

function forceToStop(set, forceStop){
	for (var item in set ){ // set is an object containing groups/ objecdt to check with
		forceStop.call(set[item]);
	}
}

function forceStop(){
	if(this.children.length === 0){ // if the thing passed in is an object
		if(getSpeed(this) <= MINIMUM_VELOCITY) this.body.setZeroVelocity();
	} else {				// if the thing passed in is a group
		this.forEach(function(item){
		if(getSpeed(item) <= MINIMUM_VELOCITY) item.body.setZeroVelocity();
	}, this);
	}
}