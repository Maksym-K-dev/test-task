document.addEventListener('DOMContentLoaded', function () {
    const aboutBrandSlider = new Swiper('.about-brand__slider', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,

        navigation: {
            nextEl: '.about-brand__nav .swiper-button-next',
            prevEl: '.about-brand__nav .swiper-button-prev',
        },

        scrollbar: {
            el: '.about-brand__scrollbar',
            draggable: true,
            hide: false,
            snapOnRelease: true,
        },

        pagination: {
            el: '.about-brand__progress',
            type: 'progressbar',
        },

        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        on: {
            slideChange: function () {
                const slides = this.slides;
                slides.forEach(slide => slide.classList.remove('is-center'));

                const centerIndex = this.activeIndex;
                if (slides[centerIndex]) {
                    slides[centerIndex].classList.add('is-center');
                }
            },
        },
    });
});
