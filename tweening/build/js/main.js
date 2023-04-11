define(["require", "exports", "Phaser", "./Play", "./Boot", "./MyGame"], function (require, exports, Phaser, Play_1, Boot_1, MyGame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        console.log("Phaser Version: ".concat(Phaser.VERSION));
        var config = {
            title: "Tweening example",
            type: Phaser.AUTO,
            width: 640,
            height: 480,
            backgroundColor: 0x000000,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: [Boot_1.default, Play_1.default]
        };
        var myGame = new MyGame_1.default(config);
    }
    // Run debug build (AMD module system, RequireJS)
    main();
});
// Run release build (bundle.min.js, Browserify, UglifyJS)
// window.onload = () => main();
//# sourceMappingURL=main.js.map