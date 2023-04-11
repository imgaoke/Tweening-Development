var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "Phaser", "./Tweens"], function (require, exports, Phaser, Tweens_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function doObjectCallback(THIS, func) {
        function callback(tween) {
            func.call(THIS, tween);
        }
        return callback;
    }
    //this.tw.tween(this.sprite3, "x", 300, 3, Tween.linearBezier1, this.genericCallback(this, this.endFunction));
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super.call(this, "Play") || this;
            _this.listOfX = [200, 350, 480];
            _this.listOfY = [100, 50, 300];
            _this.uSpeed = 50;
            return _this;
        }
        Play.prototype.create = function () {
            console.log("Play.create()");
            this.tw = new Tweens_1.default(this.game);
            this.sprite1 = this.add.sprite(160, 120, "playership1").setOrigin(0.5, 0.5).setAlpha(1);
            this.sprite2 = this.add.sprite(480, 120, "playership2").setOrigin(0.5, 0.5).setAlpha(1);
            //this.sprite3 = this.add.sprite(160, 360, "playership3").setOrigin(0.5, 0.5).setAlpha(1);
            this.sprite3 = this.add.sprite(200, 100, "playership3").setOrigin(0.5, 0.5).setAlpha(1);
            this.sprite4 = this.add.sprite(480, 360, "enemy").setOrigin(0.5, 0.5).setAlpha(1);
            // Enables movement of player with WASD keys
            this.input.keyboard.on('keydown-ONE', function (event) {
                this.scene.button1();
            });
            this.input.keyboard.on('keydown-TWO', function (event) {
                this.scene.button2();
            });
            this.input.keyboard.on('keydown-THREE', function (event) {
                this.scene.button3();
            });
            this.input.keyboard.on('keydown-FOUR', function (event) {
                this.scene.button4();
            });
            this.input.keyboard.on('keydown-R', function (event) {
                this.scene.restart();
            });
            this.count = 1;
        };
        Play.prototype.update = function (time, delta) {
            //console.log(time);
            //console.log(delta); 
            this.tw.update(time, delta);
        };
        Play.prototype.button1 = function () {
            // TODO: some showcase on this.sprite2 using SmoothStepN on Alpha
            console.log("here1");
            this.sprite1.alpha = 0;
            //this.tw.tween(this.sprite1, "alpha", 1, 3, Tween.linear, null);
        };
        Play.prototype.button2 = function () {
            // TODO: some showcase on this.sprite2 using funky bezier on Alpha, Rotation and Position
            console.log("here2");
            //Alpha
            this.sprite2.alpha = 0;
            //this.tw.tween(this.sprite2, "alpha", 1, 3, Tween.linearBezier1, null);
            //Rotation
            this.sprite2.angle = -90;
            //this.tw.tween(this.sprite2, "angle", 90, 5, Tween.easeInQuadraticBezier, null);
            //Position
            this.sprite2.x = 480;
            //this.tw.tween(this.sprite2, "x", 600, 10, Tween.easeOutQuadraticBezier, null);
            this.sprite2.y = 120;
            //this.tw.tween(this.sprite2, "y", 200, 10, Tween.easeOutQuadraticBezier, null);
        };
        Play.prototype.endFunction = function (tween) {
            console.log(this.sprite3);
            this.tw.tween(tween.target, tween.property, Math.random() * 480, tween.isEase, tween.isSmoothSpline, 3, tween.func, tween.on_end, null, null, null, null); //be aware that tween.timeSecs change to 0 after the first tween
            //this.tw.tween(this.sprite3, "y", 10, 3, Tween.linearBezier1, null);
        };
        Play.prototype.endFunctionCallback = function () {
            var THIS = this;
            function callback(tween) {
                THIS.endFunction(tween);
            }
            return callback;
        };
        Play.prototype.genericCallback = function (func) {
            var THIS = this;
            function callback(tween) {
                func.call(THIS, tween);
            }
            return callback;
        };
        Play.prototype.button3 = function () {
            // TODO: some showcase on this.sprite3 using spline on beziers utilizing on_end
            console.log("here3");
            // (160, 360) at the beginning
            // let target be (300, 500) and control point be (200, 400)
            // 1st curve
            this.tw.tween(this.sprite3, "x", 640, false, false, 3, null, this.genericCallback(this.endFunction), null, null, null, null);
            this.tw.tween(this.sprite3, "y", 0, false, false, 3, null, this.genericCallback(this.endFunction), null, null, null, null);
            /*
            if (this.count == 1){
                console.log("here3.1");
                // 1st curve
                this.tw.tween(this.sprite3, "x", 300, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
                //this.tw.tween(this.sprite3, "y", 400, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
                this.count += 1;
            }
            else{
                console.log("here3.2");
                // 2nd curve
                this.tw.tween(this.sprite3, "x", 400, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
                //this.tw.tween(this.sprite3, "y", 500, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
            }
            */
            // 3nd curve
            //this.tw.tween(this.sprite3, "x", 200, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
            //this.tw.tween(this.sprite3, "y", 400, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
            // 4th curve
            //this.tw.tween(this.sprite3, "x", 160, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
            //this.tw.tween(this.sprite3, "y", 360, 3, Tween.linearBezier1, this.genericCallback(this.endFunction));
            //let firstCurveX : Tween = new Tween(this.sprite3, "x", 300, 3, Tween.linearBezier1, this.endFunction);
            //let firstCurveY : Tween = new Tween(this.sprite3, "y", 400, 3, Tween.linearBezier1, this.endFunction);
        };
        Play.prototype.endFunctionForSmoothSpline = function (tween, list) {
            //console.log(this.sprite3);
            if (tween.property == "x") {
                if (this.firstX == undefined) {
                    this.firstX = list.shift();
                    this.secondX = list.shift();
                    this.thirdX = list.shift();
                }
                else {
                    this.firstX = this.secondX;
                    this.secondX = this.thirdX;
                    this.thirdX = list.shift();
                }
                if (this.firstX != undefined && this.secondX != undefined) {
                    this.tw.tween(tween.target, tween.property, this.secondX, tween.isEase, true, 3, tween.func, tween.on_end, this.uSpeed, this.firstX, this.secondX, this.thirdX);
                }
                this.uSpeed = (this.thirdX - this.firstX) / 2;
            }
            else {
                if (this.firstY == undefined) {
                    this.firstY = list.shift();
                    this.secondY = list.shift();
                    this.thirdY = list.shift();
                }
                else {
                    this.firstY = this.secondY;
                    this.secondY = this.thirdY;
                    this.thirdY = list.shift();
                }
                if (this.firstY != undefined && this.secondY != undefined) {
                    this.tw.tween(tween.target, tween.property, this.secondY, tween.isEase, true, 3, tween.func, tween.on_end, this.uSpeed, this.firstY, this.secondY, this.thirdY);
                }
                this.uSpeed = (this.thirdY - this.firstY) / 2;
            }
            //this.tw.tween(this.sprite3, "y", 10, 3, Tween.linearBezier1, null);
        };
        Play.prototype.genericCallbackWithVarargs = function (func) {
            var list = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                list[_i - 1] = arguments[_i];
            }
            var THIS = this;
            function callback(tween) {
                func.call(THIS, tween, list);
            }
            return callback;
        };
        Play.prototype.button4 = function () {
            // TODO: some showcase some smooth spline movement, change position of this.sprite3
            //       the spline must be built using single line of code, either using varargs
            //       or the Builder pattern
            console.log("here4");
            // 1st curve
            this.tw.tween(this.sprite3, "x", 200, false, false, 0, null, this.genericCallbackWithVarargs(this.endFunctionForSmoothSpline, 200, 300, 400, 100, 0, 600), null, null, null, null);
            this.tw.tween(this.sprite3, "y", 100, false, false, 0, null, this.genericCallbackWithVarargs(this.endFunctionForSmoothSpline, 100, 200, 100, 200, 0, 400), null, null, null, null);
        };
        Play.prototype.restart = function () {
            this.scene.restart();
        };
        return Play;
    }(Phaser.Scene));
    exports.default = Play;
});
/*
Play.prototype.endFunction = function(tween: Tween){
    this.tw.tween(tween.target, tween.property, tween.targetValue, tween.timeSecs, tween.func, tween.on_end);
}
*/ 
//# sourceMappingURL=Play_raw.js.map