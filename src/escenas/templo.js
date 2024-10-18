import Personaje from "../Personajes/personaje.js";

export default class Templo extends Phaser.Scene{


    constructor(){
        super({key: 'templo'});
    }
    preload(){
        this.load.image('templo', './assests/templo.png');

        this.load.image('personaje', '../../img/personaje.png');
    }

    create(){
        console.log("me he creado templo");

        this.add.image(0, 0, 'templo').setOrigin(0, 0);

        let personaje = new Personaje(this, 50, 0);
    }
}