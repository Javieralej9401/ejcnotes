/* API de la vista para notas */
var eFactoryNotesAPI = (function ($) {

    'use strict';

    var NotasContenedor = null,
        CantMaxNotasPorFila = 0,
        AppNotas = [],
        vistaSeleccionada = "standar",
        colores = {};


    //Método para establecer el wrapper principal de las notas;
    var SetContenedor = function SetContenedor(contenedor) {

        var ContenedorAaplicar = $("body");

        if(!contenedor) {

            var div = document.createElement("div")
            div.className = "notas-contenedor";
            $(div).css({
                width: "0px",
                position: "relative",
                height: "100%",
                top: "0px"

            });

            $(div).insertAfter($(".contenedor-top"))
            $(div).attr("vista-contenedor", "standar")

            ContenedorAaplicar = $(div);
        } else {
            ContenedorAaplicar = contenedor;
        }


        NotasContenedor = ContenedorAaplicar;
        NotasContenedor.show();
        AppNotas.setEl(NotasContenedor);

    };

    //Método que llena una plantilla de colores; 
    var InicializarColores = function InicializarColores(colores) {

        var ContenedorColores = $(".contenedor-colores"),
            PlantillaColor = ContenedorColores.find(".boton-color").eq(0);

        for(var key in colores) {

            PlantillaColor.clone()
                .css({
                    "background-color": colores[key].color
                })
                .attr({
                    "data-id": key,
                    "data-nombre": colores[key].nombre
                })
                .appendTo(ContenedorColores);

        }
        PlantillaColor.remove();

    }

    //Método usado para calcular el acho de un div;
    var CalcularAnchoContenedor = function CalcularAnchoContenedor(NotasContenedor) {

        var AnchoBody = $("body").css("width");

        NotasContenedor.css({
            "width": AnchoBody,
            "margin": "0 auto",
        });

    }

    //Método que manda a comprimir las notas cuando la pantalla cambia de tamaño
    var ComprimirNotas = function ComprimirNotas() {

        if(vistaSeleccionada !== "standar") {
            return;
        }
        var Notas = NotasContenedor.find(".nota-contenedor[data-status=mostrar]");

        CalcularAnchoContenedor(NotasContenedor);

        var AnchoContenedor = parseFloat(NotasContenedor.css("width"));
        var AnchoNota = Notas.eq(0).outerWidth(true) || 1;

        var CantMaxCalculado = parseInt(AnchoContenedor / AnchoNota);

        CantMaxNotasPorFila = CantMaxCalculado <= 0 ? 1 : CantMaxCalculado;

        var AnchoMaxFila = -9999,
            pos_iz_ant = 0,
            pos_top_ant = 0,
            contadorFilas = 1,
            PrimeroFila;

        if(Notas.length > 0) {
            PrimeroFila = Notas.eq(0);
        }
        var CantNotas = Notas.length;

        for(var i = 0; i < CantNotas; i++) {

            var Nota = Notas.eq(i),
                top_anterior = pos_top_ant,
                indFilaAnt = i - CantMaxNotasPorFila;

            while(indFilaAnt >= 0) {

                var NotaTop = Notas.eq(indFilaAnt);
                pos_top_ant += parseFloat(NotaTop.outerHeight(true));
                indFilaAnt = indFilaAnt - CantMaxNotasPorFila;
            }


            Nota.css("left", pos_iz_ant)
            Nota.css("top", pos_top_ant)

            pos_iz_ant += Nota.outerWidth(true);
            pos_top_ant = top_anterior;

            if(contadorFilas === CantMaxNotasPorFila) {

                if(pos_iz_ant > AnchoMaxFila) {
                    AnchoMaxFila = pos_iz_ant;
                }

                pos_iz_ant = 0;
                contadorFilas = 0;
            }

            contadorFilas += 1;

        }

        AnchoMaxFila = AnchoMaxFila < 0 ? 300 : AnchoMaxFila;

        var MargenLateral = 0;

        if(Notas.length < CantMaxNotasPorFila) {
            MargenLateral = AnchoNota / 2;
        } else {
            MargenLateral = (AnchoContenedor - AnchoMaxFila) / 2
        }

        NotasContenedor.css({

                "margin-left": MargenLateral + "px",
                "margin-right": MargenLateral + "px",
                "margin-top": "20px",
                "width": AnchoContenedor - MargenLateral * 2,

            })
            //$("body").css("min-height", $(document).height())


    }

    //Método para generar id aleatorios;
    function guidGenerator() {
        var S4 = function () {
            return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    //Método para establecer cursor final 
    var establecerCursorFinal = function establecerCursorFinal(el) {
        el = el[0];
        el.focus();

        if(typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if(typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    Array.prototype.unique = function () {
        var a = this.concat();
        for(var i = 0; i < a.length; ++i) {
            for(var j = i + 1; j < a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };


    //Controlador de la vista de las notas;
    var Nota = function (data) {

        var self = this,
            Id = data.id || "",
            Titulo = data.titulo || "",
            Contenido = data.contenido || "",
            Color = data.color || "BLANCO",
            Etiquetas = data.etiquetas || [],
            Model_Accion = data.model_acc || "",
            Creador = data.creador,
            FechaInicio = data.inicio,
            cambiosNota = [],
            El = null;
        if(Id.trim() == "") {
            Id = guidGenerator();
        }

        Id = guidGenerator();



        var VistasNota = {
            "standar": function () {
                return Init();
            },
            "tabular": function () {
                var NuevaNota = $(".nota-item-panel").eq(0).clone();
                NuevaNota.find(".titulo").text(Titulo);
                NuevaNota.css({
                    "display": "block",
                    "background": "none"

                });
                NuevaNota.attr("id", Id);
                return NuevaNota[0];
            }
        }


        var Init = function () {

            var NuevaNota = $(".nota-contenedor").eq(0).clone().removeClass("plantilla");
            NuevaNota.find(".visorImagenes").remove();

            NuevaNota.css({
                "display": "block",
                "background-color": colores[Color].color,

            });

            NuevaNota.find(".titulo-nota").text(Titulo);
            NuevaNota.find(".cuerpo-nota").text(Contenido);
            NuevaNota.find(".texto-creador").text(Creador);
            NuevaNota.find(".texto-fecha").text(FechaInicio);

            NuevaNota.attr("id", Id)
            NuevaNota.attr("data-status", "mostrar");

            var contenedorEtiquetas = NuevaNota.find(".etiquetas-contenedor");

            var HtmlEtiquetas = "";

            for(var i = 0; i < Etiquetas.length; i++) {
                var etiqueta = Etiquetas[i];
                HtmlEtiquetas += '<div class="etiqueta">' + etiqueta + ' </div>';

            }
            contenedorEtiquetas.html(HtmlEtiquetas);


            El = NuevaNota;

            return El[0];
        }

        Init();

        self.ObtenerId = function () {

            return Id;
        }


        self.ObtenerTitulo = function () {

            return Titulo;
        }

        self.ObtenerContenido = function () {

            return Contenido;
        }

        self.ObtenerColor = function () {
            return colores[Color].color;
        }

        self.ObtenerVista = function (tipo) {

            if(!tipo) {
                return El[0];
            }

            var Vista = VistasNota[tipo];

            if(!Vista) {

                Vista = El[0];
            }

            return Vista();

            // return El[0];

        }
        self.ObtenerEl = function () {
            return El;
        }
        self.ObtenerEtiquetas = function () {
            return Etiquetas;
        }
        self.AgregarEtiqueta = function (valorEtiqueta) {

            Etiquetas.push(valorEtiqueta);

            var contenedorEtiquetas = El.find(".etiquetas-contenedor");
            contenedorEtiquetas.append('<div class="etiqueta">' + valorEtiqueta + ' </div>');

            if(Model_Accion !== "add") {
                Model_Accion = "act";
            }
            cambiosNota = cambiosNota.concat(["etiquetas"]).unique();
            ComprimirNotas();

        }
        self.modificarEtiqueta = function (indice, contenidoEtiqueta) {

            var contenidoResultado = ""

            if(indice >= 0) {
                if(contenidoEtiqueta !== "") {
                    contenidoResultado = contenidoEtiqueta.trim();
                    Etiquetas[indice] = contenidoEtiqueta;
                    ComprimirNotas();
                } else {
                    contenidoResultado = Etiquetas[indice];
                }
            }


            return contenidoResultado;

        }

        self.Actualizar = function (data) {

            if(data.color) {
                Color = data.color;
                El.css("background-color", colores[Color].color);
            }
            if(data.contenido) {
                Contenido = data.contenido;
                El.find(".cuerpo-nota").text(Contenido);
            }
            if(data.titulo) {
                Titulo = data.titulo;
                El.find(".titulo-nota").text(Titulo)
            }

            if(Model_Accion !== "add") {
                Model_Accion = "act";
                cambiosNota = cambiosNota.concat(data.cambiosNota).unique();
            } else {
                cambiosNota = [];
            }

        }
        self.ObtenerModel_Action = function () {
            return Model_Accion;
        }

        self.SetModel_Action = function (accion) {
            Model_Accion = accion;
        }
        self.ObtenerCreador = function () {
            return Creador;
        }

        self.toJson = function () {

            return {
                "id": Id,
                "titulo": Titulo,
                "contenido": Contenido,
                "color": Color,
                "etiquetas": Etiquetas,
                "creador": Creador,
                "fechaInicio": FechaInicio,
                "model-acc": Model_Accion,
                "actualizaciones": cambiosNota,
            }
        }

    }


    //Controlador de la vista de la colección de notas;
    var ColeccionNotas = function (coleccionNotas) {

        var self = this;
        var coleccion = [];
        var El = NotasContenedor;

        if(coleccionNotas) {
            for(var i = 0; i < coleccionNotas.length; i++) {

                coleccion.push(new Nota(coleccionNotas[i]));
            }
        }


        self.setEl = function (contenedor) {
            El = contenedor;
        }
        self.ObtenerColeccion = function () {
            return coleccion;
        }
        self.AgregarNota = function (data) {

            var NuevaNota = new Nota(data);

            coleccion.push(NuevaNota);

            $(NuevaNota.ObtenerVista()).prependTo(El);
            ComprimirNotas();
        }
        self.ActualizarNota = function (id, data) {

            for(var i = 0; i < coleccion.length; i++) {
                if(coleccion[i].ObtenerId() === id) {

                    coleccion[i].Actualizar(data);
                    break;
                }
            }

            ComprimirNotas();


        }
        self.EliminarNota = function (id) {

            for(var i = 0; i < coleccion.length; i++) {

                var NotaActual = coleccion[i];

                if(NotaActual.ObtenerId() === id) {

                    NotaActual.ObtenerEl().fadeOut("medium", function () {
                        $(this).remove();
                    });

                    var AccionModelo = NotaActual.ObtenerModel_Action();

                    if(AccionModelo === "add") {
                        coleccion.splice(i, 1);
                    } else {
                        NotaActual.SetModel_Action("del");
                    }

                    setTimeout(function () {
                        ComprimirNotas();

                    }, 500)

                    break;
                }


            }


        };
        self.ObtenerNota = function (idNota) {

            var notaEncontrada = false;
            var objNota = null;

            for(var i = 0; i < coleccion.length; i++) {

                var NotaActual = coleccion[i];

                if(NotaActual.ObtenerId() === idNota) {

                    objNota = NotaActual;
                    notaEncontrada = true;

                    break;
                }


            }
            return objNota;

        };
        self.buscarNota = function (clave) {

            clave = clave.trim();
            var NotasEnc = El.find(".nota-contenedor");

            var comprimirRetardado = function () {
                El.css("opacity", "0");
                setTimeout(function () {

                    ComprimirNotas();
                    El.css("opacity", "1");

                }, 500);

            }
            if(clave === "") {
                NotasEnc.attr("data-status", "mostrar").show();
                comprimirRetardado();

                return;
            }

            var notasEncontradas = [];


            for(var i = 0; i < coleccion.length; i++) {

                var NotaActual = coleccion[i];

                var claveEncontrada = (
                    NotaActual.ObtenerTitulo().toLowerCase().indexOf(clave.toLowerCase()) > -1 || NotaActual.ObtenerContenido().toLowerCase().indexOf(clave.toLowerCase()) > -1 ||
                    NotaActual.ObtenerEtiquetas().join(" ").toLowerCase().indexOf(clave.toLowerCase()) > -1 ||
                    NotaActual.ObtenerCreador().toLowerCase().indexOf(clave.toLowerCase()) > -1

                )
                if(claveEncontrada) {

                    notasEncontradas.push(NotaActual.ObtenerEl()[0]);

                }


            }

            NotasEnc.hide("fast").attr("data-status", "ocultar");

            $(notasEncontradas).show("fast").attr("data-status", "mostrar");

            comprimirRetardado();
        }
        self.render = function () {

            if(!El || El.length === 0) {

                return;
            }
            var tipoRenderizado = vistaSeleccionada;

            var Fragmento = document.createDocumentFragment();


            for(var i = 0; i < coleccion.length; i++) {

                var VistaNota = coleccion[i].ObtenerVista(tipoRenderizado);

                Fragmento.appendChild(VistaNota);
            }

            El.html(Fragmento);

            ComprimirNotas();

        }
        self.toJson = function () {
            var notasArray = [];
            for(var i = 0; i < coleccion.length; i++) {
                notasArray.push(coleccion[i].toJson());
            }

            return notasArray;
        }

    }

    //Método para establecer o iniciar la coleccion de notas dado un json
    var setNotas = function setNotas(ColNotas) {
        AppNotas = new ColeccionNotas(ColNotas);

    }

    //Establece el tipo de vista de las notas;
    var setTipoRenderizado = function (tipo) {
        vistaSeleccionada = tipo;
    }

    // Manda a modificar una nota desde la modal;
    var modificarNotaDesdeModal = function modificarNotaDesdeModal() {

        var modalNotas = $(".modal"),
            datosNota = obtenerDatosModalNotas();


        var objNota = AppNotas.ObtenerNota(datosNota.idNota)

        var contenidoOriginal = objNota.ObtenerContenido(),
            tituloOriginal = objNota.ObtenerTitulo();

        //Se verifica que cambio

        var cambiosNota = [];
        if(contenidoOriginal.trim().toLowerCase() !== datosNota.contenido.trim().toLowerCase()) {
            cambiosNota.push("contenido");
        }
        if(tituloOriginal.trim().toLowerCase() !== datosNota.titulo.trim().toLowerCase()) {
            cambiosNota.push("titulo");
        }

        modalNotas.hide();
        $("#" + datosNota.idNota).show();

        if(cambiosNota.length === 0) {
            return;
        }

        datosNota["cambiosNota"] = cambiosNota;


        AppNotas.ActualizarNota(datosNota.idNota, datosNota);
        modalNotas.find(".menu-opcion").hide();

    }

    //Obtiene los datos relacionados a una nota desde la modal (Vista de edición de notas);
    var obtenerDatosModalNotas = function obtenerDatosModalNotas() {

        var modalNotas = $(".modal"),
            idNota = $(".modal-content").attr("data-control"),
            titulo = modalNotas.find(".modal-header .content-editable").text(),
            contenido = modalNotas.find(".modal-body .content-editable").text();
        //color = modalNotas.find(".modal-content").css("background-color");

        var data = {
            idNota: idNota,
            titulo: titulo,
            contenido: contenido,
            //color: color
        }

        return data;

    }

    /*Obtiene los datos de una nota desde el panel de creación de notas (Vista Standar);
        FALTA NORMALIZAR ESTO.
    */
    var obtenerDatosNotaDesdePanel = function obtenerDatosNotaDesdePanel() {

        var TituloNota = $("#input-titulo").val(),
            ContenidoNota = $("#input-contenido").text().trim(),
            contenedor = $(".btn-agregar-nota").closest(".contenedor"),
            ColorNota = contenedor.find(".contenedor-colores")
            .find(".color-checked")
            .attr("data-id"),
            coloresNota = contenedor.find(".boton-color");
        // Se buscan las etiquetas de la nueva nota;

        var EtiquetasContenedor = contenedor
            .find(".etiquetas-contenedor");

        EtiquetasContenedor.css("margin", "0");

        var ObjEtiquetas = EtiquetasContenedor.find(".etiqueta");

        var Etiquetas = [];

        for(var i = 0; i < ObjEtiquetas.length; i++) {
            var valorEtiqueta = ObjEtiquetas.eq(i).text().trim();
            Etiquetas.push(valorEtiqueta);

        }

        return {
            titulo: TituloNota,
            contenido: ContenidoNota,
            color: ColorNota,
            etiquetas: Etiquetas

        }

    }

    //Establece los controles de vista del panel a por defecto;
    var reiniciarPanelAgregarNotas = function reiniciarPanelAgregarNotas() {

        var contenedor = $(".btn-agregar-nota").closest(".contenedor"),
            coloresNota = contenedor.find(".boton-color"),
            EtiquetasContenedor = contenedor
            .find(".etiquetas-contenedor");

        $(".nueva-nota-titulo").hide();
        $(".nueva-nota-pie").hide()


        $("#input-titulo").val("");
        $("#input-contenido").empty();


        contenedor.css("background-color", "rgb(255,255,255)")
        coloresNota.removeClass("color-checked")


        for(var i = 0; i < coloresNota.length; i++) {
            var botonColor = coloresNota.eq(i);
            if(botonColor.css("background-color") === "rgb(255, 255, 255)") {

                botonColor.addClass("color-checked")
            }
        }

        EtiquetasContenedor.html("");


    }

    //controlador que cambia de vista de notas;
    var cambiarVista = function cambiarVista(tipo) {

        var vistaNotas = {
            "standar": function () {
                $("[vista-contenedor=tabular]").hide();
                eFactoryNotesAPI.SetContenedor($(".notas-contenedor"))
                eFactoryNotesAPI.setTipoRenderizado("standar");
                $(".nueva-nota-contenedor").show();
            },
            "tabular": function () {

                eFactoryNotesAPI.SetContenedor($("#contenedor-notas-tabular"))
                eFactoryNotesAPI.setTipoRenderizado("tabular");
                $("[vista-contenedor=standar]").hide();
                $("[vista-contenedor=tabular]").css("display", "flex");
                $(".nueva-nota-contenedor").hide();
            }
        }

        if(vistaNotas[tipo]) {
            vistaNotas[tipo]();
        }

    }

    /* Helper para tooltip  
        params = {
                tipo: "normal, sticky",
                contenedor: elementoContenedor,
                elemento: plantillaTooltip,
                autoPosicionar: true,
                ejecutarAntesDeMostrar: function (elementoTooltip) {
                    Funcion antes de mostrar el toolti`p
                }
        }
    */
    $.fn.tooltip = function (params) {

        var tooltip_id = $(this)
            .attr("data-tooltip-id") || "",
            ElementoEnContenedor = "",
            contenedor = (params.contenedor !== null && params.contenedor.length > 0) ? params.contenedor : $("body");


        if(tooltip_id !== "") {
            $("#" + tooltip_id).remove();
            tooltip_id = "";
        }
        if(tooltip_id === "") {

            var idGenerado = guidGenerator();
            $(this).attr("data-tooltip-id", idGenerado);

            params.elemento.appendTo(contenedor);

            tooltip_id = idGenerado;

        }
        params.elemento.attr("id", tooltip_id);
        ElementoEnContenedor = contenedor.find("#" + tooltip_id);


        function autoPosicionar(params) {

            var elementoFuente = params.elementoFuente,
                elemento = params.elemento,
                alturaElemento = elemento.outerHeight(true),
                anchoElemento = elemento.outerWidth(true),
                posicionadoTop = elementoFuente.position().top - alturaElemento,
                posisionadoBottom = elementoFuente.outerHeight(true) + elementoFuente.position().top,
                pos_y = posicionadoTop <= 0 ? posisionadoBottom : posicionadoTop,
                AnchoBody = $("body").outerWidth(true),
                AnchoDif = AnchoBody - elementoFuente.offset().left,
                pos_derecha = elementoFuente.position().left + elementoFuente.outerWidth(true) / 2 - (parseFloat(elemento.css("width"))),
                pos_x = anchoElemento + 50 >= AnchoDif ? pos_derecha : elementoFuente.position().left;

            elemento.attr("role", "tooltip")

            var atributos = {
                left: pos_x,
                top: pos_y,
                display: "none"

            }

            return atributos;

        }

        var parametros = {
            elementoFuente: $(this),
            elemento: ElementoEnContenedor
        }

        var parametrosCss = autoPosicionar(parametros);


        ElementoEnContenedor.css(parametrosCss);

        if(params.ejecutarAntesDeMostrar) {
            params.ejecutarAntesDeMostrar(ElementoEnContenedor);
        }

        var ocultarElemento = true;

        var tipo = (params.tipo && params.tipo.trim() !== "") ? params.tipo : "normal";

        if(tipo === "normal") {

            $(this).unbind("hover").hover(function (e) {
                e.preventDefault();

                if(e.type !== "mouseenter") {
                    setTimeout(function () {
                        if(ocultarElemento) {
                            ElementoEnContenedor.hide();

                        }

                    }, 1000)
                }

            });
            ElementoEnContenedor.show();

            ElementoEnContenedor.unbind("hover").hover(function (e) {
                e.preventDefault();

                if(e.type !== "mouseenter") {
                    $(this).hide();
                    ocultarElemento = true;
                } else {
                    ocultarElemento = false;
                    $(this).show();
                }

            });


        } else {
            ElementoEnContenedor.attr("data-tipo", "sticky");
            ElementoEnContenedor.toggle();

        }

        $(this).unbind("change").change(function () {

            var parametros = {
                elementoFuente: $(this),
                elemento: ElementoEnContenedor
            }
            var css = autoPosicionar(parametros);
            ElementoEnContenedor.css(css).show();
        })



    }

    $.fn.listaNota = function () {

        var utils = {
            nuevo_item_placeholder: "Elemento de lista...",
            nuevo_item: function () {

                var _template = '<li class="nuevo_item">' +
                    '<div class="item-place"><span class="list-checkbox" ></span></div>' +
                    '<div class="lista-contenido"><div class="input-contenido-lista"  contenteditable="true" placeholder="' + this.nuevo_item_placeholder + '"></div></div>' +
                    '<span class="del-item "><i class="fa fa-minus-circle"></i></span>' +
                    '</li>';


                return _template;
            },
            self: $(this),
            establecerCursorFinal: function (el) {
                el = el[0];
                el.focus();

                if(typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if(typeof document.body.createTextRange != "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            }

        };

        var init = function () {
            var nuevoItem = $(utils.nuevo_item()),
                input = nuevoItem.find(".input-contenido-lista");
            utils.self.html(nuevoItem);
            utils.establecerCursorFinal(nuevoItem);

        }

        init();

        utils.self.on("keydown", ".input-contenido-lista", function (e) {


            var nextLi = $(this).closest("li").next("li"),
                inputSiguiente, valor = $(this).text().trim(),
                BACK_KEY = 8,
                ENTER_KEY = 13;

            if(!(nextLi.length && nextLi.hasClass("nuevo_item"))) {
                nextLi = $(utils.nuevo_item());
                nextLi.appendTo(utils.self)

            } else {
                nextLi.show();
            }


            inputSiguiente = nextLi.find(".input-contenido-lista");

            if(e.which === BACK_KEY) {
                if(valor === "") {

                    var closestLi = $(this).closest("li");
                    var anteriorLi = closestLi.prev();

                    if(anteriorLi.length) {
                        var input = anteriorLi.find(".input-contenido-lista");
                        utils.establecerCursorFinal(input);
                        closestLi.remove();
                    }
                }

            } else if(e.which === ENTER_KEY) {
                e.preventDefault();

                if(valor !== "") {
                    utils.establecerCursorFinal(inputSiguiente);
                }
            }




        });


        utils.self.on("click", ".del-item", function (e) {

            $(this).closest("li").fadeOut("fast", function () {
                $(this).remove();
            });

        });





    };

    $.fn.visorImagenes = function (params) {

        // var arrayRutasImagenes = params.imagenes;


        var utils = {

            self: $(this),
            inputFile: $(this).find("input[type=file]").eq(0),
            contenedorImagenes: $(this).find(".contenedor-imagenes"),
            botonImagenAnterior: $(this).find(".imagenAnterior"),
            botonImagenSiguiente: $(this).find(".imagenSiguiente"),
            leerImagenesDesdeInput: function (inputFile) {

                var reader = new FileReader(),
                    files = inputFile.prop("files");

                function leerArchivo(index) {

                    if(index < files.length) {
                        reader.onload = function () {

                            utils.agregarImagenesAContenedor(utils.contenedorImagenes, [reader.result])
                            leerArchivo(index + 1);
                        }
                        reader.readAsDataURL(files[index])
                    } else {
                        inputFile.val("");
                    }
                    utils.contenedorImagenes.find("img").eq(0).addClass("activa")


                }
                leerArchivo(0);

            },
            agregarImagenesAContenedor: function (contenedor, arrayRutas) {

                var i, longArray = arrayRutas.length,
                    fragment = document.createDocumentFragment();

                for(i = 0; i < longArray; i++) {

                    var imgTag = document.createElement("img");
                    imgTag.src = arrayRutas[i];
                    fragment.appendChild(imgTag);
                }

                $(fragment).appendTo(contenedor);

                var cantImagenes = utils.contenedorImagenes.find("img").length;

                if(cantImagenes <= 1) {

                    var emptyBack = utils.self.find(".background-empty");

                    if(cantImagenes <= 0) {
                        emptyBack.show();
                    } else {
                        emptyBack.hide();
                    }
                }

                if(utils.self.css("display") === "none") {
                    utils.self.show();

                    var fDespuesSubir = params.despuesSubirImagenes;

                    if(typeof fDespuesSubir === "function") {
                        fDespuesSubir();
                    }

                }


            }
        }

        utils.inputFile.on("change", function () {
            utils.leerImagenesDesdeInput($(this));
        });
        utils.botonImagenAnterior.on("click", function (e) {
            e.preventDefault();

            var imagenActiva = utils.contenedorImagenes.find(".activa"),
                imagenAnterior = imagenActiva.prev();

            if(imagenAnterior.length > 0) {
                imagenActiva.removeClass("activa");
                imagenAnterior.addClass("activa");
            }

        })

        utils.botonImagenSiguiente.on("click", function (e) {
            e.preventDefault();

            var imagenActiva = utils.contenedorImagenes.find(".activa"),
                imagenSiguiente = imagenActiva.next();

            if(imagenSiguiente.length > 0) {
                imagenActiva.removeClass("activa")
                imagenSiguiente.addClass("activa");
            }

        })
        utils.self.hover(function (e) {
            e.preventDefault();

            if(e.type === "mouseenter") {

                var cantImagenes = utils.contenedorImagenes.find("img").length;
                if(cantImagenes > 1) {

                    utils.botonImagenAnterior.show();
                    utils.botonImagenSiguiente.show();
                }

            } else {
                utils.botonImagenAnterior.hide();
                utils.botonImagenSiguiente.hide();
            }
        })

        var init = function () {

            if(utils.contenedorImagenes.length <= 0) {

                var contenedorImagenes = document.createElement("div");
                contenedorImagenes.className = "contenedor-imagenes";
                contenedorImagenes = $(contenedorImagenes);
                contenedorImagenes.appendTo(utils.self)

                utils.contenedorImagenes = contenedorImagenes;

            }

        }

        init();

    }


    //Método para inicializar la app;
    var init = function init(parametrosIniciales) {

        if(!NotasContenedor) {

            var div = document.createElement("div")
            div.className = "notas-contenedor";
            $(div).css({
                width: "0px",
                position: "relative",
                height: "100%",
                top: "0px"

            });

            $(div).insertAfter($(".contenedor-top"))
            $(div).attr("vista-contenedor", "standar")
            NotasContenedor = $(div);


        }

        colores = parametrosIniciales.colores;
        InicializarColores(colores);


        $(window).resize(function (e) {
            e.preventDefault();
            $("[role='tooltip']").hide();
            ComprimirNotas();

            return false;
        });

        $("body").on("mouseenter", ".botonColor", function (e) {
            e.preventDefault();

            var El = $(this);
            var params = {
                tipo: "normal",
                contenedor: $(this).closest(".nota-menu"),
                elemento: $(".contenedor-colores").eq(0).clone(),
                autoPosicionar: true,
                ejecutarAntesDeMostrar: function (elementoTooltip) {

                    var coloresNota = elementoTooltip.find(".boton-color");
                    coloresNota.removeClass("color-checked")
                    var Color = El.closest(".contenedor").css("background-color");

                    for(var i = 0; i < coloresNota.length; i++) {

                        var botonColor = coloresNota.eq(i);

                        if(botonColor.css("background-color") === Color) {

                            botonColor.addClass("color-checked")
                        }
                    }


                }
            }


            $(this).tooltip(params);



        });

        $("body").on("click", ".botonOpciones", function (e) {
            e.preventDefault();

            var plantilla = $(".menu-opcion").eq(0).clone(true).css("height", "auto");

            if($(this).closest(".nueva-nota-contenedor").length > 0) {

                plantilla.find(".eliminarNota").remove();
                plantilla.find(".duplicarNota").remove();

            }

            var params = {
                tipo: "sticky",
                contenedor: $(this).closest(".nota-menu"),
                elemento: plantilla,
                autoPosicionar: true
            }


            $(this).tooltip(params);

        });

        $(".botonFiltrar").on("click", function (e) {


            var params = {
                tipo: "normal",
                contenedor: null,
                elemento: $(".menu-filtros").eq(0).clone(),
                autoPosicionar: true
            }


            $(this).tooltip(params);

        });

        $("body").on("click", ".boton-color", function () {

            var El = $(this);
            var color = El.css("background-color"),
                idColor = El.attr("data-id"),
                contenedor = El.closest(".contenedor"),
                idNota = contenedor.attr("id") || contenedor.attr("data-control")

            contenedor.css("background-color", color);
            El.closest(".contenedor-colores").find(".boton-color").removeClass("color-checked");
            El.addClass("color-checked");
            AppNotas.ActualizarNota(idNota, {
                color: idColor,
                cambiosNota: ["color"],
            })


        })

        $("body").on("click", ".nota-contenedor", function (e) {

            if($(e.target).closest(".nota-menu").length === 0 && $(e.target).closest(".visorImagenes").length === 0 && $(e.target).closest(".etiqueta").length === 0) {
                var El = $(this),
                    id = El.attr("id"),
                    titulo = El.find(".titulo-nota").text(),
                    contenido = El.find(".cuerpo-nota").text(),
                    color = El.css("background-color"),
                    creador = El.find(".texto-creador").text(),
                    inicio = El.find(".texto-fecha").text(),
                    etiquetas = El.find(".etiqueta").clone(),
                    modalNotas = $(".modal"),
                    controlContenido = modalNotas.find(".modal-body .content-editable");

                El.hide();

                modalNotas.find(".modal-header .content-editable").text(titulo);
                controlContenido.text(contenido);
                establecerCursorFinal(controlContenido);

                modalNotas.find(".modal-content").attr("data-control", id).css("background-color", color)
                modalNotas.find(".modal-content .info-nota .texto-creador").text(creador);
                modalNotas.find(".modal-content .info-nota .texto-fecha").text(inicio);
                modalNotas.find(".etiquetas-contenedor").html(etiquetas)


                modalNotas.show();
            }

        })

        $("body").on("mouseleave", ".nota-contenedor", function (e) {

            var menuNota = $(this).find(".nota-menu");

            if($(this).find(".menu-opcion").css("display") === "block") {
                menuNota.addClass("ElementoSticky").removeClass("oculto");

            } else {
                menuNota.removeClass("ElementoSticky").addClass("oculto");

            }

        });

        $(".nueva-nota-contenedor").on("click", function (e) {

            var InputContenido = $(this).find(".input-contenido");

            if(InputContenido.attr("data-tipo") === "agregar") {

                if($(e.target).hasClass("boton") && !$(e.target).hasClass("fa-search")) {
                    return;

                }
                if(!$(e.target).hasClass("btn-agregar-nota")) {

                    if(e.target.tagName !== "INPUT") {
                        InputContenido.focus();
                    }

                    $(this).find(".nueva-nota-titulo").show();
                    $(this).find(".nueva-nota-pie").show().css("display", "flex");

                }

            }


        });

        $(".btn-agregar-nota").on("click", function () {

            var datosNota = obtenerDatosNotaDesdePanel();


            reiniciarPanelAgregarNotas();


            if(datosNota.contenido === "") {
                return;
            }

            AppNotas.AgregarNota({
                titulo: datosNota.titulo,
                contenido: datosNota.contenido,
                color: datosNota.color,
                creador: "Tú",
                inicio: "Justo Ahora",
                model_acc: "add",
                etiquetas: datosNota.etiquetas,
            });



        });

        $(".input-contenido").on("keydown keyup", function (e) {

            if($(this).attr("data-tipo") === "busqueda") {
                var valorInput = $(this).text().trim();

                if(e.type === "keyup") {
                    if(valorInput === "") {
                        AppNotas.buscarNota(valorInput);

                    }
                } else {

                    if(e.which === 13) {
                        e.preventDefault();
                        AppNotas.buscarNota(valorInput);

                    }
                }


            }

            e.stopPropagation();

        });

        $("body").on("click", ".eliminarNota", function (e) {

            var contenedor = $(this).closest(".contenedor"),
                idNota = contenedor.attr("id") || contenedor.attr("data-control");

            if(contenedor.hasClass("modal-content")) {
                $("#" + idNota).show();
                contenedor.closest(".modal").hide();
            }

            $(this).closest(".menu-opcion").hide();
            AppNotas.EliminarNota(idNota);

        });

        $(".agregar-grupo, .agregar-clase").on("click", function (e) {

            var El = $(this).find(".titulo-opcion"),
                menuOpcion = El.closest(".menu-opcion");

            El.closest("ul").find(".titulo-opcion").not(El).closest("li").hide();

            menuOpcion.find(".titulo-mostrar").html(El.text()).show();
            El.hide().next().show();
            $(this).find(".input-menu").focus();
            El.closest(".nota-menu").find(".botonOpciones").trigger("change")

            e.stopPropagation();

        });

        $(".input-menu").on("keydown", function (e) {

            if(e.which === 13) {
                e.preventDefault();

                var El = $(this),
                    contenedor = El.closest(".contenedor"),
                    idNota = contenedor.attr("id") || contenedor.attr("data-control"),
                    valorInput = El.val();

                if(valorInput.trim() === "") {
                    return;
                }
                if(idNota && idNota.trim() !== "") {
                    AppNotas.ObtenerNota(idNota).AgregarEtiqueta(valorInput);

                }

                El.val("");

                //Cambiar
                if(contenedor.hasClass("vista-nota-2")) {

                    if(contenedor.length > 0) {

                        var contenedorEtiqueta = contenedor.find(".etiquetas-contenedor")
                        if(contenedorEtiqueta.find(".etiqueta").length === 0) {

                            contenedorEtiqueta.css("margin", "10px 0 10px 0")
                        }

                        contenedorEtiqueta.append("<div class= 'etiqueta'> " + valorInput + " </div>")
                    }

                }




            }
        })

        $(".btn-guardar-cambios").on("click", function (e) {
            e.preventDefault();

            var NotasResultado = AppNotas.toJson();

            console.log(NotasResultado)
        })

        $(".btn-modificar-nota").on("click", function (e) {
            e.preventDefault();

            modificarNotaDesdeModal();

        });

        $(".botonAccionToggle").on("click", function (e) {

            var botonToggle = $(this),
                textoPlaceHolder = "",
                contenedorPadre = botonToggle.closest(".nueva-nota-contenedor"),
                Input = contenedorPadre.find(".input-contenido"),
                controlTituloNota = contenedorPadre.find(".nueva-nota-titulo"),
                controlPieNota = contenedorPadre.find(".nueva-nota-pie");

            Input.text("");

            if(botonToggle.hasClass("fa-plus")) {

                botonToggle.removeClass("fa-plus").addClass("fa-search");
                textoPlaceHolder = "Agrega una nota...";
                controlTituloNota.show();
                controlPieNota.show().attr("display", "flex");
                Input.attr("data-tipo", "agregar")
                NotasContenedor.find(".nota-contenedor").attr("data-status", "mostrar").show();
                ComprimirNotas();

            } else {

                botonToggle.removeClass("fa-search").addClass("fa-plus");
                textoPlaceHolder = "Busca una nota. (por título, contenido, grupo, clase, etc.)";
                Input.attr("data-tipo", "busqueda");
                controlTituloNota.hide();
                controlPieNota.hide();


            }

            Input.attr("placeHolder", textoPlaceHolder).focus();


        });

        $("html").on("click", function (e) {


            if($(e.target).hasClass("modal")) {

                modificarNotaDesdeModal();

            }

            if(!$(e.target).closest(".nota-menu").length) {
                $("[data-tipo=sticky]").hide();
            }

            if($(".input-contenido").text().trim() !== "") {
                return;
            }

            if($(e.target).closest(".nueva-nota-contenedor").length === 0) {
                $(this).find(".nueva-nota-titulo").hide();
                $(this).find(".nueva-nota-pie").hide();
            }

        })

        $("body").on("click", ".nota-item-panel", function (e) {
            e.preventDefault();

            var carretPanel = $("#carret-panel-derecho"),
                posicionTopItem = $(this).position().top,
                alturaItem = $(this).outerHeight(true),
                centroItem = posicionTopItem + (alturaItem / 2 - 5),
                idNota = $(this).attr("id"),
                panelDerecho = $(".panel-vista-notas-contenedor .panel-derecho");

            panelDerecho.attr("data-control", idNota);
            carretPanel.css({
                "opacity": "1",
                "transform": "translateX(-50%) translateY(" + centroItem + "px)"
            });

            var objNota = AppNotas.ObtenerNota(idNota);

            var colorNota = objNota.ObtenerColor();
            panelDerecho.css("background", colorNota);


            $(".nota-item-panel").css("background", "#FFF")
            $(this).css("background", colorNota);

            var panelDerecho = $(".panel-derecho");

            panelDerecho.find(".contenido-nota").html(objNota.ObtenerContenido())
            panelDerecho.find(".titulo-nota-panel").val(objNota.ObtenerTitulo());

        })

        $("body").on("click", ".botonImagen", function (e) {
            e.preventDefault();
            var contenedor = $(this).closest(".contenedor"),
                plantillaVisor = $(".visorImagenes").eq(0)
                .clone().css("display", "block");

            plantillaVisor.find(".contenedor-imagenes").html("")
            plantillaVisor.find(".background-empty").show();

            var visorImagenes = contenedor.find(".visorImagenes");

            if(visorImagenes.length === 0) {

                contenedor.prepend(plantillaVisor);
                contenedor.find(".visorImagenes")
                    .visorImagenes({
                        despuesSubirImagenes: function () {
                            ComprimirNotas()
                        }
                    });
                ComprimirNotas();

                //Espera 5 segundos y verifica si el usuario asigno alguna imagen;
                setTimeout(function () {
                    var visorEnContendor = contenedor.find(".visorImagenes"),
                        nImagenes = contenedor.find("img");

                    if(nImagenes.length === 0) {
                        visorEnContendor.fadeOut(function () {
                            ComprimirNotas();
                        })
                    }

                }, 5000);


            } else {
                visorImagenes.find("input").trigger("click");
            }

        })

        $(".botonCambiarVista").on("click", function () {

            var tipoVista = $(this).attr("data-vista");
            cambiarVista(tipoVista)
            AppNotas.render();

        })

        $("body").on("click", ".etiqueta", function (e) {
            e.preventDefault();

            $(this).attr("contenteditable", "true");
            establecerCursorFinal($(this));

        });

        $('body').on('keypress focusout', ".etiqueta", function (e) {


            var El = $(this);

            var modificarEtiqueta = function () {

                var indice = El.closest(".etiquetas-contenedor")
                    .find(".etiqueta").index(El[0]),
                    contenedorNota = El.closest(".contenedor"),
                    idNota = contenedorNota.attr("id") || contenedorNota.attr("data-control"),
                    contenidoEtiqueta = El.text().trim();

                var rs = AppNotas.ObtenerNota(idNota).modificarEtiqueta(indice, contenidoEtiqueta);
                El.text(rs);
                El.removeAttr("contenteditable");

            }

            if(e.type === "keypress") {
                if(e.which === 13) {
                    e.preventDefault();
                    modificarEtiqueta();
                }
            } else {
                modificarEtiqueta();
            }


        });

        $("body").on("click", ".duplicarNota", function (e) {

            var contenedor = $(this).closest(".contenedor"),
                idNota = contenedor.attr("id") || contenedor.attr("data-control");

            $(this).closest(".menu-opcion").hide();
            var notaADuplicar = AppNotas.ObtenerNota(idNota).toJson();

            AppNotas.AgregarNota({
                "titulo": notaADuplicar.titulo,
                "contenido": notaADuplicar.contenido,
                "color": notaADuplicar.color,
                "creador": "Tú",
                "inicio": "Justo Ahora",
                "model_acc": "add",
                "etiquetas": notaADuplicar.etiquetas,
            })

        });


    }



    return {
        ColeccionNotas: ColeccionNotas,
        Nota: Nota,
        SetContenedor: SetContenedor,
        setTipoRenderizado: setTipoRenderizado,
        init: init,
        cambiarVista: cambiarVista,
        setNotas: setNotas,
        render: function () {

            AppNotas.render();

        }

    }



}($));