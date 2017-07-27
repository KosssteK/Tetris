/**
 * Created by Wojciech on 2017-07-27.
 */
define(['Block','Extend'], function (Block, Extend) {

    function CenterBlock(){
        Block.call(this);
        this.color = 'purple';
        this.blockTable = [[0,1,0],
            [1,1,1]];

        this.buildBlock();

    }
    Extend(Block, CenterBlock);




    return CenterBlock;
});