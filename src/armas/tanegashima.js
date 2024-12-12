export default class Tanegashima extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tanegashima'); // Cambia 'tanegashima' por tu sprite de tanegashima

        this.setScale(0.2); // Escalar katana si es necesario
        this.attackType = null;
    }

    attack(personaje) {
        // Solo añadir físicas si no se ha añadido previamente
        this.attackType = 'normalTane';

        this.scene.time.delayedCall(250, () => {
            if (!personaje.superShot)
                personaje.shot.setScale(0.4);
            else
                personaje.shot.setScale(1);
            
            this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
            this.scene.physics.add.existing(personaje.shot); // Añadir físicas al iniciar el ataque
            personaje.shot.body.setAllowGravity(false);
            // Activar el cuerpo físico para el ataque
            personaje.shot.body.setSize(100, 40); // Ajustar el tamaño del cuerpo si es necesario
            personaje.shotDir = personaje.flipX;
            personaje.shot.x = personaje.shotDir ? (personaje.x + 80) : (personaje.x - 80);
            personaje.shot.y = personaje.y + 25;
            personaje.shooting = true;
            personaje.shot.body.enable = true; // Habilitar el cuerpo para que sea detectable en la física
        });
    }

    create() {

    }

    potenciatedAttack(personaje) {
        this.attackType = 'potenciadoTane';
    }
}
