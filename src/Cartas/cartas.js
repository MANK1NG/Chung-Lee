export default class Cartas extends Phaser.Physics.Arcade.Sprite{
constructor(scene, x, y, spriteSheetKey){
    // Llama al constructor de Phaser.Physics.Arcade.Sprite
    super(scene, x, y, spriteSheetKey); 
    this.spriteSheetKey = spriteSheetKey;
    this.carta;
    this.armas= ["KATANA", "SAI", "TANEGASHIMA", "KUSARIGAMA"];
    this.arma;
    this.armaAleatoria();//segun el aleatorio coge un arma aleatoria
    this.cargaImagen();

    this.rayo = scene.sound.add('rayoSFX', {volume: 1});
    this.whoosh = scene.sound.add('whooshCardSFX', {volume: 1});
    
   // this.cargaImgen(this.arma);//carga la imagen
   this.setScale(0.4);

     // Añadir el sprite a la escena
     scene.add.existing(this);
   

     //tonterias para ver como queda
     this.on('animationcomplete', (anim, frame) => {
        if(anim.key === 'rayo' || anim.key === 'negro'|| anim.key === 'rojo' ) {
            this.anims.play('idle', true);
          //cambiar a estado donde no se muestra nada
        }
    });
   
}

hazanimacion(){
    this.anims.play('rayo',true);
    this.rayo.play();
    return true;
}
armaAleatoria(){
    const aleatorio = Math.floor(Math.random() * (this.armas.length));//no incluye ni el 4
    console.log(aleatorio);
    this.arma =  this.armas[aleatorio];
}

armaInicial(){
    switch (this.arma) {
        case "KATANA":
            return 'KATANA';
        case "SAI":
            return 'SAI';
        case "TANEGASHIMA":
            return 'SAI';
        case "KUSARIGAMA":
            return 'KUSA';
    } 
}
destruircarta(){
    if (this.lastImage && !window.game.canPick) {
        this.lastImage.destroy();
        this.lastImage = null; // Limpia la referencia
    }
}
cargaImagen() {
    if (this.lastImage) {
        this.lastImage.destroy();
        this.lastImage = null; // Limpia la referencia
    }
    switch (this.arma) {
        case "KATANA":
            this.carta = "cartaKatana";
            this.lastImage = this.scene.add.image(508, 100, 'logoKatana').setScale(0.13);
            return this.carta;
        case "SAI":
            this.carta = "cartaSai";
            this.lastImage = this.scene.add.image(512, 100, 'logoSai').setScale(0.12);
            return this.carta;
        case "TANEGASHIMA":
            this.carta = "cartaTanegashima";
            this.lastImage = this.scene.add.image(510, 100, 'logoTanegashima').setScale(0.12);
            return this.carta;
        case "KUSARIGAMA":
            this.carta = "cartaKusarigama";
            this.lastImage = this.scene.add.image(512, 100, 'logoKusarigama').setScale(0.12);
            return this.carta;
    }
}

}