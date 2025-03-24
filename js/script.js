document.addEventListener("DOMContentLoaded", () => {
    // Sélection des sections et icônes
    const sections = document.querySelectorAll("section");
    const icons = document.querySelectorAll(".icon");
    
    // Défilement fluide lors du clic sur un lien du menu
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
    
    // Observer les sections pour les faire apparaître et disparaître en scrollant
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const correspondingNavLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            // Si la section est visible
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                entry.target.classList.remove("inactive");
                
                // Ajouter la classe active au lien de navigation correspondant
                if (correspondingNavLink) {
                    // Retirer la classe active de tous les liens
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active-link');
                    });
                    // Ajouter la classe active au lien correspondant
                    correspondingNavLink.classList.add('active-link');
                }
                
                // Activer les icônes de cette section
                const sectionIcons = entry.target.querySelectorAll(".icon");
                sectionIcons.forEach(icon => {
                    icon.classList.add("show");
                    icon.classList.remove("hide");
                });
            } else {
                // Si la section n'est plus visible
                entry.target.classList.remove("active");
                entry.target.classList.add("inactive");
                
                // Désactiver les icônes de cette section
                const sectionIcons = entry.target.querySelectorAll(".icon");
                sectionIcons.forEach(icon => {
                    icon.classList.remove("show");
                    icon.classList.add("hide");
                });
            }
        });
    }, { 
        threshold: 0.1,     // Déclenche quand 10% de la section est visible
        rootMargin: "-10% 0px" // Ajuste légèrement le seuil de déclenchement
    });
    
    // Observer spécial pour la dernière section avec des paramètres plus sensibles
    const lastSectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const correspondingNavLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            // Si la section est visible
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                entry.target.classList.remove("inactive");
                
                // Ajouter la classe active au lien de navigation correspondant
                if (correspondingNavLink) {
                    // Retirer la classe active de tous les liens
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active-link');
                    });
                    // Ajouter la classe active au lien correspondant
                    correspondingNavLink.classList.add('active-link');
                }
                
                // Activer les icônes de cette section
                const sectionIcons = entry.target.querySelectorAll(".icon");
                sectionIcons.forEach(icon => {
                    icon.classList.add("show");
                    icon.classList.remove("hide");
                });
            } else {
                // Si la section n'est plus visible
                entry.target.classList.remove("active");
                entry.target.classList.add("inactive");
                
                // Désactiver les icônes de cette section
                const sectionIcons = entry.target.querySelectorAll(".icon");
                sectionIcons.forEach(icon => {
                    icon.classList.remove("show");
                    icon.classList.add("hide");
                });
            }
        });
    }, { 
        threshold: 0.05,    // Seuil plus bas pour la dernière section
        rootMargin: "0% 0px" // Pas de marge négative
    });
    
    // Observer toutes les sections sauf la dernière avec l'observer standard
    sections.forEach((section, index) => {
        if (index < sections.length - 1) {
            sectionObserver.observe(section);
        } else {
            // Observer spécial pour la dernière section
            lastSectionObserver.observe(section);
        }
    });
    
    // Activer automatiquement la première section au chargement
    setTimeout(() => {
        if (sections[0]) {
            sections[0].classList.add("active");
            
            // Activer le premier lien de navigation
            const firstSectionId = sections[0].id;
            const firstNavLink = document.querySelector(`nav a[href="#${firstSectionId}"]`);
            if (firstNavLink) {
                firstNavLink.classList.add('active-link');
            }
            
            // Activer les icônes de la première section
            const firstSectionIcons = sections[0].querySelectorAll(".icon");
            firstSectionIcons.forEach(icon => {
                icon.classList.add("show");
            });
        }
    }, 100);
    
    // Backup pour s'assurer que la dernière section s'anime en fin de page
    window.addEventListener('scroll', () => {
        const lastSection = sections[sections.length - 1];
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Si on est proche de la fin de la page (à 90% du défilement possible)
        if ((scrollTop + windowHeight) > (documentHeight * 0.9)) {
            lastSection.classList.add("active");
            lastSection.classList.remove("inactive");
            
            // Activer le lien de navigation correspondant à la dernière section
            const lastSectionId = lastSection.id;
            const lastNavLink = document.querySelector(`nav a[href="#${lastSectionId}"]`);
            if (lastNavLink) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active-link');
                });
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
});