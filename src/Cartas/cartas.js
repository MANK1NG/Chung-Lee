export default class Cartas extends Phaser.Physics.Arcade.Sprite{
constructor(){
    this.armas= ["KATANA", "SAI", "TANEGASHIMA", "KUSARIGAMA"];
    this.arma = this.armaAleatoria();//segun el aleatorio coge un arma aleatoria
    this.cargaImgen(this.arma);//carga la imagen
}

armaAleatoria(){
    const aleatorio = Math.floor(Math.random() * (this.armas.lenght));//no incluye ni el  ni el 4
    return this.armas[aleatorio];
}

/*switch*/
cargaImagen(arma){
let imagen;
switch(arma){
    case "KATANA":
    {
        /*imagen = katana.png;*/
        break;
    }
    case "SAI":
        {
            break;
        }
    case "TANEGASHIMA":
        {
            break;
        }
    case "KUSARIGAMA":
        {
            break;
        }
}
/*this.setTexture(imagen); setea la imagen que sale en pantalla*/
}

}