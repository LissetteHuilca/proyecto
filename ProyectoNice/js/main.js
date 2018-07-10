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
                        <img class='imgPortada img-fluid' src='" + objRmp.portada + "'alt=''>\
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

function enviar(pos) {
    localStorage.setItem("posRmp", pos);
    window.location = "rompecabeza.html";
};

var intentos=0;
var piezaCrr = 0;

function recibir(){
    
     $("#audioFondo").html("<audio loop id='audioF' controls><source type='audio/wav' src='../rompecabeza/pig-oink.mp3'></audio>");
     $("#audioF")[0].play();
    
    var recoger = localStorage.getItem("posRmp");
    //alert(recoger);
    var usuarios=[];
     $.getJSON('info.json', function(data){
       
        $.each(data, function(i, usr){
            usuarios.push(new Usuario(usr));   
        });
        
          console.log(usuarios);
        
     $.each(usuarios[0].rompecabezas, function(i, objRmp){
            if(i==recoger){
                //alert(objRmp.titulo);
                $("#titulo").html(objRmp.titulo);
                $("#puntaje").html(usuarios[0].puntos);
                $("#intentos").html(intentos);
                
                var lista = objRmp.piezas;
                lista = objRmp.piezas.sort(function() {return Math.random() - 0.5})
                
                $.each(objRmp.piezas, function(i, objPieza){
                     $(".piezas").append("<div class='col-md-4'>"+objPieza.orden+"<img id='s"+objPieza.orden+"' class='imgPieza' src='"+objPieza.imagen+"'></div>"); 
                    
                    $("#s"+objPieza.orden).draggable({
                        revert: true
                    });                   
                    
                    $(".fondoRmp").append("<div id='fs"+(i+1)+"' class='col-md-4 fondoPz'>"+(i+1)+"</div>");
                    
                    $("#fs"+(i+1)).droppable({
                       drop: function (event, ui) {
                         intentos++;
                        
                         $("#intentos").html(intentos);
                           
                           
                       if ("f"+ui.draggable.attr("id") == $(this).attr("id")) {
                           piezaCrr++;
                           if(piezaCrr==objRmp.piezas.length){
                              alert("GANASTE!!");
                               
                               
                               
                               $("#audio").find("source").attr("src", objRmp.sonido);
                               $("#audio").play();
                               
                              if(intentos<=15){
                                   alert("PUNTOS!!");
                                 usuarios[0].puntos++;
                                 $("#puntaje").html(usuarios[0].puntos);
                                  alert(usuarios[0].puntos);
                              }
                            }
                                var url = ui.draggable.attr("src");
                        $(this).html("<img class='imgPieza' src='" + url + "'>");
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























