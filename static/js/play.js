var Play = function(game){
	console.log("Currently at play");
    var players;
    var ball;
    //shortcuts for the constant 
    widthRatio = game.global.ratio;
    heightRatio = game.global.ratio;
    scaleX = widthRatio * 0.1;
    scaleY = heightRatio * 0.1;
    objectRatio = game.global.objectRatio;
}


Play.prototype = {

	create: function () {
		var field = this.game.add.sprite(0, 0, 'field');
        var fieldRatio = field.width / field.height;
        if (fieldRatio < widthRatio ) {
            field.height = this.game.world.height * (720/920);
            field.width = field.height * widthRatio;
        } else {
            field.width = this.game.world.width;
            field.height = field.width * 1/ widthRatio;
        }
        field.x = this.game.world.width / 2;
        field.y =  this.game.world.height * (720/920)/2;
		// field.width = this.game.world.width;
		// field.height = this.game.world.height * 1 / heightRatio;
        field.anchor.setTo(0.5,0.5);
        console.log("width is" + this.game.world.width);
        players = this.game.add.group(); // this initialize a players group with missing params
        for (var i = 0; i < 11; i++) {
        	player = players.create(objectRatio * 30 * i, objectRatio * 30 * i, 'player1');
            player.anchor.setTo(0.5, 0.5);
        	player.scale.setTo(scaleX,scaleY);
        };
        for (var i = 0; i < 11; i++) {
        	player = players.create( objectRatio * 40 * i + 100, objectRatio*  40 * i + 25, 'player2');
        	player.scale.setTo(scaleX,scaleY);
            player.anchor.setTo(0.5, 0.5);
        };
        ball = this.game.world.create(objectRatio * 640, objectRatio * 360, 'ball');
        ball.scale.setTo(scaleX,scaleY);
        ball.anchor.setTo(0.5, 0.5);
    },

    update: function () {

    }
}