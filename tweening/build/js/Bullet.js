var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "Phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet(scene) {
            var _this = _super.call(this, scene, 0, 0, "bullet") || this;
            _this.speed = Phaser.Math.GetSpeed(500, 1);
            return _this;
        }
        Bullet.prototype.fire = function (x, y) {
            Phaser.Physics.Arcade.Sprite.call(this, this.scene, 0, 0, 'bullet');
            this.scene.physics.add.existing(this);
            this.setPosition(x, y - 45);
            this.setActive(true);
            this.setVisible(true);
        };
        Bullet.prototype.update = function (time, delta) {
            this.y -= this.speed * delta;
            if (this.y < -50) {
                this.setActive(false);
                this.setVisible(false);
            }
        };
        return Bullet;
    }(Phaser.Physics.Arcade.Sprite));
    exports.default = Bullet;
});
//# sourceMappingURL=Bullet.js.map