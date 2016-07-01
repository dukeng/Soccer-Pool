var Menu = function(game){

}

Menu.prototype ={
	create: function(){
		var background = this.game.add.sprite(0,0,'background');
		background.width = background.width * this.game.global.objectRatio;
		background.height = background.height * this.game.global.objectRatio;
		var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 200,'play', this.startGame , this, 1, 2, 0 );
	},

	startGame: function(){
		this.game.state.start('Play');
	}
}