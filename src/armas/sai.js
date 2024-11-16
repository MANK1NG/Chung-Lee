export default class Sai extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y){
        super(scene, x, y,'sai');// Llama al constructor de Phaser.Physics.Arcade.Sprite
        // this.daño = daño;
        // this.rango = rango;
        //this.scene.physics.add.existing(this);// le mete fisicas al sprite

        this.setScale(0.3);//escala del sprite 
        //this.setOrigin() su posicion

        this.attackDuration = 100;
    }
    attack(personaje){
        
    }

    potenciatedAttack(personaje){

    }

    getAnimationConfig(personaje){
        return {
           idle: {
            key: 'idle',//nombre de animacion
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 0, end: 11} ),//coge el dibujo entero de esa anim
            frameRate: 20,//tasa frames
            repeat: -1,//la hace en bucle
           },
           
           caminar: {
            key: 'caminar',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 16, end: 31} ),
            frameRate: 20,
            repeat: -1, //para que la haga infinita
           },

        //    ataque: {
        //     key: 'ataque',
        //     frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 32, end: 42}),
        //     frameRate: 20,
        //     repeat: 0,
        //    },
           
           salto: {
            key: 'salto',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 48, end: 55} ),
            frameRate: 12,
            repeat: -1,
           },

           caida: {
            key: 'caido',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 64, end: 73} ),
            frameRate: 20,
            repeat: -1,
           },

        }
    }


}