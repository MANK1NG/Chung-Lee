
export default class Menu extends Phaser.Scene{


    constructor(){
        super({key: 'menu'});
        this.music;
    }
    preload(){
        this.load.image('button', './img/Stick-Do_Logo_Blanco (1).png'); // Imagen del botón
        this.load.image('fullscreen', './img/Stick-Do_Logo_Blanco (1).png'); // Carga el ícono del botón
        this.load.image('menu', './assests/menu.png');
    }

    create(){
        console.log("me he creado");
        this.add.image(512, 384, 'menu').setScale(1);
        const startButton = this.add.image(512, 80, 'button').setInteractive().setScale(0.03);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//SI DAS AL ENTER CAMBIA LA ESCENA

        //PANTALLA COMPLETA
        const fullscreenButton = this.add.image(750, 50, 'fullscreen')
            .setInteractive()
            .setScale(0.03); // Ajusta la escala si es necesario
        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
               this.scale.on('resize', this.onResize, this);
        });
        
        //PANTALLA COMPLETA

        startButton.on('pointerdown', () => {
            console.log('Start Game');
            this.music.stop();
            this.scene.start('templo'); // Cambia a la escena del juego
        });
        
        startButton.on('pointerover', () => {startButton.setScale(0.04);}); // Verde
        startButton.on('pointerout', () => {startButton.setScale(0.03);});

        // Reproducir música de fondo con volumen más bajo
        this.music = this.sound.add('MenuMusic', { loop: true });
        this.music.setVolume(0.15);  // Configura el volumen entre 0 (silencio) y 1 (máximo)
        this.music.play();

        if (this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }
    }
    onResize(gameSize) {
        // Evita la recursión innecesaria
        if (gameSize.width !== this.game.config.width || gameSize.height !== this.game.config.height) {
            this.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.music.stop();
            this.scene.start('templo'); // Cambiar a la Escena
        }

    }
}