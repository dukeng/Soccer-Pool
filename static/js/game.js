window.onload = function() {

    var game = new Phaser.Game(1000, 562, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload () {
        game.load.image('field', 'static/images/field.png');
    }

    function create () {
        var field = game.add.sprite(0, 0, 'field');
        field.width = game.world.width;
        field.height = game.world.height;
    }

    function update () {

    }

};