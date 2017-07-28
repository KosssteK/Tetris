/**
 * Created by Wojciech on 2017-07-27.
 */

define([], function () {

    function Extend(base, sub) {

        var origProto = sub.prototype;
        sub.prototype = Object.create(base.prototype);
        for (var key in origProto) {
            sub.prototype[key] = origProto[key];
        }
        // The constructor property was set wrong, let's fix it
        Object.defineProperty(sub.prototype, 'constructor', {
            enumerable: false,
            value: sub
        });
    }

    return Extend;
});