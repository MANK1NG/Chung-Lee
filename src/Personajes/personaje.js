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
    constructor(scene,x, y, weaponType, keys, spriteSheetKey, orientacion) {
        super(scene,x, y, spriteSheetKey);//???

        this.flipX = orientacion;
        this.spriteSheetKey = spriteSheetKey;
        this.speedX = 500;//Velocidad
        this.speedY = 800;
        this.attack = false;//Ataque activo
        this.isAttacking = false;//Ataque activo
        this.potenciatedAttackStop = false;
        this.potAnims = false;
        this.canAttack = true;
        this.attackMovement = false;
        
        this.scene.add.existing(this);//Escena necesaria?
		this.scene.physics.add.existing(this);

        this.setScale(0.4);

        this.w = this.scene.input.keyboard.addKey(keys.keyUp);
        this.s = this.scene.input.keyboard.addKey(keys.keyDown);
        this.a = this.scene.input.keyboard.addKey(keys.keyLeft);
        this.d = this.scene.input.keyboard.addKey(keys.keyRight);
        this.v = this.scene.input.keyboard.addKey(keys.keyAttack);


        this.body.setCollideWorldBounds(true);
        
        this.body.setSize(130, 250)
        this.body.setOffset(200, 200);
        this.body.setGravity(0, 1000);

        this.weapon = this.createWeapon(scene,weaponType);
        this.createAnimations();

        this.chargeTimeThreshold = 350;
        this.chargeStartTime = 0;
        this.isCharging = false;
        this.setupAttackEvents();
        
    }
    getWeapon(){
        return this.weapon;
    }

    setupAttackEvents() {
        this.v.on('down', () => {
            if (!this.isCharging && !this.attack && this.canAttack) { // Añadir comprobación de canAttack
                this.chargeStartTime = Date.now();
                this.isCharging = true;
        
                // Iniciar temporizador para ataque potenciado
                this.potenciadoTimeout = this.scene.time.delayedCall(this.chargeTimeThreshold, () => {
                    if (this.isCharging) {
                        this.weapon.potenciatedAttack(this);
                        this.attack = true;
                        this.isAttacking = true;
                        this.potenciatedAttackStop = true;
                        this.potAnims = true;
                        this.isCharging = false; // Detenemos la carga para evitar múltiples llamadas
                    }
                });
            }
        });
    
        this.v.on('up', () => {
            if (this.isCharging && !this.attack) {
                // Si no se alcanzó el tiempo del potenciado, ejecuta el ataque básico
                this.weapon.attack(this);
                this.body.setAllowGravity(false);
                if(this.body.blocked.down){
                    this.anims.play('ataque');
                } else {
                    this.anims.play('ataqueAire');
                }
                this.attackMovement = true;
                this.attack = true;
                this.isAttacking = true;
        
                // Desactivar la capacidad de ataque temporalmente
                this.canAttack = false;
                this.scene.time.delayedCall(1000, () => { // Esperar 1 segundo
                    this.canAttack = true; // Volver a permitir el ataque
                });
            }
        
            // Reiniciar carga y cancelar temporizador si existe
            this.isCharging = false;
            if (this.potenciadoTimeout) {
                this.potenciadoTimeout.remove(false); // Cancela el temporizador
            }
            if (this.potenciatedAttackStop && Phaser.Input.Keyboard.JustUp(this.v)) {
                this.isAttacking = false;
                this.potAnims = false;
                this.weapon.body.enable = false;
                this.potenciatedAttackStop = false;
            }
        
            // Desactivar el estado de ataque después de un breve retardo para permitir movimiento
            this.scene.time.delayedCall(100, () => {
                this.attack = false;
            });
        });

        this.on('animationcomplete', (anim, frame) => {
            if (anim.key === 'ataque' || anim.key === 'ataqueAire') {
                this.weapon.body.enable = false;
                this.isAttacking = false; // Permitir movimiento al completar el ataque
                this.attackMovement = false;
                this.body.setVelocityX(0);
            }
        });
    }

    createAnimations() {
        const animationConfig = this.weapon.getAnimationConfig(this);
    
        // Asignar animaciones al personaje según el tipo de arma
        for (const [key, config] of Object.entries(animationConfig)) {
            this.anims.create({
                key: key,  // Nombre de la animación (e.g., 'idle', 'caminar', 'ataque')
                frames: config.frames,  // Frames desde la configuración
                frameRate: config.frameRate,  // Velocidad de la animación
                repeat: config.repeat  // Repetición de la animación
            });
        }
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
        if(this.attackMovement){
            this.body.setVelocityY(0);
            if(this.flipX){
                this.body.setVelocityX(this.speedX);
            }
            else{
                this.body.setVelocityX(-this.speedX);
            }
        }
        if(this.potAnims){
            if(this.a.isDown  && !this.flipX){
                this.body.setVelocityX(-this.speedX);
                this.anims.play('ataquePotenciadoRun', true);
            }
            //derecha
            if(this.d.isDown && this.flipX){
                this.body.setVelocityX(this.speedX);
                this.anims.play('ataquePotenciadoRun', true);
            }
            
            if(Phaser.Input.Keyboard.JustUp(this.a) || Phaser.Input.Keyboard.JustUp(this.d) || this.body.velocity.x === 0){
                this.body.setVelocityX(0);
                this.anims.play('ataquePotenciado', true);
            }
        }
        if(!this.isAttacking){
            if(this.body.velocity.x === 0 && this.body.blocked.down){
                this.anims.play('idle', true);
            }
            if(this.body.velocity.y < 0 && !this.body.blocked.down){
                this.anims.play('salto', true);
            }
            if(this.body.velocity.y > 0 && !this.body.blocked.down){
                this.anims.play('caida', true);
            }
            this.body.setAllowGravity(true);
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
        else if(this.attack && !this.potAnims){
            this.body.setVelocityX(0);
        }

        this.weapon.x = this.x + (this.flipX ? 30 : -30); // Ajusta la posición según la dirección
        this.weapon.y = this.y - 20;
    }
   
}
