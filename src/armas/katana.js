export default class Katana extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'katana'); // Cambia 'katana' por tu sprite de katana

        this.scene.add.existing(this); // Añadir el arma a la escena
        this.scene.physics.add.existing(this); // Añadir físicas si es necesario

        this.setScale(0.2); // Escalar katana si es necesario
     
        this.attackDuration = 200; // Duración del ataque en milisegundos
    }

    attack(personaje) {
         
    }

    potenciatedAttack(personaje) {
         
    }
}
