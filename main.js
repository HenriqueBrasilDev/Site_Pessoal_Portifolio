var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),

    carousel = document.querySelector('.projetos'),
    list = document.querySelector('.carousel'),
    item = document.querySelector('.carousel-item'),
    runningTime = document.querySelector('.timeRunning')

    let timeRunning = 3000
    let timeAutoNext = 7000 


if (document.querySelector('.projetos')) {
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
    const carousel = document.querySelectorAll('.hard-skills li');
    const list = document.querySelector('.hard-skills');
    let ico_select = 0;
    let time = 0;
    

    function RodarCarrousel(){
        time = 4000;
        ico_select = (ico_select + 1);
        

        if (ico_select == 0) {
            carousel.forEach((item, i) => {
                item.style.transition = `none`;
            });
        }


        carousel.forEach((item, i) => {
            item.style.transform = `translateX(-${ico_select * 100}px)`;
        });


        carousel.forEach((item, i) => {
            const img = item.querySelector('img');
            img.classList.toggle('selected', i === ico_select+3);

            const texto1 = item.querySelector('h3');
            texto1.classList.toggle('selected', i === ico_select+3);

            const texto2 = item.querySelector('p');
            texto2.classList.toggle('selected', i === ico_select+3);
        });


        if (ico_select >= 15) {
            time = 0;

            carousel.forEach((item, i) => {
                const img = item.querySelector('img');
                img.classList.toggle('selected', i === ico_select+3 || i === 3);

                const texto1 = item.querySelector('h3');
                texto1.classList.toggle('selected', i === ico_select+3 || i === 3);

                const texto2 = item.querySelector('p');
                texto2.classList.toggle('selected', i === ico_select+3 || i === 3);
            });
        }


        if (ico_select >= 16) {
            ico_select = 0;
            time = 0;
            console.log(ico_select);
            carousel.forEach((item, i) => {
                item.style.transition = `none`;
                item.style.transform = `translateX(20px)`;

                const texto1 = item.querySelector('h3');
                texto1.classList.toggle('selected', i === ico_select+3);
            });
        }else {
            carousel.forEach((item, i) => {
                item.style.transition = `transform 1s ease-in-out`;
            });
        }
        setTimeout(RodarCarrousel, time);
    }

    RodarCarrousel();

}