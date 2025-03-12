import os

# Definir la ruta base
base_path = r'D:\Programacion Fuera de la U\Plantillas SEO\Plantilla 1'

# Definir la estructura de carpetas y archivos
directories = [
    'css',
    'js',
    'images'
]

# Crear las carpetas
for directory in directories:
    os.makedirs(os.path.join(base_path, directory), exist_ok=True)

# Definir los nombres de los archivos que se crearán en cada carpeta
css_files = [
    'styles.css',
    'specific-diets.css',
    'general-nutrition.css',
    'mental-health.css',
    'healthy-recipes.css',
    'healthy-lifestyle.css'
]

js_files = [
    'script.js',
    'specific-diets.js',
    'general-nutrition.js',
    'mental-health.js',
    'healthy-recipes.js',
    'healthy-lifestyle.js'
]

# Crear archivos CSS
for css_file in css_files:
    with open(os.path.join(base_path, 'css', css_file), 'w') as f:
        f.write('/* Archivo de estilos: {}\n*\n*/\n'.format(css_file))

# Crear archivos JS
for js_file in js_files:
    with open(os.path.join(base_path, 'js', js_file), 'w') as f:
        f.write('// Archivo JavaScript: {}\n\n'.format(js_file))

# Crear imágenes (carpeta vacía, no se pueden crear imágenes desde código)
os.makedirs(os.path.join(base_path, 'images', 'food'), exist_ok=True)
os.makedirs(os.path.join(base_path, 'images', 'lifestyle'), exist_ok=True)
os.makedirs(os.path.join(base_path, 'images', 'icons'), exist_ok=True)

print("Estructura de carpetas y archivos creada con éxito en:", base_path)