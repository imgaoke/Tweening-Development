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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(scene) {
            var _this = _super.call(this, scene, 0, 0, "enemy") || this;
            _this.speed = Phaser.Math.GetSpeed(50, 1);
            return _this;
        }
        Enemy.prototype.launch = function (x, y) {
            Phaser.Physics.Arcade.Sprite.call(this, this.scene, 0, 0, 'enemy');
            this.setScale(0.3, 0.3);
            this.scene.physics.add.existing(this);
            this.body.setSize(this.body.width * 0.3, this.body.height * 0.3);
            this.setPosition(x, y);
            this.setActive(true);
            this.setVisible(true);
            return this;
        };
        Enemy.prototype.update = function (time, delta) {
            this.y += this.speed * delta;
            if (this.y > Number(this.scene.game.config.height) + 50) {
                this.setActive(false);
                this.setVisible(false);
            }
        };
        return Enemy;
    }(Phaser.Physics.Arcade.Sprite));
    exports.default = Enemy;
});
//# sourceMappingURL=Enemy.js.map