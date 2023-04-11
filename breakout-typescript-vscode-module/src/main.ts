import * as Phaser from "Phaser";
import Play from "./Play";
import Boot from "./Boot";
import MyGame from "./MyGame";

function main()
{
    console.log(`Phaser Version: ${Phaser.VERSION}`);

    const config: Phaser.Types.Core.GameConfig = {
        title: "Breakout example taken from Phaser 3 with TypeScript, RequireJS library and AMD module system",
        type: Phaser.AUTO,
        width: 800,
        height: 600,
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