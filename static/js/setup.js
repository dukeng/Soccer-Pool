/* This file contains method helpers and settings for play.js */


//setup border field
function setBorderPosition(border, width, height){
	border.create(0,0, 0, height,'blank'); // left blank
	border.create(0,0, width, 0,'blank'); // top blank
	border.create(width,0, width, height,'blank'); // right blank
	border.create(0,height, width, height,'blank'); // bottom blank
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
	players1.create(middlefieldX*objectRatio, 100*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 250*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 300*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 330*objectRatio, 'player1');
	attackX = 900;
	players1.create(attackX*objectRatio, 250*objectRatio, 'player1');
	players1.create(attackX*objectRatio, 400*objectRatio, 'player1');
	players1.forEach(function(item) {
		item.scale.setTo(scale);
		item.anchor.setTo(0.5,0.5);
		item.y = item.y + upperSpace;
	}, this);

	defX = 1000;
	players2.create(defX*objectRatio, 100*objectRatio, 'player2');
	players2.create(defX*objectRatio, 200*objectRatio, 'player2');
	players2.create(defX*objectRatio, 300*objectRatio, 'player2');
	players2.create(defX*objectRatio, 400*objectRatio, 'player2');
	midX = 600;
	players2.create(midX*objectRatio, 100*objectRatio, 'player2');
	players2.create(midX*objectRatio, 200*objectRatio, 'player2');
	players2.create(midX*objectRatio, 300*objectRatio, 'player2');
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

