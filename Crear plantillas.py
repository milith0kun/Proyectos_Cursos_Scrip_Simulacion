import os

def create_project_structure(base_path):
    structure = {
        "": ["index.html", "README.md"],
        "css": ["main.css", "header.css", "footer.css"],
        "css/pages": ["inversiones.css", "criptomonedas.css", "bienes_raices.css", "errores_inversion.css", "plataformas.css"],
        "js": ["main.js", "navbar.js"],
        "js/pages": ["inversiones.js", "criptomonedas.js", "bienes_raices.js", "errores_inversion.js", "plataformas.js"],
        "images": ["logo.png"],
        "images/banners": ["inversiones.jpg", "criptomonedas.jpg", "bienes_raices.jpg", "errores.jpg", "plataformas.jpg"],
        "images/icons": ["acciones.png", "criptos.png", "real_estate.png", "savings.png"],
        "pages/inversiones": ["index.html", "acciones.html", "criptomonedas.html", "bienes_raices.html", "errores_inversion.html"],
        "pages/criptomonedas": ["index.html", "guia_basica.html", "plataformas.html", "ventajas.html", "riesgos.html"],
        "pages/bienes_raices": ["index.html", "comprar_alquilar.html", "inversion_novatos.html", "errores_comunes.html", "mejores_zonas.html"],
        "pages/errores_inversion": ["index.html", "top_errores.html", "evitar_perdidas.html", "ejemplos.html", "soluciones.html"],
        "pages/plataformas": ["index.html", "comparativa.html", "guias.html", "confiabilidad.html", "recomendaciones.html"],
        "assets/fonts": [],
        "assets/videos": [],
        "assets/docs/ebooks": [],
        "assets/docs/reports": []
    }

    for folder, files in structure.items():
        folder_path = os.path.join(base_path, folder)
        os.makedirs(folder_path, exist_ok=True)
        for file in files:
            file_path = os.path.join(folder_path, file)
            with open(file_path, "w") as f:
                pass

if __name__ == "__main__":
    base_path = r"D:\\Programacion Fuera de la U\\Plantillas SEO\\Plantilla 2"
    create_project_structure(base_path)
    print(f"Estructura creada en {base_path}")
