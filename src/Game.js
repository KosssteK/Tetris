/**
 * Created by Wojciech on 2017-07-27.
 */

define(['Settings', 'PIXI', 'Map', 'BlockFactory', 'Block'], function (Settings, PIXI, Map, BlockFactory, Block) {

    Settings.renderer = PIXI.autoDetectRenderer(Settings.screenWidth, Settings.screenHeight);
    Settings.stage = new PIXI.Container();
    document.body.appendChild(Settings.renderer.view);

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 37) { //move left
            moveSideways(-1);
        } else if (event.keyCode === 39) { //move right
            moveSideways(1);
        } else if (event.keyCode === 40) { //move down
            timeCounter = 60;
        } else if (event.keyCode === 38) { //rotate
            //rotate();
        }
    });


    var map = new Map();
    var blockFactory = new BlockFactory();
    var block = new Block();
    var timeCounter = 0;


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
        gameLoop();
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);


        if (block.children.length === 0) {
            block = blockFactory.createBlock(blockFactory.randomBlock());

        }

        if (timeCounter === 60 && isMovePossible(block, map)) {
            block.move();
        }


        timeCounter += 5;
        Settings.renderer.render(Settings.stage);

    }


    function isMovePossible(block, map) {


        for (var i = 0; i < block.blockTable.length; i++) {
            for (var j = 0; j < block.blockTable[i].length; j++) {

                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                var nextY = (block.y + i * Settings.blockHeight + Settings.blockHeight) / Settings.blockHeight;
                var x = (block.x + j * Settings.blockWidth) / Settings.blockWidth;

                if (((block.blockTable.length + 1) * Settings.blockHeight + block.y) > Settings.screenHeight) {

                    map.addToMapTable(block);
                    block.y = 0;
                    timeCounter = 0;
                    block.removeChildren();
                    return false;
                } else if (map.backgroundTable[nextY][x] !== 'background' && block.blockTable[i][j] === 1) {
                    map.addToMapTable(block);
                    block.y = 0;
                    timeCounter = 0;
                    block.removeChildren();
                    return false;
                } else {
                    timeCounter = 0;
                }
            }
        }
        return true;
    }

    function moveSideways(direction) {
        block.moveSideways(direction);
    }
});
