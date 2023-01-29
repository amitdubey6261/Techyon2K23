import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import Experience from '../Experience'
import Room from './Room';
import CANNON from './Cannon';

import Enviroment from './Enviroment';

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas= this.experience.canvas;
        this.camera= this.experience.camera;
        this.resources = this.experience.resources ;
        this.resources.on("ready" , ()=>{
            this.enviroment = new Enviroment();
            this.createCannonWorld();
            this.createRoom();
        })
        this.renderer = new CSS3DRenderer();
        this.renderer.setSize( window.innerWidth , window.innerHeight );
        this.div = document.ge
    }

    createRoom(){
        this.room = new Room();
    }

    createCannonWorld(){
        this.cannonWorld = new CANNON(); 
    }

    resize(){}

    update(){
        if(this.room){
            this.room.update();
            this.cannonWorld.update();
        }
    }
}