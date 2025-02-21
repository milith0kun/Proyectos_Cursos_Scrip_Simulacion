import os

def generar_archivos_html(nombres, carpeta):
    # Crear la carpeta si no existe
    if not os.path.exists(carpeta):
        os.makedirs(carpeta)
    
    for nombre in nombres:
        # Definir el nombre del archivo HTML (será igual al nombre de la lista)
        nombre_archivo = f"{nombre}.html"
        ruta_archivo = os.path.join(carpeta, nombre_archivo)
        
        # Contenido HTML básico
        contenido_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{nombre}</title>
</head>
<body>
    <h1>Hola, {nombre}!</h1>
    <p>Este es un archivo HTML generado automáticamente.</p>
</body>
</html>"""
        
        # Crear el archivo HTML
        with open(ruta_archivo, 'w') as archivo:
            archivo.write(contenido_html)
        
        print(f"Archivo creado: {ruta_archivo}")

# Lista de nombres
nombres = [   "vegetarian-recipes",
    "breakfast-recipes",
    "healthy-snacks",
    "quick-meals",
    "nutritious-smoothies"]  # Asegúrate de que estos sean los nombres que quieres

# Carpeta donde se guardarán los archivos
carpeta_destino = r'D:\Programacion Fuera de la U\Plantillas SEO\Plantilla 1\archivos_html'  # Ruta de destino

# Llamar a la función
generar_archivos_html(nombres, carpeta_destino)