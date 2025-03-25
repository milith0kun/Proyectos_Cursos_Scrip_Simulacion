
// Configuración de API
const config = {
    HF_API_KEY: 'tu_api_key_aquí',
    HF_API_URL: 'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev'
};

// Basic utility functions
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

function mostrarElemento(elemento) {
    if (elemento) elemento.style.display = 'block';
}

function ocultarElemento(elemento) {
    if (elemento) elemento.style.display = 'none';
}




// Global variables
let estiloSeleccionado = '';
const historialImagenes = [];

// Utility functions
function mostrarCargando(mostrar) {
    const indicador = document.getElementById('indicadorCarga');
    indicador.classList.toggle('visible', mostrar);
}

function mostrarImagen(mostrar) {
    const imagen = document.querySelector('.imagen-resultado');
    const seccionResultado = document.getElementById('seccionResultado');
    imagen.classList.toggle('visible', mostrar);
    seccionResultado.classList.toggle('visible', mostrar);
}

// Modify initialization
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
});

function inicializarAplicacion() {
    // Inicialización básica
    localStorage.removeItem('galeria');
    historialImagenes.length = 0;
    
    ocultarElemento(document.getElementById('seccionResultado'));
    ocultarElemento(document.getElementById('indicadorCarga'));
    
    // Verificación de API mejorada
    const verificacionTimeout = window.setTimeout(() => {
        verificarConexionAPI();
    }, 1000);

    // Limpiar timeout si la página se cierra
    window.addEventListener('unload', () => {
        clearTimeout(verificacionTimeout);
    });
}

async function verificarConexionAPI() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(HF_API_URL, {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: "test" }),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Error de conexión con la API');
        }
        
        mostrarMensaje("¡API conectada correctamente!");
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Tiempo de espera agotado');
            mostrarMensaje('Error: Tiempo de espera agotado');
        } else {
            console.error('Error:', error);
            mostrarMensaje('Error al conectar con la API');
        }
    }
}

// Update generarImagen
async function generarImagen() {
    const botonGenerar = document.querySelector('.generate-btn');
    if (!botonGenerar || botonGenerar.disabled) return;

    botonGenerar.disabled = true;
    let timeoutId;

    try {
        timeoutId = setTimeout(() => {}, 500);
        await generarImagenProcess();
    } catch (error) {
        console.error('Error en generación:', error);
    } finally {
        clearTimeout(timeoutId);
        botonGenerar.disabled = false;
    }
}

async function generarImagenProcess() {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    if (!textoEntrada) {
        mostrarMensaje('Por favor, describe la imagen que deseas crear');
        return;
    }

    const seccionResultado = document.getElementById('seccionResultado');
    const indicadorCarga = document.getElementById('indicadorCarga');
    const botonGenerar = document.querySelector('.generate-btn');
    
    try {
        // Deshabilitar botón mientras se genera
        botonGenerar.disabled = true;
        mostrarElemento(seccionResultado);
        mostrarElemento(indicadorCarga);

        const prompt = estiloSeleccionado 
            ? `${textoEntrada}, estilo: ${estiloSeleccionado}`
            : textoEntrada;

        const response = await fetch(HF_API_URL, {
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            throw new Error('Error en la generación de imagen');
        }

        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);
        
        ocultarElemento(indicadorCarga);
        
        const imagen = document.querySelector('.imagen-resultado');
        imagen.src = imageUrl;
        mostrarElemento(imagen);
        mostrarElemento(document.getElementById('botonDescargar'));

        agregarAGaleria({
            url: imageUrl,
            prompt: textoEntrada,
            estilo: estiloSeleccionado,
            fecha: new Date().toLocaleString('es-ES')
        });

    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error: ' + error.message);
        ocultarElemento(seccionResultado);
    } finally {
        ocultarElemento(indicadorCarga);
        botonGenerar.disabled = false;
    }
}

// Actualizar función cambiarEstilo
function cambiarEstilo(estilo) {
    estiloSeleccionado = estilo;
    document.querySelectorAll('.style-btn').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(estilo.toLowerCase())) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function agregarAGaleria(imagen) {
    historialImagenes.unshift(imagen);
    localStorage.setItem('galeria', JSON.stringify(historialImagenes));
    actualizarGaleria();
}

function actualizarGaleria() {
    const contenedor = document.getElementById('contenedorGaleria');
    contenedor.innerHTML = historialImagenes.map((img, index) => `
        <div class="gallery-item" onclick="abrirModal(${index})">
            <img src="${img.url}" alt="${img.prompt}">
        </div>
    `).join('');
}

function abrirModal(index) {
    const imagen = historialImagenes[index];
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const promptText = modal.querySelector('.prompt-text');
    
    modalImg.src = imagen.url;
    promptText.textContent = `${imagen.prompt}${imagen.estilo ? ` (${imagen.estilo})` : ''}`;
    modal.style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}