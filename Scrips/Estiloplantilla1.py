import os

# Definir la ruta y la estructura de carpetas y archivos
base_dir = r'D:\Programacion Fuera de la U\Plantillas SEO\Plantilla3'
folders = ['css', 'js', 'img']  # Puedes agregar más carpetas si lo necesitas
files = {
    'index.html': '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Proyecto</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Bienvenido a mi proyecto</h1>
    <script src="js/script.js"></script>
</body>
</html>''',
    
    'css/styles.css': '''body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    color: #333;
    text-align: center;
}''',
    
    'js/script.js': '''console.log("¡Hola, mundo!");'''
}

# Crear la estructura de carpetas y archivos
os.makedirs(base_dir, exist_ok=True)

for folder in folders:
    os.makedirs(os.path.join(base_dir, folder), exist_ok=True)

for file, content in files.items():
    with open(os.path.join(base_dir, file), 'w') as f:
        f.write(content)

print(f"Estructura de proyecto creada en {base_dir} exitosamente.")
