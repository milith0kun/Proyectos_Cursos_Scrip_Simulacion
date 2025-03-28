// Conexion_Api.js - Maneja la conexión con la API de generación de imágenes

class ConexionApi {
    constructor() {
        this.apiUrl = 'https://picsum.photos'; // URL de ejemplo, reemplazar con la API real
        this.tamanoSelector = document.getElementById('tamanoImagen');
    }

    // Método para obtener el tamaño seleccionado
    obtenerTamanoSeleccionado() {
        if (this.tamanoSelector) {
            return this.tamanoSelector.value;
        }
        return '1024x1024'; // Valor por defecto
    }

    // Método para generar una imagen basada en la descripción
    async generarImagen(descripcion) {
        try {
            // Obtener el tamaño seleccionado
            const tamano = this.obtenerTamanoSeleccionado();
            const [ancho, alto] = tamano.split('x');
            
            // En un entorno real, aquí se enviaría la descripción a la API
            // Por ahora, usamos Lorem Picsum como ejemplo
            const respuesta = await fetch(`${this.apiUrl}/${ancho}/${alto}`);
            
            if (!respuesta.ok) {
                throw new Error('Error al generar la imagen');
            }
            
            return {
                exito: true,
                url: respuesta.url,
                descripcion: descripcion
            };
        } catch (error) {
            console.error('Error en la generación de imagen:', error);
            return {
                exito: false,
                error: error.message
            };
        }
    }

    // Método para probar la conexión con la API
    async probarConexion() {
        try {
            const testUrl = `${this.apiUrl}/300/300`;
            const respuesta = await fetch(testUrl);
            
            if (!respuesta.ok) {
                throw new Error('API no disponible');
            }
            return {
                estado: true,
                mensaje: 'API funcionando correctamente'
            };
        } catch (error) {
            return {
                estado: false,
                mensaje: 'Error al conectar con la API: ' + error.message
            };
        }
    }
}

export default ConexionApi;