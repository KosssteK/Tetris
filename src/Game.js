/**
 * Created by Wojciech on 2017-07-27.
 */

define(['Settings', 'PIXI', 'Map', 'BlockFactory', 'Block'], function (Settings, PIXI, Map, BlockFactory, Block) {

    Settings.renderer = PIXI.autoDetectRenderer(Settings.screenWidth, Settings.screenHeight);
    Settings.stage = new PIXI.Container();
    document.getElementById('table2').appendChild(Settings.renderer.view);
    document.getElementById('score').value = 0;
    document.getElementById('score').innerHTML = 0;

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 37) {
            moveSideways(-1);
        } else if (event.keyCode === 39) {
            moveSideways(1);
        } else if (event.keyCode === 40) {
            timeCounter = 60;
        } else if (event.keyCode === 38) {
            rotate();
        }
    });

    var map = new Map();
    var blockFactory = new BlockFactory();
    var block = new Block();
    var timeCounter = 0;var aass =7;
    var req = null;
    var tetrisSong = new Audio('assets/Sounds/tetris_song.mp3');
    tetrisSong.loop = true;
    var rotateSound = new Audio('assets/Sounds/rotate.mp3');
    var addSound = new Audio('assets/Sounds/add.mp3');
    var clearRowSound = new Audio('assets/Sounds/clearRow.mp3');
    var pointsText = new PIXI.Text('+10', {fontFamily: 'Arial', fontSize: 40, fill: 0xff1010, align: 'center'});


    PIXI.loader
        .add('blue', 'assets/Blocks/block_blue.png')
        .add('cyan', 'assets/Blocks/block_cyan.png')
        .add('green', 'assets/Blocks/block_green.png')
        .add('orange', 'assets/Blocks/block_orange.png')
        .add('purple', 'assets/Blocks/block_purple.png')
        .add('red', 'assets/Blocks/block_red.png')
        .add('yellow', 'assets/Blocks/block_yellow.png')
        .add('background', 'assets/Blocks/background.png')
        .load(setup);

    function setup() {
        map.buildMap();
        tetrisSong.play();
        setPointsAnimation();
        Settings.stage.addChild(pointsText);
        gameLoop();

    }

    function gameLoop() {
        req = requestAnimationFrame(gameLoop);


        if (block.children.length === 0) { //TODO: game over
            if (!gameOver()) {
                block = blockFactory.createBlock();
            } else {
                cancelAnimationFrame(req);
                displayGameOver();
                tetrisSong.pause();
            }
        }
        if (timeCounter === 60 && isMovePossible(block, map)) {
            block.move();
        }
        timeCounter += Settings.speed;


        pointsAnimation();
        Settings.renderer.render(Settings.stage);
    }

    function isMovePossible(block, map) {
        for (var i = 0; i < block.blockTable.length; i++) {
            for (var j = 0; j < block.blockTable[i].length; j++) {

                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                var nextY = (block.y + i * Settings.blockHeight + Settings.blockHeight) / Settings.blockHeight;
                var x = (block.x + j * Settings.blockWidth) / Settings.blockWidth;

                if (((block.blockTable.length + 1) * Settings.blockHeight + block.y) > Settings.screenHeight ||
                    (map.backgroundTable[nextY][x] !== 'background' && block.blockTable[i][j] === 1)) {
                    addSound.pause();
                    addSound.currentTime = 0;
                    addSound.play();
                    map.addToMapTable(block);
                    block.y = 0;
                    timeCounter = 0;
                    block.removeChildren();
                    map.clearRow(clearRowSound, pointsText);
                    return false;

                } else {
                    timeCounter = 0;
                }
            }
        }
        return true;
    }

    function moveSideways(direction) {
        //TODO: side block collision
        block.moveSideways(map, direction);
    }

    function rotate() {
        //TODO: rotation block collision
        block.rotate(map, rotateSound);
    }

    function gameOver() {
        for (var i = 0; i < block.blockTable.length; i++) {//2
            for (var j = 0; j < block.blockTable[i].length; j++) { //3
                var x = (block.x + j * Settings.blockWidth) / Settings.blockWidth;
                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                if (map.backgroundTable[y][x] !== 'background') {
                    return true;
                }
            }
        }
        return false;
    }

    function displayGameOver() {
        var message = new PIXI.Text('Game Over', {fontFamily: 'Arial', fontSize: 40, fill: 'red', align: 'center'});
        message.x = Settings.screenWidth / 2 - message.width / 2;
        message.y = Math.round(Settings.screenHeight / 2) - message.height / 2;

        Settings.stage.addChild(message);
    }

    function setPointsAnimation() {
        pointsText.alpha = 256;
        pointsText.x = Settings.screenWidth / 2 - pointsText.width / 2;
        pointsText.y = Math.round(Settings.screenHeight / 2) - pointsText.height / 2;
    }

    function pointsAnimation() {
        if (pointsText.alpha < 250) {
            pointsText.alpha += 5;
            pointsText.y += 2;
        }
    }
});
