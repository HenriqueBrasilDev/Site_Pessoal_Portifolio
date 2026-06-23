// ========================================================
// CONFIGURAÇÃO GERAL
// ========================================================

let paginaAtual = null;
let transicaoEmAndamento = false;

const imagensDasPaginas = {
    "index.html": [
        "./assets/img_home.png"
    ],

    "sobre.html": [
        "./assets/eu_direita.png"
    ],

    "skills.html": [
        "./assets/eu_esquerda.png"
    ],

    "projetos.html": [
        "./assets/ImgProjetos/1.webp",
        "./assets/ImgProjetos/2.webp",
        "./assets/ImgProjetos/3.webp",
        "./assets/ImgProjetos/4.webp",
        "./assets/ImgProjetos/5.webp"
    ]
};


// Mantém as imagens carregadas na memória
const imagensPreCarregadas = new Map();


// ========================================================
// FUNÇÕES AUXILIARES
// ========================================================

function selecionarElementos(seletor) {
    if (!seletor) {
        return [];
    }

    return gsap.utils.toArray(seletor);
}


function adicionarEntrada(
    timeline,
    seletor,
    configuracao,
    posicao
) {
    const elementos = selecionarElementos(seletor);

    if (elementos.length > 0) {
        timeline.from(elementos, configuracao, posicao);
    }
}


function adicionarSaida(
    timeline,
    seletor,
    configuracao,
    posicao
) {
    const elementos = selecionarElementos(seletor);

    if (elementos.length > 0) {
        timeline.to(elementos, configuracao, posicao);
    }
}


// ========================================================
// IDENTIFICAÇÃO DA PÁGINA
// ========================================================

function identificarPagina() {
    if (document.querySelector(".imagemdefundo_home")) {
        return "home";
    }

    if (document.querySelector(".imagemdefundo_sobre")) {
        return "sobre";
    }

    if (document.querySelector(".imagemdefundo_skills")) {
        return "skills";
    }

    if (document.querySelector(".projetos .carousel")) {
        return "projetos";
    }

    return null;
}


// ========================================================
// PRÉ-CARREGAMENTO
// ========================================================

function obterNomeDoArquivo(url) {
    const endereco = new URL(url, window.location.href);
    const partes = endereco.pathname.split("/");
    const arquivo = partes.pop();

    return arquivo || "index.html";
}


function preCarregarImagem(caminho) {
    if (imagensPreCarregadas.has(caminho)) {
        return;
    }

    const imagem = new Image();

    imagem.src = caminho;

    imagensPreCarregadas.set(caminho, imagem);

    /*
     * Além de baixar, tenta decodificar a imagem antes
     * de o usuário abrir a página.
     */
    if (typeof imagem.decode === "function") {
        imagem.decode().catch(() => {
            // A imagem ainda pode funcionar normalmente.
        });
    }
}


function preCarregarPagina(url) {
    const endereco = new URL(url, window.location.href);

    if (endereco.origin !== window.location.origin) {
        return;
    }

    const nomeArquivo = obterNomeDoArquivo(endereco.href);

    // Pré-carrega o documento HTML
    const prefetchExistente = document.querySelector(
        `link[data-prefetch="${endereco.href}"]`
    );

    if (!prefetchExistente) {
        const link = document.createElement("link");

        link.rel = "prefetch";
        link.href = endereco.href;
        link.dataset.prefetch = endereco.href;

        document.head.appendChild(link);
    }

    // Pré-carrega as imagens daquela página
    const imagens = imagensDasPaginas[nomeArquivo] || [];

    imagens.forEach(preCarregarImagem);
}


function configurarPreCarregamento() {
    const links = document.querySelectorAll(
        ".menu a, .btt a"
    );

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const iniciarPreCarregamento = () => {
            preCarregarPagina(href);
        };

        // Computador
        link.addEventListener(
            "mouseenter",
            iniciarPreCarregamento,
            { once: true }
        );

        // Navegação por teclado
        link.addEventListener(
            "focus",
            iniciarPreCarregamento,
            { once: true }
        );

        // Celular
        link.addEventListener(
            "touchstart",
            iniciarPreCarregamento,
            {
                once: true,
                passive: true
            }
        );
    });

    /*
     * Quando o navegador estiver livre,
     * pré-carrega todas as páginas do menu.
     */
    const preCarregarTudo = () => {
        links.forEach((link) => {
            const href = link.getAttribute("href");

            if (href) {
                preCarregarPagina(href);
            }
        });
    };

    if ("requestIdleCallback" in window) {
        requestIdleCallback(preCarregarTudo, {
            timeout: 1500
        });
    } else {
        setTimeout(preCarregarTudo, 500);
    }
}


// ========================================================
// ENTRADA — HOME
// ========================================================

function entradaHome() {
    const timeline = gsap.timeline({
        defaults: {
            overwrite: "auto"
        }
    });

    // Imagem entra pela direita
    adicionarEntrada(
        timeline,
        ".imagemdefundo_home",
        {
            duration: 1.5,
            x: 100,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "+=0.2"
    );

    // Header desce
    adicionarEntrada(
        timeline,
        "header",
        {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power2.out",
            force3D: true
        },
        "-=1"
    );

    // Título entra pela esquerda
    adicionarEntrada(
        timeline,
        ".conteudo h1",
        {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "-=0.5"
    );

    // Subtítulo entra pela esquerda
    adicionarEntrada(
        timeline,
        ".conteudo > p",
        {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "-=0.7"
    );

    // Botões aparecem
    adicionarEntrada(
        timeline,
        ".btt a",
        {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
            force3D: true
        },
        "-=0.5"
    );

    // Ícones aparecem
    adicionarEntrada(
        timeline,
        ".icons li",
        {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.15,
            ease: "back.out(1.5)",
            force3D: true
        },
        "-=0.4"
    );
}


// ========================================================
// ENTRADA — SOBRE
// ========================================================

function entradaSobre() {
    const timeline = gsap.timeline({
        defaults: {
            overwrite: "auto"
        }
    });

    // Imagem entra pela direita
    adicionarEntrada(
        timeline,
        ".imagemdefundo_sobre",
        {
            duration: 1.5,
            x: 120,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "+=0.2"
    );

    adicionarEntrada(
        timeline,
        "header",
        {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power2.out",
            force3D: true
        },
        "-=1"
    );

    adicionarEntrada(
        timeline,
        ".sobre > h1",
        {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "-=0.5"
    );

    adicionarEntrada(
        timeline,
        ".sobre > h2, .sobre > p",
        {
            duration: 1,
            x: -50,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true
        },
        "-=0.7"
    );

    adicionarEntrada(
        timeline,
        ".footer h2",
        {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: "back.out(1.5)",
            force3D: true
        },
        "-=0.5"
    );
}


// ========================================================
// ENTRADA — SKILLS
// ========================================================

function entradaSkills() {
    const timeline = gsap.timeline({
        defaults: {
            overwrite: "auto"
        }
    });

    // Imagem entra pela direita
    adicionarEntrada(
        timeline,
        ".imagemdefundo_skills",
        {
            duration: 1.5,
            x: 120,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "+=0.2"
    );

    adicionarEntrada(
        timeline,
        "header",
        {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power2.out",
            force3D: true
        },
        "-=1"
    );

    adicionarEntrada(
        timeline,
        ".container-skills > h1",
        {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true
        },
        "-=0.5"
    );

    adicionarEntrada(
        timeline,
        ".hard-skills > li",
        {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.05,
            ease: "back.out(1.5)",
            force3D: true
        },
        "-=0.7"
    );

    adicionarEntrada(
        timeline,
        ".soft-skills > h3",
        {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.5)",
            force3D: true
        },
        "-=0.5"
    );
}


// ========================================================
// ENTRADA — PROJETOS
// ========================================================

function entradaProjetos() {
    const timeline = gsap.timeline({
        defaults: {
            overwrite: "auto"
        }
    });

    adicionarEntrada(
        timeline,
        "header",
        {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power2.out",
            force3D: true
        },
        "+=0.2"
    );

    adicionarEntrada(
        timeline,
        ".projetos > h1",
        {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: "power3.out",
            force3D: true
        },
        "-=0.5"
    );

    /*
     * As imagens surgem apenas com opacidade.
     * Não mexe no transform do carrossel.
     */
    adicionarEntrada(
        timeline,
        ".carousel-item",
        {
            duration: 1,
            opacity: 0,
            stagger: 0.12,
            ease: "power2.out"
        },
        "-=0.5"
    );

    adicionarEntrada(
        timeline,
        ".arrows",
        {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "back.out(1.5)",
            force3D: true
        },
        "-=0.4"
    );
}


// ========================================================
// CONTROLE DE ENTRADA
// ========================================================

function animarEntrada() {
    switch (paginaAtual) {
        case "home":
            entradaHome();
            break;

        case "sobre":
            entradaSobre();
            break;

        case "skills":
            entradaSkills();
            break;

        case "projetos":
            entradaProjetos();
            break;
    }
}


// ========================================================
// SAÍDA — HOME
// ========================================================

function saidaHome(timeline) {
    adicionarSaida(
        timeline,
        ".icons li, .btt a",
        {
            duration: 0.4,
            y: 30,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.in",
            force3D: true
        }
    );

    adicionarSaida(
        timeline,
        ".conteudo > p, .conteudo h1",
        {
            duration: 0.5,
            x: -100,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.in",
            force3D: true
        },
        "-=0.2"
    );

    adicionarSaida(
        timeline,
        "header",
        {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: "power2.in",
            force3D: true
        },
        "-=0.3"
    );

    // Home sai pela direita
    adicionarSaida(
        timeline,
        ".imagemdefundo_home",
        {
            duration: 0.8,
            x: 100,
            opacity: 0,
            ease: "power3.in",
            force3D: true
        },
        "-=0.3"
    );
}


// ========================================================
// SAÍDA — SOBRE
// ========================================================

function saidaSobre(timeline) {
    adicionarSaida(
        timeline,
        ".footer h2",
        {
            duration: 0.4,
            y: 30,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.in",
            force3D: true
        }
    );

    adicionarSaida(
        timeline,
        ".sobre > p, .sobre > h2, .sobre > h1",
        {
            duration: 0.5,
            x: -100,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.in",
            force3D: true
        },
        "-=0.2"
    );

    adicionarSaida(
        timeline,
        "header",
        {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: "power2.in",
            force3D: true
        },
        "-=0.3"
    );

    // Sobre sai pela esquerda
    adicionarSaida(
        timeline,
        ".imagemdefundo_sobre",
        {
            duration: 0.8,
            x: -150,
            opacity: 0,
            ease: "power3.in",
            force3D: true
        },
        "-=0.3"
    );
}


// ========================================================
// SAÍDA — SKILLS
// ========================================================

function saidaSkills(timeline) {
    adicionarSaida(
        timeline,
        ".soft-skills > h3",
        {
            duration: 0.4,
            y: 30,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.in",
            force3D: true
        }
    );

    adicionarSaida(
        timeline,
        ".hard-skills > li",
        {
            duration: 0.4,
            y: 30,
            opacity: 0,
            stagger: {
                each: 0.025,
                from: "end"
            },
            ease: "power2.in",
            force3D: true
        },
        "-=0.2"
    );

    adicionarSaida(
        timeline,
        ".container-skills > h1",
        {
            duration: 0.5,
            x: -100,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.in",
            force3D: true
        },
        "-=0.3"
    );

    adicionarSaida(
        timeline,
        "header",
        {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: "power2.in",
            force3D: true
        },
        "-=0.3"
    );

    // Skills sai pela esquerda
    adicionarSaida(
        timeline,
        ".imagemdefundo_skills",
        {
            duration: 0.8,
            x: -150,
            opacity: 0,
            ease: "power3.in",
            force3D: true
        },
        "-=0.3"
    );
}


// ========================================================
// SAÍDA — PROJETOS
// ========================================================

function saidaProjetos(timeline) {
    adicionarSaida(
        timeline,
        ".arrows",
        {
            duration: 0.4,
            y: 30,
            opacity: 0,
            ease: "power2.in",
            force3D: true
        }
    );

    adicionarSaida(
        timeline,
        ".carousel-item",
        {
            duration: 0.4,
            opacity: 0,
            stagger: {
                each: 0.04,
                from: "end"
            },
            ease: "power2.in"
        },
        "-=0.2"
    );

    adicionarSaida(
        timeline,
        ".projetos > h1",
        {
            duration: 0.5,
            x: -100,
            opacity: 0,
            ease: "power3.in",
            force3D: true
        },
        "-=0.2"
    );

    adicionarSaida(
        timeline,
        "header",
        {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: "power2.in",
            force3D: true
        },
        "-=0.3"
    );
}


// ========================================================
// CONTROLE DE SAÍDA
// ========================================================

function animarSaida(urlDestino) {
    if (transicaoEmAndamento) {
        return;
    }

    transicaoEmAndamento = true;

    document.body.style.pointerEvents = "none";

    /*
     * Garante que a próxima página comece a carregar
     * antes mesmo da animação terminar.
     */
    preCarregarPagina(urlDestino);

    const timeline = gsap.timeline({
        defaults: {
            overwrite: "auto"
        },
        onComplete: () => {
            window.location.assign(urlDestino);
        }
    });

    switch (paginaAtual) {
        case "home":
            saidaHome(timeline);
            break;

        case "sobre":
            saidaSobre(timeline);
            break;

        case "skills":
            saidaSkills(timeline);
            break;

        case "projetos":
            saidaProjetos(timeline);
            break;

        default:
            window.location.assign(urlDestino);
    }
}


// ========================================================
// LINKS INTERNOS
// ========================================================

function normalizarEndereco(endereco) {
    const url = new URL(endereco, window.location.href);

    let caminho = url.pathname
        .replace(/index\.html$/i, "")
        .replace(/\/+$/, "");

    return `${url.origin}${caminho}`;
}


function deveAnimarLink(evento, link) {
    const href = link.getAttribute("href");

    if (!href) {
        return false;
    }

    if (evento.button !== 0) {
        return false;
    }

    if (
        evento.ctrlKey ||
        evento.shiftKey ||
        evento.altKey ||
        evento.metaKey
    ) {
        return false;
    }

    if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:")
    ) {
        return false;
    }

    const destino = new URL(href, window.location.href);

    if (destino.origin !== window.location.origin) {
        return false;
    }

    if (
        normalizarEndereco(destino.href) ===
        normalizarEndereco(window.location.href)
    ) {
        return false;
    }

    return true;
}


function configurarLinks() {
    const links = document.querySelectorAll(
        ".menu a, .btt a"
    );

    links.forEach((link) => {
        link.addEventListener("click", (evento) => {
            if (!deveAnimarLink(evento, link)) {
                return;
            }

            evento.preventDefault();

            const destino = new URL(
                link.getAttribute("href"),
                window.location.href
            );

            animarSaida(destino.href);
        });
    });
}


// ========================================================
// INICIALIZAÇÃO
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
        console.error("A biblioteca GSAP não foi carregada.");
        return;
    }

    paginaAtual = identificarPagina();

    if (!paginaAtual) {
        console.warn("A página atual não foi identificada.");
        return;
    }

    const reduzirMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduzirMovimento) {
        return;
    }

    configurarPreCarregamento();
    configurarLinks();
    animarEntrada();
});


// ========================================================
// BOTÃO VOLTAR DO NAVEGADOR
// ========================================================

window.addEventListener("pageshow", () => {
    transicaoEmAndamento = false;
    document.body.style.pointerEvents = "";
});