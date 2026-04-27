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
