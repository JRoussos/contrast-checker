import imagesLoaded from 'imagesloaded';
import { marked } from 'marked';

import 'github-markdown-css/github-markdown.css';
import 'github-markdown-css/github-markdown-light.css';

import ColorChecker from '../dist/contrast-checker.js';

import ColorChecker_README from '../README.md?raw';
import ColorChecker_DEMO_INSTRUCTIONS from './demo_instructions.md?raw';

const container = document.getElementById('read-me-container')

if (container) {
    container.insertAdjacentHTML('beforeend', marked.parse(ColorChecker_DEMO_INSTRUCTIONS))
    container.insertAdjacentHTML('beforeend', marked.parse(ColorChecker_README))
}


imagesLoaded(document.querySelector('.swiper'), {background: true}, function () {
    console.log('All images loaded')

    const checker = new ColorChecker()

    function handlePaginationBulletColors(swiper) {
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

    function handleSwiperSlideTextInit(swiper) {
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
})