export default class Sai extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y){
        super(scene, x, y,'sai');// Llama al constructor de Phaser.Physics.Arcade.Sprite
        // this.daño = daño;
        // this.rango = rango;
        this.tamSprite = 140; //ancho sprite
        this.setScale(0.3);//escala del sprite 
        //this.setOrigin() su posicion
        this.attackType = null;
        this.attackDuration = 100;
    }

    attack(personaje){
        this.attackType = 'normalSai';
        this.scene.physics.add.existing(this);// le mete fisicas al sprite
        this.body.setAllowGravity(false); // quitamos gravedad

        //colisiones
        this.body.setSize(170,230);
        if(personaje.flipX){ //si el sprite mira a la drch
            this.body.setOffset(10,150);//ajuste hitbox(x,y) si es (+) mueve a la drch y viceversa (en y arriba(-) y abajo(+))
        }
        else{//si mira a la izq
            this.body.setOffset(-this.tamSprite, 150);
        }
        this.body.enable = true; //activa cuerpo fisico del obj para que detecte colisiones
 
        if (personaje.anims.currentAnim && !personaje.body.blocked.down) { // si esta en el aire hace la hitbox arriba
            this.body.setSize(170,490);
            if(personaje.flipX){//drch
                this.body.setOffset(0, -110);
            } 
            else{//mira izq
                this.body.setOffset(-this.tamSprite, -110);
            }          
        }
    }

    potenciatedAttack(personaje){
        this.attackType = 'potenciadoSai';
        this.scene.physics.add.existing(this);// le mete fisicas al sprite
        this.body.setAllowGravity(false); // quitamos gravedad
        this.body.setSize(170,325);
        if(personaje.flipX){//drch
            this.body.setOffset(10, 50)  
        } 
        else{//mira izq
            this.body.setOffset(-this.tamSprite, 50);
        }    
    }

    getAnimationConfig(personaje){
        return {
           idle: { 
            key: 'idle',//nombre de animacion
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 0, end: 11} ),//coge el dibujo entero de esa anim, this es la scene
            frameRate: 20,//tasa frames
            repeat: -1,//ciclo cíclico
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
            repeat: 0, //ciclo sencillo
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

           ataqueAire: {
            key: "ataqueAire",
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 80, end: 89} ),
            frameRate: 20,
            repeat: 0,
           },

           knockBack: {
            key: 'knockBack',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 96 ,end: 110} ),
            frameRate: 20,
            repeat: 0,
           },

           ataquePotenciado: {
            key: 'ataquePotenciado',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 112,end: 121} ),
            frameRate: 20,
            repeat: 0,
           },

           ataquePotenciadoRun: {
            key: 'ataquePotenciadoRun',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 112,end: 121} ),
            frameRate: 20,
            repeat: 0,
           },

           ataquePotenciadoHit: {
            key: 'ataquePotenciadoHit',
            frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 128,end: 140} ),
            frameRate: 20,
            repeat: 0,
           }

        }
    }


}