function abrirModal(){
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            modal.classList.remove('abrir')
        }
    })



    // setTimeout(function () {modal.classList.remove('abrir')}, 7000)
}

function abrirCurriculo(){
    const janelacur = document.getElementById('janela-curriculo')
    janelacur.classList.add('abrirc')

    janelacur.addEventListener('click', (e) => {
        if(e.target.id == 'fechar-curriculo' || e.target.id == 'janela-curriculo'){
            janelacur.classList.remove('abrirc')
        }
    })



    // setTimeout(function () {modal.classList.remove('abrir')}, 7000)
}