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
define(["require", "exports", "Phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this, "Boot") || this;
        }
        Boot.prototype.preload = function () {
            console.log("Boot.preload()");
            this.load.setBaseURL("");
            this.load.image("playership1", "assets/playerShip1_blue.png");
            this.load.image("playership2", "assets/playerShip2_green.png");
            this.load.image("playership3", "assets/playerShip3_orange.png");
            this.load.image("enemy", "assets/enemyBlack1.png");
        };
        Boot.prototype.create = function () {
            console.log("Boot.create()");
            this.scene.start("Play");
        };
        return Boot;
    }(Phaser.Scene));
    exports.default = Boot;
});
//# sourceMappingURL=Boot.js.map