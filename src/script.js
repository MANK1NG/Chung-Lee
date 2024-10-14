// Archivo JavaScript donde puedes inicializar el canvas
let z = 1; let x = 3 / z;

const config ={
  title: 'Stick-Do',
  type :Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  scale: {
      width: Math.floor((360 * x)  / 1488 * window.innerWidth),
      height: Math.floor((189 * x) / 783 * window.innerHeight),
      zoom: z
  },
  width: 600,
  height: 400,
  parent: 'container',
  backgroundColor:'#423423'
  
};


const game = new Phaser.Game(config);