import * as Phaser from "Phaser";
import Play from "./Play";
import Boot from "./Boot";
import MyGame from "./MyGame";

function main()
{
    console.log(`Phaser Version: ${Phaser.VERSION}`);

    const config: Phaser.Types.Core.GameConfig = {
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
        scene: [Boot, Play]  
    }
    
    const myGame = new MyGame(config);
}

// Run debug build (AMD module system, RequireJS)
main();

// Run release build (bundle.min.js, Browserify, UglifyJS)
// window.onload = () => main();