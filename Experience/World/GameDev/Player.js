import * as THREE from "three"
import * as CANNON from "cannon-es"

import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

import Experience from "../../Experience";
export default class{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes ;
        this.scene = this.experience.scene; 
        this.world = this.experience.world.cannonWorld.world ;
        this.CANNON = this.experience.world.cannonWorld;
        this.wordArray = [
            "a", 
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "skala",
            "quala",
            "zinchenko",
            "alxander",
            "arnold",
            "Harry",
            "Cane",
            "poster",
            "in",
            "collaboration",
            "pure",
            "it",
        ]
        this.gamePlay = false ; 
        document.addEventListener('click' , ()=>{
            if(!this.gamePlay){
                this.play();
                this.gamePlay = true ; 
            }
        })
        this.resources = this.experience.resources;
        this.astronaut = this.resources.items.astronaut;
        this.actualAstronaut = this.astronaut.scene ;
        this.actualAstronaut.scale.set(0.1,0.1,0.1);
        this.animations = this.astronaut.animations;
        this.mixer = new THREE.AnimationMixer(this.actualAstronaut);
        this.Runclip = THREE.AnimationClip.findByName(this.animations , 'Run');
        this.JumpClip= THREE.AnimationClip.findByName(this.animations , 'jump');
        this.action1 = this.mixer.clipAction(this.Runclip);
        this.action2 = this.mixer.clipAction(this.JumpClip);

        this.createObjCSS();
    }

    createObjCSS(){

        this.wrapper = document.createElement('div');

        this.wrapper.innerHTML = "<div> hi </div>";
        this.div = this.wrapper.firstChild;

        this.div.style.width = '370px';
        this.div.style.height = '370px';
        this.div.style.opacity = 0.7;
        this.div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();
        this.object = new CSS3DObject(this.div);
        this.object.position.set( 0 , 0 , 0 );
        this.scene.add(this.object)
    }

    play(){
        this.strItr = 0 ;
        this.createBox();
        this.count_16 = 0 ;
        this.strBox = document.getElementById("instructions");
        this._userString = "";
        this.takeUserInput();
    }

    createBox(){
        this.box = new CANNON.Body({
            shape:new CANNON.Box(new CANNON.Vec3( 0.2,0.3,0.2 )),
            mass : 1 ,
            position : new CANNON.Vec3( 0 , 0 , 0 ) , 
            id : 1
        })
        this.action1.play();
        this.box.quaternion.setFromEuler( 0 , -Math.PI/2 , 0);
        this.world.addBody(this.box);
        this.scene.add(this.actualAstronaut);
        this.box.addEventListener('collide' , (e)=>{
            if(e.body.id != 0 ){
                document.querySelector(".setStr").innerHTML = "----------------GAME - OVER -------------- PLEASE REFRESH PAGE";
            }
        })
    }

    setJump(){
            this.action2.stop();
            this.action2.play();
            this.box.velocity.y += 0.5 ; 
            this.box.position.set( 0 , 0 , 0 );
            setTimeout(()=>{
                this.action2.stop();
                this.action1.play();
            } , 1000)
    }

    resize(){
    }

    update(){
        if( this.experience.time.delta == 17 )this.count_16++ ; 
        if( this.count_16 == 100 ){this.createObstacles();this.count_16 = 0 ; }
        if(this.Obstacle){
            this.Obstacle.position.x += 0.1 ; 
            if(this.Obstacle.position.x > 3 ){
                this.world.removeBody(this.Obstacle)
                this._userString = "";
            }
        }
        if(this.actualAstronaut && this.box ){
            this.actualAstronaut.position.copy( this.box.position )
            this.actualAstronaut.quaternion.copy(this.box.quaternion)
        }
        this.actualAstronaut.position.y = this.actualAstronaut.position.y - 0.3 ;
        if(this.mixer){
            this.mixer.update(0.03);
        }
    }

    createObstacles(){
        document.querySelector(".setStr").innerHTML = this.wordArray[this.strItr];
        console.log(this.setString)
        this.strItr++;
        if(this.strItr == this.wordArray.length ){
            this.strItr = 0 ;
        }
        this.Obstacle = new CANNON.Body({
            shape : new CANNON.Box( new CANNON.Vec3( 0.1 , 0.1 , 0.1 )),
            mass : 1 ,
            position : new CANNON.Vec3( -10 , 0 , 0 ),
            id : 2 ,
        })
        this.world.addBody(this.Obstacle);
    }

    takeUserInput(){
        document.addEventListener('keyup' , (e)=>{
            if(e.keyCode == 32){
                this.matchStrings( this.wordArray[this.strItr-1] , this._userString );
            }
            else{
                this._userString += e.key ;
                e.preventDefault();
            }
        })
    }

    matchStrings( x , y ){
        if( x === y ){
            console.log("jump")
            this.setJump();
        }
    }
}