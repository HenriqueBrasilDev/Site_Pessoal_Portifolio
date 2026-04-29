function abrirModal(){
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            modal.classList.remove('abrir')
        }
    })
}

function abrirCurriculo(){
    const janelacur = document.getElementById('janela-curriculo')
    janelacur.classList.add('abrirc')

    janelacur.addEventListener('click', (e) => {
        if(e.target.id == 'fechar-curriculo' || e.target.id == 'janela-curriculo'){
            janelacur.classList.remove('abrirc')
        }
    })
}


function bttField(){
    const curriculofield = document.getElementById('curSimples')
    const curriculodev = document.getElementById('curCaprichado')

    const bttdowloadfield = document.getElementById('baixar-curriculo-simples')
    const bttdowloaddev = document.getElementById('baixar-curriculo-design')

    curriculodev.classList.add('curriculo-none')
    curriculofield.classList.remove('curriculo-none')

    bttdowloaddev.classList.add('curriculo-none')
    bttdowloadfield.classList.remove('curriculo-none')
}

function bttDev(){
    const curriculofield = document.getElementById('curSimples')
    const curriculodev = document.getElementById('curCaprichado')

    const bttdowloadfield = document.getElementById('baixar-curriculo-simples')
    const bttdowloaddev = document.getElementById('baixar-curriculo-design')

    curriculodev.classList.remove('curriculo-none')
    curriculofield.classList.add('curriculo-none')

    bttdowloadfield.classList.add('curriculo-none')
    bttdowloaddev.classList.remove('curriculo-none')
}
