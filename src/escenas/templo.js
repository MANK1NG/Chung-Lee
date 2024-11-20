import Personaje from "../Personajes/personaje.js";
import Cartas from "../Cartas/cartas.js";

export default class Templo extends Phaser.Scene{

    constructor(){
        super({key: 'templo'});
       this.collisionActiva = false;

    }
    preload(){

        this.load.image('temploFondo', './assests/templo21.png');

        this.load.spritesheet('personaje1', './Anim/SpriteSheet_Sai_N.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });

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
        
        
        let personaje = new Personaje(this, 120, 0, Personaje.WeaponType.SAI, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V'}, 'personaje1', true);
        let personaje2 = new Personaje(this, 900, 0, Personaje.WeaponType.KATANA, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P'}, 'personaje2',false);
        let attackPersonaje1 = true;
        let attackPersonaje2 = true;
        this.physics.add.collider(personaje, this.backgroundLayer, () =>{
            personaje.body.setVelocityY(0);
            //console.log("colisiona");
        });
        this.physics.add.collider(personaje2, this.backgroundLayer, () =>{
            personaje2.body.setVelocityY(0);
        });
        
        this.physics.add.collider(personaje.getWeapon(), personaje2.getWeapon(), ()=>{
            const weapon = personaje.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje2.getWeapon().body.enable = false;
                personaje.ActiveDeflectAnim();
            }
        });

        this.physics.add.collider(personaje2.getWeapon(), personaje.getWeapon(), ()=>{
            const weapon = personaje2.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje.getWeapon().body.enable = false;
                personaje2.ActiveDeflectAnim();
            }
        });

        this.physics.add.collider(personaje.getWeapon(), personaje2, ()=>{
            const weapon = personaje.getWeapon();
        
            if (!this.collisionActiva && weapon.attackType === 'normalKat') {
                this.collisionActiva = true;
            personaje2.hitPersonaje();
            let valor2 = personaje2.getVidas();
            console.log(valor2);

            if(personaje.flipX){
                personaje2.hit(personaje2.speedX);
            }
            else {
                personaje2.hit(-personaje2.speedX)
            }
        }
        this.time.delayedCall(500, () => {
            this.collisionActiva = false;
            
        });
        if (personaje.getVidas()== 0 || personaje2.getVidas()== 0){
            this.scene.restart();
        }
        });
    
        this.physics.add.collider(personaje2.getWeapon(), personaje, ()=>{
            const weapon = personaje2.getWeapon();
        
            if (!this.collisionActiva && weapon.attackType === 'normalKat') {
                this.collisionActiva = true;
            personaje.hitPersonaje();
            let valor = personaje.getVidas();
            console.log(valor);
            if(personaje2.flipX){
                personaje.hit(personaje.speedX);
            }
            else {
                personaje.hit(-personaje.speedX)
            }
        }
        // else{
        //     weapon.body.setVelocity(0);
        // }
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

