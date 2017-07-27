/**
 * Created by Wojciech on 2017-07-27.
 */

define([],function () {

    function Settings(){


        function init(){
            var screenWidth = 320;
            var screenHeight = 640;
            var blockHeight = 16;
            var blockWidth = 16;
            var renderer = null;
            var stage = null;


            return {
                screenWidth:screenWidth,
                screenHeight:screenHeight,
                blockWidth:blockWidth,
                blockHeight:blockHeight,
                renderer:renderer,
                stage:stage
            }
        }

        return (function () {
            if (!this.instance) {
                this.instance = init();
            }
            return this.instance;
        })();



    }

    return new Settings;


});