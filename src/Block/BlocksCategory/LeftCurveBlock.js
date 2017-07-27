/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block','Extend'], function (Block, Extend) {

    function LeftCurveBlock(){
        Block.call(this);
        this.color = 'red';
        this.blockTable = [[1,1,0],
            [0,1,1]];

        this.buildBlock();

    }
    Extend(Block, LeftCurveBlock);
    return LeftCurveBlock;
});