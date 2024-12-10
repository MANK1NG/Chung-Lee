export default class Katana extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'katana'); // Cambia 'katana' por tu sprite de katana

        this.setScale(0.2); // Escalar katana si es necesario
        this.attackType = null;
        this.ataqueKatana;
        this.potenciadoKatana;

        this.ataqueKatana = scene.sound.add('GolpeKatana', { volume: 0.1 });
        this.potenciadoKatana = scene.sound.add('PotenciadoKatana', { volume: 0.3 });
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
            this.ataqueKatana.play();
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
        this.potenciadoKatana.play();
    }
}
