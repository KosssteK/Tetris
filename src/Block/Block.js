/**
 * Created by Wojciech on 2017-07-27.
 */


define(['PIXI', 'Settings'], function (PIXI, Settings) {

    function Block(){
        PIXI.Container.call(this);
        this.x =Math.floor(Settings.screenWidth/2);
        this.y=0;
        this.blockTable = [];
        this.color = '';
    }

    Block.prototype = Object.create(PIXI.Container.prototype);
    Block.prototype.constructor = Block;

    Block.prototype.buildBlock = function (){


        for(var i =0; i < this.blockTable.length; i++){
            for(var j =0; j < this.blockTable[i].length; j++){
                if(this.blockTable[i][j] === 1){

                        var blockImage = new PIXI.Sprite(PIXI.loader.resources[this.color].texture);
                        blockImage.x = j*Settings.blockWidth;
                        blockImage.y = i*Settings.blockWidth;

                    this.addChild(blockImage);
                }
            }
        }

        Settings.stage.addChild(this);



    };
    Block.prototype.move = function () {

        this.y += Settings.blockHeight;
    };
    Block.prototype.moveSideways = function (direction) {

        if(direction === -1 && (this.x) > 0){
            this.x -= Settings.blockWidth;
        }else if(direction === 1 && (this.x + this.blockTable[0].length*Settings.blockWidth) < Settings.screenWidth){
            this.x += Settings.blockWidth;
        }
    };
    
    
    
    return Block;

});