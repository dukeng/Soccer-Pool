/* This file contains method helpers and settings for play.js */

//setup border field
function setBorderPosition(border, goal, game, upperSpace ){
	//here are some hardcoded constants
	marginX = 28 * objectRatio;
	marginY = 40 * objectRatio;
	innerWidth = 885 * objectRatio;
	innerHeight = 420 * objectRatio;
	goalLength = 98 * objectRatio;
	offsetToGoal = 160 * objectRatio; // the height from top of the field to the goal

	// 6 borders
	var leftTopBlank = game.add.sprite(0, marginY + upperSpace, 'blank');
	leftTopBlank.height = (innerHeight - goalLength)/2;
	leftTopBlank.x = marginX - leftTopBlank.width * objectRatio ;

	var leftBottomBlank = game.add.sprite(0,marginY + upperSpace + leftTopBlank.height + goalLength, 'blank');
	leftBottomBlank.height =(innerHeight - goalLength)/2;
	leftBottomBlank.x = marginX - leftBottomBlank.width * objectRatio;

	var topBlank = game.add.sprite(marginX, marginY + upperSpace,'blank');
	topBlank.y -= topBlank.height;
	topBlank.width = innerWidth;

	var rightTopBlank = game.add.sprite(innerWidth + marginX,marginY + upperSpace,'blank');
	rightTopBlank.height = (innerHeight - goalLength)/2;

	var rightBottomBlank = game.add.sprite(innerWidth + marginX, marginY + upperSpace + leftTopBlank.height + goalLength, 'blank');
	rightBottomBlank.height = (innerHeight - goalLength) /2;


	var bottomBlank = game.add.sprite(marginX,innerHeight +marginY+ upperSpace,'blank');
	bottomBlank.width = innerWidth;

	border.add(leftTopBlank);
	border.add(rightTopBlank);
	border.add(leftBottomBlank);
	border.add(rightBottomBlank);
	border.add(topBlank);
	border.add(bottomBlank);

	//Goal
	var leftGoal = game.add.sprite(0, marginY + upperSpace, 'goal');
	leftGoal.x = marginX - leftGoal.width * objectRatio;
	leftGoal.y += offsetToGoal;
	leftGoal.height = goalLength;
	var rightGoal = game.add.sprite(innerWidth + marginX, marginY + upperSpace, 'goal');
	rightGoal.y += offsetToGoal; 
	rightGoal.height = goalLength;
	goal.add(leftGoal);
	goal.add(rightGoal);

}

// setup for team's position
function setPlayerPositions(players1, players2, upperSpace){
	players1.create(50*objectRatio, 250*objectRatio, 'player1'); // goal keeper
	defenderX = 250;
	players1.create(defenderX*objectRatio, 100*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 250*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 300*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 350*objectRatio, 'player1');
	middlefieldX = 650;

	attackX = 700;
	players1.create(attackX*objectRatio, 150*objectRatio, 'player1');
	players1.create(attackX*objectRatio, 300*objectRatio, 'player1');
	players1.forEach(function(item) {
		item.scale.setTo(scale);
		item.anchor.setTo(0.5,0.5);
		item.y = item.y + upperSpace;
	}, this);

	players2.create(900*objectRatio, 250*objectRatio, 'player2');
	defX = 700;
	players2.create(defX*objectRatio, 250*objectRatio, 'player2');

	midX = 550;
	players2.create(midX*objectRatio, 150*objectRatio, 'player2');
	players2.create(midX*objectRatio, 250*objectRatio, 'player2');
	players2.create(midX*objectRatio, 350*objectRatio, 'player2');
	attX = 400;
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

