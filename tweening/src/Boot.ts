import * as Phaser from "Phaser";

export default class Boot extends Phaser.Scene {
    constructor(){
        super("Boot");
    }

    preload() {
        console.log("Boot.preload()");
        this.load.setBaseURL("");
        this.load.image("playership1", "assets/playerShip1_blue.png");
        this.load.image("playership2", "assets/playerShip2_green.png");
        this.load.image("playership3", "assets/playerShip3_orange.png");
        this.load.image("enemy", "assets/enemyBlack1.png");
    }

    create() {
      console.log("Boot.create()");
      this.scene.start("Play");
    }

}