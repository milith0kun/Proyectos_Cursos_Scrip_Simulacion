// AjustesLateral.js - Maneja la configuración y comportamiento del panel lateral

class AjustesLateral {
    constructor() {
        this.panelLateral = document.querySelector('.panel-lateral');
        this.botonesCategoria = document.querySelectorAll('.boton-desplegable');
        this.opcionesRapidas = document.querySelectorAll('.opcion-rapida');
        this.campoTexto = document.querySelector('.campo-texto');
        this.botonAsistente = document.querySelector('.boton-asistente');
        this.botonVariaciones = document.querySelector('.boton-variaciones');
        
        this.inicializarEventos();
    }

    // Inicializar todos los eventos del panel lateral
    inicializarEventos() {
        // Manejar clics en botones de categoría
        this.botonesCategoria.forEach(boton => {
            boton.addEventListener('click', () => this.toggleCategoria(boton));
        });

        // Manejar clics en opciones rápidas
        this.opcionesRapidas.forEach(opcion => {
            opcion.addEventListener('click', () => this.aplicarEstiloRapido(opcion));
        });

        // Eventos para los botones de asistente y variaciones
        if (this.botonAsistente) {
            this.botonAsistente.addEventListener('click', this.activarAsistente.bind(this));
        }

        if (this.botonVariaciones) {
            this.botonVariaciones.addEventListener('click', this.generarVariaciones.bind(this));
        }
    }

    // Alternar la visibilidad de una categoría
    toggleCategoria(boton) {
        const categoria = boton.getAttribute('data-categoria');
        boton.classList.toggle('activo');
        
        // Aquí se implementaría la lógica para mostrar/ocultar los elementos de la categoría
        console.log(`Categoría ${categoria} ${boton.classList.contains('activo') ? 'activada' : 'desactivada'}`);
    }

    // Aplicar un estilo rápido al texto
    aplicarEstiloRapido(opcion) {
        const estilo = opcion.getAttribute('data-estilo');
        if (!this.campoTexto || !estilo) return;
        
        // Añadir el estilo seleccionado al texto actual
        const textoActual = this.campoTexto.value.trim();
        if (textoActual) {
            this.campoTexto.value = `${textoActual}, estilo: ${estilo}`;
        } else {
            this.campoTexto.value = `Estilo: ${estilo}`;
        }
    }

    // Activar el asistente de IA para ayudar con la descripción
    activarAsistente() {
        console.log('Asistente de IA activado');
        // Aquí se implementaría la lógica para sugerir mejoras a la descripción
    }

    // Generar variaciones de la descripción actual
    generarVariaciones() {
        const textoActual = this.campoTexto?.value.trim();
        if (!textoActual) {
            console.log('No hay texto para generar variaciones');
            return;
        }
        
        console.log(`Generando variaciones para: ${textoActual}`);
        // Aquí se implementaría la lógica para generar variaciones
    }
}

export default AjustesLateral;