import Katana from "../armas/katana.js"
import Sai from "../armas/sai.js"

export default class Personaje extends Phaser.Physics.Arcade.Sprite {
    //Enumerator para cambiar de arma
    static WeaponType = {
        KATANA: 'katana',
        SAI: 'sai',
        KUSARIGAMA: 'kusarigama',
        TANEGASHIMA: 'tanegashima',
    };
    constructor(scene,x, y, weaponType, keys) {
        super(scene,x, y, 'personaje');//???

        this.speedX = 500;//Velocidad
        this.speedY = 500;
        this.attack = false;//Ataque activo
        
        this.scene.add.existing(this);//Escena necesaria?
		this.scene.physics.add.existing(this);

        this.setScale(0.4);

        this.w = this.scene.input.keyboard.addKey(keys.keyUp);
        this.s = this.scene.input.keyboard.addKey(keys.keyDown);
        this.a = this.scene.input.keyboard.addKey(keys.keyLeft);
        this.d = this.scene.input.keyboard.addKey(keys.keyRight);
        this.v = this.scene.input.keyboard.addKey(keys.keyAttack);


        this.body.setCollideWorldBounds(true);

        this.bodyOffset = this.body.width/6.5;
        this.bodyWidth = this.body.width/1.5;

        this.body.setOffset(this.bodyOffset, 0);
        this.body.width = this.bodyWidth;

        this.body.setGravity(0, 1000);

        this.weapon = this.createWeapon(scene,weaponType);
        this.createAnimations();
    }

    createAnimations(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 11 }), // Index de frames para la animación
            frameRate: 20, // Velocidad de la animación
            repeat: -1 // Repetir indefinidamente
        });
        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('personaje', { start: 16, end: 31 }), // Index de frames para la animación
            frameRate: 20, // Velocidad de la animación
            repeat: -1 // Repetir indefinidamente
        });
        this.anims.create({
            key: 'ataque',
            frames: this.anims.generateFrameNumbers('personaje', { start: 32, end: 40 }), // Index de frames para la animación
            frameRate: 20, // Velocidad de la animación
            repeat: 0 // Repetir indefinidamente
        });
        this.anims.create({
            key: 'salto',
            frames: this.anims.generateFrameNumbers('personaje', { start: 48, end: 55 }), // Index de frames para la animación
            frameRate: 20, // Velocidad de la animación
            repeat: -1 // Repetir indefinidamente
        });
        this.anims.create({
            key: 'caida',
            frames: this.anims.generateFrameNumbers('personaje', { start: 64, end: 73 }), // Index de frames para la animación
            frameRate: 20, // Velocidad de la animación
            repeat: -1 // Repetir indefinidamente
        });
        this.anims.create({
            key: 'ataqueAire',
            frames: this.anims.generateFrameNumbers('personaje', { start: 80, end: 88 }), // Index de frames para la animación
            frameRate: 20, // Velocidad de la animación
            repeat: 0 // Repetir indefinidamente
        });
    }

    //Metodo que cambia el arma segun el caso
    createWeapon(scene, weaponType) {
        switch (weaponType) {
            case Personaje.WeaponType.KATANA:
                return new Katana(scene, this.x, this.y);

            case Personaje.WeaponType.SAI:
                return new Sai(scene, this.x, this.y);

            case Personaje.WeaponType.KUSARIGAMA:
                break;
                
            case Personaje.WeaponType.TANEGASHIMA:
                break;
            default:
                throw new Error('Tipo de arma no soportado: ' + weaponType);
        }
    }

    preUpdate(tiempo, tiempoFrames) {
        super.preUpdate(tiempo, tiempoFrames);//???
        //izquierda
        if(this.body.velocity.x === 0 && this.body.blocked.down && !this.attack){
            this.anims.play('idle', true);
        }
        if(this.body.velocity.y < 0 && !this.body.blocked.down && !this.attack){
            this.anims.play('salto', true);
        }
        if(this.body.velocity.y > 0 && !this.body.blocked.down && !this.attack){
            this.anims.play('caida', true);
        }
        if(!this.attack){
            if(this.a.isDown){
                this.setFlip(false, false);
                this.body.setVelocityX(-this.speedX);
                if(this.body.blocked.down){
                    this.anims.play('caminar', true);
                }
            }
            //derecha
            if(this.d.isDown){
                this.setFlip(true, false);
                this.body.setVelocityX(this.speedX);
                if(this.body.blocked.down) {
                    this.anims.play('caminar', true);
                }
            }
            //quieto si no hay input
            if(Phaser.Input.Keyboard.JustUp(this.a) || Phaser.Input.Keyboard.JustUp(this.d)){
                this.body.setVelocityX(0);
            }
            //bajar rapido si esta en el aire
            if(Phaser.Input.Keyboard.JustDown(this.s) && !this.body.blocked.down){
                this.body.setVelocityY(this.speedY * 2);
                this.body.setVelocityX(0);
                
            }
            //Salto
            if(Phaser.Input.Keyboard.JustDown(this.w) && this.body.blocked.down){
                this.body.setVelocity(-this.speedY);
                if(!this.a.isDown && !this.d.isDown){
                    this.body.setVelocityX(0);
                }
            }
        }
        else{
            this.body.setVelocityX(0);
        }

        this.weapon.x = this.x + (this.flipX ? 30 : -30); // Ajusta la posición según la dirección
        this.weapon.y = this.y - 20;

        //Ataque potenciado
        if(Phaser.Input.Keyboard.DownDuration(this.v, 150000)){
            this.attack = true;
            this.weapon.potenciatedAttack(this);
        }
        //Ataque normal
        if (Phaser.Input.Keyboard.JustDown(this.v)) {
            this.attack = true;
            if(this.body.blocked.down){
                this.anims.play('ataque', true);
            }
            else{
                this.anims.play('ataqueAire', true);
            }
            this.weapon.attack(this); // Llama al ataque del arma actual
        }

        this.on('animationcomplete', (anim, frame) => {
            if (anim.key === 'ataque' || anim.key === 'ataqueAire') {
                this.attack = false; // Permitir otras animaciones al completar el ataque
            }
        });
    }
}