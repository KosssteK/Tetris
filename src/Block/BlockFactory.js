/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Settings',
    'Square',
    'Center',
    'LeftCurve',
    'LeftL',
    'RightCurve',
    'RightL',
    'Straight'], function (Settings,Square, Center, LeftCurve, LeftL, RightL,RightCurve,Straight) {

    function BlockFactory() {

    }

    BlockFactory.prototype.instance = Square;
    BlockFactory.prototype.createBlock = function (blockType) {

        switch (blockType) {
            case 1:
                this.instance = Square;
                break;
            case 2:
                this.instance = Straight;
                break;
            case 3:
                this.instance = LeftL;
                break;
            case 4:
                this.instance = RightL;
                break;
            case 5:
                this.instance = LeftCurve;
                break;
            case 6:
                this.instance = RightCurve;
                break;
            case 7:
                this.instance = Center;
                break;
        }
        return new this.instance(blockType);
    };
    BlockFactory.prototype.randomBlock= function(){
        return Math.round(Math.random()*6+1);
    };

    return BlockFactory;
});