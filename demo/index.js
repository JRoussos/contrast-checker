import ColorChecker from '../dist/contrast-checker.js';

const checker = new ColorChecker()

function handlePaginationBulletColors (swiper) {
    const bulletsContainer = swiper.pagination.el
    const colorsArray = [
        '#fff', 
        '#000'
    ]

    checker.updateOptions({
        child: bulletsContainer,
        parent: swiper.slides[swiper.activeIndex].querySelector('img')
    })

    checker.compareAsync(colorsArray).then(color => {
        document.documentElement.style.setProperty('--swiper-pagination-bullet-inactive-opacity', 0.5)
        document.documentElement.style.setProperty('--swiper-pagination-bullet-inactive-color', color)  
    })
}

function handleSwiperSlideTextInit (swiper) {
    swiper.slides.forEach(slide => {
        const child = slide.querySelector('span')
        const colorsArray = [
            '#d23d11', 
            '#7f99ab', 
            '#9cdbb9'
        ]
        
        child.style.color = checker.updateOptions({ child }).compare(colorsArray)
    })

    handlePaginationBulletColors(swiper)
}

window.swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
    on: {
        init: handleSwiperSlideTextInit,
        slideChangeTransitionEnd: handlePaginationBulletColors,
    },
})