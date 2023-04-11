define(["require", "exports", "./Tween"], function (require, exports, Tween_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tweens {
        constructor(game) {
            this.tweens = Array();
            this.game = game;
        }
        update(time, delta) {
            let i = 0;
            while (i < this.tweens.length) {
                let element = this.tweens[i];
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
        }
        tween(target, property, targetValue, isEase, isSpline, timeSecs, func, on_end, uSpeed, first, second, third) {
            let result = new Tween_1.default(target, property, targetValue, isEase, isSpline, timeSecs, func, on_end, uSpeed, first, second, third);
            this.tweens.push(result);
            return result;
        }
    }
    exports.default = Tweens;
});
//# sourceMappingURL=Tweens.js.map