import Personaje from "../Personajes/personaje.js";
import Cartas from "../Cartas/cartas.js";

export default class Templo extends Phaser.Scene{

    constructor(){
        super({key: 'templo'});
        this.collisionActiva = false;
        this.cont = 0;
        this.tiempo = 10000;
        this.cartas;
    }
    
    preload(){

        this.load.image('temploFondo', './assests/templo21.png');

        //Instancia player negro
        this.load.spritesheet('personaje1', './Anim/SpriteSheet_Sai_N.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        //Instancia player rojo
        this.load.spritesheet('personaje2', './Anim/SpriteSheet_Katana_R.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
       
        this.load.spritesheet('cartas', './Anim/Cards_SpriteSheet.png', {
            frameWidth: 800, // Ancho de cada fotograma
            frameHeight: 500 // Alto de cada fotograma
        });

        
        this.load.tilemapTiledJSON('templo', './assests/templo.json');
        this.load.image('cuboNegro','./assests/cuboNegro.png');
        //carga frames
        this.load.image('vidaFrameN','./img/vidas/negro/HUD_Black_Frame.png' );
        this.load.image('vidaFrameR','./img/vidas/rojo/HUD_Red_Frame.png' );
        //carga vidas negro
        this.load.image('vidaN0', './img/vidas/negro/HUD_Black_0.png');
        this.load.image('vidaN1', './img/vidas/negro/HUD_Black_1.png');
        this.load.image('vidaN2', './img/vidas/negro/HUD_Black_2.png');
        this.load.image('vidaN3', './img/vidas/negro/HUD_Black_3.png');
        this.load.image('vidaN4', './img/vidas/negro/HUD_Black_4.png');
        this.load.image('vidaN5', './img/vidas/negro/HUD_Black_5.png');
        this.load.image('vidaN6', './img/vidas/negro/HUD_Black_6.png');
        this.load.image('vidaN7', './img/vidas/negro/HUD_Black_7.png');
        //carga vidas rojo
        this.load.image('vidaR0', './img/vidas/rojo/HUD_Red_0.png');
        this.load.image('vidaR1', './img/vidas/rojo/HUD_Red_1.png');
        this.load.image('vidaR2', './img/vidas/rojo/HUD_Red_2.png');
        this.load.image('vidaR3', './img/vidas/rojo/HUD_Red_3.png');
        this.load.image('vidaR4', './img/vidas/rojo/HUD_Red_4.png');
        this.load.image('vidaR5', './img/vidas/rojo/HUD_Red_5.png');
        this.load.image('vidaR6', './img/vidas/rojo/HUD_Red_6.png');
        this.load.image('vidaR7', './img/vidas/rojo/HUD_Red_7.png');
        //carga armas cartas
        this.load.image('logoKatana', './img/armasCartas/Katana.png');
        this.load.image('logoSai', './img/armasCartas/Sai.png');
        this.load.image('logoKusarigama', './img/armasCartas/Kusarigama.png');
        this.load.image('logoTanegashima', './img/armasCartas/Tanegashima.png');

    }

    create(){
        console.log("me he creado templo");
       this.add.image(0, 0, 'temploFondo').setOrigin(0, 0);
       //MARCO VIDAS
       this.add.image(0,0,'vidaFrameN').setPosition(220,90).setScale(0.6);
       this.add.image(0,0,'vidaFrameR').setPosition(800,90).setScale(0.6);
      //ARRAY VIDAS NEGRO
       var vidasN= [];
        let vidaN0 = this.add.image(0,0,'vidaN0').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN0);
        let vidaN1 = this.add.image(0,0,'vidaN1').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN1);
        let vidaN2 = this.add.image(0,0,'vidaN2').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN2);
        let vidaN3 = this.add.image(0,0,'vidaN3').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN3);
        let vidaN4 = this.add.image(0,0,'vidaN4').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN4);
        let vidaN5 = this.add.image(0,0,'vidaN5').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN5);
        let vidaN6 = this.add.image(0,0,'vidaN6').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN6);
        let vidaN7 = this.add.image(0,0,'vidaN7').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN7);
        let vidasNC= 7;

        var vidasR = [];
        let vidaR0 = this.add.image(0,0,'vidaR0').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR0);
        let vidaR1 = this.add.image(0,0,'vidaR1').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR1);
        let vidaR2 = this.add.image(0,0,'vidaR2').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR2);
        let vidaR3 = this.add.image(0,0,'vidaR3').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR3);
        let vidaR4 = this.add.image(0,0,'vidaR4').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR4);
        let vidaR5 = this.add.image(0,0,'vidaR5').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR5);
        let vidaR6 = this.add.image(0,0,'vidaR6').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR6);
        let vidaR7 = this.add.image(0,0,'vidaR7').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR7);
        let vidasRC = 7;

       this.map = this.make.tilemap({
           key: 'templo',
           tileWidth: 32,
           tileHeight: 32
        });
        
        const tileset1 = this.map.addTilesetImage('cuboNegro', 'cuboNegro');
        this.backgroundLayer = this.map.createLayer('Capa de patrones 1', tileset1);            
        this.backgroundLayer.setCollisionByProperty({ colision: true });
        
        //Crear personaje 1
        let personaje = new Personaje(this, 120, 400, Personaje.WeaponType.SAI, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V'}, 'personaje1', true);
        //Crear personaje 2
        let personaje2 = new Personaje(this, 900, 400, Personaje.WeaponType.KATANA, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P'}, 'personaje2',false);
        //COLISIONES SUELO
        this.physics.add.collider(personaje, this.backgroundLayer, () =>{
            personaje.body.setVelocityY(0);
        });
        this.physics.add.collider(personaje2, this.backgroundLayer, () =>{
            personaje2.body.setVelocityY(0);
        });

        //COLISIONES ATAQUE POTENCIADO KATANA
        this.physics.add.collider(personaje.getWeapon(), personaje2.getWeapon(), ()=>{
            const weapon = personaje.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje2.getWeapon().body.enable = false;
                personaje.ActivePotenciadoHitAnim();
            }
        });

        this.physics.add.collider(personaje2.getWeapon(), personaje.getWeapon(), ()=>{
            const weapon = personaje2.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje.getWeapon().body.enable = false;
                personaje2.ActivePotenciadoHitAnim();
            }
        });

        /*
        * COLISIONES ATAQUE NORMAL, estan configurados ahora mismo para la katana 
        pero se pueden normalizar para que los ataques basicos de cada arma 
        actuen con este collider ya que su funcionalidad es igual.

        * Estas colisiones servirian tambien para los potenciados de las otra armas ya que
        no colisiona un arma con otra sino tambien con el personaje.

        * Estan declarados "ifs" con el nombre del attackType que teneis que tener en vuestras
        armas para que al atacar con un ataque o con otro se asigne eso y asi haga una cosa u 
        otra dependiendo de si es ataque potenciado o ataque normal y de que arma es.

        * Tened en cuenta que para cada ataque hay que rellenar 2 "ifs", el de el personaje1 contra el 2
        y el del 2 contra el 1, en realidad van a tener lo mismo pero con variables cambiada, donde al principio
        pusisteis personaje... pondreis personaje2 y alreves.
        */
       this.physics.add.overlap(personaje.getWeapon(), personaje2, ()=>{
            const weapon = personaje.getWeapon();
            //Normal katana
            if (!this.collisionActiva  && weapon.attackType === 'normalKat') {
                this.collisionActiva = true;
                personaje2.hitPersonaje(vidasR);
                vidasR[vidasRC].setVisible(false);
                vidasRC--;
                
            }
            //LLamad a las funciones que querais que hagan al ser atacados por uno u otro ataque
            if (!this.collisionActiva && weapon.attackType === 'normalSai') {
                this.collisionActiva = true;
                personaje2.hitPersonaje(vidasR);
                vidasR[vidasRC].setVisible(false);
                vidasRC--;
            }

            if (!this.collisionActiva && weapon.attackType === 'potenciadoSai') {
                this.collisionActiva = true;
                personaje2.hitPersonaje(vidasR);
                vidasR[vidasRC].setVisible(false);
                vidasRC--;
            }

            if (!this.collisionActiva && weapon.attackType === 'normalKusa') {

            }

            if (!this.collisionActiva && weapon.attackType === 'potenciadoKusa') {

            }

            if (!this.collisionActiva && weapon.attackType === 'normalTane') {

            }

            if (!this.collisionActiva && weapon.attackType === 'potenciadoTane') {

            }

            //Lamada al knockback, en teoria se debe usar para la colision de todas las armas
            //Necesario poner this.collisionActiva en true en cada metodo que quiera usar el knockBack
            if(personaje.flipX && this.collisionActiva){
                personaje2.hit(personaje2.speedX);
            }
            else if(!personaje.flipX && this.collisionActiva) {
                personaje2.hit(-personaje2.speedX)
            }

            //Desactivar colision
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
            
            });
            //Reiniciar juego si uno muere
            if (personaje.getVidas()== 0 || personaje2.getVidas()== 0){
                this.scene.restart();
            }
            });
    
            this.physics.add.overlap(personaje2.getWeapon(), personaje, ()=>{
                const weapon = personaje2.getWeapon();
                //Ataque normal katana
                if (!this.collisionActiva && weapon.attackType === 'normalKat') {
                    this.collisionActiva = true;
                    personaje.hitPersonaje(vidasN);
                    vidasN[vidasNC].setVisible(false);
                    vidasNC--;
                    //LLamad a las funciones que querais que hagan al ser atacados por uno u otro ataque
                }
                if (!this.collisionActiva && weapon.attackType === 'normalSai') {
                    this.collisionActiva = true;
                    personaje.hitPersonaje(vidasN);
                    vidasN[vidasNC].setVisible(false);
                    vidasNC--;

                }
    
                if (!this.collisionActiva && weapon.attackType === 'potenciadoSai') {
                    this.collisionActiva = true;
                    personaje.hitPersonaje(vidasN);
                    vidasN[vidasNC].setVisible(false);
                    vidasNC--;
                }
    
                if (!this.collisionActiva && weapon.attackType === 'normalKusa') {
    
                }
    
                if (!this.collisionActiva && weapon.attackType === 'potenciadoKusa') {
    
                }
    
                if (!this.collisionActiva && weapon.attackType === 'normalTane') {
    
                }
    
                if (!this.collisionActiva && weapon.attackType === 'potenciadoTane') {
    
                }
    
                if(personaje2.flipX && this.collisionActiva){
                    personaje.hit(personaje.speedX);
                }
                else if(!personaje2.flipX && this.collisionActiva) {
                    personaje.hit(-personaje.speedX)
                }
    
                this.time.delayedCall(500, () => {
                    this.collisionActiva = false;
                
                });
                if (personaje.getVidas()== 0 || personaje2.getVidas()== 0){
                    this.scene.restart();
                }
    
               });

        // Crear instancias de Cartas aquí
        let cartas = new Cartas(this, 512, 100, 'cartas'); 
        this.cartas = cartas;
        //seleccion tipo de carta aleatoria
        
    }
    
    update(time, delta){
        this.cont += delta;
        let carta;
        if(this.cont >= this.tiempo){//contador
            if (this.lastImage) {
                this.lastImage.destroy();
            }   
            this.cartas.hazanimacion();
            this.cartas.armaAleatoria();
            carta = this.cartas.cargaImagen();
            console.log(carta);
            if(carta == 'cartaKatana'){
                this.lastImage = this.add.image(508, 100, 'logoKatana').setScale(0.13);
            }
            if(carta == 'cartaSai'){
                this.lastImage = this.add.image(512, 100, 'logoSai').setScale(0.12);
            }
            if(carta == 'cartaKusarigama'){
                    this.lastImage = this.add.image(510, 100, 'logoKusarigama').setScale(0.12);
            }
            if(carta == 'cartaTanegashima'){
                this.lastImage = this.add.image(512, 100, 'logoTanegashima').setScale(0.12);
            }
            this.cont = 0;
            
        
        }
    }
}