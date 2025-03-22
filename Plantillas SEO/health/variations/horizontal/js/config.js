const SITE_CONFIG = {
    site: {
        title: "Creative Portfolio",
        description: "Diseño y desarrollo web innovador",
        author: "Tu Nombre",
        logo: "img/logo.svg",
        social: {
            github: "https://github.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername",
            twitter: "https://twitter.com/yourusername"
        }
    },
    
    sections: {
        inicio: {
            title: "Creando Experiencias Digitales",
            subtitle: "Desarrollo Web & Diseño UI/UX",
            background: "img/hero-bg.jpg",
            cta: {
                primary: "Ver Proyectos",
                secondary: "Contactar"
            }
        },
        proyectos: [
            {
                title: "E-commerce Platform",
                description: "Plataforma de comercio electrónico moderna",
                image: "img/projects/project1.jpg",
                tags: ["React", "Node.js", "MongoDB"],
                link: "#"
            },
            {
                title: "Portfolio App",
                description: "Aplicación web para portfolios creativos",
                image: "img/projects/project2.jpg",
                tags: ["Vue.js", "Firebase", "Tailwind"],
                link: "#"
            }
        ],
        servicios: [
            {
                icon: "code",
                title: "Desarrollo Web",
                description: "Sitios web modernos y responsivos"
            },
            {
                icon: "paint-brush",
                title: "Diseño UI/UX",
                description: "Interfaces intuitivas y atractivas"
            },
            {
                icon: "mobile-alt",
                title: "Apps Móviles",
                description: "Aplicaciones nativas y multiplataforma"
            }
        ]
    },
    
    themes: {
        light: {
            primary: "#2c3e50",
            secondary: "#3498db",
            accent: "#e74c3c",
            background: "#ffffff",
            surface: "rgba(44, 62, 80, 0.1)",
            text: "#2c3e50"
        },
        dark: {
            primary: "#3498db",
            secondary: "#2ecc71",
            accent: "#e74c3c",
            background: "#1a1a1a",
            surface: "rgba(255, 255, 255, 0.1)",
            text: "#ffffff"
        }
    },
    animations: {
        duration: 600,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        threshold: 0.2
    }
};