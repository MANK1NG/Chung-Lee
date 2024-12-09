export default class Logros {
    constructor(){
        if(Logros.instance){
            return Logros.instance;
        }
        this.noHitP1 = true;
        this.noHitP2 = true;
        this.oneLifeLeftP1 = false;
        this.oneLifeLeftP2 = false;
        this.cincoGolpesP1 = 0;
        this.cincoGolpesBoolP1 = false;
        this.cincoGolpesBoolP2 = false;
        this.cincoGolpesP2 = 0;
        this.cambioArmaP1 = false;
        this.onlyKatanaP1 = false;
        this.onlySaiP1 = false;
        this.onlyKusaP1 = false;
        this.onlyTanegashimaP1 = false;
        this.cambioArmaP2 = false;
        this.onlyKatanaP2 = false;
        this.onlySaiP2 = false;
        this.onlyKusaP2 = false;
        this.onlyTanegashimaP2 = false;

        Logros.instance = this;
    }

    ganarNoHit(spriteSheetKey){
        if(spriteSheetKey == 'personaje1')
            this.noHitP1 = false;
        if(spriteSheetKey == 'personaje2')
            this.noHitP2 = false;
    }

    ganarOneLifeLeft(spriteSheetKey){
        if(spriteSheetKey == 'personaje1')
            this.oneLifeLeftP1 = true;
        if(spriteSheetKey == 'personaje2')
            console.log(spriteSheetKey);
            this.oneLifeLeftP2 = true;
    }

    cincoGolpesCombo(spriteSheetKey){
        if(this.noHitP1 && spriteSheetKey == 'personaje1')
            this.cincoGolpesP1++;
        if(cincoGolpesP1 >= 5){
            this.cincoGolpesBoolP1 = true;
        }
        if(this.noHitP2 && spriteSheetKey == 'personaje2')
            this.cincoGolpesP2++;
        if(cincoGolpesP2 >= 5){
            this.cincoGolpesBoolP2 = true;
        }
    }

    cambioDeArma(spriteSheetKey){
        if(spriteSheetKey == 'personaje1')
            this.cambioArmaP1 = true;
        if(spriteSheetKey == 'personaje2')
            this.cambioArmaP2 = true;
    }

    ganarSoloUnArmaP1(unicaArma){
        if(!this.cambioArmaP1){
            if(unicaArma == 'katana') this.onlyKatanaP1 = true;
            if(unicaArma == 'sai') this.onlySaiP1 = true;
            if(unicaArma == 'kusa') this.onlyKusaP1 = true;
            if(unicaArma == 'tanegashima') this.onlyTanegashimaP1 = true;
        }
    }

    ganarSoloUnArmaP2(unicaArma){
        if(!this.cambioArmaP2){
            if(unicaArma == 'katana') this.onlyKatanaP2 = true;
            if(unicaArma == 'sai') this.onlySaiP2 = true;
            if(unicaArma == 'kusa') this.onlyKusaP2 = true;
            if(unicaArma == 'tanegashima') this.onlyTanegashimaP2 = true;
        }
    }
}