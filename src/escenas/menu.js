
export default class Menu extends Phaser.Scene{


    constructor(){
        super({key: 'menu'});
    }
    preload(){
        this.load.image('button', './img/Stick-Do_Logo_Blanco (1).png'); // Imagen del botón
        this.load.image('menu', './assests/menu.png');
    }

    create(){
        console.log("me he creado");
        this.add.image(512, 384, 'menu').setScale(1);
        const startButton = this.add.image(512, 80, 'button').setInteractive().setScale(0.03);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//SI DAS AL ENTER CAMBIA LA ESCENA
        
        startButton.on('pointerdown', () => {
            console.log('Start Game');
            this.scene.start('templo'); // Cambia a la escena del juego
        });
        
        startButton.on('pointerover', () => {startButton.setScale(0.04);}); // Verde
        startButton.on('pointerout', () => {startButton.setScale(0.03);});
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start('templo'); // Cambiar a la Escena
        }

    }
}