import Logros from '../escenas/logros.js'
export default class LogrosScene extends Phaser.Scene{
    constructor(){
        super({key: 'logros'});
        this.logros = new Logros();
    }

    preload(){
        this.load.image('logrosBackground', './img/insignias/LogrosBackground.png');
    }
    
    create(){
        this.add.image(0, 0, 'logrosBackground').setOrigin(0, 0);
        this.logros.escribeLogros();
        if(this.logros.noHitP1) this.add.image(80, 120, 'noHitP1').setOrigin(0, 0).setScale(0.1); 
        if(this.logros.noHitP2) this.add.image(900, 120, 'noHitP2').setOrigin(0, 0).setScale(0.1);
        if(this.logros.oneLifeLeftP1) this.add.image(80, 160, 'oneLifeLeftP1').setOrigin(0, 0).setScale(0.1);
        if(this.logros.oneLifeLeftP2) this.add.image(900, 160, 'oneLifeLeftP2').setOrigin(0, 0).setScale(0.1);
        if(this.logros.cincoGolpesP1 >= 5) this.add.image(80, 200, 'cincoGolpesP1').setOrigin(0, 0).setScale(0.1);
        if(this.logros.cincoGolpesP2 >= 5) this.add.image(900, 200, 'cincoGolpesP2').setOrigin(0, 0).setScale(0.1);
        if(this.logros.onlyKatanaP1) this.add.image(80, 240, 'onlyKatanaP1').setOrigin(0, 0).setScale(0.1);
        else if(this.logros.onlySaiP1) this.add.image(80, 280, 'onlySaiP1').setOrigin(0, 0).setScale(0.1);
        else if(this.logros.onlyKusaP1) this.add.image(80, 320, 'onlyKusaP1').setOrigin(0, 0).setScale(0.1);
        else if(this.logros.onlyTanegashimaP1) this.add.image(80, 360, 'onlyTanegashimaP1').setOrigin(0, 0).setScale(0.1);
        if(this.logros.onlyKatanaP2) this.add.image(900, 240, 'onlyKatanaP2').setOrigin(0, 0).setScale(0.1);
        else if(this.logros.onlySaiP2) this.add.image(900, 280, 'onlySaiP2').setOrigin(0, 0).setScale(0.1);
        else if(this.logros.onlyKusaP2) this.add.image(900, 320, 'onlyKusaP2').setOrigin(0, 0).setScale(0.1);
        else if(this.logros.onlyTanegashimaP2) this.add.image(900, 360, 'onlyTanegashimaP2').setOrigin(0, 0).setScale(0.1);
    }
}