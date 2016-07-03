/* This file contains helper methods and settings for play.js */

//setup border field
function setBorderPosition(border, goal, game, upperSpace, gameWidth ){
	//here are some hardcoded constants
	marginX = 55 * objectRatio;
	marginY = 40 * objectRatio; //  +35
	innerWidth = 835 * objectRatio;
	innerHeight = 420 * objectRatio;
	goalLength = 98 * objectRatio;
	goalWidth = 18 * objectRatio;
	offsetToGoal = 200 * objectRatio; // the height from top of the field to the goal

	game.physics.p2.setBounds(marginX - goalWidth ,marginY + upperSpace , gameWidth - marginX + goalWidth, innerHeight);

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

	OFFSETFROMSCREEN = 50 * objectRatio; // the screen does not appear to show the top 50 pixels
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

	players2.forEach(function(item) {
		item.scale.setTo(scale);
		item.anchor.setTo(0.5,0.5);
		item.y = item.y + upperSpace;
	}, this);
}


// function goal(){
// 	goal_message_tween.to( {x:game.world.centerX}, 2000, Phaser.Easing.Bounce.Out, true);
// 	goal_message_tween.onComplete.add(escape, this);
// 	console.log("hello");
// 	function escape(){
// 		console.log(goal_message_tween);
// 	goal_message_tween.to({y : game.world.centerY}, 2000, Phaser.Easing.Bounce.Out, false);
// 	}
// }


