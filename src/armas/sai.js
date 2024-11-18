export default class Sai extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y){
        super(scene, x, y,'sai');// Llama al constructor de Phaser.Physics.Arcade.Sprite
        // this.daño = daño;
        // this.rango = rango;
        
        this.setScale(0.3);//escala del sprite 
        //this.setOrigin() su posicion
        
        this.attackDuration = 100;
    }
    attack(personaje){
        this.scene.physics.add.existing(this);// le mete fisicas al sprite
        this.body.setAllowGravity(false); // quitamos gravedad

        //colisiones
        this.body.setSize(170,230);
        if(personaje.flipX){ //si el sprite mira a la izq
            this.body.setOffset(10,150);//ajuste hitbox(x,y) si es (+) mueve a la drch y viceversa (en y arriba(-) y abajo(+))
        }
        else{//si mira a la drch
            this.body.setOffset(-140, 150);
        }
        this.body.enable = true; //activa cuerpo fisico del obj para que detecte colisiones
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

           ataque: {
            key: 'ataque',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 32, end: 42}),
            frameRate: 20,
            repeat: 0,
            },
           
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