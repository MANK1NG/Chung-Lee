// Archivo JavaScript donde puedes inicializar el canvas
import Menu from './escenas/menu.js'
import Templo from './escenas/templo.js';
import Carga from './escenas/carga.js';

let z = 1; let x = 3 / z;

const config ={
  title: 'Stick-Do',
  type :Phaser.CANVAS,
  canvas: document.getElementById("juego"),
  scale: {
    width: 1024,
    height: 768
      /*width: Math.floor((360 * x)  / 1488 * window.innerWidth),
      height: Math.floor((189 * x) / 783 * window.innerHeight),
      zoom: z*/
  },
  
  scene: [Carga, Menu, Menu],
  physics: { 
    default: 'arcade', 
    arcade: { 
        gravity: { y: 200 }, 
        debug: true,
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

new Phaser.Game(config);