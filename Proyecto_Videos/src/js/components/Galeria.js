// Galeria.js - Maneja la visualización de imágenes generadas

class Galeria {
    constructor() {
        this.contenedorGaleria = document.querySelector('.galeria-imagenes') || document.createElement('div');
        this.imagenes = [];
    }

    // Método para agregar una nueva imagen a la galería
    agregarImagen(urlImagen, descripcion) {
        const nuevaImagen = {
            id: Date.now(),
            url: urlImagen,
            descripcion: descripcion,
            fecha: new Date().toLocaleDateString()
        };

        this.imagenes.unshift(nuevaImagen); // Agregar al inicio para mostrar las más recientes primero
        this.actualizarGaleria();
        return nuevaImagen;
    }

    // Método para actualizar la visualización de la galería
    actualizarGaleria() {
        if (!this.contenedorGaleria) return;
        
        this.contenedorGaleria.innerHTML = '';
        
        if (this.imagenes.length === 0) {
            const mensajeVacio = document.createElement('div');
            mensajeVacio.className = 'mensaje-vacio';
            mensajeVacio.textContent = 'No hay imágenes generadas aún';
            this.contenedorGaleria.appendChild(mensajeVacio);
            return;
        }

        this.imagenes.forEach(imagen => {
            const tarjetaImagen = document.createElement('div');
            tarjetaImagen.className = 'tarjeta-imagen';
            
            const img = document.createElement('img');
            img.src = imagen.url;
            img.alt = imagen.descripcion;
            img.loading = 'lazy';
            
            const infoImagen = document.createElement('div');
            infoImagen.className = 'info-imagen';
            infoImagen.innerHTML = `
                <p class="descripcion-imagen">${imagen.descripcion}</p>
                <span class="fecha-imagen">${imagen.fecha}</span>
            `;
            
            tarjetaImagen.appendChild(img);
            tarjetaImagen.appendChild(infoImagen);
            this.contenedorGaleria.appendChild(tarjetaImagen);
        });
    }

    // Método para limpiar la galería
    limpiarGaleria() {
        this.imagenes = [];
        this.actualizarGaleria();
    }
}

export default Galeria;