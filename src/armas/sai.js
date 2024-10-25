export default class Sai extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y){
        super(scene, x, y,'sai');// Llama al constructor de Phaser.Physics.Arcade.Sprite
        // this.daño = daño;
        // this.rango = rango;
        this.scene.add.existing(this);//mete el saprite en la escena
        this.scene.physics.add.existing(this);// le mete fisicas al sprite

        this.setScale(0.3);//escala del sprite 
        //this.setOrigin() su posicion

        this.attackDuration = 100;
    }
    attack(personaje){
        
    }

    potenciatedAttack(personaje){

    }
}