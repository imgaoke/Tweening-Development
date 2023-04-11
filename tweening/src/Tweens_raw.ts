import * as Phaser from "Phaser";
import Tween from "./Tween";

export default class Tweens {

    private game : Phaser.Game;
    private tweens : Array<Tween> = Array<Tween>();

    public constructor(game: Phaser.Game)
    {
        this.game = game;
    }

    public update(time: number, delta: number) {     
        let i: number = 0;
        while (i < this.tweens.length) {
            let element : Tween = this.tweens[i];
            element.update(time, delta);
            if (element.isDone()) {
                this.tweens.splice(i, 1);
                if (element.on_end) {
                    element.on_end(element);
                }
            } else {
                i += 1;
            }
        }        
    }
    
    public tween(target, property: string, targetValue: number, isEase:boolean, isSpline: boolean, timeSecs: number, func : (t: number) => number, on_end : (t: Tween) => void, uSpeed, first, second, third, ...restArgs) : Tween {
        let result : Tween = new Tween(target, property, targetValue, isEase, isSpline, timeSecs, func, on_end, uSpeed, first, second, third);
        this.tweens.push(result);
        return result;
    }

    /*
    public endFunction (tween: Tween) : void{
        //this.tweens.push(tween);
        this.tween(tween.target, tween.property, tween.targetValue, tween.timeSecs, tween.func, tween.on_end);
    }
    */

}