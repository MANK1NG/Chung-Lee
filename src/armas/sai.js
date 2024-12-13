export default class Sai extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y){
        super(scene, x, y,'sai');// Llama al constructor de Phaser.Physics.Arcade.Sprite
        this.tamSprite = 140; //ancho sprite
        this.setScale(0.3);//escala del sprite 
        this.attackType = null;
        this.attackDuration = 100;
        this.ataque = scene.sound.add('AtaqueSai', {volume: 0.35});
        this.dash = scene.sound.add('DashSai', {volume: 0.35});
    }


    attack(personaje){
        this.attackType = 'normalSai';
        this.scene.physics.add.existing(this);// le mete fisicas al sprite
        this.body.setAllowGravity(false); // quitamos gravedad

        //sonido
        this.ataque.play(); // Reproduce el sonido del ataque
    
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
        //sonido
        this.dash.play();
        this.dash.once('complete', () => {
            this.dash.play();  // Iniciar la música de fondo
        }); 
        
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
}