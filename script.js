document.addEventListener('DOMContentLoaded', function() {
    function initSlideshow() {
        const slideshow = document.querySelector('.slideshow');
        if (!slideshow) return;
    
        // Detección de touch
        let isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice && window.matchMedia("(max-width: 768px)").matches) {
            // Intervalo más largo para móvil
            let interval = setInterval(nextSlide, 5000);
            
            // Pausar al tocar
            slideshow.addEventListener('touchstart', () => {
                clearInterval(interval);
            });
            
            // Reanudar después de 10 segundos sin interacción
            slideshow.addEventListener('touchend', () => {
                setTimeout(() => {
                    interval = setInterval(nextSlide, 5000);
                }, 10000);
            });
            
            // Agregar indicadores
            const slides = document.querySelectorAll('.slide');
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'slide-indicators';
            
            slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `slide-indicator ${index === 0 ? 'active' : ''}`;
                indicatorsContainer.appendChild(indicator);
            });
            
            slideshow.appendChild(indicatorsContainer);
        }
    }
    
    // Ejecutar al cargar
    document.addEventListener('DOMContentLoaded', initSlideshow);
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;

    //Muestra la primera imagen
    slides[currentSlide].classList.add('active');

    //Cambiar de slide
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
    
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            isTransitioning = false;
        }, 50);
    }

    //Cambiar la imagen cada 4 segundos
    let interval = setInterval(nextSlide, 3000);

    document.querySelector('.slideshow').addEventListener('touchstart', function() {
        clearInterval(interval);
    });
 
 // Elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const header = document.querySelector('.main-header');
    const backToTop = document.querySelector('.back-to-top');
   
    // Menú móvil
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            mainNav.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('open');
            mainNav.classList.remove('active');
        });
    });

    // Scroll suave (funciona en ambas páginas)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Botón "volver arriba"
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // Botón "volver arriba"
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    
    // Galería lightbox (ejemplo básico)
    const galleryItems = document.querySelectorAll('.galeria-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aquí puedes implementar un lightbox
            console.log('Imagen clickeada:', this.querySelector('img').src);
        });
    });
    
    // Validación de formulario
    const contactoForm = document.querySelector('.contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const mensaje = this.querySelector('textarea').value.trim();
            
            if (!nombre || !email || !mensaje) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
            this.reset();
        });
    }
    if (mainNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    // Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const galleryImages = document.querySelectorAll('.galeria-item img');

let currentImageIndex = 0;

// Abrir lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
    });
});

// Cerrar lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

// Cerrar al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navegación
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
});

// Teclado
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        }
    }
});

function updateLightboxImage() {
    const imgSrc = galleryImages[currentImageIndex].src;
    lightboxImage.src = imgSrc;
    lightboxImage.alt = galleryImages[currentImageIndex].alt || 'Imagen de la galería';
}
});