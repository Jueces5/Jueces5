
    
    //Menú móvil
    this.documentElementByAdd('mobile-menu-toggle').addEventListener('click', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        nav.classList.toggle('show');
    });

    //Cerrar menú al hacer click en un enlace
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', function () {
            const nav = document.getElementById('main-nav');
            nav.classList.remove('show');

        });
    });
    
    //Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    //Cambiar header al hacer scroll
    const header = this.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    //Botón "volver arriba"
    const backToTop = document.querySelector('.back-to-top');
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

    //Efecto de carga Inicial
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 500);

    //Galería lightbox
    const galleryItems = document.querySelectorAll('#galeria .galeria-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Abrir lightbox para:', this.querySelector('img').src);
        });
    });

    //Validación del formulario
    const contactoForm = document.querySelector('.contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            //Validación simple
            const nombre = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const mensaje = this.querySelector('textarea').value.trim();

            if (nombre === '' || email === '' || mensaje === '') {
                alert('Por favor completa todos los campos');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.text(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }

            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
            this.reset();
        });
    }
});