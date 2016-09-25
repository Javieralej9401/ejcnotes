<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Notes</title>
    <link rel="stylesheet" href="estilos.css">
    <link rel="stylesheet" href="font-awesome-4.5.0/css/font-awesome.min.css">
    <script src="jquery-1.12.0.min.js"></script>

</head>



<body>

    <div class="menu-opcion" style="display: none">
        <div class="titulo-mostrar"></div>
        <ul>
            <li class="eliminarNota"><span class="titulo-opcion">Eliminar Nota</span></li>
            <li class="duplicarNota"><span class="titulo-opcion">Duplicar Nota</span></li>
            <li class="agregar-grupo">
                <span class="titulo-opcion"> Anexar un grupo </span>
                <input type="text" placeHolder="Escribe un nombre de grupo." class="input-menu input-grupo">
            </li>
            <li class="agregar-clase">
                <span class="titulo-opcion">Anexar una clase </span>
                <input type="text" placeHolder="Escribe un nombre de clase." class="input-menu input-clase">
            </li>
        </ul>
    </div>


    <section class="contendor-flex contenedor-top">
        <div class="nueva-nota-contenedor contenedor vista-nota-2">
            <div class="nueva-nota-titulo">
                <input type="text" id="input-titulo" class="input-titulo" placeholder="Título">
            </div>
            <div class="nueva-nota-contenido">

                <div class="input-contenido" data-tipo="agregar" id="input-contenido" contenteditable="true" placeholder="Agregar una nota..."></div>

                <i class="boton botonAccionToggle  fa fa-search"></i>
                <i class="boton fa fa-filter botonFiltrar"></i>

                <div class="menu-opcion menu-filtros">
                    <ul>
                        <li>
                            <i class="boton fa fa-users"></i>
                            <input type="text" placeHolder="Grupo...">
                        </li>
                        <li>
                            <i class="boton fa fa-keyboard-o"></i>
                            <input type="text" placeHolder="Texto...">

                        </li>
                        <li>
                            <i class="boton fa fa-calendar"></i>
                            <input type="text" placeHolder="Fecha de creación...">

                        </li>
                        <li>
                            <i class="boton fa fa-exclamation"></i>
                            <input type="text" placeHolder="Importancia...">

                        </li>
                        <li style="justify-content:flex-end; padding:4px; background-color: #FFF">
                            <button role="button" class="btn-submit" type="submit">Aplicar</button>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="etiquetas-contenedor" style="margin: 0px"></div>

            <div class="nueva-nota-pie">
                <div class="nota-menu">
                    <i class=" fa fa-user-plus boton"> </i>
                    <i class=" botonColor fa fa-paint-brush boton"></i>
                    <i class=" botonImagen fa fa-picture-o boton"></i>
                    <i class=" fa fa-ellipsis-v boton botonOpciones"></i>
                </div>
                <button class="btn-agregar-nota">
                    Agregar
                </button>
            </div>
        </div>


        <div style="display:flex; width:100%; justify-content:center; margin:10px; margin-bottom:0px">
            <i class="boton fa fa-sticky-note botonCambiarVista " data-vista="standar"></i>
            <i class="boton fa fa-table botonCambiarVista " data-vista="tabular"></i>
        </div>

    </section>

    <div class="contenedor-colores" style="display: none">
        <div class="boton-color"></div>
    </div>

    <div class="nota-contenedor contenedor plantilla" style="display:none">
        <div class="titulo-nota"></div>
        <div class="cuerpo-nota"></div>
        <div class="info-nota">
            <div class="nota-creador">
                <i class="fa fa-user"></i>
                <span class="texto-creador"></span>
            </div>
            <div class="fecha-creacion">
                <i class="fa fa-clock-o"></i>
                <span class="texto-fecha"></span>

            </div>
        </div>
        <div class="etiquetas-contenedor">

        </div>
        <div class="pie-nota">
            <div class="nota-menu oculto">
                <i class="boton fa fa-user-plus"> </i>
                <i class="boton botonColor fa fa-paint-brush"></i>
                <i class="boton botonImagen fa fa-picture-o"></i>
                <i class="boton botonOpciones fa fa-ellipsis-v"></i>
            </div>


        </div>
    </div>

    <div class="modal ">
        <div class="modal-content contenedor vista-nota-2">
            <div class="modal-header">
                <div class="content-editable" contenteditable="true">

                </div>

            </div>
            <div class="modal-body">

                <div class="content-editable" contenteditable="true" placeholder="Contenido de la nota..."></div>
            </div>
            <div class="info-nota">
                <div class="nota-creador">
                    <i class="fa fa-user"></i>
                    <span class="texto-creador"></span>
                </div>
                <div class="fecha-creacion">
                    <i class="fa fa-clock-o"></i>
                    <span class="texto-fecha"></span>

                </div>
            </div>
            <div class="etiquetas-contenedor"></div>
            <div class="modal-footer">
                <div class="nota-menu ">
                    <i class="boton fa fa-user-plus"> </i>
                    <i class="boton botonColor fa fa-paint-brush"></i>
                    <i class="boton botonImagen fa fa-picture-o"></i>
                    <i class="boton fa fa-ellipsis-v botonOpciones"></i>

                </div>
                <div style="    align-self: stretch; display: flex;">

                    <button class="btn-modificar-nota">
                        Modificar
                    </button>
                </div>

            </div>
        </div>

    </div>


    <div class="panel-vista-notas-contenedor" vista-contenedor="tabular">
        <div class="panel panel-izquierdo">
            <div class="panel-top">
                <button class="btn-nueva-nota-2 btn-md" style="float:right; margin:2px">
                    <i class="fa fa-sticky-note"></i> Nueva nota</button>
                <label for="">Ordenar Por</label>
            </div>
            <div id="contenedor-notas-tabular" class="notas-contenedor-3">
            </div>

        </div>
        <div class="panel panel-derecho contenedor vista-nota-2">
            <div class="contenido-panel">
                <div class="cabecera">
                    <input type="text" placeholder="Título de la nota" class="input titulo-nota-panel">
                    <div class="opciones-nota">
                        <div class="nota-menu ">
                            <div class="boton"><i class=" fa fa-user-plus"> </i></div>
                            <div class="boton botonColor"><i class="  fa fa-paint-brush"></i></div>
                            <div class="boton botonImagen"><i class=" fa fa-picture-o"></i></div>
                            <div class="boton botonOpciones"><i class=" fa fa-ellipsis-v "></i></div>
                        </div>
                    </div>
                </div>
                <div class="contenedor-contenido">
                    <div class="carret" id="carret-panel-derecho"></div>
                    <div class="cuerpo-nota">
                        <div class="contenido-nota" placeholder="Escribe la nota..." contenteditable="true">

                        </div>

                    </div>
                    <div class="etiquetas-contenedor">
                        <div class="etiqueta">Grupo</div>
                        <div class="etiqueta">Grupo</div>
                        <div class="etiqueta">Grupo</div>
                        <div class="etiqueta">Grupo</div>
                        <div class="etiqueta">Grupo</div>
                    </div>

                    <div class="pie-nota">
                        <button class="btn-lg btn-aceptar"> Modificar </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="nota-item-panel" style="display:none">

        <div class="titulo"> </div>


    </div>

    <div class="visorImagenes" style="display:none">
        <div class="navegacion imagenAnterior"> <i class="fa fa-chevron-left"></i> </div>
        <div class="navegacion imagenSiguiente"> <i class="fa fa-chevron-right"></i> </div>
        <input type="file" multiple>

        <div class="background-empty">
            <div class="aviso"> Las imagenes de la nota estarán aquí.</div>
            <i class="fa fa-picture-o"></i>
        </div>

    </div>

    <button class="btn-submit btn-guardar-cambios">Guardar cambios</button>




    <script src="NotesAPI.js"></script>

    <script>
        $(document).ready(function () {

            var EjemploNotas = [
                {
                    "id": "nota1",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "información entre dos o más participantes con el fin de transmitir o" + "recibir significados a través de un sistema compartido de signos y normas" + "semánticas. Los pasos básicos de la comunicación son la formación" + " de una intención de comunicar, la composición del mensaje, la " + " codificación del mensaje, la transmisión de la señal, la recepción de" + "la señal, la decodificación del mensaje y, finalmente, la interpretación" + "del mensaje por parte de un receptor." + "La comunicación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Trabajo", "Importante", "Clases de guitarra"]
                 },
                {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "RJG",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "EAG",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "EAG",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Desarrollo"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "ABC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Marketing"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Att Cliente"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Marketing"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },  {
                    "id": "nota2",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "icación" + "en general toma lugar entre tres categorías de sujetos principales: los" + " seres humanos (lenguaje), los organismos vivos (biosemiótica) y los" + " dispositivos de comunicación habilitados (cibernética).",
                    "creador": "JFP",
                    "inicio": "01-02-2016",
                    "color": "rgb(128, 216, 255)",
                    "etiquetas": ["Clases de guitarra"]

                 }, {
                    "id": "nota3",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 },
                 {
                    "id": "nota4",
                    "titulo": "La comunicación",
                    "contenido": "Comunicación es la actividad consciente de intercambiar" + "inf",
                    "color": "rgb(128, 216, 255)",
                    "creador": "JAC",
                    "inicio": "01-02-2016",
                    "etiquetas": ["Trabajo"]
                 }


            ];

            var colores = {
               "BLANCO" : {
                    nombre: "Blanco",
                    color: "rgb(255,255,255)"
               },
               "ROJO" :  {
                    nombre: "Rojo",
                    color: "rgb(255, 138, 128)"
               },
               "NARANJA": {
                    nombre: "Naranja",
                    color: "rgb(255, 209, 128)"
               },
               "AMARILLO": {
                    nombre: "Amarillo",
                    color: "rgb(255, 255, 141)"
               },
               "GRIS" : {
                    nombre: "Gris claro",
                    "color" : "rgb(207, 216, 220)"
               },
               "AZUL" : {
                    nombre: "Azul",
                    color: "rgb(128, 216, 255)"
               },
               "VERDE" :{
                    "nombre" : "Verde Claro",
                    "color" : "rgb(204, 255, 144)"
               },
               "TURQUESA" : {
                    "nombre": "Turquesa",
                    "color": "rgb(167, 255, 235)"
               }
            };

            for(var i = 0; i < EjemploNotas.length; i++) {

                var randId = Math.floor(Math.random() * (Object.keys(colores).length - 1)) + 0;
                EjemploNotas[i].titulo =  ("Texto random " + randId).substring(0,50);

                var idColor = Object.keys(colores)[randId];
                EjemploNotas[i].color = idColor;
            }

            //Se inicia los recursos necesarios
            eFactoryNotesAPI.init({
                colores : colores
            });
            //Se establece las notas a la app
            eFactoryNotesAPI.setNotas(EjemploNotas);
            //Se renderiza con vista standar
            eFactoryNotesAPI.render();



        })
    </script>

</body>

</html>



