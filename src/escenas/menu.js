
export default class Menu extends Phaser.Scene{


    constructor(){
        super({key: 'menu'});
        this.music;
    }
    preload(){
        this.load.image('button', './img/Stick-Do_Logo_Blanco (1).png'); // Imagen del botón
        this.load.image('menu', './assests/menu.png');
    }

    create(){
        console.log("me he creado");
        this.add.image(512, 384, 'menu').setScale(1);
        const startButton = this.add.image(512, 80, 'button').setInteractive().setScale(0.03);
        const options = this.add.image(512, 200, 'button').setInteractive().setScale(0.03);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//SI DAS AL ENTER CAMBIA LA ESCENA


        startButton.on('pointerdown', () => {
            console.log('Start Game');
            this.music.stop();
            this.scene.start('templo'); // Cambia a la escena del juego
        });
        
        options.on('pointerdown', () => {
            console.log('ops');
            //this.music.stop();
            this.scene.start('options'); // Cambia a la escena del juego
        });

        options.on('pointerover', () => {options.setScale(0.04);}); // Verde
        options.on('pointerout', () => {options.setScale(0.03);});

        startButton.on('pointerover', () => {startButton.setScale(0.04);}); 
        startButton.on('pointerout', () => {startButton.setScale(0.03);});

        // Reproducir música de fondo con volumen más bajo
        if (!this.music) {
        this.music = this.sound.add('MenuMusic', { loop: true });
        this.music.setVolume(0.15);  // Configura el volumen entre 0 (silencio) y 1 (máximo)
        this.music.play();
        }
        
        if (this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.music.stop();
            this.scene.start('templo'); // Cambiar a la Escena
        }

    }
}