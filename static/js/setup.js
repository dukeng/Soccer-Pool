/* This file contains method helpers and settings for play.js */

// setup for team's position
function setPlayerPositions(players1, players2){
	players1.create(75*objectRatio, 360*objectRatio, 'player1'); // goal keeper
	defenderX = 250;
	players1.create(defenderX*objectRatio, 150*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 290*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 420*objectRatio, 'player1');
	players1.create(defenderX*objectRatio, 550*objectRatio, 'player1');
	middlefieldX = 650;
	players1.create(middlefieldX*objectRatio, 150*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 290*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 420*objectRatio, 'player1');
	players1.create(middlefieldX*objectRatio, 550*objectRatio, 'player1');
	attackX = 900;
	players1.create(attackX*objectRatio, 250*objectRatio, 'player1');
	players1.create(attackX*objectRatio, 520*objectRatio, 'player1');
	players1.forEach(function(item) {
		item.scale.setTo(scaleX, scaleY);
		item.anchor.setTo(0.5,0.5);
	}, this);

	players2.create(350*objectRatio, 100*objectRatio, 'player2');
	players2.create(350*objectRatio, 200*objectRatio, 'player2');
	players2.create(350*objectRatio, 300*objectRatio, 'player2');
	players2.create(350*objectRatio, 400*objectRatio, 'player2');
	players2.create(450*objectRatio, 100*objectRatio, 'player2');
	players2.create(450*objectRatio, 200*objectRatio, 'player2');
	players2.create(450*objectRatio, 300*objectRatio, 'player2');
	players2.create(650*objectRatio, 100*objectRatio, 'player2');
	players2.create(650*objectRatio, 200*objectRatio, 'player2');
	players2.create(650*objectRatio, 300*objectRatio, 'player2');
	players2.create(650*objectRatio, 400*objectRatio, 'player2');
	players2.forEach(function(item) {
		item.scale.setTo(scaleX, scaleY);
		item.anchor.setTo(0.5,0.5);
	}, this);
}