/* This file contains helper methods and settings for play.js */

//setup border field
function setBorderPosition(border, goal, game, upperSpace, gameWidth ){
	//here are some hardcoded constants
	marginX = 38 * objectRatio;
	marginY = 120 * objectRatio; // used to be 40, then 85
	innerWidth = 885 * objectRatio;
	innerHeight = 420 * objectRatio;
	goalLength = 98 * objectRatio;
	goalWidth = 18 * objectRatio;
	offsetToGoal = 200 * objectRatio; // the height from top of the field to the goal
	OFFSETFROMSCREEN = 50 * objectRatio; // the screen does not appear to show the top 50 pixels

	game.physics.p2.setBounds(marginX - goalWidth,marginY - 35 * objectRatio, gameWidth, innerHeight);

	// 6 borders
	var leftTopBlank = game.add.sprite(0, marginY + upperSpace, 'blank');
	leftTopBlank.height = (innerHeight - goalLength)/2;
	leftTopBlank.x = marginX - leftTopBlank.width * objectRatio ;

	var leftBottomBlank = game.add.sprite(0,marginY + upperSpace + leftTopBlank.height + goalLength, 'blank');
	leftBottomBlank.height =(innerHeight - goalLength)/2;
	leftBottomBlank.x = marginX - leftBottomBlank.width * objectRatio;

	var rightTopBlank = game.add.sprite(innerWidth + marginX,marginY + upperSpace,'blank');
	rightTopBlank.height = (innerHeight - goalLength)/2;

	var rightBottomBlank = game.add.sprite(innerWidth + marginX, marginY + upperSpace + leftTopBlank.height + goalLength, 'blank');
	rightBottomBlank.height = (innerHeight - goalLength) /2;

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
	leftGoal.x = marginX - leftGoal.width * objectRatio;
	leftGoal.y += offsetToGoal;
	leftGoal.height = goalLength;
	var rightGoal = game.add.sprite(innerWidth + marginX, OFFSETFROMSCREEN + upperSpace, 'goal');
	rightGoal.y += offsetToGoal; 
	rightGoal.height = goalLength;
	goal.add(leftGoal);
	goal.add(rightGoal);
	goal.forEach(function(item){
		item.width  = 30 * objectRatio;
	}, this);

}

// setup for team's position
function setPlayerPositions(players1, players2, upperSpace){
	players1.create(50*objectRatio, 250*objectRatio, 'player1'); // goal keeper
	defenderX = 225;
	players1.create(defenderX*objectRatio, 175*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 325*objectRatio, 'player1');

	middlefieldX = 400;
	players1.create(middlefieldX*objectRatio, 150*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 350*objectRatio, 'player1');
	middField2X = 550;
	players1.create(middField2X*objectRatio, 170*objectRatio, 'player1');
	players1.create(middField2X*objectRatio, 330*objectRatio, 'player1');
	attackX = 700; 
	players1.create(attackX*objectRatio, 175*objectRatio, 'player1');
	players1.create(attackX*objectRatio, 325*objectRatio, 'player1');
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
	players2.create(attX*objectRatio, 100*objectRatio, 'player2');
	players2.create(attX*objectRatio, 200*objectRatio, 'player2');
	players2.create(attX*objectRatio, 300*objectRatio, 'player2');
	players2.create(attX*objectRatio, 400*objectRatio, 'player2');
	players2.forEach(function(item) {
		item.scale.setTo(scale);
		item.anchor.setTo(0.5,0.5);
		item.y = item.y + upperSpace;
	}, this);
}

function getSpeed(item){
	return Math.sqrt(item.body.velocity.x * item.body.velocity.x + item.body.velocity.y * item.body.velocity.y);
}


