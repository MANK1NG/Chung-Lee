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
        if(this.logros.noHitP1) this.add.image(60, 120, 'noHitP1').setOrigin(0, 0).setScale(0.15); 
        if(this.logros.noHitP2) this.add.image(880, 120, 'noHitP2').setOrigin(0, 0).setScale(0.15);
        if(this.logros.oneLifeLeftP1) this.add.image(60, 180, 'oneLifeLeftP1').setOrigin(0, 0).setScale(0.15);
        if(this.logros.oneLifeLeftP2) this.add.image(880, 180, 'oneLifeLeftP2').setOrigin(0, 0).setScale(0.15);
        if(this.logros.cincoGolpesP1 >= 5) this.add.image(60, 240, 'cincoGolpesP1').setOrigin(0, 0).setScale(0.15);
        if(this.logros.cincoGolpesP2 >= 5) this.add.image(880, 240, 'cincoGolpesP2').setOrigin(0, 0).setScale(0.15);
        if(this.logros.onlyKatanaP1) this.add.image(60, 480, 'onlyKatanaP1').setOrigin(0, 0).setScale(0.15);
        else if(this.logros.onlySaiP1) this.add.image(60, 360, 'onlySaiP1').setOrigin(0, 0).setScale(0.15);
        else if(this.logros.onlyKusaP1) this.add.image(60, 420, 'onlyKusaP1').setOrigin(0, 0).setScale(0.15);
        else if(this.logros.onlyTanegashimaP1) this.add.image(60, 480, 'onlyTanegashimaP1').setOrigin(0, 0).setScale(0.15);
        if(this.logros.onlyKatanaP2) this.add.image(880, 300, 'onlyKatanaP2').setOrigin(0, 0).setScale(0.15);
        else if(this.logros.onlySaiP2) this.add.image(880, 360, 'onlySaiP2').setOrigin(0, 0).setScale(0.15);
        else if(this.logros.onlyKusaP2) this.add.image(880, 420, 'onlyKusaP2').setOrigin(0, 0).setScale(0.15);
        else if(this.logros.onlyTanegashimaP2) this.add.image(880, 480, 'onlyTanegashimaP2').setOrigin(0, 0).setScale(0.15);
    }
}