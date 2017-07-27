/**
 * Created by Wojciech on 2017-07-26.
 */
requirejs.config({
    baseUrl: 'src',
    paths: {
        PIXI: '../lib/pixi',
        Game: 'Game',
        Settings: 'Settings',
        Block: 'Block/Block',
        Map: 'Map/Map',
        Extend:'Extend/Extend',
        BlockFactory: 'Block/BlockFactory',
        Square: 'Block/BlocksCategory/SquareBlock',
        LeftCurve: 'Block/BlocksCategory/LeftCurveBlock',
        LeftL: 'Block/BlocksCategory/LeftLBlock',
        RightCurve: 'Block/BlocksCategory/RightCurveBlock',
        RightL: 'Block/BlocksCategory/RightLBlock',
        Straight: 'Block/BlocksCategory/StraightBlock',
        Center: 'Block/BlocksCategory/CenterBlock'
    }


});
require(['Game']);