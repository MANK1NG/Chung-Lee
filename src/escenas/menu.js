
export default class Menu extends Phaser.Scene{


    constructor(){
        super({key: 'menu'});
        this.music = null;
        this.fondo;
    }
    preload(){
        window.game.canPick = false;//para que si vuelves a jugar siempre se asegure de que hasta que no haya carta no cojas nada
        this.load.image('button', './img/Stick-Do_Logo_Blanco (1).png'); // Imagen del botón
        this.load.image('menu', './assests/menu.png');
    }

    create(){
        if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
        }
        console.log("me he creado");
        this.fondo = this.add.sprite(0, 0,'menuBackgrownd').setOrigin(0,0);
        const startButton = this.add.image(512, 250, 'button').setInteractive().setScale(0.03);
        const options = this.add.image(512, 350, 'button').setInteractive().setScale(0.03);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//SI DAS AL ENTER CAMBIA LA ESCENA
        this.fondo.play('menuBGAnim');//animacion menu
        
        //boton play
        startButton.on('pointerdown', () => {
            console.log('Start Game');
            if (this.music)this.music.stop();
            this.scene.start('templo'); // Cambia a la escena del juego
        });
        //boton options
        options.on('pointerdown', () => {
            console.log('ops');
            //this.music.stop();
            this.scene.start('options'); // Cambia a la escena del juego
        });

        options.on('pointerover', () => {options.setScale(0.04);  this.game.canvas.style.cursor = 'url(../assests/manita.png), pointer';});
        options.on('pointerout', () => {options.setScale(0.03); this.game.canvas.style.cursor = 'url(../assests/cursor.png), auto';});

        startButton.on('pointerover', () => {startButton.setScale(0.04); this.game.canvas.style.cursor = 'url(../assests/manita.png), pointer';}); 
        startButton.on('pointerout', () => {startButton.setScale(0.03); this.game.canvas.style.cursor = 'url(../assests/cursor.png), auto';});

        // Reproducir música de fondo con volumen más bajo
        if (!this.music) {
        this.music = this.sound.add('MenuMusic', { loop: true });
        this.music.setVolume(0.15);  // Configura el volumen entre 0 (silencio) y 1 (máximo)
        if (this.music)this.music.play();
        }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.music.stop();
            this.scene.start('templo'); // Cambiar a la Escena
        }
    }

}