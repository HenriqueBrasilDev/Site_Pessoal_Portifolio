var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),

    carousel = document.querySelector('.projetos'),
    list = document.querySelector('.carousel'),
    item = document.querySelector('.carousel-item'),
    runningTime = document.querySelector('.timeRunning')

let timeRunning = 3000
let timeAutoNext = 7000 

if (nextBtn) {
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
}



if (document.querySelector(".hard-skills")) {
    let indexx = 0;
    const carousel = document.querySelectorAll(".hard-skills li");

    const destaque1 = document.querySelector(".hard-skills .li").length;
    const destaque2 = document.querySelector(".hard-skills .li p.selected");
    const destaque3 = document.querySelector(".hard-skills .li h3.selected");

    setInterval(() => {
        indexx = (indexx + 1) % carousel.length;
        
        carousel.forEach((item, i) => {
            item.style.transform = `translateX(-${indexx * 100}%)`;
        });

        destaque1.classList.add("selected");
        destaque2.classList.add("selected");
        destaque3.classList.add("selected");

    }, 4000);
}