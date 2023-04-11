define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tween {
        constructor(target, property, targetValue, isEase, isSmoothSpline, timeSecs, func, on_end = null, uSpeed, first, second, third) {
            this.target = target;
            this.property = property;
            this.targetValue = targetValue;
            this.isEase = isEase; //ease or Bezier
            this.isSmoothSpline = isSmoothSpline; //quadratic Bezier with control or smooth cubic smooth Bezier
            this.timeSecs = timeSecs;
            this.func = func;
            this.on_end = on_end;
            this.initialValue = this.target[this.property];
            this.totalTime = this.timeSecs;
            // the control point used by the quadratic bezier curve is random generated
            let positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
            this.controlValue = this.initialValue + positiveOrNegative * Math.random() * (this.targetValue - this.initialValue);
            this.uSpeed = uSpeed;
            this.first = first;
            this.second = second;
            this.third = third;
        }
        quadraticBezierCurve(t) {
            let midValue;
            midValue = this.controlValue;
            let d = (1 - t) * this.initialValue + t * midValue;
            let e = (1 - t) * midValue + t * this.targetValue;
            let f = (1 - t) * d + t * e;
            return f;
        }
        cubicSmoothBezierSpline(t) {
            // end speed
            let vSpeed;
            if (this.third == undefined) {
                vSpeed = 0;
            }
            else {
                vSpeed = (this.third - this.first) / 2;
            }
            let b = this.initialValue + this.uSpeed / 3;
            let c = this.targetValue - vSpeed / 3;
            let e = (1 - t) * this.initialValue + t * b;
            let f = (1 - t) * b + t * c;
            let g = (1 - t) * c + t * this.targetValue;
            let q = (1 - t) * e + t * f;
            let r = (1 - t) * f + t * g;
            let p = (1 - t) * q + t * r;
            return p;
        }
        update(time, deltaMillis) {
            // TODO: apply the tween correctly
            if (this.timeSecs > 0) {
                this.timeSecs -= deltaMillis / 1000;
                if (this.timeSecs > 0) {
                    var t = 1 - this.timeSecs / this.totalTime;
                    if (this.isEase) {
                        var easeT = this.func(t);
                        this.target[this.property] = this.initialValue + (this.targetValue - this.initialValue) * easeT;
                    }
                    else {
                        if (this.isSmoothSpline) {
                            this.target[this.property] = this.cubicSmoothBezierSpline(t);
                        }
                        else {
                            this.target[this.property] = this.quadraticBezierCurve(t);
                        }
                    }
                }
            }
        }
        isDone() {
            // TODO: after you adapt update(), check if this method still correctly
            //       reports your tween has finished
            return this.timeSecs <= 0;
        }
        // -------------------------------------
        // FOLLOWS THE STASH OF EASING FUNCTIONS
        // -------------------------------------
        static linear(t) {
            return t;
        }
        // TODO: add more easing functions here
        static quadraticBezier(t, mid) {
            return (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * mid + t * t * 1;
        }
        static easeInQuadraticBezier(t) {
            return Tween.quadraticBezier(t, 0);
        }
        static easeOutQuadraticBezier(t) {
            return Tween.quadraticBezier(t, 1);
        }
        static linearBezier(t) {
            return Tween.quadraticBezier(t, 0.5);
        }
        // not used
        static smoothStep2(t) {
            return Tween.quadraticBezier(t, t);
        }
        static smoothStartN(t, n) {
            return Math.pow(t, n);
        }
        static smoothStopN(t, n) {
            return 1 - Math.pow(1 - t, n);
        }
        static smoothStepN(t, n) {
            return (1 - t) * Tween.smoothStartN(t, n) + t * Tween.smoothStopN(t, n);
        }
    }
    exports.default = Tween;
});
//# sourceMappingURL=Tween.js.map