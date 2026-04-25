// --- CARROSSEL 1: PROJETOS ---
const projetosContainer = document.querySelector('.projetos');

if (projetosContainer) {
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const list = document.querySelector('.carousel');
    const runningTime = document.querySelector('.timeRunning');

    const timeRunning = 3000;
    const timeAutoNext = 7000;
    let runTimeOut;
    let runNextAuto;

    // Função separada para manter o código limpo
    const resetTimeAnimation = () => {
        runningTime.style.animation = 'none';
        void runningTime.offsetHeight; // Força o "reflow" do navegador mais rápido que ler a variável
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
    };

    const showSlider = (type) => {
        // OTIMIZAÇÃO: Em vez de usar querySelectorAll toda vez, 
        // usamos firstElementChild e lastElementChild direto da lista. É muito mais rápido!
        if (type === 'next') {
            list.appendChild(list.firstElementChild);
            projetosContainer.classList.add('next');
        } else {
            list.prepend(list.lastElementChild);
            projetosContainer.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            projetosContainer.classList.remove('next', 'prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => nextBtn.click(), timeAutoNext);

        resetTimeAnimation();
    };

    // OTIMIZAÇÃO: Melhor usar event listeners em vez de .onclick direto
    nextBtn.addEventListener('click', () => showSlider('next'));
    prevBtn.addEventListener('click', () => showSlider('prev'));

    // Inicia o auto-play
    runNextAuto = setTimeout(() => nextBtn.click(), timeAutoNext);
    resetTimeAnimation();
}


// --- CARROSSEL 2: HARD SKILLS ---
const hardSkillsContainer = document.querySelector(".hard-skills");

if (hardSkillsContainer) {
    const carouselItems = document.querySelectorAll('.hard-skills li');
    
    // OTIMIZAÇÃO VITAL: Fazer cache dos elementos internos (img, h3, p) UMA única vez na inicialização.
    // Isso evita que o JavaScript varra o DOM inteiro a cada 4 segundos.
    const cachedItems = Array.from(carouselItems).map(item => ({
        el: item,
        img: item.querySelector('img'),
        h3: item.querySelector('h3'),
        p: item.querySelector('p')
    }));

    let ico_select = 0;
    let time = 4000;

    function RodarCarrousel() {
        time = 4000;
        ico_select++;

        // OTIMIZAÇÃO: Juntei os 4 loops .forEach separados em um único loop.
        cachedItems.forEach(({ el, img, h3, p }, i) => {
            
            // 1. Lida com a transição
            if (ico_select === 2 || ico_select >= 16) {
                el.style.transition = 'none';
            } else {
                el.style.transition = 'transform 1s ease-in-out';
            }

            // 2. Lida com a transformação (movimento)
            if (ico_select >= 16) {
                el.style.transform = `translateX(20px)`;
            } else {
                el.style.transform = `translateX(-${ico_select * 100}px)`;
            }

            // 3. Lida com a seleção de classes
            let isSelected = false;
            if (ico_select >= 15) {
                isSelected = (i === ico_select + 3 || i === 3);
            } else {
                isSelected = (i === ico_select + 3);
            }

            // Aplica as classes usando as variáveis salvas no cache
            if (img) img.classList.toggle('selected', isSelected);
            if (h3) h3.classList.toggle('selected', isSelected);
            if (p) p.classList.toggle('selected', isSelected);
        });

        // 4. Controle de tempo e reset
        if (ico_select >= 15) {
            time = 0;
        }

        if (ico_select >= 16) {
            ico_select = 0;
            time = 0;
        }

        setTimeout(RodarCarrousel, time);
    }

    RodarCarrousel();
}