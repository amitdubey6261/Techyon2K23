import * as cannon from "cannon-es"

import Experience from "../Experience";
import CannonDebugger from "cannon-es-debugger";

export default class CANNON{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setCannonWorld();
        this.timeStep  = 1/60 ;
    }
    setCannonWorld(){
        this.world = new cannon.World({
            gravity : new cannon.Vec3(0 , -9.81 , 0),
        })
        this.setCannonDebg();
    }
    setCannonDebg(){
        this.CannonDebugger = new CannonDebugger(this.scene , this.world , {
            color : 0xff0000 ,
            scale : 1.0 ,
        });
    }
    update(){
        this.world.step(this.timeStep);
        this.CannonDebugger.update();
    }
    resize(){

    }
}