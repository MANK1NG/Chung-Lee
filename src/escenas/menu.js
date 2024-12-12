
export default class Menu extends Phaser.Scene{

    constructor(){
        super({key: 'menu'});
        this.music;
        this.fondo;
    }
    preload(){
        window.game.canPick = false;//para que si vuelves a jugar siempre se asegure de que hasta que no haya carta no cojas nada
        this.load.image('BotonAjustes', './assests/BotonAjustes.png'); // Imagen del botón
        this.load.image('BotonJuego', './assests/BotonJuego.png'); // Imagen del botón
        this.load.image('BotonLogros', './assests/BotonLogros.png'); // Imagen del botón
        this.load.image('menu', './assests/menu.png');
    }

    init() {
        const savedState = localStorage.getItem('volumeState');
        const state = savedState ? JSON.parse(savedState) : { volume: 0.15 }; // Volumen predeterminado
    
        this.sound.volume = state.volume; // Configura el volumen global
        // Reproducir música de fondo con volumen más bajo
        this.music = this.sound.add('MenuMusic', { loop: true });
        this.music.setVolume(0.15);  // Configura el volumen entre 0 (silencio) y 1 (máximo)
        this.music.play();
        
    }
    create(){
       
        this.fondo = this.add.sprite(0, 0,'menuBackgrownd').setOrigin(0,0);
        const startButton = this.add.image(512, 300, 'BotonJuego').setInteractive();
        const options = this.add.image(307, 350, 'BotonAjustes').setInteractive();
        const logros = this.add.image(717, 350, 'BotonLogros').setInteractive();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//SI DAS AL ENTER CAMBIA LA ESCENA
        this.fondo.play('menuBGAnim');//animacion menu
        
        //boton play
        startButton.on('pointerdown', () => {
            if (this.music)this.music.stop();
            this.scene.start('templo'); // Cambia a la escena del juego
        });
        //boton options
        options.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('options'); // Cambia a la escena del juego
        });
        //boton pantalla logros
        logros.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('logros'); // Cambia a la escena del juego
        });

        //cambio tamaño boton
        options.on('pointerover', () => {options.setScale(1.1);  this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';});
        options.on('pointerout', () => {options.setScale(1); this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});

        startButton.on('pointerover', () => {startButton.setScale(1.1); this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); 
        startButton.on('pointerout', () => {startButton.setScale(1); this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});

        logros.on('pointerover', () => {logros.setScale(1.1); this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); 
        logros.on('pointerout', () => {logros.setScale(1); this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});

       
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.music.stop();
            this.scene.start('templo'); // Cambiar a la Escena
        }
    }

}