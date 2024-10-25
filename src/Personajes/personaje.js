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
    constructor(scene,x, y, weaponType) {
        super(scene,x, y, 'personaje');//???

        this.speedX = 500;//Velocidad
        this.speedY = 800;
        this.attack = false;//Ataque activo
        
        this.scene.add.existing(this);//Escena necesaria?
		this.scene.physics.add.existing(this);

        this.setScale(0.2);

        this.w = this.scene.input.keyboard.addKey('W');
        this.s = this.scene.input.keyboard.addKey('S');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        this.v = this.scene.input.keyboard.addKey('V');


        this.body.setCollideWorldBounds(true);

        this.bodyOffset = this.body.width/6.5;
        this.bodyWidth = this.body.width/1.5;

        this.body.setOffset(this.bodyOffset, 0);
        this.body.width = this.bodyWidth;

        this.body.setGravity(0, 1000);

        this.weapon = this.createWeapon(scene,weaponType);

        this.weapon.body.setAllowGravity(false);
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
        if(this.a.isDown){
            this.setFlip(false, false);
            this.body.setVelocityX(-this.speedX);
        }
        //derecha
        if(this.d.isDown){
            this.setFlip(true, false);
            this.body.setVelocityX(this.speedX);
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

        this.weapon.x = this.x + (this.flipX ? 30 : -30); // Ajusta la posición según la dirección
        this.weapon.y = this.y - 20;
        this.weapon.setFlip(!this.flipX, false); // Voltear según la dirección del personaje

        //Ataque potenciado
        if(Phaser.Input.Keyboard.DownDuration(this.v, 500)){
            this.attack = true;
            this.weapon.potenciatedAttack(this);
        }
        //Ataque normal
        else if (this.v.isDown && !Phaser.Input.Keyboard.DownDuration(this.v, 500)) {
            this.attack = true;
            this.weapon.attack(this); // Llama al ataque del arma actual
        }
        
    }
}