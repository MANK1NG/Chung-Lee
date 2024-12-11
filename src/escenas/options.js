export default class Options extends Phaser.Scene {

    constructor() {
        super({ key: 'options' });
        this.music;
        this.sliderThumb;
        this.sliderBar;
    }
    
    preload() {
        this.load.image('fondoOpciones', './assests/AjustesBackground.png'); // Carga el ícono del botón
        this.load.image('fullscreen', './assests/BotonFullScreen.png'); // Carga el ícono del botón
        this.load.image('volver', './assests/BotonVolver.png'); // Carga el ícono del botón
        this.load.image('sliderBar', './assests/BarraVolumen.png'); // Barra del slider
        this.load.image('sliderThumb', './assests/FinalVolumen.png'); // Control del slider
        this.load.image('bola', './assests/PrincipioVolumen.png'); // final barra
    }
    
    init() {
        // Reproducir música de fondo con volumen más bajo
        this.music = this.sound.add('opciones', { loop: true });
        this.music.setVolume(0.15);  // Configura el volumen entre 0 (silencio) y 1 (máximo)
        this.music.play();
        
    }

    create() {
        //fondo
        this.add.image(0, 0, 'fondoOpciones').setOrigin(0,0);
        // PANTALLA COMPLETA
        const fullscreenButton = this.add.image(512, 200, 'fullscreen').setInteractive(); // Ajusta la escala si es necesario
        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
            this.scale.on('resize', this.onResize, this);
        });
        
        //menu y boton menu
        const volver = this.add.image(512, 650, 'volver').setInteractive(); // Ajusta la escala si es necesario
        volver.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('menu');
        });

        //reajuste botones
        fullscreenButton.on('pointerover', () => {fullscreenButton.setScale(1.1);  this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); 
        fullscreenButton.on('pointerout', () => {fullscreenButton.setScale(1); this.game.canvas.style.cursor = 'url(../assests/cursor.png), auto';});
        
        volver.on('pointerover', () => {volver.setScale(1.1);  this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); // Verde
        volver.on('pointerout', () => {volver.setScale(1); this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});
        
        // SLIDER PARA EL VOLUMEN
        this.createVolumeSlider(292.5, 450);
    }
    
    saveState() {
        // Guardar solo las propiedades relevantes, como el volumen
        const state = {
            sliderThumb: this.sliderThumb ? this.sliderThumb.x : 731, // Posición del slider
            sliderBarW: this.sliderBar ? this.sliderBar.displayWidth : 439,
            volume: this.sound.volume // Guardar el volumen actual
        };
        localStorage.setItem('volumeState', JSON.stringify(state));
    }

    loadState() {
        const savedState = localStorage.getItem('volumeState');
        return savedState ? JSON.parse(savedState) : { volume: 0.15 }; // Devuelve un valor predeterminado si no hay datos guardados
    }
    
    
    
    createVolumeSlider(x, y) {
        const savedState = this.loadState();
        Object.assign(this, savedState);
        this.sound.volume = savedState.volume;
        // Añade la barra del slider
        this.sliderBar = this.add.image(x, y, 'sliderBar').setInteractive().setOrigin(0,0);
        this.sliderBar.displayWidth = savedState.sliderBarW; // Ancho de la barra
        this.sliderBar.displayHeight = 7; // Alto de la barra
        let bola = this.add.image(x, y, 'bola').setOrigin(0.5, 0.05);//bola final barra

        // Añade el control del slider (thumb)
        this.sliderThumb = this.add.image(savedState.sliderThumb, y, 'sliderThumb').setOrigin(0.25,0.97).setInteractive();
        if(this.sliderThumb.x == 0){
            this.sliderThumb.x = 731;
            this.sliderBar.displayWidth = 439;
        }
        // Función para actualizar el volumen
        const updateVolume = (pointer) => {
            let newX = Phaser.Math.Clamp(pointer.x, this.sliderBar.x, this.sliderBar.x + 439);
            this.sliderThumb.x = newX;
            let ancho = this.sliderThumb.x - bola.x;
            this.sliderBar.displayWidth = ancho;
           
            // Calcula el volumen basado en la posición del slider
            const volume = this.sliderBar.displayWidth / 439;
            this.setGameVolume(volume);
            this.saveState();
        };

        // Eventos del slider
        this.sliderThumb.on('pointerdown', () => {
            this.input.on('pointermove', updateVolume);
        });

        this.input.on('pointerup', () => {
            this.input.off('pointermove', updateVolume);
        });

        this.sliderThumb.on('pointerover', () => {this.game.canvas.style.cursor = 'url(./assests/manita.png), pointer';}); // Verde
        this.sliderThumb.on('pointerout', () => {this.game.canvas.style.cursor = 'url(./assests/cursor.png), auto';});
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
