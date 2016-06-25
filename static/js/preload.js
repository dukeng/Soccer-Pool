var Preload = function(game){
	console.log("Currently at preload");
}

Preload.prototype = {
	preload: function(){
		var loadingBar = this.add.sprite(0,0,'loading');
		this.load.setPreloadSprite(loadingBar);
		this.game.load.image('field', 'static/images/field.png');
        this.game.load.image('player1', 'static/images/player1.png');
        this.game.load.image('player2', 'static/images/player2.png');
        this.game.load.image('ball', 'static/images/ball.png');
        this.game.load.image('arrow', 'static/images/arrow.png');
        this.game.load.image('blank', 'static/images/blank.png');
        this.game.load.image('goal', 'static/images/blank.png');
	},
	create: function(){
		this.game.state.start("Play");
	}
}