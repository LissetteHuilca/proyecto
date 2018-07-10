class Usuario{
    constructor(objUser){
        this.nombre=objUser.nombre;//parte derecha Json
        this.usuario=objUser.usuario;
        this.pass=objUser.pass;
        this.score=objUser.score;
        
        var rompecabezas=[];
         $.each(objUser.rompecabezas, function(i, rmp){//rompecabeza(respuesta)
           rompecabezas.push(new Rompecabeza(rmp));
        });
        
        
        this.rompecabezas= rompecabezas;
    }
}
class Rompecabeza{
    constructor(objRmp){
        this.titulo=objRmp.titulo;
        this.portada=objRmp.portada;
        this.sonido=objRmp.sonido;
        
        var piezas=[];
         $.each(objRmp.piezas, function(i, pieza){//pieza(respuesta)
           piezas.push(new Pieza(pieza));
        });
        
        this.piezas=piezas;
        
    }
}

class Pieza{
    constructor(objPieza){
        this.imagen=objPieza.imagen;
        this.orden=objPieza.orden;
    }
}

function leer(){
    
    
}

function listarRompecabezas(){
    var usuarios=[];
    $.getJSON('info.json', function(data){
     
        $.each(data, function(i, user){//user(respuesta)
           usuarios.push(new Usuario(user));
        });
        
            $.each(usuarios[0].rompecabezas, function(i, objRmp){//rompecabeza(respuesta)

        $("#lista").append("<div class='col-md-4'>\<button id='btnlista' onclick='enviar("+i+")'>\ <h3 id='idh3'>" + objRmp.titulo+"</h3> \ <img class='imgPortada' src='" +objRmp.portada+"' alt=''>\</button>\ </div)");//append para muestre uno debajo del otro
    });
        
        
        //DESCARAR JSON 
        let dataStr = JSON.stringify(usuarios);
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        let exportFileDefaultName = 'info.json';
        $("#exportar").attr('href',dataUri);
        $("#exportar").attr('download',exportFileDefaultName);
     
        });
    
 
}


 function enviar(pos) {
    localStorage.setItem("posRmp", pos);//guardar en cache
    window.location = "rompecabeza.html";
};


var intentos=0;
var piezaCorrecta=0;
 function recibir() {
     
     //AUDIO DE FONDO
     $("#audioFondo").html("<audio loop id='audioF' controls><source type='audio/wav' src='..\/rompecabeza\/lagranja.mp3'></audio>");
    $("#audioF")[0].play();
     
     
    var recoger = localStorage.getItem("posRmp");//guardar 
    //alert(recoger);
     
     
      var usuarios=[];
    $.getJSON('info.json', function(data){
     
        $.each(data, function(i, user){//user(respuesta)
           usuarios.push(new Usuario(user));
        });
        //obteniendo los datos de cada rompecabezas
            $.each(usuarios[0].rompecabezas, function(i, objRmp){//rompecabeza(respuesta)

        if(i==recoger){
            
            $("#titulo").html(objRmp.titulo);
             $("#puntaje").html(usuarios[0].score);
             $("#intentos").html(intentos);
            
            var lista= objRmp.piezas;
            lista= objRmp.piezas.sort(function() {return Math.random() - 0.5})
            
         $.each(lista, function(i, objPieza){//user(respuesta)
           $(".piezas").append("<div class='col-md-4'>"+objPieza.orden+"<img id='s"+objPieza.orden+"' src='"+objPieza.imagen+"'></div>");
             
            $("#s"+objPieza.orden).draggable({ revert: true});//si no es compatible con la posisicon se regresa // llama al mismo id
             
             
             
             $(".fondoRmp").append("<div id='fs"+(i+1)+"' class='col-md-4 fondoPz'>"+(i+1)+"</div>");
             
             
             //que reciban el tablero
             $("#fs"+(i+1)).droppable({
        drop: function (event, ui) {
            intentos++;
        
             $("#intentos").html(intentos);
            //alert(intentos);
            if ("f"+ui.draggable.attr("id") == $(this).attr("id")) {
                
                piezaCorrecta++;
                
                if(piezaCorrecta == objRmp.piezas.length){
                   
                   alert("GANASTE!");
                    
                    
                    
                    if(intentos<=15){
                        
                        alert("PUNTOS!!");
                        
                       
                       usuarios[0].score++;
                        
                        
                         $("#puntaje").html(usuarios[0].score);
                       }
                     
                    
                    
            }
                   // alert("f");
                var url = ui.draggable.attr("src");
                $(this).html("<img objPieza.orden src='" + url + "'>");
                 ui.draggable.remove();

                
                $("#audioDiv").html("<audio id='audioA' controls><source type='audio/wav' src='"+objRmp.sonido+"'></audio>");
                                    $("#audioA")[0].play();
            } 


        }
    });
             
             
        });
            
            
            
            
            
        }
                
                
                
    });
 });
    
}


    
    





