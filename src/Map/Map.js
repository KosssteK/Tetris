/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Settings', 'PIXI'], function (Settings, PIXI) {

    function Map() {
        PIXI.Container.call(this);
        this.backgroundTable = [];
        for (var i = 0; i < Settings.screenHeight / Settings.blockHeight; i++) {
            this.backgroundTable[i] = [];
            for (var j = 0; j < Settings.screenWidth / Settings.blockWidth; j++) {
                this.backgroundTable[i][j] = 'background';
            }
        }
    }

    Map.prototype = Object.create(PIXI.Container.prototype);
    Map.prototype.constructor = Map;

    Map.prototype.buildMap = function () {

        for (var i = 0; i < this.backgroundTable.length; i++) {
            for (var j = 0; j < this.backgroundTable[i].length; j++) {

                var backgroundImage = new PIXI.Sprite(PIXI.loader.resources[this.backgroundTable[i][j]].texture);
                backgroundImage.x = j * Settings.blockWidth;
                backgroundImage.y = i * Settings.blockHeight;
                this.addChild(backgroundImage);
            }
        }
        Settings.stage.addChild(this);

    };
    Map.prototype.rebuildMap = function () {

        for (var i = 0; i <this.backgroundTable.length; i++) {
            for (var j = 0; j < this.backgroundTable[i].length; j++) {
                this.children[i*this.backgroundTable[i].length+j].texture = PIXI.loader.resources[this.backgroundTable[i][j]].texture;
            }
        }

    };
    Map.prototype.addToMapTable = function (block) {

        for (var i = 0; i < block.blockTable.length; i++) {
            for (var j = 0; j < block.blockTable[i].length; j++) {

                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                var x = (block.x + j * Settings.blockWidth) / Settings.blockWidth;
                if(block.blockTable[i][j] ===1)
                this.backgroundTable[y][x] = block.color;
            }
        }

        this.rebuildMap();
    };


    return Map;


});