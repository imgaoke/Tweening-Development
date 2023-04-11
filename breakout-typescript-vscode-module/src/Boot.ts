import * as Phaser from "Phaser";

export default class Boot extends Phaser.Scene {

    constructor(){
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