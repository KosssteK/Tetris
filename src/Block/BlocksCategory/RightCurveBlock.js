/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block', 'Extend'], function (Block, Extend) {

    function RightCurveBlock() {
        Block.call(this);
        this.color = 'green';
        this.blockTable = [[0, 1, 1],
            [1, 1, 0]];

        this.buildBlock();

    }

    Extend(Block, RightCurveBlock);
    return RightCurveBlock;
});