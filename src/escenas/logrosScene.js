import Logros from '../escenas/logros.js'
import Personaje from '../Personajes/personaje.js'
export default class LogrosScene extends Phaser.Scene{
    constructor(){
        super({key: 'logros'});
        this.logros = new Logros();
        this.esc;
        this.music;
        this.logrosMovePersonaje = true;
        this.attack = false;
    }

    preload(){
        this.load.image('logrosBackground', './img/insignias/LogrosBackground.png');
        this.load.image('volverMenu', './assests/BotonVolverBlanco.png'); // Imagen del botón volver
        this.load.image('reset', './assests/BotonReinicioLogros.png'); // Imagen del botón reset

        this.load.image('personaje1', './assests/Pixel.png');
        this.load.image('personaje2', './assests/Pixel.png');
    }

    init(){
        this.logrosMovePersonaje = true;
        const savedState = localStorage.getItem('volumeState');
        const state = savedState ? JSON.parse(savedState) : { volume: 0.15 }; // Volumen predeterminado
    
        this.sound.volume = state.volume; // Configura el volumen global
        //musica
        this.music = this.sound.add('logros', { loop: true });
        this.music.setVolume(0.1);
        this.music.play();
    }
    
    create(){
        
        //fondo
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.image(0, 0, 'logrosBackground').setOrigin(0, 0);
        //boton volver al menu
        const volverMenu = this.add.image(512, 400, 'volverMenu').setInteractive(); // Ajusta la escala si es necesario
        volverMenu.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('menu');
        });
        //tamaño boton
        volverMenu.on('pointerover', () => {volverMenu.setScale(1.1);  this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); 
        volverMenu.on('pointerout', () => {volverMenu.setScale(1); this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});
        //boton reset
        const reset = this.add.image(512, 300, 'reset').setInteractive(); // Ajusta la escala si es necesario
        reset.on('pointerdown', () => {
           this.logros.resetState();
           this.music.stop();
           this.scene.start(this);
        });
        //tamaño boton
        reset.on('pointerover', () => {reset.setScale(1.1);  this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); 
        reset.on('pointerout', () => {reset.setScale(1); this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});
        //personajes de la escena
        if(this.logros.win1Kat)
        {
            let personaje = new Personaje(this, 230, 600, Personaje.WeaponType.KATANA, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V', keyWeapon: 'B'}, 'personaje1', true);
        }
        if(this.logros.win2Kat){
            let personaje2 = new Personaje(this, 790, 600, Personaje.WeaponType.KATANA, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P', keyWeapon: 'O'}, 'personaje2',false);
        }
        if(this.logros.win1Sai)
        {
            let personaje = new Personaje(this, 230, 600, Personaje.WeaponType.SAI, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V', keyWeapon: 'B'}, 'personaje1', true);
        }
        if(this.logros.win2Sai){
            let personaje2 = new Personaje(this, 790, 600, Personaje.WeaponType.SAI, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P', keyWeapon: 'O'}, 'personaje2',false);
        }
        if(this.logros.win1Kusa)
        {
            let personaje = new Personaje(this, 230, 600, Personaje.WeaponType.KUSA, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V', keyWeapon: 'B'}, 'personaje1', true);
        }
        if(this.logros.win2Kusa){
            let personaje2 = new Personaje(this, 790, 600, Personaje.WeaponType.KUSA, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P', keyWeapon: 'O'}, 'personaje2',false);
        }
        if(this.logros.win1Tane)
        {
            let personaje = new Personaje(this, 230, 600, Personaje.WeaponType.TANEGASHIMA, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V', keyWeapon: 'B'}, 'personaje1', true);
        }
        if(this.logros.win2Tane){
            let personaje2 = new Personaje(this, 790, 600, Personaje.WeaponType.TANEGASHIMA, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P', keyWeapon: 'O'}, 'personaje2',false);
        }
        //logros
        if(this.logros.noHitP1 || this.logros.showNoHitP1) {
            this.logros.ganarNoHitcomproveP1();
            this.add.image(60, 120, 'noHitP1').setOrigin(0, 0).setScale(0.15); 
            let texto = this.add.text(140, 150, '¡Has ganado sin recibir daño!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.noHitP2 || this.logros.showNoHitP2) {
            this.logros.ganarNoHitcomproveP2();
            this.add.image(880, 120, 'noHitP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 150, '¡Has ganado sin recibir daño!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
        if(this.logros.oneLifeLeftP1) {
            this.add.image(60, 180, 'oneLifeLeftP1').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(140, 210, '¡Has ganado a uno de vida!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.oneLifeLeftP2) {
            this.add.image(880, 180, 'oneLifeLeftP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 210, '¡Has ganado a uno de vida!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
        if(this.logros.cincoGolpesBoolP1) {
            this.add.image(60, 240, 'cincoGolpesP1').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(140, 270, '¡Has metido cinco golpes sin recibir daño!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.cincoGolpesBoolP2) {
            this.add.image(880, 240, 'cincoGolpesP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 270, '¡Has metido cinco golpes sin recibir daño!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
        if(this.logros.onlyKatanaP1) {
            this.add.image(60, 300, 'onlyKatanaP1').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(140, 330, '¡Has ganado usando solo la Katana!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.onlySaiP1) {
            this.add.image(60, 360, 'onlySaiP1').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(140, 390, '¡Has ganado usando solo los Sai!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.onlyKusaP1) {
            this.add.image(60, 420, 'onlyKusaP1').setOrigin(0, 0).setScale(0.15);
             let texto = this.add.text(140, 450, '¡Has ganado usando solo la Kusarigama!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.onlyTanegashimaP1) {
            this.add.image(60, 480, 'onlyTanegashimaP1').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(140, 510, '¡Has ganado usando solo la Tanegashima!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(0, 0);
            texto.setScale(0.5);
        }
        if(this.logros.onlyKatanaP2) {
            this.add.image(880, 300, 'onlyKatanaP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 330, '¡Has ganado usando solo la Katana!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
        if(this.logros.onlySaiP2) {
            this.add.image(880, 360, 'onlySaiP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 390, '¡Has ganado usando solo los Sai!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
        if(this.logros.onlyKusaP2) {
            this.add.image(880, 420, 'onlyKusaP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 450, '¡Has ganado usando solo la Kusarigama!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
        if(this.logros.onlyTanegashimaP2) 
        {
            this.add.image(880, 480, 'onlyTanegashimaP2').setOrigin(0, 0).setScale(0.15);
            let texto = this.add.text(880, 510, '¡Has ganado usando solo la Tanegashima!', {
            font: '32px Arial',   // Fuente y tamaño de la fuente
            fill: '#ffffff'       // Color del texto
            });
            texto.setOrigin(1, 0)
            texto.setScale(0.5);
        }
    }

    update(){
        if(this.esc.isDown){
            this.music.stop();
            this.scene.start('menu');
        }
    }
}