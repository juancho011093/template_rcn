jQuery('.contenedor-slide').slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2500,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: true,
            swipeToSlide: true,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    pauseOnFocus: true,
                    swipeToSlide: true,
                    dots: false
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    pauseOnFocus: true,
                    swipeToSlide: true,
                    dots: false
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    pauseOnFocus: true,
                    swipeToSlide: true,
                    dots: false
                }
            }]
        });