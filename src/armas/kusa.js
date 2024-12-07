export default class Kusa extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x , y){
        super(scene,x, y, 'kusa');


    
    }
   

    attack(personaje) {
        // Solo añadir físicas si no se ha añadido previamente

        this.attackType = 'normalKusa';

        this.once(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame, gameObject)=> {
            const totalFrames = anim.getTotalFrames();
            const currentFrames = frame.index;
            if(currentFrames >= totalFrames/2){

                this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
                this.body.setAllowGravity(false);
                // Activar el cuerpo físico para el ataque
                this.body.setSize(65, 200); // Ajustar el tamaño del cuerpo si es necesario
                if(personaje.flipX){
                    this.body.setOffset(58, -20); // Ajustar posición del cuerpo en el sprite
                }
                else{
                    this.body.setOffset(-88, -20);
                }
            }else{
                this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
                this.body.setAllowGravity(false);
                // Activar el cuerpo físico para el ataque
                this.body.setSize(200, 65); // Ajustar el tamaño del cuerpo si es necesario
                if(personaje.flipX){
                    this.body.setOffset(58, -20); // Ajustar posición del cuerpo en el sprite
                }
                else{
                    this.body.setOffset(-88, -20);
                }
            }
            this.body.enable = true; // Habilitar el cuerpo para que sea detectable en la física

        });

    }

    potenciatedAttack(personaje) {
        this.attackType = 'potenciadoKusa';
        this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
        this.body.setAllowGravity(false);
    
    // Activar el cuerpo físico para el ataque
        this.body.setSize(150, 150); // Ajustar el tamaño del cuerpo si es necesario
        if(personaje.flipX){
            this.body.setOffset(-110, -50); // Ajustar posición del cuerpo en el sprite
        }
        else{
            this.body.setOffset(-160, -100);
        }
        this.body.enable = true;
    }
}