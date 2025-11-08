function toggleMenu() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function closeMenu() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

function mascara_telefone() {
    var tel = document.getElementById("telefone").value;
    tel = tel.slice(0, 14);
    document.getElementById("telefone").value = tel;
    tel = document.getElementById("telefone").value.slice(0, 10);
    
    var tel_formatado = document.getElementById("telefone").value;
    if (tel_formatado[0] != "(") {
        if (tel_formatado[0] != undefined) {
            document.getElementById("telefone").value = "(" + tel_formatado[0];
        }
    }

    if (tel_formatado[3] != ")") {
        if (tel_formatado[3] != undefined) {
            document.getElementById("telefone").value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
        }
    }

    if (tel_formatado[9] != "-") {
        if (tel_formatado[9] != undefined) {
            document.getElementById("telefone").value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9];
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                closeMenu();
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (typeof emailjs !== 'undefined') {
        emailjs.init("5WeK6STN8K-KCOYxM");
        
        const form = document.getElementById("contact-form");
        const status = document.getElementById("status-message");

        if (form && status) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                
                status.textContent = "Enviando...";
                status.style.color = "gray";
                
                emailjs.sendForm("service_t9134mo", "template_g21pqny", form)
                    .then(function(response) {
                        console.log('Sucesso!', response.status, response.text);
                        status.textContent = "Mensagem enviada com sucesso! 🎉";
                        status.style.color = "green";
                        form.reset();
                    })
                    .catch(function(error) {
                        console.error("Erro ao enviar:", error);
                        status.textContent = "Erro ao enviar. Tente novamente.";
                        status.style.color = "red";
                    });
            });
        }
    } else {
        console.error("EmailJS não foi carregado!");
    }

    let lastScrollTop = 0;
    const header = document.querySelector('.header-desktop, .header-mobile');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                header.style.background = 'rgba(16, 185, 129, 0.98)';
            } else {
                header.style.background = 'rgba(16, 185, 129, 0.95)';
            }
            lastScrollTop = scrollTop;
        });
    }

    const verProjetosBtn = document.querySelector('.btn-primary');
    if (verProjetosBtn) {
        verProjetosBtn.addEventListener('click', function() {
            document.querySelector('#projetos').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    const contatoBtn = document.querySelector('.btn-secondary');
    if (contatoBtn) {
        contatoBtn.addEventListener('click', function() {
            document.querySelector('#contato').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    const curriculumBtns = document.querySelectorAll('.btn-curriculum, .btn-curriculum-mobile');
    curriculumBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Funcionalidade de download do currículo seria implementada aqui.');
        });
    });

    const toggles = document.querySelectorAll('#darkmode-toggle');
    const body = document.body;
    
    toggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    body.classList.add('dark-mode');
                    toggles.forEach(t => t.checked = true);
                } else {
                    body.classList.remove('dark-mode');
                    toggles.forEach(t => t.checked = false);
                }
            });
        }
    });

    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && scrolled < heroSection.offsetHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 - scrolled * 0.0005})`;
            }
        }
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .social-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.classList.add('animate-ready');
            observer.observe(element);
        });
    }

    animateOnScroll();

});
        