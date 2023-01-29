import * as THREE from "three"
import * as CANNON from "cannon-es";

import Experience from "../Experience.js";

import Player from "./GameDev/Player.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene ; 
        this.resources = this.experience.resources;
        this.room = this.resources.items.room ; // this. room is glb file
        this.actualRoom = this.room.scene ; 
        this.world = this.experience.world.cannonWorld.world ;
        this.createGround();
        this.player = new Player();
    }

    createGround(){
        this.ground = new CANNON.Body({
            shape : new CANNON.Plane ,
            mass : 0 ,
            position : new CANNON.Vec3( 0 , 0 , 0 ),
            id : 3 ,
        })
        this.ground.quaternion.setFromEuler(-Math.PI/2 , 0 , 0 );
        this.world.addBody(this.ground);
    }

    resize(){}

    update(){
        this.player.update();
        this.player.resize();
    }

}