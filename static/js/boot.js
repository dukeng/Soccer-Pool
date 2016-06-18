var Boot = function(game){}

Boot.prototype = {


	preload: function(){
		this.game.load.image('loading','static/images/loading.png');
	},
	create: function(){
		
		this.game.state.start("Preload");
	}
};