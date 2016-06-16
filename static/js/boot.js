var Boot = function(game){}

Boot.prototype = {

	// init: function(w){
	// 	widthRatio =  w;
	// 	console.log("init is called");
	// 	console.log("widthRatio in boot is: " + widthRatio);
	// },
	preload: function(){
		this.game.load.image('loading','static/images/loading.png');
	},
	create: function(){
		this.game.state.start("Preload");
	}
};