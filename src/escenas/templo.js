import Personaje from "../Personajes/personaje.js";

export default class Templo extends Phaser.Scene{


    constructor(){
        super({key: 'templo'});
    }
    preload(){
        this.load.image('temploFondo', './assests/templo2.png');

        this.load.image('personaje', '../../img/personaje.png');

        this.load.image('katana', '../../img/katana.png');

        this.load.image('sai', '../../img/sai.png');


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


        let personaje = new Personaje(this, 50, 0, Personaje.WeaponType.KATANA, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V'});
        let personaje2 = new Personaje(this, 50, 0, Personaje.WeaponType.SAI, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P'});
       
        this.physics.add.collider(personaje, this.backgroundLayer);
        this.physics.add.collider(personaje2, this.backgroundLayer);
        
        //Crear mapa, cada suelo.create hace un objeto en esa posicion, setSacle su tamaño, collider para que no atraviese.
       /* const suelo = this.physics.add.staticGroup();

        const sueloIzq = suelo.create(244, 700); 
    
        sueloIzq.setScale(15.3, 4.4).refreshBody(); 

        const sueloDcha = suelo.create(800, 700); 
    
        sueloDcha.setScale(14, 4.4).refreshBody(); 
    
        this.physics.add.collider(personaje, suelo); 
        this.physics.add.collider(personaje2, suelo);*/ 
    }
}

