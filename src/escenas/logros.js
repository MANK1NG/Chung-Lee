export default class Logros {
    constructor(){
        if(Logros.instance){
            return Logros.instance;
        }
        this.noHitP1 = false,
        this.noHitP2 = false,
        this.cambioArmaP1 = false,
        this.cambioArmaP2 = false,
        this.cincoGolpesP1 = 0,
        this.cincoGolpesP2 = 0,
        this.comproveCincoGolpesP1 = true;
        this.comproveCincoGolpesP2 = true;
        this.win1Kat = false;
        this.win2Kat = false;
        this.win1Kusa = false;
        this.win2Kusa = false;
        this.win1Sai = false;
        this.win2Sai = false;
        this.win1Tane = false;
        this.win2Tane = false;
        this.defaultState = {
            oneLifeLeftP1: false,
            oneLifeLeftP2: false,
            cincoGolpesBoolP1: false,
            cincoGolpesBoolP2: false,
            onlyKatanaP1: false,
            onlySaiP1: false,
            onlyKusaP1: false,
            onlyTanegashimaP1: false,
            onlyKatanaP2: false,
            onlySaiP2: false,
            onlyKusaP2: false,
            onlyTanegashimaP2: false,
            showNoHitP1: false,
            showNoHitP2: false,
        };

        // Recuperar estado guardado si existe
        const savedState = this.loadState();
        Object.assign(this, savedState || this.defaultState);
        Logros.instance = this;
    }

    // Guardar el estado actual en LocalStorage
    saveState() {
        // Propiedades que deseas excluir del guardado
        const excludeKeys = [
            'noHitP1',
            'noHitP2',
            'cambioArmaP1',
            'cambioArmaP2',
            'cincoGolpesP1',
            'cincoGolpesP2',
            'comproveCincoGolpesP1',
            'comproveCincoGolpesP2',
            'win1Kat',
            'win2Kat',
            'win1Kusa',
            'win2Kusa',
            'win1Sai',
            'win2Sai',
            'win1Tane',
            'win2Tane',
        ];
    
        // Crear una copia del estado excluyendo las claves no deseadas
        const state = Object.keys(this)
            .filter(key => !excludeKeys.includes(key)) // Excluir claves específicas
            .reduce((obj, key) => {
                obj[key] = this[key];
                return obj;
            }, {});
    
        localStorage.setItem('logrosState', JSON.stringify(state));
    }

    win(gano){
        if(gano == 'personaje1Kat'){
            this.win1Kat = true;
        }
        if(gano == 'personaje2Kat'){
            this.win2Kat = true;
        }
        if(gano == 'personaje1Kusa'){
            this.win1Kusa = true;
        }
        if(gano == 'personaje2Kusa'){
            this.win2Kusa = true;
        }
        if(gano == 'personaje1Sai'){
            this.win1Sai = true;
        }
        if(gano == 'personaje2Sai'){
            this.win2Sai = true;
        }
        if(gano == 'personaje1Tane'){
            this.win1Tane = true;
        }
        if(gano == 'personaje2Tane'){
            this.win2Tane = true;
        }
    }

    // Cargar el estado desde LocalStorage
    loadState() {
        const savedState = localStorage.getItem('logrosState');
        return savedState ? JSON.parse(savedState) : null;
    }

    // Reiniciar el estado a valores predeterminados
    resetState() {
        Object.assign(this, this.defaultState);
        this.noHitP1 = false;
        this.noHitP2 = false;
        this.cincoGolpesP1 = 0;
        this.cincoGolpesP2 = 0;
        this.cambioArmaP1 = false;
        this.cambioArmaP2 = false;
        this.win1Kat = false;
        this.win2Kat = false;
        this.win1Kusa = false;
        this.win2Kusa = false;
        this.win1Sai = false;
        this.win2Sai = false;
        this.win1Tane = false;
        this.win2Tane = false;
        this.comproveCincoGolpesP1 = true;
        this.comproveCincoGolpesP2 = true;
        this.saveState();
    }

    ganarNoHitcomproveP1(){
        this.showNoHitP1 = true;
        this.saveState();
    }

    ganarNoHitcomproveP2(){
        this.showNoHitP2 = true;
        this.saveState();
    }
    ganarNoHit(spriteSheetKey){
        if(spriteSheetKey == 'personaje1')
            this.noHitP1 = true;
        if(spriteSheetKey == 'personaje2')
            this.noHitP2 = true;
    }

    ganarOneLifeLeft(spriteSheetKey){
        if(spriteSheetKey == 'personaje1')
            this.oneLifeLeftP1 = true;
        if(spriteSheetKey == 'personaje2')
            this.oneLifeLeftP2 = true;
            this.saveState();
    }

    comproveCincoGolpesMethP1(){
        this.comproveCincoGolpesP1 = false;
    }

    comproveCincoGolpesMethP2(){
        this.comproveCincoGolpesP2 = false;
    }

    cincoGolpesCombo(spriteSheetKey){
        if(this.comproveCincoGolpesP1 && spriteSheetKey == 'personaje1'){
            this.cincoGolpesP1++;
            if(this.cincoGolpesP1 >= 5){
                this.cincoGolpesBoolP1 = true;
            }
        }
        if(this.comproveCincoGolpesP2 && spriteSheetKey == 'personaje2'){
            this.cincoGolpesP2++;
            if(this.cincoGolpesP2 >= 5){
                this.cincoGolpesBoolP2 = true;
            }
        }
        this.saveState();
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
        this.saveState();
    }

    ganarSoloUnArmaP2(unicaArma){
        if(!this.cambioArmaP2){
            if(unicaArma == 'katana') this.onlyKatanaP2 = true;
            if(unicaArma == 'sai') this.onlySaiP2 = true;
            if(unicaArma == 'kusa') this.onlyKusaP2 = true;
            if(unicaArma == 'tanegashima') this.onlyTanegashimaP2 = true;
        }
        this.saveState();
    }
}