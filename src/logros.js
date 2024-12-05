export default class Logros {
    constructor(spriteSheetKey){
        this.spriteSheetKey = spriteSheetKey;
        this.noHit = true;
        this.oneLifeLeft = false;
        this.cincoGolpes = 0;
    }

    ganarNoHit(){
        this.noHit = false;
    }

    ganarOneLifeLeft(){
        this.oneLifeLeft = true;
    }

    cincoGolpesCombo(){
        if(this.noHit){
            this.cincoGolpes++;
        }
    }

    escribeLogros(){
        if(this.noHit)
            console.log(this.spriteSheetKey + " ganaste sin recibir daño");
        else if(this.oneLifeLeft)
            console.log(this.spriteSheetKey + " ganaste con una vida");
        if(this.cincoGolpes >= 5)
            console.log(this.spriteSheetKey + " conseguiste dar cinco golpes antes de recibir daño");
    }
}