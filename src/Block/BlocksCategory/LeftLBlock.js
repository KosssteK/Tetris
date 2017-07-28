/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block', 'Extend'], function (Block, Extend) {

    function LeftLBlock() {
        Block.call(this);
        this.color = 'blue';
        this.blockTable = [[1, 0, 0],
            [1, 1, 1]];

        this.buildBlock();

    }

    Extend(Block, LeftLBlock);
    return LeftLBlock;
});