document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments essentiels
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    // Fonction de défilement fluide
    function smoothScroll(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: "smooth" 
            });
        }
    }

    // Gestionnaire de navigation
    function setupNavigation() {
        navLinks.forEach(anchor => {
            anchor.addEventListener("click", function(e) {
                const targetId = this.getAttribute("href");
                
                // Vérifie si le lien est une ancre interne
                if (targetId.startsWith("#")) {
                    e.preventDefault();
                    smoothScroll(targetId);
                }
            });
        });
    }

    // Configuration de l'Intersection Observer
    function setupSectionObserver() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const correspondingNavLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                const sectionIcons = entry.target.querySelectorAll(".icon");

                // Gestion de la visibilité et des classes
                if (entry.isIntersecting) {
                    // Désactiver tous les liens et sections
                    navLinks.forEach(link => link.classList.remove('active-link'));
                    sections.forEach(sec => {
                        sec.classList.remove("active");
                        sec.classList.add("inactive");
                    });

                    // Activer la section courante
                    entry.target.classList.add("active");
                    entry.target.classList.remove("inactive");

                    // Activer le lien de navigation correspondant
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active-link');
                    }

                    // Gestion des icônes
                    sectionIcons.forEach(icon => {
                        icon.classList.add("show");
                        icon.classList.remove("hide");
                    });
                }
            });
        }, { 
            threshold: [0.2, 0.5],  // Déclenchement à 20% et 50% de visibilité
            rootMargin: "-10% 0px"  // Marge légèrement négative
        });

        // Observer toutes les sections
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Activation automatique de la première section
    function activateFirstSection() {
        if (sections.length > 0) {
            const firstSection = sections[0];
            const firstSectionId = firstSection.id;
            const firstNavLink = document.querySelector(`nav a[href="#${firstSectionId}"]`);

            setTimeout(() => {
                firstSection.classList.add("active");
                firstSection.classList.remove("inactive");

                if (firstNavLink) {
                    firstNavLink.classList.add('active-link');
                }

                // Activer les icônes de la première section
                const firstSectionIcons = firstSection.querySelectorAll(".icon");
                firstSectionIcons.forEach(icon => {
                    icon.classList.add("show");
                    icon.classList.remove("hide");
                });
            }, 100);
        }
    }

    // Gestion des événements de fin de page
    function setupScrollEndHandler() {
        window.addEventListener('scroll', () => {
            const lastSection = sections[sections.length - 1];
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;

            // Détection de fin de page (90% du défilement)
            if (scrollPosition >= documentHeight * 0.9) {
                // Désactiver tous les liens et sections
                navLinks.forEach(link => link.classList.remove('active-link'));
                sections.forEach(sec => {
                    sec.classList.remove("active");
                    sec.classList.add("inactive");
                });

                // Activer la dernière section
                lastSection.classList.add("active");
                lastSection.classList.remove("inactive");

                // Activer le lien de navigation de la dernière section
                const lastSectionId = lastSection.id;
                const lastNavLink = document.querySelector(`nav a[href="#${lastSectionId}"]`);
                
                if (lastNavLink) {
                    lastNavLink.classList.add('active-link');
                }

                // Activer les icônes de la dernière section
                const lastSectionIcons = lastSection.querySelectorAll(".icon");
                lastSectionIcons.forEach(icon => {
                    icon.classList.add("show");
                    icon.classList.remove("hide");
                });
            }
        });
    }

    // Initialisation de toutes les fonctionnalités
    function init() {
        setupNavigation();
        setupSectionObserver();
        activateFirstSection();
        setupScrollEndHandler();
    }

    // Démarrage du script
    init();
});