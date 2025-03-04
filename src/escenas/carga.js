export default class Carga extends Phaser.Scene{
    constructor(){
        super({key: 'carga'});
    }

    preload(){
        //cursor
        this.load.image('manita', './assests/manita.png');
        this.load.image('cursor', './assests/cursor.png');
        //Logros
        this.load.image('noHitP1', './img/insignias/insigniaVidaEntera.png');
        this.load.image('noHitP2', './img/insignias/insigniaVidaEntera.png');
        this.load.image('oneLifeLeftP1', './img/insignias/insigniaVida.png');
        this.load.image('oneLifeLeftP2', './img/insignias/insigniaVida.png');
        this.load.image('cincoGolpesP1', './img/insignias/insigniaCincoGolpes.png');
        this.load.image('cincoGolpesP2', './img/insignias/insigniaCincoGolpes.png');
        this.load.image('onlyKatanaP1', './img/insignias/insigniaKatana.png');
        this.load.image('onlySaiP1', './img/insignias/insigniaSai.png');
        this.load.image('onlyKusaP1', './img/insignias/insigniaKusa.png');
        this.load.image('onlyTanegashimaP1', './img/insignias/insigniaTanegashima.png');
        this.load.image('onlyKatanaP2', './img/insignias/insigniaKatana.png');
        this.load.image('onlySaiP2', './img/insignias/insigniaSai.png');
        this.load.image('onlyKusaP2', './img/insignias/insigniaKusa.png');
        this.load.image('onlyTanegashimaP2', './img/insignias/insigniaTanegashima.png');

        this.load.image('shotN', './Anim/Shot_N.png');
        this.load.image('shotR', './Anim/Shot_R.png');
        //SONIDO
        this.load.audio('MenuMusic', './audio/MenuMusic.mp3');
        this.load.audio('BattleMusic', './audio/BattleMusic.mp3');
        this.load.audio('Lucha', './audio/LuchaJapones.mp3');
        this.load.audio('logros', './audio/logrosMusica.mp3');
        this.load.audio('opciones', './audio/MusicaOpciones.mp3');
        this.load.audio('rayoSFX', './audio/lightning_strike.mp3');
        this.load.audio('whooshCardSFX', './audio/whoosh_card.mp3');
        //katana
        this.load.audio('GolpeKatana', './audio/GolpeKatana.mp3');
        this.load.audio('DeflectKatana', './audio/DeflectKatana.mp3');
        this.load.audio('PotenciadoKatana', './audio/PotenciadoKatana.mp3');
        //sai
        this.load.audio('AtaqueSai', './audio/AtaqueSai.mp3');
        this.load.audio('DashSai', './audio/DashSai.mp3');
        //kusa
        this.load.audio('AtaqueKusa', './audio/slash.mp3');
        this.load.audio('CargaKusa', './audio/swing.mp3');
        this.load.audio('LanzaKusa', './audio/throw.mp3');
        //tanegashima
        this.load.audio('AtaqueTane', './audio/TaneShot.mp3');
        this.load.audio('SuperAtaqueTane', './audio/TaneSuperShot.mp3');
        this.load.audio('CargaTane', './audio/TaneCharge.mp3');
        this.load.audio('CargadoTane', './audio/TaneCharged.wav');


        this.load.spritesheet('menuBackground', './Anim/MenuBackgroundAnim.png', {
            frameWidth: 1024,
            frameHeight: 768
        });
        
        this.load.spritesheet('katanaN', './Anim/SpriteSheet_Katana_N.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        
        this.load.spritesheet('katanaR', './Anim/SpriteSheet_Katana_R.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });

        this.load.spritesheet('saiN', './Anim/SpriteSheet_Sai_N.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });

        this.load.spritesheet('saiR', './Anim/SpriteSheet_Sai_R.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        this.load.spritesheet('kusaR', './Anim/SpriteSheet_Kusa_01_R.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        this.load.spritesheet('kusaN', './Anim/SpriteSheet_Kusa_01_N.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        this.load.spritesheet('kusaR2', './Anim/SpriteSheet_Kusa_02_R.png', {
            frameWidth: 1050,  // Ancho de cada fotograma
            frameHeight: 920  // Alto de cada fotograma
        });
        this.load.spritesheet('kusaN2', './Anim/SpriteSheet_Kusa_02_N.png', {
            frameWidth: 1050,  // Ancho de cada fotograma
            frameHeight: 920  // Alto de cada fotograma
        });
        this.load.spritesheet('kusaR3', './Anim/SpriteSheet_Kusa_03_R.png', {
            frameWidth: 1050,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        this.load.spritesheet('kusaN3', './Anim/SpriteSheet_Kusa_03_N.png', {
            frameWidth: 1050,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        this.load.spritesheet('tanegashimaN', './Anim/SpriteSheet_Tanegashima_N.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });
        this.load.spritesheet('tanegashimaR', './Anim/SpriteSheet_Tanegashima_R.png', {
            frameWidth: 525,  // Ancho de cada fotograma
            frameHeight: 460  // Alto de cada fotograma
        });

        this.load.spritesheet('cartas', './Anim/Cards_SpriteSheet.png', {
            frameWidth: 800, // Ancho de cada fotograma
            frameHeight: 500 // Alto de cada fotograma
        });

        this.load.spritesheet('textoLucha', './assests/textoLucha.png', {
            frameWidth: 100,  // Ancho de cada fotograma
            frameHeight: 100  // Alto de cada fotograma
        });

         // Definir el fondo de la barra de progreso
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();

        // Fondo de la barra de carga (centrado)
        this.progressBox.fillStyle(0x222222, 0.5);
        this.progressBox.fillRect(362, 345, 310, 50);  // (1024-300)/2 para centrar la barra

        // Texto de carga (centrado)
        this.loadingText = this.add.text(512, 320, 'Cargando...', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Texto de porcentaje (centrado)
        this.percentText = this.add.text(512, 405, '0%', {
            font: '18px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Progreso visual (centrado)
        this.barWidth = 300;  // Ancho de la barra
        this.barHeight = 40;  // Altura de la barra

        // Listeners de progreso y carga completa
        this.load.on('progress', this.updateBar, this);
        this.load.on('complete', this.completeLoad, this);
    }

    create(){
        this.createAnimations();
    }

    updateBar(percentage) {
         // Limpiar la barra de progreso
         this.progressBar.clear();

         // Dibujar el progreso (centrado)
         this.progressBar.fillStyle(0xff0000, 1);
         this.progressBar.fillRect(367, 348, this.barWidth * percentage, this.barHeight);
         
         // Actualizar el porcentaje (centrado)
         this.percentText.setText(Math.round(percentage * 100) + '%');
    }

    createAnimations() {
        const animationConfig = this.getAnimationConfig();
        // Asignar animaciones al personaje según el tipo de arma
        for (const config of animationConfig) {
            this.anims.create({
                key: config.key,  // Nombre de la animación (e.g., 'idle', 'caminar', 'ataque')
                frames: config.frames,  // Frames desde la configuración
                frameRate: config.frameRate,  // Velocidad de la animación
                repeat: config.repeat  // Repetición de la animación
            });
        }
    }

    getAnimationConfig(){
        return [
            {
                key: 'personaje1katana_idle',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1katana_caminar',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 16, end: 31 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1katana_ataque',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 32, end: 40 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1katana_salto',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 48, end: 55 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1katana_caida',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 64, end: 73 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1katana_ataqueAire',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 80, end: 88 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1katana_knockBack',
                frames: this.anims.generateFrameNumbers('katanaN', {start: 96, end: 110}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1katana_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 112, end: 123 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1katana_ataquePotenciadoRun',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 128, end: 143 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1katana_ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers('katanaN', { start: 145, end: 153 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2katana_idle',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2katana_caminar',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 16, end: 31 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2katana_ataque',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 32, end: 40 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2katana_salto',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 48, end: 55 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2katana_caida',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 64, end: 73 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2katana_ataqueAire',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 80, end: 88 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2katana_knockBack',
                frames: this.anims.generateFrameNumbers('katanaR', {start: 96, end: 110}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2katana_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 112, end: 123 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2katana_ataquePotenciadoRun',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 128, end: 143 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2katana_ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers('katanaR', { start: 145, end: 153 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            { 
                key: 'personaje1sai_idle',//nombre de animacion
                frames: this.anims.generateFrameNumbers('saiN', {start: 0, end: 11} ),//coge el dibujo entero de esa anim, this es la scene
                frameRate: 24,//tasa frames
                repeat: -1,//ciclo cíclico
            },
               
            {
                key: 'personaje1sai_caminar',
                frames: this.anims.generateFrameNumbers('saiN', {start: 16, end: 31} ),
                frameRate: 24,
                repeat: -1, //para que la haga infinita
            },
    
            {
                key: 'personaje1sai_ataque',
                frames: this.anims.generateFrameNumbers('saiN', {start: 32, end: 42}),
                frameRate: 24,
                repeat: 0, //ciclo sencillo
            },
               
            {
                key: 'personaje1sai_salto',
                frames: this.anims.generateFrameNumbers('saiN', {start: 48, end: 55} ),
                frameRate: 12,
                repeat: -1,
            },
    
            {
                key: 'personaje1sai_caida',
                frames: this.anims.generateFrameNumbers('saiN', {start: 64, end: 73} ),
                frameRate: 24,
                repeat: -1,
            },
    
            {
                key: "personaje1sai_ataqueAire",
                frames: this.anims.generateFrameNumbers('saiN', {start: 80, end: 89} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje1sai_knockBack',
                frames: this.anims.generateFrameNumbers('saiN', {start: 96 ,end: 110} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje1sai_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('saiN', {start: 112,end: 121} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje1sai_ataquePotenciadoRun',
                frames: this.anims.generateFrameNumbers('saiN', {start: 112,end: 121} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje1sai_ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers('saiN', {start: 128,end: 140} ),
                frameRate: 24,
                repeat: 0,
            },
            { 
                key: 'personaje2sai_idle',//nombre de animacion
                frames: this.anims.generateFrameNumbers('saiR', {start: 0, end: 11} ),//coge el dibujo entero de esa anim, this es la scene
                frameRate: 24,//tasa frames
                repeat: -1,//ciclo cíclico
            },
               
            {
                key: 'personaje2sai_caminar',
                frames: this.anims.generateFrameNumbers('saiR', {start: 16, end: 31} ),
                frameRate: 24,
                repeat: -1, //para que la haga infinita
            },
    
            {
                key: 'personaje2sai_ataque',
                frames: this.anims.generateFrameNumbers('saiR', {start: 32, end: 43}),
                frameRate: 24,
                repeat: 0, //ciclo sencillo
            },
               
            {
                key: 'personaje2sai_salto',
                frames: this.anims.generateFrameNumbers('saiR', {start: 48, end: 55} ),
                frameRate: 12,
                repeat: -1,
            },
    
            {
                key: 'personaje2sai_caida',
                frames: this.anims.generateFrameNumbers('saiR', {start: 64, end: 73} ),
                frameRate: 24,
                repeat: -1,
            },
    
            {
                key: "personaje2sai_ataqueAire",
                frames: this.anims.generateFrameNumbers('saiR', {start: 80, end: 89} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje2sai_knockBack',
                frames: this.anims.generateFrameNumbers('saiR', {start: 96 ,end: 110} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje2sai_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('saiR', {start: 112,end: 121} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje2sai_ataquePotenciadoRun',
                frames: this.anims.generateFrameNumbers('saiR', {start: 112,end: 121} ),
                frameRate: 24,
                repeat: 0,
            },
    
            {
                key: 'personaje2sai_ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers('saiR', {start: 128,end: 140} ),
                frameRate: 24,
                repeat: 0,
            },
            ///////////////////////////
            {
                key: 'personaje1kusa_idle',
                frames: this.anims.generateFrameNumbers('kusaN', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1kusa_caminar',
                frames: this.anims.generateFrameNumbers('kusaN', { start: 16, end: 31 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1kusa_ataque',
                frames: this.anims.generateFrameNumbers('kusaN2', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1kusa_salto',
                frames: this.anims.generateFrameNumbers('kusaN', { start: 32, end: 39 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1kusa_caida',
                frames: this.anims.generateFrameNumbers('kusaN', { start: 48, end: 57 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1kusa_ataqueAire',
                frames: this.anims.generateFrameNumbers('kusaN', { start: 64, end: 72 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1kusa_knockBack',
                frames: this.anims.generateFrameNumbers('kusaN', {start: 80, end: 95}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1kusa_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('kusaN', { start: 96, end: 107 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1kusa_ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers('kusaN3', { start: 0, end: 22}), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            
            {
                key: 'personaje2kusa_idle',
                frames: this.anims.generateFrameNumbers('kusaR', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2kusa_caminar',
                frames: this.anims.generateFrameNumbers('kusaR', { start: 16, end: 31 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2kusa_ataque',
                frames: this.anims.generateFrameNumbers('kusaR2', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2kusa_salto',
                frames: this.anims.generateFrameNumbers('kusaR', { start: 32, end: 39 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2kusa_caida',
                frames: this.anims.generateFrameNumbers('kusaR', { start: 48, end: 57 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2kusa_ataqueAire',
                frames: this.anims.generateFrameNumbers('kusaR', { start: 64, end: 72 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2kusa_knockBack',
                frames: this.anims.generateFrameNumbers('kusaR', {start: 80, end: 95}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2kusa_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('kusaR', { start: 96, end: 107 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir indefinidamente
            },
            {
                key: 'personaje2kusa_ataquePotenciadoHit',
                frames: this.anims.generateFrameNumbers('kusaR3', { start: 0, end: 22}), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1tanegashima_idle',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1tanegashima_caminar',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 18, end: 33 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1tanegashima_ataque',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 36, end: 53 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1tanegashima_salto',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 54, end: 61 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1tanegashima_caida',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 72, end: 81 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje1tanegashima_ataqueAire',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 90, end: 107 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1tanegashima_knockBack',
                frames: this.anims.generateFrameNumbers('tanegashimaN', {start: 108, end: 122}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje1tanegashima_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('tanegashimaN', { start: 126, end: 157 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir indefinidamente
            },
            {
                key: 'personaje2tanegashima_idle',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 0, end: 11 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2tanegashima_caminar',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 18, end: 33 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2tanegashima_ataque',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 36, end: 53 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2tanegashima_salto',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 54, end: 61 }), // Index de frames para la animación
                frameRate: 12, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2tanegashima_caida',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 72, end: 81 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            },
            {
                key: 'personaje2tanegashima_ataqueAire',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 90, end: 107 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2tanegashima_knockBack',
                frames: this.anims.generateFrameNumbers('tanegashimaR', {start: 108, end: 122}),
                frameRate: 24,
                repeat: 0 // Repetir hasta que acabe
            },
            {
                key: 'personaje2tanegashima_ataquePotenciado',
                frames: this.anims.generateFrameNumbers('tanegashimaR', { start: 126, end: 157 }), // Index de frames para la animación
                frameRate: 24, // Velocidad de la animación
                repeat: 0 // Repetir indefinidamente
            },
            {
                key: 'idle',//nombre de animacion
                frames: this.anims.generateFrameNumbers('cartas', {start: 0, end: 0} ),//coge el dibujo entero de esa anim, this es la scene
                frameRate: 24,//tasa frames
                repeat: -1,//ciclo cíclico
            },
            {   
               key: 'negro',//nombre de animacion
               frames: this.anims.generateFrameNumbers('cartas', {start: 12, end: 23} ),//coge el dibujo entero de esa anim, this es la scene
               frameRate: 24,//tasa frames
               repeat: 0,//ciclo simple
            },
            {   
              key: 'rojo',//nombre de animacion
              frames: this.anims.generateFrameNumbers('cartas', {start: 24, end: 35} ),//coge el dibujo entero de esa anim, this es la scene
              frameRate: 24,//tasa frames
              repeat: 0,//ciclo simple
           },
       
           {   
              key: 'rayo',//nombre de animacion
              frames: this.anims.generateFrameNumbers('cartas', {start: 36, end: 42} ),//coge el dibujo entero de esa anim, this es la scene
              frameRate: 24,//tasa frames
              repeat: 0,//ciclo simple
           },
           {   
            key: 'lucha',//nombre de animacion
            frames: this.anims.generateFrameNumbers('textoLucha', {start: 0, end: 3} ),//coge el dibujo entero de esa anim, this es la scene
            frameRate: 3,//tasa frames
            repeat: 0,//ciclo simple
           },
           {
            key: 'menuBGAnim',
            frames: this.anims.generateFrameNumbers('menuBackground', {start: 0, end: 11} ),
            frameRate: 24,
            repeat: -1
           }
        ];
    }

    completeLoad() {
        // Aquí se puede cambiar a la siguiente escena cuando todo esté cargado
        this.time.delayedCall(500, () => {
            this.scene.start('menu'); // Reemplaza con el nombre de la siguiente escena
        });
    }
}