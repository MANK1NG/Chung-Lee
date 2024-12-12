export default class Kusa extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x , y){
        super(scene,x, y, 'kusa');


        this.ataque = scene.sound.add('AtaqueKusa', {volume: 0.35});
        this.carga = scene.sound.add('CargaKusa', {volume: 0.6});
        this.lanza = scene.sound.add('LanzaKusa', {volume: 1});
    }
   

    attack(personaje) {
        // Solo añadir físicas si no se ha añadido previamente

        this.attackType = 'normalKusa';
        this.ataque.play();
        this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
        this.body.setAllowGravity(false);
            
            if (personaje.anims.currentAnim && !personaje.body.blocked.down) {
               this.body.setSize(180,150);

                if(personaje.flipX){
                    this.body.setOffset(-100, -45);
                } 
                else{
                    this.body.setOffset(-40, -45);
                }  
                this.body.enable = true; // Habilitar el cuerpo para que sea detectable en la física

            }
        

    }
    

    potenciatedAttack(personaje) {
        this.attackType = 'potenciadoKusa';
        this.carga.play();
        this.scene.physics.add.existing(this); // Añadir físicas al iniciar el ataque
        this.body.setAllowGravity(false);
    // Activar el cuerpo físico para el ataque
        this.body.setSize(130, 130); // Ajustar el tamaño del cuerpo si es necesario
        if(personaje.flipX){
            this.body.setOffset(-105, -30); // Ajustar posición del cuerpo en el sprite
        }
        else{
            this.body.setOffset(5, -30);
        }
        this.body.enable = true;
    }
}