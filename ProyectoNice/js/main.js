class Usuario{
    constructor(objUser){
        this.nombre = objUser.nombre;
        this.usuario = objUser.usuario;
        this.pass = objUser.pass;
        this.puntos = objUser.puntos;
        
        var rompecabezas = [];
          $.each(objUser.rompecabezas, function(i, rmp){
            rompecabezas.push(new Rompecabeza(rmp));   
        });
        this.rompecabezas = rompecabezas;
    }
}

class Rompecabeza{
    constructor(objRmp){
        this.titulo = objRmp.titulo;
        this.portada = objRmp.portada;
        this.sonido = objRmp.sonido;
        
         var piezas = [];
          $.each(objRmp.piezas, function(i, pieza){
            piezas.push(new Pieza(pieza));   
        });
        this.piezas = piezas;
    }
}

class Pieza{
    constructor(objPieza){
        this.imagen = objPieza.imagen;
        this.orden = objPieza.orden;
    }
}

function listarRompecabezas(){
    var usuarios=[];
    $.getJSON('info.json', function(data){
       
        $.each(data, function(i, usr){
            usuarios.push(new Usuario(usr));   
        });
        
          console.log(usuarios);
        
     $.each(usuarios[0].rompecabezas, function(i, objRmp){
            $("#lista").append("<div class='col-md-4'>\
                        <button id='btnLista' onclick='enviar("+i+")'>\
                        <h3 id='idh3'>"+ objRmp.titulo + "</h3>\
                        <img class='imgPortada' src='" + objRmp.portada + "'alt=''>\
                        </button>\
                        </div>"); 
        });
        
        let dataStr = JSON.stringify(usuarios);
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        let exportFileDefaultName = 'datos.json';
        
        $("#exportar").attr('href', dataUri);
        $("#exportar").attr('download', exportFileDefaultName);    
        
    });  
    
}






















