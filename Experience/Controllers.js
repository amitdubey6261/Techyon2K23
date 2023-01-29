import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

import Experience from "./Experience";

export default class Controllers{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas= this.experience.canvas;
        this.renderer=this.experience.renderer;
        this.camera = this.experience.camera ;

        this.createOrbitControllers();
        this.update();
    }

    createOrbitControllers(){
        this.orbitControl = new OrbitControls( this.camera.perspectiveCam , this.canvas );
        this.orbitControl.enableDamping = true ; 
        this.orbitControl.enableZoom = true ; 
    }

    update(){
        this.orbitControl.update();
    }
}