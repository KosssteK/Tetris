/**
 * Created by Wojciech on 2017-07-27.
 */


define(['PIXI', 'Settings'], function (PIXI, Settings) {

    function Block() {
        PIXI.Container.call(this);
        this.x = Math.floor(Settings.screenWidth / 2);
        this.y = 0;
        this.blockTable = [];
        this.color = '';
    }

    Block.prototype = Object.create(PIXI.Container.prototype);
    Block.prototype.constructor = Block;

    Block.prototype.buildBlock = function () {


        for (var i = 0; i < this.blockTable.length; i++) {
            for (var j = 0; j < this.blockTable[i].length; j++) {
                if (this.blockTable[i][j] === 1) {

                    var blockImage = new PIXI.Sprite(PIXI.loader.resources[this.color].texture);
                    blockImage.x = j * Settings.blockWidth;
                    blockImage.y = i * Settings.blockWidth;

                    this.addChild(blockImage);
                }
            }
        }

        Settings.stage.addChild(this);


    };
    Block.prototype.move = function () {

        this.y += Settings.blockHeight;
    };
    Block.prototype.moveSideways = function (map, direction) {
        if (((this.x) > 0 || (this.x + this.blockTable[0].length * Settings.blockWidth) < Settings.screenWidth) && blockCollision(this, map, direction)) {
            this.x = this.x + direction * Settings.blockWidth;
        }
    };
    Block.prototype.rotate = function (map, rotate) {
        var table = [];
        for (var i = 0; i < this.blockTable[0].length; i++) {
            table[i] = [];
            for (var j = 0; j < this.blockTable.length; j++) {
                table[i][j] = 0;
            }
        }
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                table[i][j] = this.blockTable[j][table.length - i - 1];
            }
        }

        rotate.pause();
        rotate.currentTime = 0;
        if (!isColliding(this, table, map)) {
            rotate.play();
            this.blockTable = table;
            this.removeChildren();
            this.buildBlock();
        }
    };

    function blockCollision(block, map, direction) {
        for (var i = 0; i < block.blockTable.length; i++) {
            for (var j = 0; j < block.blockTable[i].length; j++) {
                var neighbour = (block.x + direction * Settings.blockWidth + j * Settings.blockWidth) / Settings.blockWidth;
                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                if (block.blockTable[i][j] === 1) {
                    if (map.backgroundTable[y][neighbour] !== 'background') {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function isColliding(block, table, map) {

        for (var i = 0; i < table.length; i++) {//2
            for (var j = 0; j < table[i].length; j++) { //3
                var x = (block.x + j * Settings.blockWidth) / Settings.blockWidth;
                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                if (map.backgroundTable[y][x] !== 'background') {
                    return true;
                }
            }
        }
        return false;

    }

    return Block;
});