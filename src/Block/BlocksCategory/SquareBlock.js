/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block', 'Extend'], function (Block, Extend) {

    function SquareBlock() {
        Block.call(this);
        this.color = 'yellow';
        this.blockTable = [[1, 1],
            [1, 1]];

        this.buildBlock();

    }

    Extend(Block, SquareBlock);
    return SquareBlock;
});