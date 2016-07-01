//This file contains utility functions

function isFieldStable(set, isNotMoving){
	for (var item in set ){ // set is an object containing groups/ object to check with
		if(!isNotMoving.call(set[item])) return false; // pass in each group in set
	}
	return true;
}

function forceToStop(set, forceStop){
	for (var item in set ){ // set is an object containing groups/ objecdt to check with
		forceStop.call(set[item]);
	}
}

function forceStop(){
	if(this.children.length === 0){ // if the thing passed in is an object
		if(getSpeed(this) <= MINIMUM_VELOCITY) this.body.setZeroVelocity();
	} else {				// if the thing passed in is a group
		this.forEach(function(item){
		if(getSpeed(item) <= MINIMUM_VELOCITY) item.body.setZeroVelocity();
	}, this);
	}
}

function isNotMoving(){ // check if every object in one group/ object has stopped moving
	var stop = true;
	if(this.children.length === 0){ // if the thing passed in is an object
		if(getSpeed(this) > MINIMUM_VELOCITY) stop = false;
	} else if (stop){				// if the thing passed in is a group
		this.forEach(function(item){
		if(getSpeed(item) > MINIMUM_VELOCITY){
			stop = false;
		}
	}, this);
	}
	return stop;
}

function getSpeed(item){
	return Math.sqrt(item.body.velocity.x * item.body.velocity.x + item.body.velocity.y * item.body.velocity.y);
}

function tweenGoal(game){
	// console.log(game.tweens);
	var goal_message= game.add.sprite(0,game.world.height/ 2, 'goal_message');
	goal_message.anchor.set(1, 0.5);
    goal_message.scale.setTo(scale  * 3);
    var goal_message_tween = game.add.tween(goal_message);
	goal_message_tween.to({x: game.world.width}, 1200, Phaser.Easing.Bounce.Out, true, 0, 0);
	goal_message_tween.onComplete.add(moveOut, goal_message_tween);
	// console.log(game.tweens);
}
function moveOut(){
	this.to({x: -this.game.world.width / 2}, 1200, null, true);
	// this.onComplete.removeAll();
	// this.onComplete.forget();
	// this.target.visible = false;
	this.onComplete.dispose();

}