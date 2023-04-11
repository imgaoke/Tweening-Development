define(["require", "exports", "Phaser", "./Tween", "./Tweens"], function (require, exports, Phaser, Tween_1, Tweens_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Play extends Phaser.Scene {
        constructor() {
            super("Play");
            this.count = 0;
        }
        create() {
            console.log("Play.create()");
            this.tw = new Tweens_1.default(this.game);
            //  Enable world bounds, but disable the floor
            this.physics.world.setBoundsCollision(true, true, true, false);
            //  Create the bricks in a 10x6 grid
            this.bricks = this.physics.add.staticGroup({
                key: 'assets', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
                frameQuantity: 10,
                gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
            });
            this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
            this.ball.setData('onPaddle', true);
            this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();
            //  Our colliders
            //@ts-ignore
            this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
            this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
            //  Input events
            this.input.on('pointermove', function (pointer) {
                //  Keep the paddle within the game
                this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
                if (this.ball.getData('onPaddle')) {
                    this.ball.x = this.paddle.x;
                }
            }, this);
            this.input.on('pointerup', function (pointer) {
                if (this.ball.getData('onPaddle')) {
                    this.ball.setVelocity(-75, -300);
                    this.ball.setData('onPaddle', false);
                }
            }, this);
        }
        cameraShakeEndFunction(tween) {
            this.tw.tween(tween.target, tween.property, tween.targetValue - 2, tween.isEase, tween.isSmoothSpline, 0.1, tween.func, null, null, null, null, null);
        }
        genericCallback(func) {
            let THIS = this;
            function callback(tween) {
                func.call(THIS, tween);
            }
            return callback;
        }
        hitBrick(ball, brick) {
            //falling bricks
            this.tw.tween(brick, "x", brick.x + 30, false, false, 1, null, null, null, null, null, null);
            this.tw.tween(brick, "y", brick.y + 60, false, false, 1, null, null, null, null, null, null);
            this.tw.tween(brick, "alpha", 0, true, false, 1, Tween_1.default.linearBezier, null, null, null, null, null);
            brick.disableBody(true, false);
            //camera shake
            this.bricks.getChildren().forEach(function (sprite) {
                let spriteWithSpriteType = sprite;
                this.tw.tween(spriteWithSpriteType, "x", spriteWithSpriteType.x + 2, true, false, 0.1, Tween_1.default.linearBezier, this.genericCallback(this.cameraShakeEndFunction), null, null, null, null);
                this.tw.tween(spriteWithSpriteType, "y", spriteWithSpriteType.y + 2, true, false, 0.1, Tween_1.default.linearBezier, this.genericCallback(this.cameraShakeEndFunction), null, null, null, null);
            }, this);
            if (this.bricks.countActive() === 0) {
                this.resetLevel();
            }
        }
        resetBall() {
            this.ball.setVelocity(0);
            this.ball.setPosition(this.paddle.x, 500);
            this.ball.setData('onPaddle', true);
        }
        resetLevel() {
            this.resetBall();
            //@ts-ignore
            this.bricks.children.each(function (brick) {
                brick.enableBody(false, 0, 0, true, true);
            });
        }
        hitPaddle(ball, paddle) {
            var diff = 0;
            if (ball.x < paddle.x) {
                //  Ball is on the left-hand side of the paddle
                diff = paddle.x - ball.x;
                ball.setVelocityX(-10 * diff);
            }
            else if (ball.x > paddle.x) {
                //  Ball is on the right-hand side of the paddle
                diff = ball.x - paddle.x;
                ball.setVelocityX(10 * diff);
            }
            else {
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                ball.setVelocityX(2 + Math.random() * 8);
            }
        }
        update(time, delta) {
            if (this.ball.y > 600) {
                this.resetBall();
            }
            this.tw.update(time, delta);
        }
    }
    exports.default = Play;
});
//# sourceMappingURL=Play.js.map