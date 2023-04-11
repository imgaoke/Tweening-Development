define(["require", "exports", "./Tween"], function (require, exports, Tween_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Tweens = /** @class */ (function () {
        function Tweens(game) {
            this.tweens = Array();
            this.game = game;
        }
        Tweens.prototype.update = function (time, delta) {
            var i = 0;
            while (i < this.tweens.length) {
                var element = this.tweens[i];
                element.update(time, delta);
                if (element.isDone()) {
                    this.tweens.splice(i, 1);
                    if (element.on_end) {
                        element.on_end(element);
                    }
                }
                else {
                    i += 1;
                }
            }
        };
        Tweens.prototype.tween = function (target, property, targetValue, isEase, isSpline, timeSecs, func, on_end, uSpeed, first, second, third) {
            var restArgs = [];
            for (var _i = 12; _i < arguments.length; _i++) {
                restArgs[_i - 12] = arguments[_i];
            }
            var result = new Tween_1.default(target, property, targetValue, isEase, isSpline, timeSecs, func, on_end, uSpeed, first, second, third);
            this.tweens.push(result);
            return result;
        };
        return Tweens;
    }());
    exports.default = Tweens;
});
//# sourceMappingURL=Tweens_raw.js.map