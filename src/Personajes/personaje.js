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
        this.tieneTanegashima = false;
        this.kusaCharge = false,
        this.kusaAtaq = false;
        this.kusaRelease = false;
        this.saiDash = false;
        this.progress = 0;

        this.taneCharge = false;
        this.taneCancel = false;
        this.superShot = false;
        this.shooting = false;
        this.shot = Image;
        this.shotDir = false; //False - Izquierda, True - Derecha (En consonancia con flip)
        this.shotSpeed = 25;

        this.mitad = 0;//para que se haga el potenciado del sai de un lado para otro
        this.weaponTypeString = weaponType + '_';
        this.scene.add.existing(this);//Escena necesaria?
		this.scene.physics.add.existing(this);//hace el body
        this.carta; //arma dada por las cartas
        this.obtencionDePosY = 0;
        this.obtencionDePosX = 0;
        this.sonidosExtraKatana = scene.sound.add('DeflectKatana', { volume: 0.3 });
        this.setScale(0.4);
        this.scene = scene;
        this.cont = 0;//para colisones del sai

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
        }
        else if(this.armasBooleanos == Personaje.WeaponType.KUSA){
            this.tieneKusa = true;
        }
        else if(this.armasBooleanos == Personaje.WeaponType.TANEGASHIMA){
            this.tieneTanegashima = true;
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
        if(this.scene.attack){
        this.v.on('down', () => {
            if (!this.isCharging && !this.attack && this.canAttack && !this.KnockBack) { // Añadir comprobación de canAttack
                this.chargeStartTime = Date.now();
                this.isCharging = true;

        
                // Iniciar temporizador para ataque potenciado
                this.potenciadoTimeout = this.scene.time.delayedCall(this.chargeTimeThreshold, () => {
                    if (this.isCharging) {
                        //Ataque potenciado si he mantenido suficiente
                        if(this.tieneSai){
                            this.saiDash = true;
                            this.mitad = 0;
                        }
                        
                        if(this.tieneTanegashima){
                            this.taneCancel = true;
                        }
                        if(this.tieneKusa ){
                            this.kusaCharge = true;
                            this.blockAttacksTemporarilyKusa();
                        }
                        if (!this.tieneTanegashima || this.body.velocity.y === 0)
                        {
                            if(this.tieneTanegashima){
                                this.taneCharge = true;
                            }
                            
                            this.weapon.potenciatedAttack(this);
                            this.attack = true;
                            this.isAttacking = true;
                            this.potenciatedAttackStop = true;
                            
                            if(!this.saiDash && !this.tieneKusa && !this.tieneTanegashima){this.potAnims = true;}
                        
                            this.isCharging = false; // Detenemos la carga para evitar múltiples llamadas
                        }
                        if(!this.tieneKusa)
                        this.blockAttacksTemporarily();
                    }
                });
            }
        });
    
        this.v.on('up', () => {
            if (this.tieneTanegashima)
            {
                if (this.taneCharge || this.taneCancel){
                    this.taneCancel = false;
                    this.taneCharge = false;
                    this.isCharging = false;
                }
                if (this.canAttack)
                {
                    this.body.setVelocityY(0);
                }
            }
            if (this.isCharging && !this.attack && !this.knockBack && this.canAttack) {
                //recoil
                
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
                        // Ajustar el tamaño del cuerpo si es necesario
                        if(this.flipX){
                            this.x =this.x +105;
                            this.body.setOffset(200, 555);
                        }
                        else{
                            this.x =this.x -105;
                            this.body.setOffset(720, 555);
                        }
                        this.kusaAtaq = true;
                        
                    }
                    
                } else {
                    this.play(this.spriteSheetKey + this.weaponTypeString + 'ataqueAire');
                }
                if((!this.body.blocked.down || this.tieneSai) && !this.tieneTanegashima){
                    this.attackMovement = true;
                }
                
                
                
                this.attack = true;
                this.isAttacking = true;
            
                // Desactivar la capacidad de ataque temporalmente
               this.blockAttacksTemporarily();
            }
            
            // Reiniciar carga y cancelar temporizador si existe
            this.isCharging = false;
            if (this.potenciadoTimeout) {
                this.potenciadoTimeout.remove(false); // Cancela el temporizador
            }
            if (this.potenciatedAttackStop && Phaser.Input.Keyboard.JustUp(this.v)) {
                //Para el ataque potenciado al levantar la tecla v y permite moverse con normalidad de nuevo
                if(this.weapon == this.weaponKatana){
                    this.weaponKatana.potenciadoKatana.stop();
                }
                if(!this.saiDash && !this.tieneKusa){
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
            }
            if (anim.key === this.spriteSheetKey + this.weaponTypeString + 'knockBack') {
                this.knockBack = false;
                this.canAttack = true;
                if(this.isAttacking){
                    this.weapon.body.enable = false;
                }
                this.potenciatedAttackStop= false;
                this.progress = 0;
                this.kusaRelease = false;
                this.kusaCharge = false;
                this.saiDash = false;
                this.isAttacking = false;
                this.attackMovement = false;
                this.knockBackSpeedY = 100;
                this.deflect = false;
            }
            if(anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoHit') {
                this.deflect = false;
                if(this.weapon == this.weaponKatana){
                    this.blockAttacksTemporarilyDeflect();
                }
                if(this.tieneKusa){
                    this.progress = 0;
                    this.kusaRelease=false;
                    this.isAttacking = false;
                    this.weapon.body.enable = false;
                    this.potenciatedAttackStop = false;
                    this.scene.collisionActiva = false;
                    this.scene.collisionActiva2 = false;
                
                    this.x = this.obtencionDePosX;
                    this.body.setOffset(200, 200);
                }
                
            }
            if (this.tieneKusa &&anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataque') {
                this.scene.time.delayedCall(5, () => {
                    this.y = this.obtencionDePosY;
                    this.x = this.obtencionDePosX;
                    this.body.setOffset(200, 200);
                });
            }  
            
            if(this.tieneKusa && anim.key === this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciado' && !this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoHit'){
                this.kusaCharge = false
                this.kusaRelease = true;
                this.weapon.lanza.play();
                 this.obtencionDePosX = this.x;
                    this.obtencionDePosY = this.y;

                    if(this.flipX){
                        this.x =this.x +105;
                      }
                      else{
                        
                        this.x =this.x -105;
                        this.body.setOffset(720, 200);
                      }

                this.scene.collisionActiva = false;
                this.scene.collisionActiva2 = false;
                if(this.tieneKusa){
                this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoHit', true);

                    }
            }     
            
        });
    }
    }

    blockAttacksTemporarily() {
        this.canAttack = false;
        this.scene.time.delayedCall(1000, () => { 
            this.canAttack = true;
        });
    }

    blockAttacksTemporarilyDeflect() {
        this.canAttack = false;
        this.scene.time.delayedCall(475, () => { 
            this.canAttack = true;
        });
    }

    blockAttacksTemporarilyKusa() {
        this.canAttack = false;
        this.scene.time.delayedCall(1500, () => { 
            this.canAttack = true;
        });
    }

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
        this.potenciatedAttackStop = false;
        this.potAnims = false;
        this.knockBack = true;
    }

    //Activa el deflect
    ActivePotenciadoHitAnim(){
        if(this.weapon.attackType === 'potenciadoKat'){
            this.deflect = true;
            this.canAttack = false;
            this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciadoHit', true);
            this.sonidosExtraKatana.play();
        }
    }

    preUpdate(tiempo, tiempoFrames) {
        super.preUpdate(tiempo, tiempoFrames);
        if(this.scene.personajesMove || this.scene.logrosMovePersonaje){

        //POTENCIADO SAI
        if(this.saiDash && !this.knockBack){
            this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciado', true);
            this.once(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame, gameObject)=> {
                const totalFrames = anim.getTotalFrames();
                const currentFrames = frame.index;
                if(currentFrames >= totalFrames - 1){
                    this.cont = 0;
                    this.saiDash = false;
                    this.weapon.body.enable = false;
                    this.isAttacking = false; // Permitir movimiento al completar el ataque
                    this.potenciatedAttackStop = false;
                    this.setVelocityX(0);
                }
                if(!this.saiDash)
                    return;
                if(currentFrames >= totalFrames / 2 && this.mitad == 0){
                    this.scene.collisionActiva = true;
                    this.scene.collisionActiva2 = false;
                    this.flipX ? this.flipX = false : this.flipX = true;
                    this.mitad = 1;
                    if(this.cont == 0){
    
                        this.scene.collisionActiva = false;
                        this.scene.collisionActiva2 = false;
                        this.cont = 1;
                    }
                }
                if(this.flipX){
                    this.body.setVelocityX(this.speedX * 2);
                    this.weapon.setOffset(10, 50);
                }
                else{
                    this.body.setVelocityX(this.speedX * -2);
                    this.weapon.setOffset(-this.weapon.tamSprite, 50);
                }
            });
            
        }
        if(this.kusaAtaq){
            this.once(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame, gameObject)=> {
                const totalFrames = anim.getTotalFrames();
                const currentFrames = frame.index;

            if(currentFrames >= totalFrames*3/5){
                this.kusaAtaq = false;
                this.weapon.setSize(240, 65); // Ajustar el tamaño del cuerpo si es necesario
               if(this.flipX){
                    this.weapon.setOffset(-148, -50); // Ajustar posición del cuerpo en el sprite
                }
                else{
                    this.weapon.setOffset(-58, -50);
                }
            }else{
               
                this.weapon.setSize(65, 240);
                if(this.flipX){
                this.weapon.setOffset(58, -20);
                }else{   
                this.weapon.setOffset(-88, -20);
                }
            }

            });

        }
        if(this.kusaCharge || this.taneCharge){
            this.play(this.spriteSheetKey + this.weaponTypeString + 'ataquePotenciado', true);
            this.kusaCharge = false;
        }
        if (this.kusaRelease) {
            this.once(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame, gameObject)=> {
                const currentFrames = frame.index;

                if (currentFrames >= 5 && currentFrames <=11) {
                    if(this.flipX){
                    this.progress +=  1.8;
                    this.weapon.setOffset(this.progress, -30);
                    }
                    else{
                    this.progress -=  4;
                    this.weapon.setOffset(this.progress, -30);
                    
                }
                }else  if(currentFrames>=18 && currentFrames <=23){
                    if(this.flipX){
                     this.progress -= 1.8;
                    this.weapon.setOffset(this.progress,-30) ;
                    }else{
                        this.progress +=  4;
                        this.weapon.setOffset(this.progress, -30);
                    }
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
        else if(this.attack && !this.potAnims && !this.saiDash && !this.knockBack){
            this.body.setVelocityX(0);
        }

        if (this.shooting)
        {
            this.shot.x += this.shotDir ? this.shotSpeed : -this.shotSpeed; //Movimiento bala
        }
        
        //Movimiento del body del ataque pegado al personaje
        this.weapon.x = this.x + (this.flipX ? 30 : -30); // Ajusta la posición según la dirección
        this.weapon.y = this.y - 20;

        if(Phaser.Input.Keyboard.JustDown(this.pickWeapon) && window.game.canPick && !this.isAttacking && !this.attack && !this.knockBack && !this.deflect){//para cambiar de arma
            this.scene.cambioArmaLogros(this.spriteSheetKey);
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
            if(this.armasBooleanos == Personaje.WeaponType.TANEGASHIMA){
                this.tieneTanegashima = true;
            }
            else{
                this.tieneTanegashima = false;
            }
            if(this.spriteSheetKey == 'personaje1'){
                this.scene.cartas.anims.play('negro',true);
                this.scene.cartas.whoosh.play();
                this.setTexture(this.carta + 'N');
            }
            else{
                this.scene.cartas.anims.play('rojo',true);
                this.scene.cartas.whoosh.play();
                this.setTexture(this.carta + 'R');
            }
        }
    }
    else{
        this.body.setAllowGravity(false);
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
