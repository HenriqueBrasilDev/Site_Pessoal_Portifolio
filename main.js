var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),

    carousel = document.querySelector('.projetos'),
    list = document.querySelector('.carousel'),
    item = document.querySelector('.carousel-item'),
    runningTime = document.querySelector('.timeRunning')

let timeRunning = 3000
let timeAutoNext = 7000 

nextBtn.onclick = function(){
    showSlider('next')
}
 
prevBtn.onclick = function(){
    showSlider('prev')
}




let runTimeOut

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)




function resetTimeAnimation (){
    runningTime.style.animation = 'nome'
    runningTime.offsetHeight
    runningTime.style.animation = null
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}









function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.projetos .carousel .carousel-item')
    if(type ==='next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)

    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation()
}



resetTimeAnimation()

document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    const carousel = document.querySelector(".hard-skills");
    const totalSlides = document.querySelectorAll(".hard-skills li").length;

    setInterval(() => {
        index = (index + 1) % totalSlides;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }, 4000);
});