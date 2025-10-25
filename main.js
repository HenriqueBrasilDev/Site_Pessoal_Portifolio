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
    const carousel = document.querySelectorAll('.hard-skills li');
    const list = document.querySelector('.hard-skills');
    let indexx = 0;


    setInterval(() => {
        indexx = (indexx + 1);
        console.log(`indexx + 1`);

        if (indexx === 0) {

            carousel.forEach((item, i) => {
                carousel.style.transition = `none`;
            });
        }



        carousel.forEach((item, i) => {
            item.style.transform = `translateX(-${indexx * 100}px)`;
        });


        carousel.forEach((item, i) => {
            const img = item.querySelector('img');
            img.classList.toggle('selected', i === indexx+3);
        });


        if (indexx >= 5) {
            indexx = 0;
            console.log(indexx);

            carousel.forEach((item, i) => {
                item.style.transition = `none`;
                item.style.transform = `translateX(-${indexx * 100}px)`;
            });

            carousel.forEach((item, i) => {
                const img = item.querySelector('img');
                img.classList.toggle('selected', i === 3);
            });
            

            // carousel.forEach((item, i) => {
            //     img.classList.toggle('selected', i === 3);
            //     console.log(`Transition removed`);
            // });
            
            // carousel.forEach((item, i) => {
            //     item.style.transform = `translateX(-${indexx * 100}px)`;
            // });

        }else {
            carousel.forEach((item, i) => {
                item.style.transition = `transform 1s ease-in-out`;
            });
        }

        

    }, 2000);

}