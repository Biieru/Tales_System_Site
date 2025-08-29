// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Navegação suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para o navbar fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de scroll no navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animação de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animação aos elementos
    const animatedElements = document.querySelectorAll('.feature-card, .content-card, .section-title, .section-description');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efeito de parallax sutil no hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Adicionar efeito de hover nos cards
    const cards = document.querySelectorAll('.feature-card, .content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de digitação no título principal (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar efeito após um delay
        setTimeout(typeWriter, 1000);
    }
    
    // Adicionar contador de visitantes (exemplo)
    const visitorCount = localStorage.getItem('visitorCount') || 0;
    const newCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', newCount);
    
    // Mostrar contador no console (para demonstração)
    console.log(`🎲 Bem-vindo ao Caminho Das Constelações! Você é o visitante número ${newCount}`);
    
    // Adicionar efeito de partículas flutuantes
    createFloatingParticles();
});

// Função para criar partículas flutuantes
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.innerHTML = '✨';
        particle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 10}px;
            color: rgba(139, 92, 246, 0.6);
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Adicionar estilos CSS para as partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    
    .floating-particle {
        z-index: 5;
    }
    
    /* Efeito de brilho nos botões */
    .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn-primary:hover::before {
        left: 100%;
    }
    
    /* Efeito de destaque nos links */
    .nav-link, .nav-dropdown-content a {
        position: relative;
    }
    
    .nav-link::after, .nav-dropdown-content a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #a78bfa;
        transition: width 0.3s ease;
    }
    
    .nav-link:hover::after, .nav-dropdown-content a:hover::after {
        width: 100%;
    }
    
    /* Efeito de loading no hero */
    .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Efeito de destaque nos atributos */
    .attribute {
        transition: all 0.3s ease;
    }
    
    .attribute:hover {
        background: rgba(139, 92, 246, 0.2);
        transform: translateX(5px);
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
    }
    
    /* Scroll suave para seções */
    html {
        scroll-padding-top: 80px;
    }
`;

document.head.appendChild(style);

// Adicionar funcionalidade de busca (opcional)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Buscar nas regras...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    // Adicionar ao navbar
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.insertBefore(searchContainer, navContainer.lastElementChild);
    }
    
    // Estilos para o campo de busca
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .search-container {
            margin: 0 1rem;
        }
        
        .search-input {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 20px;
            padding: 0.5rem 1rem;
            color: #e2e8f0;
            outline: none;
            transition: all 0.3s ease;
            width: 200px;
        }
        
        .search-input:focus {
            border-color: #a78bfa;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
            width: 250px;
        }
        
        .search-input::placeholder {
            color: #64748b;
        }
        
        @media (max-width: 768px) {
            .search-container {
                order: -1;
                width: 100%;
                margin: 1rem 0;
            }
            
            .search-input {
                width: 100%;
            }
            
            .search-input:focus {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(searchStyle);
}

// Inicializar funcionalidade de busca
document.addEventListener('DOMContentLoaded', addSearchFunctionality);
