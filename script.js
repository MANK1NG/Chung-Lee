//Iván Palomino Rodríguez

function desaparece(serieOcultar, serieMostrar) {
  // Selecciona todos los elementos con la clase especificada
  const oculto = document.querySelectorAll('.'+ serieOcultar);
  const mostrar = document.querySelectorAll('.'+ serieMostrar);

/*let SeOculta = false;
let continuar = true;
  for(const serie of mostrar){
    if(serie.style.display === 'none'){
      SeOculta = true;
      //continuar = false;
      break;
    }
  }
  
  if (SeOculta){
    for (const serie of mostrar) {
      serie.style.display = 'list-item'; 
    }
    for (const serie of oculto) {
      serie.style.display = 'list-item';
    }
  }else{*/
    for(const serie of mostrar){
      serie.style.display = 'list-item';
    }
    for(const serie of oculto){
      serie.style.display = 'none';
    }
}
 

function cambiarcolor(serieBuena, serieMala){
  const buena = document.querySelectorAll('.'+ serieBuena);
  const mala = document.querySelectorAll('.'+ serieMala);

  for(const serie of buena){
    const texto = serie.querySelectorAll('h2');
    for(const textoSB of texto){
      textoSB.style.color = 'green'
    }
    
  }
  for(const serie of mala){
    const texto = serie.querySelectorAll('h2');
    for(const textoSM of texto){
      textoSM.style.color = 'red'
    }
  }
}