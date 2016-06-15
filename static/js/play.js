var play = function(game){
	console.log("Currently at play");
	widthRatio = 0.77;
	heightRatio = 0.77;
}
var players;
var ball;

play.prototype = {

	create: function () {
		console.log("create in play is being called");
		var field = this.game.add.sprite(0, 0, 'field');
		field.width = this.game.world.width;
		field.height = this.game.world.height;
        players = this.game.add.group(); // this initialize a players group with missing params
        console.log("width ratio inside play is:" + widthRatio);
        console.log("word width inside play is:" + this.game.world.width);

        for (var i = 0; i < 11; i++) {
        	player = players.create(widthRatio * this.game.world.randomX, heightRatio * this.game.world.randomY, 'player1');
        	var scaleX = (widthRatio)*0.25;
        	var scaleY = (heightRatio)*0.25;
        	player.scale.setTo(scaleX,scaleY);
        };
        for (var i = 0; i < 11; i++) {
        	player = players.create(widthRatio * this.game.world.randomX, heightRatio * this.game.world.randomY, 'player2');
        	var scaleX = (widthRatio)*0.25;
        	var scaleY = (heightRatio)*0.25;
        	player.scale.setTo(scaleX,scaleY);
        };
        ball = game.world.create(widthRatio * this.game.world.randomX, heightRatio * this.game.world.randomY, 'ball');
        var scaleX = (widthRatio)*0.25;
        var scaleY = (heightRatio)*0.25;
        ball.scale.setTo(scaleX,scaleY);
    },

    update: function () {

    }
}