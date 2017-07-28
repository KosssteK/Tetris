/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block', 'Extend'], function (Block, Extend) {

    function StraightBlock() {
        Block.call(this);
        this.color = 'cyan';
        this.blockTable = [[1, 1, 1, 1]];

        this.buildBlock();

    }

    Extend(Block, StraightBlock);
    return StraightBlock;
});