define(["require", "exports", "Phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Boot extends Phaser.Scene {
        constructor() {
            super("Boot");
        }
        preload() {
            console.log("Boot.preload()");
            this.load.atlas('assets', 'assets/breakout.png', 'assets/breakout.json');
        }
        create() {
            console.log("Boot.create()");
            this.scene.start("Play");
        }
    }
    exports.default = Boot;
});
//# sourceMappingURL=Boot.js.map