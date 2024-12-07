import Katana from "../armas/katana.js"
import Kusa from "../armas/kusa.js";
import Sai from "../armas/sai.js"
import Tanegashima from "../armas/tanegashima.js"

export default class Personaje extends Phaser.Physics.Arcade.Sprite {
    //Enumerator para cambiar de arma
    static WeaponType = {
        KATANA: 'katana',
        SAI: 'sai',
        KUSA: 'kusa',
        TANEGASHIMA: 'tanegashima',
    };
    constructor(scene,x, y, weaponType, keys, spriteSheetKey, orientacion) {
        super(scene,x, y, spriteSheetKey);//???
        this.cogible = true;
        this.armasBooleanos = weaponType;//para decir el arma que tienes (se llama asi pq a sergio le sale de las bolas)
        this.vidas = 8;//vidas personaje
        this.flipX = orientacion;//orientacion en la que empieza el personaje
        this.spriteSheetKey = spriteSheetKey;//seria por ejemplo 'personaje', sirve para instanciar distintos personajes
        this.speedX = 500;//Velocidad horizontal
        this.speedY = 800;//Velocidad vertical
        this.attack = false;//Ataque normal activo
        this.isAttacking = false;//Ataque potenciado activo
        this.potenciatedAttackStop = false;//Parar ataque potenciado, de momento asi para katana
        this.potAnims = false;//Animaciones ataque potenciado katana ya que se puede mantener el ataque
        this.canAttack = true;//Para limitar ataque sin cooldown
        this.attackMovement = false;//Movimiento hacia alante al atacar, en katana solo para aire, en sai en ambos
        this.knockBack = false;//Booleano para hacer knockBack y no poder moverse o atacar mientras.
        this.knockBackSpeedY = 100;//Velocidad vertical del knockback
        this.knockBackSpeedX;//velocidad horizontal knockback
        this.deflect = false;//Para activar animacion ataque potenciado katana
        this.tieneSai = false;//poner en true para que vaya ataque sai
        this.tieneKusa = false;
        this.saiDash = false;
        this.mitad = 0;//para que se haga el potenciado del sai de un lado para otro
        this.weaponTypeString = weaponType + '_';
        this.scene.add.existing(this);//Escena necesaria?
		this.scene.physics.add.existing(this);//hace el body
        this.carta; //arma dada por las cartas
        this.obtencionDePosY = 0;
        this.obtencionDePosX = 0;

        this.setScale(0.4);

        //Teclas de juego
        this.w = this.scene.input.keyboard.addKey(keys.keyUp);
        this.s = this.scene.input.keyboard.addKey(keys.keyDown);
        this.a = this.scene.input.keyboard.addKey(keys.keyLeft);
        this.d = this.scene.input.keyboard.addKey(keys.keyRight);
        this.v = this.scene.input.keyboard.addKey(keys.keyAttack);
        this.pickWeapon = this.scene.input.keyboard.addKey(keys.keyWeapon);

        this.body.setCollideWorldBounds(true);
        
        this.body.setSize(130, 250)
        this.body.setOffset(200, 200);
        this.body.setGravity(0, 1000);
        this.weaponKatana = new Katana(scene, this.x, this.y);
        this.weaponKusarigama = new Kusa(scene, this.x, this.y);
        this.weaponSai = new Sai(scene, this.x, this.y);
        this.weaponTanegashima = new Tanegashima(scene, this.x, this.y);
        //Arma en uso del personaje
        this.weapon = this.createWeapon(scene,weaponType);
        //Animaciones
        //this.createAnimations();

        //Tiempo que hay que pulsar la tecla de ataque para el ataque potenciado en milisegundos
        this.chargeTimeThreshold = 200;
        this.chargeStartTime = 0;
        this.isCharging = false;
        this.setupAttackEvents();
        if(this.armasBooleanos == Personaje.WeaponType.SAI){
            this.tieneSai = true;
            this.speedX *= 1.3;
        } if(this.armasBooleanos == Personaje.WeaponType.KUSA){
            this.tieneKusa = true;
        }
        
    }

    hitPersonaje(){
        this.vidas = this.vidas-1;
        
    }
    getVidas(){
        return this.vidas;
    }
    getWeapon(){
        return this.weapon;
    }

    setupAttackEvents() {
        this.v.on('down', () => {
            if (!this.isCharging && !this.attack && this.canAttack && !this.KnockBack) { // Añadir comprobación de canAttack
                this.chargeStartTime = Date.now();
                this.isCharging = true;

        
                // Iniciar temporizador para ataque potenciado
                this.potenciadoTimeout = this.scene.time.delayedCall(this.chargeTimeThreshold, () => {
                    if (this.isCharging) {
                        //Ataque potenciado si he mantenido suficiente
                        this.weapon.potenciatedAttack(this);
                        if(this.tieneSai){
                            this.saiDash = true;
                            this.mitad = 0;
                            console.log("tiene dash");
                        }
                        ///////cargado chill
                       /* if (this.tieneKusa) {
                            console.log("holaaaaaaaaaaa");
                            this.body.setSize(100000, 460); 
                            this.body.setOffset(175, 175); 
                        }*/
                        this.attack = true;
                        this.isAttacking = true;
                        this.potenciatedAttackStop = true;
                        if(!this.saiDash){this.potAnims = true;}
                        
                        this.isCharging = false; // Detenemos la carga para evitar múltiples llamadas
                    }
                });
            }
        });
    
        this.v.on('up', () => {
            if (this.isCharging && !this.attack && !this.knockBack) {
                // Si no se alcanzó el tiempo del potenciado, ejecuta el ataque básico
                this.weapon.attack(this);
                //Quito gravedad para quedarme estatico en el aire al atacar con el ataque normal
                this.body.setAllowGravity(false);
                //Animaciones ataque normal
                if(this.body.blocked.down){
                    this.play(this.spriteSheetKey + this.weaponTypeString + 'ataque');

                    if (this.tieneKusa) {// Cambio de posicion en el sprite del ataque de la kusa
                        
                        
                        this.obtencionDePosY = this.y;
                        this.y =this.y -52;
                        this.obtencionDePosX = this.x;
    
                        if(this.flipX){
                            this.x =this.x +105;
                            this.body.setOffset(200, 555);
    
                        }else{                    
                        this.x =this.x -105;
                        this.body.setOffset(720, 555);

                        }
                    }
                } else {
                    this.play(this.spriteSheetKey + this.weaponTypeString + 'ataqueAire');
                }
                if(!this.body.blocked.down || this.tieneSai){
                    this.attackMovement = true;
                }
               
                
                
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
                //Para el ataque potenciado al levantar la tecla v y permite moverse con normalidad de nuevo
                if(!this.saiDash){
                this.isAttacking = false;
                this.potAnims = false;
                this.weapon.body.enable = false;
                this.potenciatedAttackStop = false;
                }
            }
        
            // Desactivar el estado de ataque después de un breve retardo para permitir movimiento
            this.scene.time.delayedCall(100, () => {
                this.attack = false;
            });
        });

        //Para no permitir cancelaciones de animacion
        this.on('animationcomplete', (anim, frame) => {
            if (anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataque' || anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataqueAire') {
                this.weapon.body.enable = false;
                this.isAttacking = false; // Permitir movimiento al completar el ataque
                this.attackMovement = false;
                this.body.setVelocityX(0);
                console.log("fin daño");
            }
            if (anim.key === this.spriteSheetKey + this.weaponTypeString + 'knockBack') {
                this.knockBack = false;
                if(this.isAttacking){
                    this.weapon.body.enable = false;
                }
                this.isAttacking = false;
                this.attackMovement = false;
                this.knockBackSpeedY = 100;
                this.deflect = false;
                console.log("fin knock");
            }
            if(anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoHit') {
                this.deflect = false;
                console.log("fin deflect");
            }
            if (this.tieneKusa &&anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataque') {
                console.log('La animación de ataque con Kusa ha terminado');
                
                this.y = this.obtencionDePosY;
                this.x = this.obtencionDePosX;
                this.body.setOffset(200, 200);
            }        
        });
    }

    // createAnimations() {
    //     const animationConfig = this.weapon.getAnimationConfig(this);
    
    //     // Asignar animaciones al personaje según el tipo de arma
    //     for (const [key, config] of Object.entries(animationConfig)) {
    //         this.anims.create({
    //             key: key,  // Nombre de la animación (e.g., 'idle', 'caminar', 'ataque')
    //             frames: config.frames,  // Frames desde la configuración
    //             frameRate: config.frameRate,  // Velocidad de la animación
    //             repeat: config.repeat  // Repetición de la animación
    //         });
    //     }
    // }

    //Metodo que cambia el arma segun el caso
    createWeapon(scene, weaponType) {
       
        switch (weaponType) {
            case Personaje.WeaponType.KATANA:
                return this.weaponKatana;

            case Personaje.WeaponType.SAI:
                {
                    return this.weaponSai;
                }

            case Personaje.WeaponType.KUSA:
                {
                    return this.weaponKusarigama;
                }
                
            case Personaje.WeaponType.TANEGASHIMA:
                {
                    return this.weaponTanegashima;
                }
            default:
                throw new Error('Tipo de arma no soportado: ' + weaponType);
        }
    }

    //Activa el knockback
    hit(speed){
        this.knockBackSpeedX = speed;
        this.knockBack = true;
    }

    //Activa el deflect
    ActivePotenciadoHitAnim(){
        if(this.weapon.attackType === 'potenciadoKat'){
            this.deflect = true;
            this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoHit', true);
        }

        if(this.weapon.attackType === 'potenciadoSai'){
            
        }

        if(this.weapon.attackType === 'potenciadoKusa'){

        }

        if(this.weapon.attackType === 'potenciadoTane'){

        }
    }

    preUpdate(tiempo, tiempoFrames) {
        super.preUpdate(tiempo, tiempoFrames);

        if(this.saiDash){
            this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciado', true);
            this.once(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame, gameObject)=> {
                const totalFrames = anim.getTotalFrames();
                const currentFrames = frame.index;
                if(currentFrames >= totalFrames - 1){
                    this.saiDash = false;
                    this.weapon.body.enable = false;
                    this.isAttacking = false; // Permitir movimiento al completar el ataque
                    this.potenciatedAttackStop = false;
                    this.setVelocityX(0);
                }
                if(!this.saiDash)
                    return;
                if(currentFrames >= totalFrames / 2 && this.mitad == 0){
                    this.flipX ? this.flipX = false : this.flipX = true;
                    this.mitad = 1;
                }
                if(this.flipX){
                    this.body.setVelocityX(this.speedX * 2);
                }
                else{
                    this.body.setVelocityX(this.speedX * -2);
                }
            });
            
        }
        //Ejecuta el knockback
        if(this.knockBack){
            this.play(this.spriteSheetKey + this.weaponTypeString + 'knockBack', true);
            this.body.setVelocityX(this.knockBackSpeedX);
            this.body.setVelocityY(-this.knockBackSpeedY);
            this.knockBackSpeedY -= tiempoFrames * 0.6;
            if(this.body.blocked.down || !this.body.blocked.down && this.knockBackSpeedY < -100){
                this.setVelocityX(0);
            }
        }
        //Ejecuta el movimiento al atacar
        if(this.attackMovement && !this.knockBack && !this.saiDash){//si no hay sai se para al atacar
            this.body.setVelocityY(0);
            if(this.flipX){
                this.body.setVelocityX(this.speedX);
            }
            else{
                this.body.setVelocityX(-this.speedX);
            }
        }
        //Ejecuta la animacion de ataque potenciado si corre o si no
        if(this.potAnims && !this.deflect){
            if(this.a.isDown  && !this.flipX){
                this.body.setVelocityX(-this.speedX);
                this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoRun', true);
            }
            //derecha
            if(this.d.isDown && this.flipX){
                this.body.setVelocityX(this.speedX);
                this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoRun', true);
            }
            
            if(Phaser.Input.Keyboard.JustUp(this.a) || Phaser.Input.Keyboard.JustUp(this.d) || this.body.velocity.x === 0){
                this.body.setVelocityX(0);
                this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciado', true);
            }
        }
        //Movimiento normal
        if(!this.isAttacking && !this.knockBack && !this.deflect){
            //this.saiDash = false;
            //Idle si no me muevo
            if(this.body.velocity.x === 0 && this.body.blocked.down){
                this.play(this.spriteSheetKey + this.weaponTypeString + 'idle', true);
            }
            //Salto anim
            if(this.body.velocity.y < 0 && !this.body.blocked.down){
                this.play(this.spriteSheetKey + this.weaponTypeString + 'salto', true);
            }
            //Caida anim
            if(this.body.velocity.y > 0 && !this.body.blocked.down){
                this.play(this.spriteSheetKey + this.weaponTypeString + 'caida', true);
            }
            //Activacion de gravedad
            this.body.setAllowGravity(true);
            //izquierda
            if(this.a.isDown){
                this.setFlip(false, false);
                this.body.setVelocityX(-this.speedX);
                if(this.body.blocked.down){
                    this.play(this.spriteSheetKey + this.weaponTypeString + 'caminar', true);
                }
            }
            //derecha
            if(this.d.isDown){
                this.setFlip(true, false);
                this.body.setVelocityX(this.speedX);
                if(this.body.blocked.down) {
                    this.play(this.spriteSheetKey + this.weaponTypeString + 'caminar', true);
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
        //Parar el personaje si no hay imput y no ataco
        else if(this.attack && !this.potAnims && !this.saiDash){
            this.body.setVelocityX(0);
        }
        
        //Movimiento del body del ataque pegado al personaje
        this.weapon.x = this.x + (this.flipX ? 30 : -30); // Ajusta la posición según la dirección
        this.weapon.y = this.y - 20;

        if(Phaser.Input.Keyboard.JustDown(this.pickWeapon) && window.game.canPick ){//para cambiar de arma
            window.game.canPick = false;
            this.weaponTypeString = this.carta + '_';
            this.weapon = this.createWeapon(this.scene, this.carta);
            this.armasBooleanos = this.carta;
            if(this.armasBooleanos == Personaje.WeaponType.SAI && !this.tieneSai){
                this.tieneSai = true;
                this.speedX *= 1.3;
            }
            else if(this.armasBooleanos != Personaje.WeaponType.SAI && this.tieneSai){
                this.tieneSai = false;
                this.speedX /= 1.3;
            }
            if(this.armasBooleanos == Personaje.WeaponType.KUSA){
                this.tieneKusa = true;
            }
            else{
                this.tieneKusa = false;
            }
            if(this.spriteSheetKey == 'personaje1'){
                this.scene.cartas.anims.play('negro',true);
                this.setTexture(this.carta + 'N');
            }
            else{
                this.scene.cartas.anims.play('rojo',true);
                this.setTexture(this.carta + 'R');
            }
        }
    }
    
    cambiarArma(armaChange){
        if(armaChange == 'cartaKatana'){
            this.carta = Personaje.WeaponType.KATANA;
        }
        if(armaChange == 'cartaSai'){
            this.carta = Personaje.WeaponType.SAI;
        }
        if(armaChange == 'cartaTanegashima'){
            this.carta = Personaje.WeaponType.TANEGASHIMA;
        }
        if(armaChange == 'cartaKusarigama'){
            this.carta = Personaje.WeaponType.KUSA;
        }
    }
    
}
