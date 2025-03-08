function abrirModal(){
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    setTimeout(function () {modal.classList.remove('abrir')}, 7000)
}

