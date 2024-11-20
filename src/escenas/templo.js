import Personaje from "../Personajes/personaje.js";
import Cartas from "../Cartas/cartas.js";

export default class Templo extends Phaser.Scene{

    constructor(){
        super({key: 'templo'});
       this.collisionActiva = false;

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
        this.load.image('cuboNegro','./assests/cuboNegro.png')
    }

    create(){

        console.log("me he creado templo");
       this.add.image(0, 0, 'temploFondo').setOrigin(0, 0);

       
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
            //console.log("colisiona");
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
                personaje2.hitPersonaje();
                let valor2 = personaje2.getVidas();
                console.log(valor2);
            }
            //LLamad a las funciones que querais que hagan al ser atacados por uno u otro ataque
            if (!this.collisionActiva && weapon.attackType === 'normalSai') {

            }

            if (!this.collisionActiva && weapon.attackType === 'potenciadoSai') {

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
                    personaje.hitPersonaje();
                    let valor = personaje.getVidas();
                    console.log(valor);
                    //LLamad a las funciones que querais que hagan al ser atacados por uno u otro ataque
                }
                if (!this.collisionActiva && weapon.attackType === 'normalSai') {
    
                }
    
                if (!this.collisionActiva && weapon.attackType === 'potenciadoSai') {
    
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

    }

}

