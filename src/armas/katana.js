export default class Katana extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'katana'); // Cambia 'katana' por tu sprite de katana

        this.setScale(0.2); // Escalar katana si es necesario
        this.attackType = null;
    }

    getAnimationConfig(personaje){
        return {
            idle: {
                key: 'idle',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            caminar: {
                key: 'caminar',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 16, end: 31 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            ataque: {
                key: 'ataque',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 32, end: 40 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            salto: {
                key: 'salto',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 48, end: 55 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            caida: {
                key: 'caida',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 64, end: 73 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            ataqueAire: {
                key: 'ataqueAire',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 80, end: 88 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            knockBack: {
                key: 'knockBack',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, {start: 96, end: 110}),
                frameRate: 20,
                repeat: 0 // Repetir hasta que acabe
            },
            ataquePotenciado: {
                key: 'ataquePotenciado',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 112, end: 123 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            ataquePotenciadoRun: {
                key: 'ataquePotenciadoRun',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 128, end: 143 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            ataquePotenciadoHit: {
                key: 'ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers(personaje.spriteSheetKey, { start: 145, end: 154 }), // Index de frames para la animación
                frameRate: 20, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            }
        };
    }

    attack(personaje) {
        // Solo añadir físicas si no se ha añadido previamente
        this.attackType = 'normalKat';
            this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
            this.body.setAllowGravity(false);

            // Activar el cuerpo físico para el ataque
            this.body.setSize(380, 650); // Ajustar el tamaño del cuerpo si es necesario
            if(personaje.flipX){
                this.body.setOffset(0, -250); // Ajustar posición del cuerpo en el sprite
            }
            else{
                this.body.setOffset(-340, -250);
            }
            this.body.enable = true; // Habilitar el cuerpo para que sea detectable en la física
        
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
