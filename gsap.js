// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", (event) => {
    
    // Cria uma Timeline do GSAP para encadear as animações
    const tl = gsap.timeline();

    // 1. Anima a imagem de fundo (Vindo da direita com fade in)
    tl.from(".imagemdefundo_home", {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: "power3.out"
    }, "+=0.2") // Começa 0.2s após o carregamento

    // 2. Anima o Header/Navegação (Descendo do topo)
    .from("header", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    }, "-=1") // Começa 1 segundo antes da animação anterior terminar

    // 3. Anima o Título (Vindo da esquerda)
    .from(".conteudo h1", {
        duration: 1,
        x: -100,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.5")

    // 4. Anima o Subtítulo (Vindo da esquerda, levemente após o título)
    .from(".conteudo p", {
        duration: 1,
        x: -50,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.7")

    // 5. Anima os Botões (Surgindo de baixo para cima com efeito de "pulo")
    .from(".btt a", {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2, // Um botão aparece 0.2s depois do outro
        ease: "back.out(1.7)"
    }, "-=0.5")

    // 6. Anima os Ícones Sociais (Surgindo um por um)
    .from(".icons li", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        stagger: 0.15, // Efeito cascata nos ícones
        ease: "back.out(1.5)"
    }, "-=0.4");

    /* ========================================================
    DICA PARA AS OUTRAS PÁGINAS (Skills, Sobre, Projetos):
    Se você for colocar tudo em uma única página "One Page",
    você pode usar o ScrollTrigger do GSAP para animar os 
    elementos apenas quando o usuário rolar a tela até eles.
    ========================================================
    */
    
});

// Função para executar a animação de saída
function animarSaida(urlDestino) {
    const tlSaida = gsap.timeline({
        // Quando a timeline terminar, redireciona para a nova página
        onComplete: () => {
            if(urlDestino) {
                window.location.href = urlDestino;
            }
        }
    });

    // Anima a saída na ordem inversa ou agrupada para ser mais rápida
    tlSaida
        // 1. Some com os ícones e botões (descendo e apagando)
        .to(".icons li, .btt a", {
            duration: 0.4,
            y: 30,
            opacity: 0,
            stagger: 0.05, // Stagger mais rápido na saída
            ease: "power2.in" // Easing ".in" é melhor para saídas
        })
        
        // 2. Some com o texto (escorregando de volta para a esquerda)
        .to(".conteudo p, .conteudo h1", {
            duration: 0.5,
            x: -100,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.in"
        }, "-=0.2")

        // 3. Some com o Header (subindo)
        .to("header", {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: "power2.in"
        }, "-=0.3")

        // 4. Some com a imagem de fundo (escorregando para a direita)
        .to(".imagemdefundo_home", {
            duration: 0.8,
            x: 100,
            opacity: 0,
            ease: "power3.in"
        }, "-=0.3");
}

// ========================================================
// COMO USAR: Interceptando cliques nos links do menu
// ========================================================
document.addEventListener("DOMContentLoaded", (event) => {
    
    // ... [SUA ANIMAÇÃO DE ENTRADA AQUI] ...

    // Seleciona todos os links de navegação que devem ter a transição
    // (Adicione a classe 'link-transicao' no HTML nos links do seu menu)
    const linksDeTransicao = document.querySelectorAll("a.link-transicao");

    linksDeTransicao.forEach(link => {
        link.addEventListener("click", function(e) {
            // Verifica se o link é para a mesma página (âncora) ou abre em nova guia
            if (this.getAttribute('target') === '_blank' || this.getAttribute('href').startsWith('#')) {
                return; // Deixa o comportamento padrão acontecer
            }

            e.preventDefault(); // Impede o clique de mudar a página instantaneamente
            const urlDestino = this.getAttribute("href"); // Salva o destino do link

            animarSaida(urlDestino); // Dispara a animação e passa o link
        });
    });
});
