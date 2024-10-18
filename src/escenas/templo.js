
export default class Templo extends Phaser.Scene{


    constructor(){
        super({key: 'templo'});
    }
    preload(){
        this.load.image('templo', './assests/templo.png');
    }

    create(){
        console.log("me he creado templo");

        this.add.image(0, 0, 'templo').setOrigin(0, 0);
    }
}