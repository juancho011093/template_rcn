 jQuery(document).ready(function() {
                            $('.menu-toggle').click(function() {
                                $(this).find('.open').toggleClass('openmenu');
                            });
                            $('#button_top').click(function() {
                                $('html, body').animate({
                                    scrollTop: 0
                                }, 'slow');
                                return false;
                            });
                        });

                        $(window).scroll(function() {
                            if ($(this).scrollTop() > 100) {
                                $('#button_top').addClass('show');
                            } else {
                                $('#button_top').removeClass('show');;
                            }
                        });

                        $(window).scroll(function() {
                            if ($(this).scrollTop() > 50) {
                                $('#menu-segundario').addClass('stick');

                            } else {
                                $('#menu-segundario').removeClass('stick');
                            }
                        });
