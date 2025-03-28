// Importar las clases necesarias
import Galeria from './components/Galeria.js';
import ConexionApi from './components/Conexion_Api.js';
import AjustesLateral from './config/AjustesLateral.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar las clases principales
    const galeria = new Galeria();
    const conexionApi = new ConexionApi();
    const ajustesLateral = new AjustesLateral();

    // Elementos del DOM
    const botonProbar = document.querySelector('.boton-probar');
    const campoTexto = document.querySelector('.campo-texto');
    const botonGenerar = document.querySelector('.boton-generar');
    const estadoInicial = document.getElementById('estadoInicial');
    const estadoGeneracion = document.getElementById('estadoGeneracion');
    const cuadriculaGeneracion = document.getElementById('cuadriculaGeneracion');
    const indicadorGeneracion = document.getElementById('indicadorGeneracion');

    // Función para generar una URL de imagen aleatoria (simulada)
    const generarURLImagenAleatoria = () => {
        const width = 512;
        const height = 512;
        return `https://source.unsplash.com/random/${width}x${height}?sig=${Math.random()}`;
    };

    // Función para generar las imágenes
    const generarImagenes = async (prompt) => {
        if (!estadoInicial || !estadoGeneracion || !cuadriculaGeneracion || !indicadorGeneracion) {
            console.error('Elementos del DOM no encontrados');
            return;
        }

        estadoInicial.style.display = 'none';
        estadoGeneracion.style.display = 'block';
        indicadorGeneracion.style.display = 'block';
        cuadriculaGeneracion.innerHTML = '';

        try {
            // Generar 4 imágenes
            const promesas = Array(4).fill().map(async () => {
                const url = generarURLImagenAleatoria();
                return new Promise(resolve => {
                    const img = new Image();
                    img.onload = () => resolve(url);
                    img.src = url;
                });
            });

            const urls = await Promise.all(promesas);

            indicadorGeneracion.style.display = 'none';
            
            urls.forEach(url => {
                const contenedorGeneracion = document.createElement('div');
                contenedorGeneracion.className = 'contenedor-generacion';
                
                const contenedorImagen = document.createElement('div');
                contenedorImagen.className = 'contenedor-imagen-generada';
                
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Imagen generada';
                img.className = 'imagen-generada';
                img.loading = 'lazy';
                
                const infoGeneracion = document.createElement('div');
                infoGeneracion.className = 'info-generacion';
                infoGeneracion.innerHTML = `
                    <p class="prompt-generacion">${prompt}</p>
                    <div class="controles-generacion">
                        <button class="boton-mini" title="Refinar"><i class="fas fa-wand-magic-sparkles"></i></button>
                        <button class="boton-mini" title="Descargar"><i class="fas fa-download"></i></button>
                        <button class="boton-mini" title="Compartir"><i class="fas fa-share"></i></button>
                    </div>
                `;
                
                contenedorImagen.appendChild(img);
                contenedorGeneracion.appendChild(contenedorImagen);
                contenedorGeneracion.appendChild(infoGeneracion);
                cuadriculaGeneracion.appendChild(contenedorGeneracion);
                
                // Agregar la imagen a la galería principal
                galeria.agregarImagen(url, prompt);
            });
        } catch (error) {
            console.error('Error al generar imágenes:', error);
            indicadorGeneracion.style.display = 'none';
        }
    };

    // Configurar el botón de prueba de API
    if (botonProbar) {
        botonProbar.addEventListener('click', async () => {
            const resultado = await conexionApi.probarConexion();
            alert(resultado.mensaje);
        });
    }

    // Evento click del botón generar
    if (botonGenerar) {
        botonGenerar.addEventListener('click', () => {
            const prompt = campoTexto.value.trim();
            if (prompt) {
                generarImagenes(prompt);
            } else {
                alert('Por favor, ingresa una descripción para generar las imágenes.');
            }
        });
    }

    // Evento para generar al presionar Enter en el campo de texto
    if (campoTexto) {
        campoTexto.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const prompt = campoTexto.value.trim();
                if (prompt) {
                    generarImagenes(prompt);
                } else {
                    alert('Por favor, ingresa una descripción para generar las imágenes.');
                }
            }
        });
    }
});