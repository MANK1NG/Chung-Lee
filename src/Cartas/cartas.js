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
   // this.cargaImgen(this.arma);//carga la imagen
   this.setScale(0.4);

     // Añadir el sprite a la escena
     scene.add.existing(this);
     this.createAnimations();
     this.hazanimacion();

     //tonterias para ver como queda
     this.on('animationcomplete', (anim, frame) => {
        if(anim.key === 'rayo') {
            this.anims.play('idle', true);
        }
    });
 
}

hazanimacion(){
    this.anims.play('rayo',true);
    return true;
}
armaAleatoria(){
    const aleatorio = Math.floor(Math.random() * (this.armas.length));//no incluye ni el 4
    console.log(aleatorio);
    this.arma =  this.armas[aleatorio];
}

createAnimations(){//animaciones cartas
    this.anims.create({ 
         key: 'idle',//nombre de animacion
         frames: this.anims.generateFrameNumbers(this.spriteSheetKey, {start: 0, end: 0} ),//coge el dibujo entero de esa anim, this es la scene
         frameRate: 20,//tasa frames
         repeat: -1,//ciclo cíclico
    });

    this.anims.create({   
        key: 'negro',//nombre de animacion
        frames: this.anims.generateFrameNumbers(this.spriteSheetKey, {start: 12, end: 23} ),//coge el dibujo entero de esa anim, this es la scene
        frameRate: 20,//tasa frames
        repeat: 0,//ciclo simple
   });

   this.anims.create({   
    key: 'rojo',//nombre de animacion
    frames: this.anims.generateFrameNumbers(this.spriteSheetKey, {start: 24, end: 35} ),//coge el dibujo entero de esa anim, this es la scene
    frameRate: 20,//tasa frames
    repeat: 0,//ciclo simple
});

this.anims.create({   
    key: 'rayo',//nombre de animacion
    frames: this.anims.generateFrameNumbers(this.spriteSheetKey, {start: 36, end: 42} ),//coge el dibujo entero de esa anim, this es la scene
    frameRate: 20,//tasa frames
    repeat: 0,//ciclo simple
});
}

cargaImagen() {
    switch (this.arma) {
        case "KATANA":
            this.carta = "cartaKatana";
            return this.carta;
        case "SAI":
            this.carta = "cartaSai";
            return this.carta;
        case "TANEGASHIMA":
            this.carta = "cartaTanegashima";
            return this.carta;
        case "KUSARIGAMA":
            this.carta = "cartaKusarigama";
            return this.carta;
    }
}

}