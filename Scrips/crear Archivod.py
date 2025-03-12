import os
from datetime import datetime

def print_directory_contents(path, indent, file):
    try:
        entries = os.listdir(path)
    except PermissionError:
        print(f"{'    ' * indent}[Error de acceso: sin permisos para leer el directorio]", file=file)
        return (0, 0)
    except Exception as e:
        print(f"{'    ' * indent}[Error: {str(e)}]", file=file)
        return (0, 0)

    files = []
    dirs = []

    for entry in entries:
        entry_path = os.path.join(path, entry)
        if os.path.isdir(entry_path):
            dirs.append(entry)
        else:
            files.append(entry)

    # Contar y escribir archivos
    file_count = len(files)
    for f in files:
        print(f"{'    ' * indent}{f}", file=file)

    # Procesar subdirectorios y contar
    dir_count = len(dirs)
    for d in dirs:
        print(f"{'    ' * indent}{d}/", file=file)
        sub_file_count, sub_dir_count = print_directory_contents(
            os.path.join(path, d), indent + 1, file
        )
        file_count += sub_file_count
        dir_count += sub_dir_count

    return (file_count, dir_count)

def main():
    base_path = r"D:\Programacion Fuera de la U\Plantillas SEO\Plantilla 1"

    if not os.path.exists(base_path):
        print(f"La ruta especificada no existe: {base_path}")
        return

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_filename = f"estructura_archivos_{timestamp}.txt"

    try:
        with open(output_filename, 'w', encoding='utf-8') as output_file:
            base_name = os.path.basename(base_path)
            print(f"{base_name}/", file=output_file)
            total_files, total_subdirs = print_directory_contents(base_path, 1, output_file)
            total_dirs = total_subdirs + 1  # Incluye el directorio base

            print("\nResumen:", file=output_file)
            print(f"Total de directorios: {total_dirs}", file=output_file)
            print(f"Total de archivos: {total_files}", file=output_file)

        print(f"Estructura de archivos guardada en: {output_filename}")

    except Exception as e:
        print(f"Ocurrió un error al escribir el archivo: {str(e)}")

if __name__ == "__main__":
    main()