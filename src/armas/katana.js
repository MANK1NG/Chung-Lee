export default class Katana extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'katana'); // Cambia 'katana' por tu sprite de katana

        this.setScale(0.2); // Escalar katana si es necesario
     
        this.attackDuration = 200; // Duración del ataque en milisegundos
    }

    attack(personaje) {
        // Solo añadir físicas si no se ha añadido previamente
            this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
            this.body.setAllowGravity(false);

            // Activar el cuerpo físico para el ataque
            this.body.setSize(600, 500); // Ajustar el tamaño del cuerpo si es necesario
            if(personaje.flipX){
                this.body.setOffset(-20, -200); // Ajustar posición del cuerpo en el sprite
            }
            else{
                this.body.setOffset(-400, -200);
            }
            this.body.enable = true; // Habilitar el cuerpo para que sea detectable en la física

            // Lógica para desactivar el cuerpo después de la duración del ataque
            this.scene.time.delayedCall(this.attackDuration, () => {
                this.body.enable = false; // Desactivar el cuerpo en lugar de destruirlo
            });
        
    }

    potenciatedAttack(personaje) {
         
    }
}
