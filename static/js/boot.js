var boot = function(game){
	console.log("Currently at boot");
}

boot.prototype = {
	preload: function(){
		this.game.load.image('loading','static/images/loading.png');
	},
	create: function(){
		this.game.state.start("Preload");
	}
};