define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Tween = /** @class */ (function () {
        function Tween(target, property, targetValue, isEase, isSpline, timeSecs, func, on_end, uSpeed, first, second, third) {
            if (on_end === void 0) { on_end = null; }
            var restArgs = [];
            for (var _i = 12; _i < arguments.length; _i++) {
                restArgs[_i - 12] = arguments[_i];
            }
            this.target = target;
            this.property = property;
            this.targetValue = targetValue;
            this.isEase = isEase; //ease or bezier with control
            this.timeSecs = timeSecs;
            this.func = func;
            this.on_end = on_end;
            this.initialValue = this.target[this.property];
            this.totalTime = this.timeSecs;
            //this.controlValue = this.initialValue + Math.random() * (this.targetValue - this.initialValue);
            var positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
            this.controlValue = this.initialValue + positiveOrNegative * Math.random() * (this.targetValue - this.initialValue);
            this.uSpeed = uSpeed;
            this.first = first;
            this.second = second;
            this.third = third;
            this.restArgs = restArgs;
        }
        /*
        public lerp(a, b, t){
            return (1 - t) * a + t * b;
        }
        */
        Tween.prototype.quadraticBezierSpline = function (t) {
            var midValue;
            /*
            if (isControled == true){
                midValue = this.controlValue;
            }
            else{
                midValue = (this.initialValue + this.targetValue) / 2;
            }
            */
            midValue = this.controlValue;
            var d = (1 - t) * this.initialValue + t * midValue;
            var e = (1 - t) * midValue + t * this.targetValue;
            var f = (1 - t) * d + t * e;
            return f;
        };
        Tween.prototype.cubicSmoothBezierSpline = function (t) {
            var vSpeed;
            if (this.third == undefined) {
                vSpeed = 50;
            }
            else {
                vSpeed = (this.third - this.first) / 2;
            }
            var b = this.initialValue + this.uSpeed / 3;
            var c = this.targetValue - vSpeed / 3;
            var e = (1 - t) * this.initialValue + t * b;
            var f = (1 - t) * b + t * c;
            var g = (1 - t) * c + t * this.targetValue;
            var q = (1 - t) * e + t * f;
            var r = (1 - t) * f + t * g;
            var p = (1 - t) * q + t * r;
            return p;
        };
        Tween.prototype.update = function (time, deltaMillis) {
            // TODO: apply the tween correctly
            //console.log(time);        
            if (this.timeSecs > 0) {
                this.timeSecs -= deltaMillis / 1000;
                if (this.timeSecs > 0) {
                    var t = 1 - this.timeSecs / this.totalTime;
                    if (this.isEase) {
                        var easeT = this.func(t);
                        this.target[this.property] = this.initialValue + (this.targetValue - this.initialValue) * easeT;
                    }
                    else {
                        if (this.isSpline) {
                            this.target[this.property] = this.cubicSmoothBezierSpline(t);
                        }
                        else {
                            this.target[this.property] = this.quadraticBezierSpline(t);
                        }
                    }
                }
                //console.log("t: " + t);
                //console.log("realT: " + realT);
                //console.log("initialValue: " + this.initialValue);
                //console.log("targetValue:" + this.targetValue);
                //console.log(this.initialValue + (this.targetValue - this.initialValue) * realT);
                //console.log(this.target[this.property]);
            }
        };
        Tween.prototype.isDone = function () {
            // TODO: after you adapt update(), check if this method still correctly
            //       reports your tween has finished
            return this.timeSecs <= 0;
        };
        // -------------------------------------
        // FOLLOWS THE STASH OF EASING FUNCTIONS
        // -------------------------------------
        Tween.linear = function (t) {
            return t;
        };
        // TODO: add more easing functions here
        Tween.quadratic = function (t) {
            return t * t;
        };
        Tween.quadraticBezier = function (t, mid) {
            return (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * mid + t * t * 1;
        };
        Tween.easeInQuadraticBezier = function (t) {
            return Tween.quadraticBezier(t, 0);
        };
        Tween.easeOutQuadraticBezier = function (t) {
            return Tween.quadraticBezier(t, 1);
        };
        Tween.linearBezier1 = function (t) {
            return Tween.quadraticBezier(t, 0.5);
        };
        Tween.smoothStep2 = function (t) {
            return Tween.quadraticBezier(t, t);
        };
        return Tween;
    }());
    exports.default = Tween;
});
//# sourceMappingURL=Tween_raw.js.map