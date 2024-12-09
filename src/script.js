// Archivo JavaScript donde puedes inicializar el canvas
import Menu from './escenas/menu.js'
import Templo from './escenas/templo.js';
import Carga from './escenas/carga.js';
import LogrosScene from './escenas/logrosScene.js';

let z = 1; let x = 3 / z;

const config ={
  title: 'Stick-Do',
  type :Phaser.CANVAS,
  width: 1024,
  height: 768,
  canvas: document.getElementById("juego"),
  scale: {
    mode: Phaser.Scale.FIT, // Ajusta el contenido a la pantalla
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el juego
    resizeEveryFrame: true // Redimensiona automáticamente durante el juego
  },
  
  scene: [Carga, Menu, Templo, LogrosScene],
  physics: { 
    default: 'arcade', 
    arcade: { 
        gravity: { y: 200 }, 
        debug: false,
        fps: 144
    },
    checkCollision: {
        up: true,
        down: true,
        left: true,
        right: true
    }
  },
};

window.game = new Phaser.Game(config);
window.game.canPick = false;

