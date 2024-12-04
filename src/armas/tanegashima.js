export default class Tanegashima extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tanegashima'); // Cambia 'tanegashima' por tu sprite de tanegashima

        this.setScale(0.2); // Escalar katana si es necesario
        this.attackType = null;
    }

    getAnimationConfig(personaje){
        return {
            idle: {
                key: 'idle',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            caminar: {
                key: 'caminar',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 18, end: 33 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            ataque: {
                key: 'ataque',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 36, end: 53 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            salto: {
                key: 'salto',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 54, end: 61 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            caida: {
                key: 'caida',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 72, end: 81 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            ataqueAire: {
                key: 'ataqueAire',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 90, end: 107 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            knockBack: {
                key: 'knockBack',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 108, end: 122}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            ataquePotenciado: {
                key: 'ataquePotenciado',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 126, end: 157 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
        };
    }

    attack(personaje) {
        // Solo añadir físicas si no se ha añadido previamente
        this.attackType = 'normalKat';
            this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
            this.body.setAllowGravity(false);
        
    }

    potenciatedAttack(personaje) {
        this.attackType = 'potenciadoKat';
        this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
        this.body.setAllowGravity(false);
    
    // Activar el cuerpo físico para el ataque
        this.body.setSize(200, 650); // Ajustar el tamaño del cuerpo si es necesario
        if(personaje.flipX){
            this.body.setOffset(0, -100); // Ajustar posición del cuerpo en el sprite
        }
        else{
            this.body.setOffset(-160, -100);
        }
        this.body.enable = true;
    }
}
