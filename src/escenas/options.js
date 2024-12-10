export default class Options extends Phaser.Scene {

    constructor() {
        super({ key: 'options' });
    }

    preload() {
        this.load.image('fullscreen', './img/Stick-Do_Logo_Blanco (1).png'); // Carga el ícono del botón
        this.load.image('sliderBar', './img/teclado.png'); // Barra del slider
        this.load.image('sliderThumb', './img/personaje.png'); // Control del slider
    }

    create() {
        // PANTALLA COMPLETA
        const fullscreenButton = this.add.image(512, 300, 'fullscreen').setInteractive().setScale(0.03); // Ajusta la escala si es necesario
        const menu = this.add.image(512, 500, 'fullscreen').setInteractive().setScale(0.03); // Ajusta la escala si es necesario

        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
            this.scale.on('resize', this.onResize, this);
        });

        menu.on('pointerdown', () => {
            this.scene.start('menu');
        });

        fullscreenButton.on('pointerover', () => {fullscreenButton.setScale(0.04);  this.game.canvas.style.cursor = 'url(../assests/manita.png), pointer';}); 
        fullscreenButton.on('pointerout', () => {fullscreenButton.setScale(0.03); this.game.canvas.style.cursor = 'url(../assests/cursor.png), auto';});
        
        menu.on('pointerover', () => {menu.setScale(0.04);  this.game.canvas.style.cursor = 'url(../assests/manita.png), pointer';}); // Verde
        menu.on('pointerout', () => {menu.setScale(0.03); this.game.canvas.style.cursor = 'url(../assests/cursor.png), auto';});
        
        // SLIDER PARA EL VOLUMEN
        this.createVolumeSlider(512, 400);
    }

    createVolumeSlider(x, y) {
        // Añade la barra del slider
        const sliderBar = this.add.image(x, y, 'sliderBar').setInteractive();
        sliderBar.displayWidth = 200; // Ancho de la barra
        sliderBar.displayHeight = 10; // Alto de la barra

        // Añade el control del slider (thumb)
        const sliderThumb = this.add.image(x, y, 'sliderThumb').setInteractive();
        sliderThumb.displayWidth = 40; // Tamaño del control
        sliderThumb.displayHeight = 40;

        // Volumen inicial
        const initialVolume = this.game.globalVolume || 1; // Usa un valor global compartido si existe
        sliderThumb.x = x - sliderBar.displayWidth / 2 + initialVolume * sliderBar.displayWidth;

        // Función para actualizar el volumen
        const updateVolume = (pointer) => {
            let newX = Phaser.Math.Clamp(pointer.x, x - sliderBar.displayWidth / 2, x + sliderBar.displayWidth / 2);
            sliderThumb.x = newX;

            // Calcula el volumen basado en la posición del slider
            const volume = (newX - (x - sliderBar.displayWidth / 2)) / sliderBar.displayWidth;
            this.setGameVolume(volume);
        };

        // Eventos del slider
        sliderThumb.on('pointerdown', () => {
            this.input.on('pointermove', updateVolume);
        });

        this.input.on('pointerup', () => {
            this.input.off('pointermove', updateVolume);
        });
        sliderThumb.on('pointerover', () => {this.game.canvas.style.cursor = 'url(../assests/manita.png), pointer';}); // Verde
        sliderThumb.on('pointerout', () => {this.game.canvas.style.cursor = 'url(../assests/cursor.png), auto';});
    }

    setGameVolume(volume) {
        this.game.globalVolume = volume; // Guarda el volumen en una variable global
        this.sound.volume = volume; // Ajusta el volumen global del sonido en Phaser

        // Si tienes música o sonidos en esta escena, también puedes ajustarlos aquí.
        // Por ejemplo: this.backgroundMusic.setVolume(volume);
    }

    onResize(gameSize) {
        // Evita la recursión innecesaria
        if (gameSize.width !== this.game.config.width || gameSize.height !== this.game.config.height) {
            this.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }
}
