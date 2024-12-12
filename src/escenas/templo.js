import Personaje from "../Personajes/personaje.js";
import Cartas from "../Cartas/cartas.js";
import Logros from "../escenas/logros.js";

export default class Templo extends Phaser.Scene{

    constructor(){
        super({key: 'templo'});
        this.collisionActiva = false;
        this.cont = 0;
        this.tiempo = 10000;
        //objetos
        this.cartas;
        this.personaje1;
        this.personaje2;
        this.music;
        this.logros;
        this.text;
        //booleanos
        this.colision = false;
    }
    
    preload(){
        //Mapas
        this.load.image('temploFondo', './assests/templo21.png');
        this.load.image('mapa2','./assests/tejados.png');
        this.load.image('mapa3', './assests/puente.png');
        //TileMap
        this.load.tilemapTiledJSON('templo', './assests/templo.json');
        this.load.tilemapTiledJSON('mapa2','./assests/mapa2.json');
        this.load.tilemapTiledJSON('mapa3','./assests/mapa3.json');
        this.load.image('cuboNegro','./assests/cuboNegro.png');
        this.load.image('cuboNegro8','./assests/cuboNegro8.png')
        //carga frames
        this.load.image('vidaFrameN','./img/vidas/negro/HUD_Black_Frame.png' );
        this.load.image('vidaFrameR','./img/vidas/rojo/HUD_Red_Frame.png' );
        //carga vidas negro
        this.load.image('vidaN0', './img/vidas/negro/HUD_Black_0.png');
        this.load.image('vidaN1', './img/vidas/negro/HUD_Black_1.png');
        this.load.image('vidaN2', './img/vidas/negro/HUD_Black_2.png');
        this.load.image('vidaN3', './img/vidas/negro/HUD_Black_3.png');
        this.load.image('vidaN4', './img/vidas/negro/HUD_Black_4.png');
        this.load.image('vidaN5', './img/vidas/negro/HUD_Black_5.png');
        this.load.image('vidaN6', './img/vidas/negro/HUD_Black_6.png');
        this.load.image('vidaN7', './img/vidas/negro/HUD_Black_7.png');
        //carga vidas rojo
        this.load.image('vidaR0', './img/vidas/rojo/HUD_Red_0.png');
        this.load.image('vidaR1', './img/vidas/rojo/HUD_Red_1.png');
        this.load.image('vidaR2', './img/vidas/rojo/HUD_Red_2.png');
        this.load.image('vidaR3', './img/vidas/rojo/HUD_Red_3.png');
        this.load.image('vidaR4', './img/vidas/rojo/HUD_Red_4.png');
        this.load.image('vidaR5', './img/vidas/rojo/HUD_Red_5.png');
        this.load.image('vidaR6', './img/vidas/rojo/HUD_Red_6.png');
        this.load.image('vidaR7', './img/vidas/rojo/HUD_Red_7.png');
        //carga armas cartas
        this.load.image('logoKatana', './img/armasCartas/Katana.png');
        this.load.image('logoSai', './img/armasCartas/Sai.png');
        this.load.image('logoKusarigama', './img/armasCartas/Kusarigama.png');
        this.load.image('logoTanegashima', './img/armasCartas/Tanegashima.png');
    }
    
    init(){
        const savedState = localStorage.getItem('volumeState');
        const state = savedState ? JSON.parse(savedState) : { volume: 0.15 }; // Volumen predeterminado
    
        this.sound.volume = state.volume; // Configura el volumen global
        // SONIDO
            let luchaSound = this.sound.add('Lucha');//FIGHT
            luchaSound.setVolume(0.5);
            luchaSound.play();
            
            //musica de fondo
            luchaSound.on('complete', () => {
                this.music = this.sound.add('BattleMusic', { loop: true });
                this.music.setVolume(0.15);  // Ajustar volumen de la música
                this.music.play();  // Iniciar la música de fondo
            });
    }
    
    create(){
    
        
        //Creacion de mapas
        const nMapa = Math.floor(Math.random() * 3);
        if (nMapa === 0){
            this.add.image(0, 0, 'temploFondo').setOrigin(0, 0);
            this.map = this.make.tilemap({
                key: 'templo',
                tileWidth: 32,
                tileHeight: 32
            });
            const tileset1 = this.map.addTilesetImage('cuboNegro', 'cuboNegro');
            this.backgroundLayer = this.map.createLayer('Capa de patrones 1', tileset1);            
            this.backgroundLayer.setCollisionByProperty({ colision: true });
        }else if(nMapa === 1){
            this.map = this.make.tilemap({
                key:'mapa2',
                tileWidth: 8,
                tileHeight: 8
                
            });
            const tileset = this.map.addTilesetImage('cuboNegro8', 'cuboNegro8');
            this.backgroundLayer = this.map.createLayer('Capa de patrones 1', tileset);            
            this.backgroundLayer.setCollisionByProperty({ colision: true });
            this.add.image(0,0,'mapa2').setOrigin(0,0);
            this.backgroundLayer.forEachTile(tile=>{
                if(tile.properties.oneWay){
                    tile.setCollision(false, false, true, false);
                }
            });
           
        }
        else if(nMapa === 2){
            this.map = this.make.tilemap({
                key:'mapa3',
                tileWidth: 8,
                tileHeight: 8
                
            });
            const tileset = this.map.addTilesetImage('cuboNegro8', 'cuboNegro8');
            this.backgroundLayer = this.map.createLayer('Capa de patrones 1', tileset);            
            this.backgroundLayer.setCollisionByProperty({ colision: true });
            this.add.image(0,0,'mapa3').setOrigin(0,0);
            
        }
        //MARCO VIDAS
        this.add.image(0,0,'vidaFrameN').setPosition(220,90).setScale(0.6);
        this.add.image(0,0,'vidaFrameR').setPosition(800,90).setScale(0.6);
        //ARRAY VIDAS NEGRO
        var vidasN= [];
        let vidaN0 = this.add.image(0,0,'vidaN0').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN0);
        let vidaN1 = this.add.image(0,0,'vidaN1').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN1);
        let vidaN2 = this.add.image(0,0,'vidaN2').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN2);
        let vidaN3 = this.add.image(0,0,'vidaN3').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN3);
        let vidaN4 = this.add.image(0,0,'vidaN4').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN4);
        let vidaN5 = this.add.image(0,0,'vidaN5').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN5);
        let vidaN6 = this.add.image(0,0,'vidaN6').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN6);
        let vidaN7 = this.add.image(0,0,'vidaN7').setPosition(220,90).setScale(0.6);
        vidasN.push(vidaN7);
        let vidasNC= 7;
        
        var vidasR = [];
        let vidaR0 = this.add.image(0,0,'vidaR0').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR0);
        let vidaR1 = this.add.image(0,0,'vidaR1').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR1);
        let vidaR2 = this.add.image(0,0,'vidaR2').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR2);
        let vidaR3 = this.add.image(0,0,'vidaR3').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR3);
        let vidaR4 = this.add.image(0,0,'vidaR4').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR4);
        let vidaR5 = this.add.image(0,0,'vidaR5').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR5);
        let vidaR6 = this.add.image(0,0,'vidaR6').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR6);
        let vidaR7 = this.add.image(0,0,'vidaR7').setPosition(800,90).setScale(0.6);
        vidasR.push(vidaR7);
        let vidasRC = 7;
        
        // Crear instancias de Cartas aquí
        this.cartas = new Cartas(this, 512, 100, 'cartas'); 
        // personaje.setTexture(this.cartas.armaInicial() + 'N');
        // personaje2.setTexture(this.cartas.armaInicial() + 'R');
        let armaAle;
        if(this.cartas.armaInicial() == 'KATANA'){
            armaAle = Personaje.WeaponType.KATANA;
        }
        else if (this.cartas.armaInicial() == 'SAI'){
            armaAle = Personaje.WeaponType.SAI;
        }
        else if(this.cartas.armaInicial() == 'KUSA'){
            armaAle = Personaje.WeaponType.KUSA;
        }
        else{
            armaAle = Personaje.WeaponType.TANEGASHIMA;
        }
        
        let logrosPersonajes = new Logros('Personaje negro');
        this.logros = logrosPersonajes;
        this.logros.noHitP1 = true;
        this.logros.noHitP2 = true;
        this.logros.cincoGolpesP1 = 0;
        this.logros.cincoGolpesP2 = 0;
        this.logros.cambioArmaP1 = false;
        this.logros.cambioArmaP2 = false;
        //Crear personaje 1
        let personaje = new Personaje(this, 120, 400, Personaje.WeaponType.KUSA, {keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D', keyAttack: 'V', keyWeapon: 'B'}, 'personaje1', true);
        //Crear personaje 2
        let personaje2 = new Personaje(this, 900, 400, armaAle, {keyUp: 'up', keyDown: 'down', keyLeft: 'left', keyRight: 'right', keyAttack: 'P', keyWeapon: 'O'}, 'personaje2',false);
        //COLISIONES SUELO
        this.personaje1 = personaje;
        this.personaje2 = personaje2;
        this.physics.add.collider(personaje, this.backgroundLayer, () =>{
        });
        this.physics.add.collider(personaje2, this.backgroundLayer, () =>{
        });
        
        //COLISIONES ATAQUE POTENCIADO KATANA
        this.physics.add.collider(personaje.weaponKatana, personaje2.weaponKatana, ()=>{
            const weapon = personaje.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje2.getWeapon().body.enable = false;
                personaje.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje2.weaponKatana, personaje.weaponKatana, ()=>{
            const weapon = personaje2.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje.getWeapon().body.enable = false;
                personaje2.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje.weaponKatana, personaje2.weaponSai, ()=>{
            const weapon = personaje.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                console.log("puta")
                personaje2.getWeapon().body.enable = false;
                personaje.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje2.weaponKatana, personaje.weaponSai, ()=>{
            const weapon = personaje2.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje.getWeapon().body.enable = false;
                personaje2.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje.weaponKatana, personaje2.weaponKusarigama, ()=>{
            const weapon = personaje.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje2.getWeapon().body.enable = false;
                personaje.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje2.weaponKatana, personaje.weaponKusarigama, ()=>{
            const weapon = personaje2.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje.getWeapon().body.enable = false;
                personaje2.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje.weaponKatana, personaje2.weaponTanegashima, ()=>{
            const weapon = personaje.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje2.getWeapon().body.enable = false;
                personaje.ActivePotenciadoHitAnim();
            }
        });
        
        this.physics.add.collider(personaje2.weaponKatana, personaje.weaponTanegashima, ()=>{
            const weapon = personaje2.getWeapon();
            if (weapon.attackType === 'potenciadoKat') {
                personaje.getWeapon().body.enable = false;
                personaje2.ActivePotenciadoHitAnim();
            }
        });
        
        /*
        * COLISIONES ATAQUE NORMAL, estan configurados ahora mismo para la katana 
        pero se pueden normalizar para que los ataques basicos de cada arma 
        actuen con este collider ya que su funcionalidad es igual.
        
        * Estas colisiones servirian tambien para los potenciados de las otra armas ya que
        no colisiona un arma con otra sino tambien con el personaje.
        
        * Estan declarados "ifs" con el nombre del attackType que teneis que tener en vuestras
        armas para que al atacar con un ataque o con otro se asigne eso y asi haga una cosa u 
        otra dependiendo de si es ataque potenciado o ataque normal y de que arma es.
        
        * Tened en cuenta que para cada ataque hay que rellenar 2 "ifs", el de el personaje1 contra el 2
        y el del 2 contra el 1, en realidad van a tener lo mismo pero con variables cambiada, donde al principio
        pusisteis personaje... pondreis personaje2 y alreves.
        */
       this.physics.add.overlap(personaje.weaponKatana, personaje2, ()=>{
           const weapon = personaje.weaponKatana;
           //Normal katana
           if (!this.collisionActiva  && weapon.attackType === 'normalKat') {
               this.collisionActiva = true;
               logrosPersonajes.cincoGolpesCombo('personaje1');
               logrosPersonajes.ganarNoHit('personaje2');
               personaje2.hitPersonaje(vidasR);
               vidasR[vidasRC].setVisible(false);
               vidasRC--;
               if(personaje.flipX && this.collisionActiva){
                   personaje2.hit(personaje2.speedX);
               }
               else if(!personaje.flipX && this.collisionActiva) {
                   personaje2.hit(-personaje2.speedX)
               }
            }
            
            //Lamada al knockback, en teoria se debe usar para la colision de todas las armas
            //Necesario poner this.collisionActiva en true en cada metodo que quiera usar el knockBack
            
            //Desactivar colision
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
                
            });
            //Reiniciar juego si uno muere
            if (personaje2.getVidas()== 0){
                if(personaje.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje1');
                logrosPersonajes.ganarSoloUnArmaP1(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        this.physics.add.overlap(personaje.weaponSai, personaje2, ()=>{
            const weapon = personaje.weaponSai;
            //LLamad a las funciones que querais que hagan al ser atacados por uno u otro ataque
            if (!this.collisionActiva) {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje1');
                logrosPersonajes.ganarNoHit('personaje2');
                personaje2.hitPersonaje(vidasR);
                vidasR[vidasRC].setVisible(false);
                vidasRC--;
                console.log("putaQueCoño")
            
            //Lamada al knockback, en teoria se debe usar para la colision de todas las armas
            //Necesario poner this.collisionActiva en true en cada metodo que quiera usar el knockBack
            
        }
        // if(this.colision){
        //     this.colision = false;
        //     logrosPersonajes.cincoGolpesCombo('personaje1');
        //     logrosPersonajes.ganarNoHit('personaje2');
        //     personaje2.hitPersonaje(vidasR);
        //     vidasR[vidasRC].setVisible(false);
        //     vidasRC--;
        // }
        if(personaje.flipX && this.collisionActiva){
            personaje2.hit(personaje2.speedX);
        }
        else if(!personaje.flipX && this.collisionActiva) {
            personaje2.hit(-personaje2.speedX)
        }
            //Desactivar colision
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
                
            });
            //Reiniciar juego si uno muere
            if (personaje2.getVidas()== 0){
                if(personaje.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje1');
                logrosPersonajes.ganarSoloUnArmaP1(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        
        this.physics.add.overlap(personaje.weaponKusarigama, personaje2, ()=>{
            const weapon = personaje.weaponKusarigama;
            if (!this.collisionActiva && weapon.attackType === 'normalKusa') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje1');
                logrosPersonajes.ganarNoHit('personaje2');
                personaje2.hitPersonaje(vidasR);
                vidasR[vidasRC].setVisible(false);
                vidasRC--;
            }
            
            if (!this.collisionActiva && weapon.attackType === 'potenciadoKusa') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje1');
                logrosPersonajes.ganarNoHit('personaje2');
                personaje2.hitPersonaje(vidasR);
                vidasR[vidasRC].setVisible(false);
                vidasRC--;
            }
            
            //Lamada al knockback, en teoria se debe usar para la colision de todas las armas
            //Necesario poner this.collisionActiva en true en cada metodo que quiera usar el knockBack
            if(personaje.flipX && this.collisionActiva){
                personaje2.hit(personaje2.speedX);
            }
            else if(!personaje.flipX && this.collisionActiva) {
                personaje2.hit(-personaje2.speedX)
            }
            
            //Desactivar colision
            this.time.delayedCall(500, () => {
                if(!weapon.attackType == 'potenciadoKusa'){
                    console
                this.collisionActiva = false;
            }
                
            });
            //Reiniciar juego si uno muere
            if (personaje2.getVidas()== 0){
                if(personaje.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje1');
                logrosPersonajes.ganarSoloUnArmaP1(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        
        this.physics.add.overlap(personaje.weaponTanegashima, personaje2, ()=>{
            const weapon = personaje.weaponTanegashima;
            if (!this.collisionActiva && weapon.attackType === 'normalTane') {
                
            }
            
            if (!this.collisionActiva && weapon.attackType === 'potenciadoTane') {
                
            }
            
            //Lamada al knockback, en teoria se debe usar para la colision de todas las armas
            //Necesario poner this.collisionActiva en true en cada metodo que quiera usar el knockBack
            if(personaje.flipX && this.collisionActiva){
                personaje2.hit(personaje2.speedX);
            }
            else if(!personaje.flipX && this.collisionActiva) {
                personaje2.hit(-personaje2.speedX)
            }
            
            //Desactivar colision
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
                
            });
            //Reiniciar juego si uno muere
            if (personaje2.getVidas()== 0){
                if(personaje.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje1');
                logrosPersonajes.ganarSoloUnArmaP1(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        
        this.physics.add.overlap(personaje2.weaponKatana, personaje, ()=>{
            const weapon = personaje2.weaponKatana;
            //Ataque normal katana
            if (!this.collisionActiva && weapon.attackType === 'normalKat') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje2');
                logrosPersonajes.ganarNoHit('personaje1');
                personaje.hitPersonaje(vidasN);
                vidasN[vidasNC].setVisible(false);
                vidasNC--;
                //LLamad a las funciones que querais que hagan al ser atacados por uno u otro ataque
            }
            
            if(personaje2.flipX && this.collisionActiva){
                personaje.hit(personaje.speedX);
            }
            else if(!personaje2.flipX && this.collisionActiva) {
                personaje.hit(-personaje.speedX)
            }
            
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
                
            });
            if (personaje.getVidas()== 0){
                if(personaje2.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje2');
                logrosPersonajes.ganarSoloUnArmaP2(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        this.physics.add.overlap(personaje2.weaponSai, personaje, ()=>{
            const weapon = personaje2.weaponSai;
            if (!this.collisionActiva && weapon.attackType === 'normalSai') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje2');
                logrosPersonajes.ganarNoHit('personaje1');
                personaje.hitPersonaje(vidasN);
                vidasN[vidasNC].setVisible(false);
                vidasNC--;
                
            }
            
            if (!this.collisionActiva && weapon.attackType === 'potenciadoSai') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje2');
                logrosPersonajes.ganarNoHit('personaje1');
                personaje.hitPersonaje(vidasN);
                vidasN[vidasNC].setVisible(false);
                vidasNC--;
            }
            
            if(personaje2.flipX && this.collisionActiva){
                personaje.hit(personaje.speedX);
            }
            else if(!personaje2.flipX && this.collisionActiva) {
                personaje.hit(-personaje.speedX)
            }
            
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
                
            });
            if (personaje.getVidas()== 0){
                if(personaje2.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje2');
                logrosPersonajes.ganarSoloUnArmaP2(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        
        this.physics.add.overlap(personaje2.weaponKusarigama, personaje, ()=>{
            const weapon = personaje2.weaponKusarigama;
            if (!this.collisionActiva && weapon.attackType === 'normalKusa') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje2');
                logrosPersonajes.ganarNoHit('personaje1');
                personaje.hitPersonaje(vidasN);
                vidasN[vidasNC].setVisible(false);
                vidasNC--;
            }
            
            if (!this.collisionActiva && weapon.attackType === 'potenciadoKusa') {
                this.collisionActiva = true;
                logrosPersonajes.cincoGolpesCombo('personaje2');
                logrosPersonajes.ganarNoHit('personaje1');
                personaje.hitPersonaje(vidasN);
                vidasN[vidasNC].setVisible(false);
                vidasNC--;
            }

            if(personaje2.flipX && this.collisionActiva){
                personaje.hit(personaje.speedX);
            }
            else if(!personaje2.flipX && this.collisionActiva) {
                personaje.hit(-personaje.speedX)
            }
           
                this.time.delayedCall(500, () => {
                    if(!weapon.attackType == 'potenciadoKusa'){
                        console
                    this.collisionActiva = false;
                }
                    
                });
            
            
            if (personaje.getVidas()== 0){
                if(personaje2.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje2');
                logrosPersonajes.ganarSoloUnArmaP2(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        
        this.physics.add.overlap(personaje2.weaponTanegashima, personaje, ()=>{
            const weapon = personaje2.weaponTanegashima;
            if (!this.collisionActiva && weapon.attackType === 'normalTane') {
                
            }
            
            if (!this.collisionActiva && weapon.attackType === 'potenciadoTane') {
                
            }
            
            if(personaje2.flipX && this.collisionActiva){
                personaje.hit(personaje.speedX);
            }
            else if(!personaje2.flipX && this.collisionActiva) {
                personaje.hit(-personaje.speedX)
            }
            
            this.time.delayedCall(500, () => {
                this.collisionActiva = false;
                
            });
            if (personaje.getVidas()== 0){
                if(personaje2.getVidas() == 1) logrosPersonajes.ganarOneLifeLeft('personaje2');
                logrosPersonajes.ganarSoloUnArmaP2(armaAle);
                this.music.stop();
                this.scene.start('logros');
            }
        });
        this.texto = this.add.sprite(512, 384, 'textoLucha').setScale(3);
        this.texto.play('lucha');
        
        this.texto.on('animationcomplete', () => {
            console.log('Animación completada. ¡A luchar!');
            this.texto.destroy();
        });

        this.personaje1.shot = this.add.image(-200, 0, 'shotN').setScale(0.4);
        this.personaje2.shot = this.add.image(-200, 0, 'shotR').setScale(0.4);
    }
    
    cambioArmaLogros(personajes){
        this.logros.cambioDeArma(personajes);
    }
    
    update(time, delta){
        this.cont += delta;
        let carta;
        if(this.cont >= this.tiempo){//contador  
            this.cartas.hazanimacion();
            this.cartas.armaAleatoria();
            carta = this.cartas.cargaImagen();
            window.game.canPick = true;
            this.personaje1.cambiarArma(carta);
            this.personaje2.cambiarArma(carta);
            this.cont = 0;  
        }
        this.cartas.destruircarta();
    }
}