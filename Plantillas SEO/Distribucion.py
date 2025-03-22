import os

def list_all_folders_and_files(directory, indent=0):
    # Intentar acceder al directorio y mostrar las carpetas y archivos
    try:
        # Listar todo el contenido dentro del directorio
        items = os.listdir(directory)
        folders = [item for item in items if os.path.isdir(os.path.join(directory, item))]
        files = [item for item in items if os.path.isfile(os.path.join(directory, item))]
        
        # Imprimir los archivos de la carpeta actual
        for file in files:
            print('  ' * indent + f"{file}")

        # Recursión para las subcarpetas
        for folder in folders:
            folder_path = os.path.join(directory, folder)
            print('  ' * indent + f"{folder}/")
            list_all_folders_and_files(folder_path, indent + 1)  # Recursión para subcarpetas

    except PermissionError:
        print("No permission to access this folder.")

# Especificar la ruta de inicio
directory = r"D:\Programacion Fuera de la U\Plantillas SEO\Plantilla 1"
list_all_folders_and_files(directory)
