

function toggleAnimacao() {
    var img = document.getElementById('imagemFlutuante');
    img.classList.toggle('animacao-flutuante');
}

// Texto para o ID "texto" const texto0 = "Marketing Digital"
const textos = [

    "Marketing Digital",
    "Sistemas de Gestão",
    "Lojas virtuais",
    "Criação de sites",
    "Canais de Ouvidoria e Denuncias",
];

const elemento = document.getElementById("texto");

let indiceTexto = 0;
let indiceLetra = 0;
let isDeleting = false;

function escrever() {
    let textoAtual = textos[indiceTexto];

    if (!isDeleting && indiceLetra <= textoAtual.length) {
        // Escrevendo
        elemento.innerHTML = textoAtual.substring(0, indiceLetra);
        indiceLetra++;
        setTimeout(escrever, 150);
    } else if (isDeleting && indiceLetra >= 0) {
        // Apagando
        elemento.innerHTML = textoAtual.substring(0, indiceLetra);
        indiceLetra--;
        setTimeout(escrever, 100);
    } else {
        // Troca de frase
        isDeleting = !isDeleting;

        if (!isDeleting) {
            indiceTexto = (indiceTexto + 1) % textos.length;
        }

        setTimeout(escrever, 1000);
    }
}

// Iniciar animação
escrever();

// Adiciona classe no scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) { // Ajuste 50px conforme necessário
        navbar.classList.add('navbar-scroll');
    } else {
        navbar.classList.remove('navbar-scroll');
    }
});




// Client data (could be fetched from API/JSON)
const clientes = [
    'assets/img/logo_focoit.svg',
    'assets/img/sal_comunicacao.svg',
    'assets/img/logo_ferreira_lima.svg',
    'assets/img/piloncred.webp',
    'assets/img/coopselene_ORIGINAL.svg',
    'assets/img/logo_cecc.svg',
    'assets/img/logo_bruske_verdan_completo.svg',
    'assets/img/logo-ibdcoop.webp',
    'assets/img/factorit.webp',
    'assets/img/sitio.webp',
    'assets/img/aeroclube.webp',
    'assets/img/logo-smartbids.webp',
    'assets/img/jcnew.webp',
    'assets/img/pinkshair.webp',
    'assets/img/agricola.webp',
    'assets/img/pws.webp'
    // Add more as needed
];

// Remove duplicates (optional)
const uniqueClientes = [...new Set(clientes)];

// Configuration
const config = {
    step: 4, // Items to load per batch
    rootMargin: '100px', // Load before reaching viewport
    threshold: 0.1, // More sensitive trigger
    loadingDelay: 300 // Artificial delay (remove in production)
};

// DOM elements
const container = document.getElementById('clientes-container');
const loader = document.getElementById('loader');
let currentIndex = 0;

// Create client card element
function createCard(src) {
    const fileName = src.split('/').pop().split('.')[0];
    const altText = `Logo ${fileName.replace(/[-_]/g, ' ')}`;

    const col = document.createElement('div');
    col.className = 'col-6 col-md-3 col-lg-3 mb-3';
    col.innerHTML = `
        <div class="card clientes p-3 h-100">
            <img src="${src}" 
                 alt="${altText}" 
                 class="img-fluid client-logo" 
                 loading="lazy"
                 onerror="this.src='assets/img/placeholder.svg'">
        </div>
    `;
    return col;
}

// Load more cards with error handling
async function loadMoreCards() {
    if (currentIndex >= uniqueClientes.length) {
        loader.classList.add('d-none');
        return;
    }

    loader.classList.remove('d-none');

    try {
        // Simulate async loading (remove timeout in production)
        await new Promise(resolve => setTimeout(resolve, config.loadingDelay));

        const fragment = document.createDocumentFragment();
        const endIndex = Math.min(currentIndex + config.step, uniqueClientes.length);

        for (let i = currentIndex; i < endIndex; i++) {
            fragment.appendChild(createCard(uniqueClientes[i]));
        }

        container.appendChild(fragment);
        currentIndex = endIndex;

        if (currentIndex < uniqueClientes.length) {
            observeLastItem();
        } else {
            loader.classList.add('d-none');
        }
    } catch (error) {
        console.error('Error loading client logos:', error);
        loader.classList.add('d-none');
    }
}

// Observe the last item for infinite scroll
function observeLastItem() {
    const lastItem = container.lastElementChild;
    if (lastItem) {
        observer.observe(lastItem);
    }
}

// Intersection Observer configuration
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            loadMoreCards();
        }
    });
}, {
    root: null,
    rootMargin: config.rootMargin,
    threshold: config.threshold
});

// Initial load
loadMoreCards();

// Optional: Reload on window resize (for responsive adjustments)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (currentIndex < uniqueClientes.length) {
            observeLastItem();
        }
    }, 200);
});
