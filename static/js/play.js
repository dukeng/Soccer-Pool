var Play = function(game){
	console.log("Currently at play");
    var players;
    var ball;
    //shortcuts for the constant 
    widthRatio = game.global.widthRatio;
    heightRatio = game.global.heightRatio;
}


Play.prototype = {

	create: function () {
		var field = this.game.add.sprite(0, 0, 'field');
		field.width = this.game.world.width;
		field.height = this.game.world.height;
        console.log("width is" + this.game.world.width);
        players = this.game.add.group(); // this initialize a players group with missing params
        for (var i = 0; i < 11; i++) {
        	player = players.create(widthRatio * 30 * i, heightRatio * 30 * i, 'player1');
        	var scaleX = (widthRatio)*0.25;
        	var scaleY = (heightRatio)*0.25;
        	player.scale.setTo(scaleX,scaleY);
        };
        for (var i = 0; i < 11; i++) {
        	player = players.create(widthRatio * 40 * i + 100, heightRatio * 40 * i + 25, 'player2');
        	var scaleX = (widthRatio)*0.25;
        	var scaleY = (heightRatio)*0.25;
        	player.scale.setTo(scaleX,scaleY);
        };
        ball = this.game.world.create(widthRatio * this.game.world.randomX, heightRatio * this.game.world.randomY, 'ball');
        var scaleX = (widthRatio)*0.25;
        var scaleY = (heightRatio)*0.25;
        ball.scale.setTo(scaleX,scaleY);
    },

    update: function () {

    }
}