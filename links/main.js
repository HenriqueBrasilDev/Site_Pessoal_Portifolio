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


function bttSimples(){
    const curriculosimples = document.getElementById('curSimples')
    const curriculocaprichado = document.getElementById('curCaprichado')

    const bttdowloadsimples = document.getElementById('baixar-curriculo-simples')
    const bttdowloadcapri = document.getElementById('baixar-curriculo-design')

    curriculocaprichado.classList.add('curriculo-none')
    curriculosimples.classList.remove('curriculo-none')

    bttdowloadsimples.classList.remove('curriculo-none')
    bttdowloadcapri.classList.add('curriculo-none')

}

function bttCaprichado(){
    const curriculosimples = document.getElementById('curSimples')
    const curriculocaprichado = document.getElementById('curCaprichado')

    const bttdowloadsimples = document.getElementById('baixar-curriculo-simples')
    const bttdowloadcapri = document.getElementById('baixar-curriculo-design')

    curriculocaprichado.classList.remove('curriculo-none')
    curriculosimples.classList.add('curriculo-none')
    
    bttdowloadsimples.classList.add('curriculo-none')
    bttdowloadcapri.classList.remove('curriculo-none')
}
