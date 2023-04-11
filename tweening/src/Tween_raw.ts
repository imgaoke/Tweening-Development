import * as Phaser from "Phaser";

export default class Tween {

    public target;
    public property: string;
    public timeSecs: number;
    public targetValue: number;
    public isEase: boolean;
    public isSpline: boolean;
    public func: (t: number) => number;
    public on_end: (t: Tween, ...list) => void;
    public initialValue;
    public totalTime;
    public controlValue;
    public restArgs;
    public uSpeed;
    public first;
    public second;
    public third;
    


    public constructor(target, property: string, targetValue: number, isEase: boolean,isSpline: boolean, timeSecs: number, func: (t: number) => number, on_end: (t: Tween) => void = null, uSpeed, first, second, third, ...restArgs)
    {
        this.target = target;
        this.property = property;
        this.targetValue = targetValue;
        this.isEase = isEase; //ease or bezier with control
        this.timeSecs = timeSecs;
        this.func = func;
        this.on_end = on_end;
        this.initialValue = this.target[this.property];
        this.totalTime = this.timeSecs;
        //this.controlValue = this.initialValue + Math.random() * (this.targetValue - this.initialValue);
        let positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
        this.controlValue = this.initialValue + positiveOrNegative * Math.random() * (this.targetValue - this.initialValue);
        this.uSpeed = uSpeed;
        this.first = first;
        this.second = second;
        this.third = third;
        this.restArgs = restArgs;
    }

    /*
    public lerp(a, b, t){
        return (1 - t) * a + t * b;
    }
    */
    
    public quadraticBezierSpline(t: number) : number {
        let midValue;
        /*
        if (isControled == true){
            midValue = this.controlValue;
        }
        else{
            midValue = (this.initialValue + this.targetValue) / 2;
        }
        */
        midValue = this.controlValue;
        let d = (1 - t) * this.initialValue + t * midValue;
        let e = (1 - t) * midValue + t * this.targetValue;
        let f = (1 - t) * d + t * e;
        return f;
    }

    public cubicSmoothBezierSpline(t: number) : number {
        let vSpeed;
        if (this.third == undefined){
            vSpeed = 50;
        }
        else{
            vSpeed = (this.third - this.first) / 2;
        }
        let b = this.initialValue + this.uSpeed / 3;
        let c = this.targetValue - vSpeed / 3;

        let e = (1 - t) * this.initialValue + t * b;
        let f = (1 - t) * b + t * c;
        let g = (1 - t) * c + t * this.targetValue;

        let q = (1 - t) * e + t * f;
        let r = (1 - t) * f + t * g;

        let p = (1 - t) * q + t * r;

        return p;
    }
    

    public update(time: number, deltaMillis: number) {     
        // TODO: apply the tween correctly
        //console.log(time);        
        if (this.timeSecs > 0){
            this.timeSecs -= deltaMillis / 1000;
            if (this.timeSecs > 0){
                var t = 1 - this.timeSecs / this.totalTime;
                
                
                if(this.isEase){
                    var easeT = this.func(t);
                    this.target[this.property] = this.initialValue + (this.targetValue - this.initialValue) * easeT;
                }
                else{
                    if (this.isSpline){
                        this.target[this.property] = this.cubicSmoothBezierSpline(t);
                    }
                    else{
                        this.target[this.property] = this.quadraticBezierSpline(t);
                    }
                    
                }
                
            }
            

            //console.log("t: " + t);
            //console.log("realT: " + realT);
            //console.log("initialValue: " + this.initialValue);
            //console.log("targetValue:" + this.targetValue);
            //console.log(this.initialValue + (this.targetValue - this.initialValue) * realT);
            //console.log(this.target[this.property]);
        }        
    }
    
    public isDone() : boolean {
        // TODO: after you adapt update(), check if this method still correctly
        //       reports your tween has finished
        return this.timeSecs <= 0;
    }

    // -------------------------------------
    // FOLLOWS THE STASH OF EASING FUNCTIONS
    // -------------------------------------

    public static linear(t: number) : number {
        return t;
    }

    // TODO: add more easing functions here

    public static quadratic(t: number) : number {
        return t * t;
    }

    public static quadraticBezier(t: number, mid: number) : number {
        return (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * mid + t * t * 1;
    }

    public static easeInQuadraticBezier(t: number) : number {
        return Tween.quadraticBezier(t, 0);
    }

    public static easeOutQuadraticBezier(t: number) : number {
        return Tween.quadraticBezier(t, 1);
    }

    public static linearBezier1(t: number) : number {
        return Tween.quadraticBezier(t, 0.5);
    }

    public static smoothStep2(t: number) : number {
        return Tween.quadraticBezier(t, t);
    }

    
    

}