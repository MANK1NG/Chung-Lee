export default class Personaje extends Phaser.GameObjects.Image {
    constructor(scene,x, y) {
        super(scene,x, y, 'personaje');//???

        this.speed = 140;//Velocidad
        this.attack = false;//Ataque activo
        
        this.scene.add.existing(this);//Escena necesaria?

        this.w = this.scene.input.keyboard.addKey('W');
        this.s = this.scene.input.keyboard.addKey('S');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');

		scene.physics.add.existing(this);

        this.body.setCollideWorldBounds();

        this.bodyOffset = this.body.width/4;
        this.bodyWidth = this.body.width/2;

        this.body.setOffset(this.bodyOffset, 0);
        this.body.width = this.bodyWidth;
    }

    preUpdate(tiempo, tiempoFrames) {
        super.preUpdate(tiempo, tiempoFrames);//???
        //izquierda
        if(this.a.isDown){
            this.setFlip(true, false);
            this.body.setVelocityX(-this.speed);
        }
        //derecha
        if(this.d.isDown){
            this.setFlip(false, false);
            this.body.setVelocityX(this.speed);
        }
        //quieto si no hay input
        if(Phaser.Input.Keyboard.JustUp(this.a) || Phaser.Input.Keyboard.JustUp(this.d)){
            this.body.setVelocityX(0);
        }
        //bajar rapido si esta en el aire
        if(this.s.isDown && this.body.onAir()){
            this.body.setVelocityY(this.speed);
        }
        //Salto
        if(this.w.isDown && this.body.onFloor()){
            this.body.setVelocity(-this.speed);
        }
    }
}