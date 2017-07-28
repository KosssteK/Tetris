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

        for (var i = 0; i < this.backgroundTable.length; i++) {
            for (var j = 0; j < this.backgroundTable[i].length; j++) {
                this.children[i * this.backgroundTable[i].length + j].texture = PIXI.loader.resources[this.backgroundTable[i][j]].texture;
            }
        }

    };
    Map.prototype.addToMapTable = function (block) {

        for (var i = 0; i < block.blockTable.length; i++) {
            for (var j = 0; j < block.blockTable[i].length; j++) {

                var y = (block.y + i * Settings.blockHeight) / Settings.blockHeight;
                var x = (block.x + j * Settings.blockWidth) / Settings.blockWidth;
                if (block.blockTable[i][j] === 1)
                    this.backgroundTable[y][x] = block.color;
            }
        }

        this.rebuildMap();
    };
    Map.prototype.clearRow = function (sound, text) {
        var rowCounter = 0;
        var points = 0;
        var wholeRowBlocks = Settings.screenWidth/Settings.blockWidth;
        for (var i = this.backgroundTable.length - 1; i > 0; i--) {
            for (var j = 0; j < this.backgroundTable[i].length; j++) {
                if(this.backgroundTable[i][j] !=='background'){
                    rowCounter++;
                }
            }
            if(rowCounter===wholeRowBlocks)
            {
                var value = document.getElementById('score').value;
                value += 10;
                document.getElementById('score').value = value;
                document.getElementById('score').innerHTML = value;
                sound.pause();
                sound.currentTime = 0;
                sound.play();
                points++;
                clearTheRow(this.backgroundTable,i);
                i++;
            }
            rowCounter=0;
        }
        if(points > 0){
            resetPointsText(text, points);
        }
        this.rebuildMap();
    };

    function clearTheRow(table,rowNumber){

        for (var i = rowNumber; topOfMap(table,i); i--) {
            for (var j = 0; j < table[i].length; j++) {
                table[i][j] = table[i-1][j];
            }
        }

    }
    function topOfMap(table,rowNumber){

        for (var j = 0; j < table[rowNumber].length; j++) {
            if (table[rowNumber][j] !== 'background') {
                return true;
            }
        }
        return false;
    }
    function resetPointsText(text, points){
        text.text = '+' + points*10;
        text.x = Math.round(Settings.screenWidth / 2 - text.width / 2);
        text.y = Math.round(Settings.screenHeight / 2 - text.height / 2);
        text.alpha = 1;
    }

    return Map;


});