/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block', 'Extend'], function (Block, Extend) {

    function RightLBlock(){
        Block.call(this);
        this.color = 'orange';
        this.blockTable = [[0,0,1],
            [1,1,1]];

        this.buildBlock();

    }
    Extend(Block, RightLBlock);
    return RightLBlock;
});