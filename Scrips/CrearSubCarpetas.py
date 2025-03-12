import os

# Ruta donde se crearán los archivos CSS
directory = r"D:\Programacion Fuera de la U\Plantillas SEO\Plantilla 1\css\Styles"

# Nombres y descripciones de los archivos CSS
files = {
    "reset.css": "/* Resetea los estilos por defecto del navegador */\n",
    "base.css": "/* Estilos básicos como fuentes, colores y configuración general */\n",
    "layout.css": "/* Estilos para la estructura y disposición de la página */\n",
    "header.css": "/* Estilos específicos para el encabezado y la navegación */\n",
    "footer.css": "/* Estilos específicos para el pie de página */\n",
    "sections.css": "/* Estilos para secciones específicas de la página */\n",
    "media-queries.css": "/* Estilos para diferentes tamaños de pantalla (responsividad) */\n"
}

# Creación de la carpeta si no existe
os.makedirs(directory, exist_ok=True)

# Crear los archivos con los comentarios
for filename, content in files.items():
    file_path = os.path.join(directory, filename)
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

print("Archivos CSS creados exitosamente en:", directory)