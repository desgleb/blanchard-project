document.addEventListener("DOMContentLoaded", () => {

    let burgerOn = false;
    let tabletOn = false;
    let tabletS = false;

    function widthCheckup() {
        let bodyWidth = document.body.clientWidth;

        if (bodyWidth <= 1024) {
            burgerOn = true;
        } else {
            burgerOn = false;
        }

        if (bodyWidth <= 768) {
            tabletOn = true;
        } else {
            tabletOn = false;
        }

        if (bodyWidth <= 480) {
            tabletS = true;
        } else {
            tabletS = false;
        }
    }

    widthCheckup();

    // Перемещение слайдера и панели управления в галерее для мобильных устройств
    const gallerySwiperMove = () => {

        if (tabletOn) {
            document.querySelector('.gallery__filter').after(document.querySelector('.gallery__right'));
        } else {
            document.querySelector('.gallery__left').after(document.querySelector('.gallery__right'));
        }

        if (tabletS) {
            document.querySelector('.gallery__slider').after(document.querySelector('.gallery__slider-control-panel'));
        } else {
            document.querySelector('.gallery__slider').before(document.querySelector('.gallery__slider-control-panel'));
        }
    }

    gallerySwiperMove();

    // на jQuery
    // плавный скролл по блокам
    $('.nav__link').on('click', function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        let offset = $(href).offset().top;
        $('body,html').animate({
            scrollTop: offset,
        }, 2000);
    });

    $('.nav__link-mobile').on('click', function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        let offset = $(href).offset().top;
        $('body,html').animate({
            scrollTop: offset,
        }, 2000);
    });

    // скролл на карту с кнопки в hero
    $('.hero__btn').on('click', function (e) {
        e.preventDefault();
        let mapPosition = $('#contactsMap').offset().top;
        $('body,html').animate({
            scrollTop: mapPosition,
        }, 2000);
    });

    // скролл на Галерею по ссылке в аккордионе
    $('.catalogue__accordion-empty-link').on('click', function (e) {
        e.preventDefault();
        let gallery = $('#gallery').offset().top;
        $('body,html').animate({
            scrollTop: gallery,
        }, 1100);
    });

    // бургер
    const burger = document.querySelector('.burger');
    const burgerLogin = document.querySelector('.header__login-mobile');
    const burgerSearch = document.querySelector('.header__search-close-icon');
    const searchBtn = document.querySelector('.header__search-close');
    const mobileSearch = document.querySelector('.header__search-mobile');
    const mobileSearchBtn = document.querySelector('.header__search-opened-icon');
    const mobileSearchClose = document.querySelector('.header__search-close-768');
    const nav = document.querySelector('.nav');

    function burgerMenuMove() {
        if (burgerOn) {
            nav.classList.add('nav-mobile');
            nav.classList.add('burger__menu');
            nav.querySelector('.nav__list').classList.add('flex-column');
            nav.querySelector('.nav__list').classList.remove('flex-row');
            nav.querySelector('.nav__list').classList.add('nav__list-mobile');
            nav.querySelectorAll('.nav__item').forEach((item) => {
                item.classList.add('nav__item-mobile');
            });
            nav.querySelectorAll('.nav__link').forEach((item) => {
                item.classList.add('nav__link-mobile');
            });
            burger.after(nav);
        } else {
            nav.classList.remove('nav-mobile');
            nav.classList.remove('burger__menu');
            nav.querySelector('.nav__list').classList.remove('flex-column');
            nav.querySelector('.nav__list').classList.add('flex-row');
            nav.querySelector('.nav__list').classList.remove('nav__list-mobile');
            nav.querySelectorAll('.nav__item').forEach((item) => {
                item.classList.remove('nav__item-mobile');
            });
            nav.querySelectorAll('.nav__link').forEach((item) => {
                item.classList.remove('nav__link-mobile');
            });
            document.querySelector('.header__logo').after(nav);
        }
    }

    burgerMenuMove();

    const burgerOpenClose = (burger, burgerMenu) => {
        burgerMenu.classList.toggle('burger__menu-active');
        burger.children[1].classList.toggle('burger-close-mid');
        burger.children[2].classList.toggle('burger-close-bot');
        burger.children[0].classList.toggle('burger-close-top');
        burger.classList.toggle('burger-close');
    }

    const mobileWidthCheck = () => {
        if (window.innerWidth <= '768') {
            burger.classList.toggle('visually-hidden');
            document.querySelector('.header__logo').classList.toggle('visually-hidden');
        }
    }

    document.addEventListener('click', function (e) {
        let burgerLinks = document.querySelectorAll('.nav__link-mobile');

        if (e.target == burger || e.target == burgerLogin || (e.target == burgerSearch && burger.classList.contains('burger-close'))) {
            burgerOpenClose(burger, nav);
        }

        burgerLinks.forEach((item) => {
            if (e.target == item) {
                burgerOpenClose(burger, nav);
            }
        })

        burger.addEventListener('click', () => {
            if (mobileSearch.classList.contains('search-mobile-active')) {
                searchBtn.classList.remove('visually-hidden');
                mobileSearch.classList.remove('search-mobile-active');
            }
        });
    });

    // поиск на мобильных устройствах
    searchBtn.addEventListener('click', () => {
        searchBtn.classList.add('visually-hidden');
        mobileSearch.classList.add('search-mobile-active');

        mobileWidthCheck();
    });

    mobileSearch.addEventListener('click', (e) => {
        if (e.target == mobileSearchBtn || e.target == mobileSearchClose) {
            searchBtn.classList.remove('visually-hidden');
            mobileSearch.classList.remove('search-mobile-active');

            mobileWidthCheck();
        }
    });

    mobileSearch.addEventListener('keydown', (e) => {
        if (e.code == 'Enter' || e.code == 'NumpadEnter') {
            searchBtn.classList.remove('visually-hidden');
            mobileSearch.classList.remove('search-mobile-active');

            mobileWidthCheck();
        }
    });

    // выпадающее меню в шапке
    let visible;

    document.addEventListener('click', function (event) {
        let target = event.target;
        let parent = target.parentElement;
        let dropdowns = document.querySelectorAll('.list__item-dropdown-wrapper');
        let btns = document.querySelectorAll('.list__item-btn');
        let dropdown = parent.querySelector('.list__item-dropdown-wrapper');
        let content = parent.querySelector('.simplebar-content');

        if (visible && target !== content && !target.classList.contains('list__item-btn')) {
            dropdowns.forEach((item) => {
                item.classList.remove('js-dropdown-visible');
            });
            btns.forEach((item) => {
                item.classList.remove('js-list__item-btn-active');
            });
            target.blur();
            visible = false;
        } else if (target.classList.contains('list__item-btn')) {
            dropdowns.forEach((item) => {
                item.classList.remove('js-dropdown-visible');
            });
            btns.forEach((item) => {
                item.classList.remove('js-list__item-btn-active');
            });
            dropdown.classList.add('js-dropdown-visible');
            target.classList.add('js-list__item-btn-active');
            visible = true;
        }
    });

    // custom scrollbar in header menu dropdowns
    let customBars = document.querySelectorAll('.list__item-dropdown');
    customBars.forEach((e) => {
        new SimpleBar(e);
    });


    // смена фона каждые 2 секунды в hero
    const heroSwiper = document.querySelector('.hero__swiper');

    const swiperHero = new Swiper(heroSwiper, {
        slidesPerView: 1,
        speed: 2000,
        autoplay: {
            delay: 2000,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        preloadImages: false,
    });

    // Селект в галерее
    const selectGalleryTop = document.querySelector(".gallery__select");
    const choicesGalleryTop = new Choices(selectGalleryTop, {
        removeItems: false,
        paste: false,
        placeholder: true,
        searchEnabled: false,
        searchChoices: false,
        shouldSort: false,
        itemSelectText: "",
        silent: true
    });

    // Слайдер в галерее
    const sliderGallery = document.querySelector(".gallery__slider");

    const gallerySlider = new Swiper(sliderGallery, {
        preloadImages: false,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1,
            },
            481: {
                slidesPerView: 2,
                spaceBetween: 34,
                slidesPerGroup: 2,
                grid: {
                    fill: 'row',
                    rows: 2,
                },
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 15,
                slidesPerGroup: 2,
                grid: {
                    fill: 'row',
                    rows: 2,
                },
            },
            998: {
                slidesPerView: 2,
                spaceBetween: 34,
                slidesPerGroup: 2,
                grid: {
                    fill: 'row',
                    rows: 2,
                },
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 50,
                slidesPerGroup: 3,
                grid: {
                    fill: 'row',
                    rows: 2,
                },
            },
        },
        navigation: {
            nextEl: ".gallery__slider-next",
            prevEl: ".gallery__slider-prev",
        },
        pagination: {
            el: ".gallery__slider-pagination",
            type: "fraction",
        },
    });

    // Модальное окно в галерее
    const modal = new GraphModal();

    // Активный автор в каталоге (аккордион)
    (function activeAuthor() {
        const authors = document.querySelectorAll('.catalogue__accordion-item');

        authors.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                authors.forEach(function (it) {
                    it.classList.remove('catalogue__accordion-list-selected');
                });
                this.classList.add('catalogue__accordion-list-selected');
            });
        });
    }());

    // Табы в каталоге
    (function tabsInCatalogue() {
        const tabsCat = document.querySelectorAll('.catalogue__tab-btn');
        const tabsContent = document.querySelectorAll('.catalogue__bottom');
        const tabsNames = document.querySelectorAll('.catalogue__accordion-item');
        const tabsCards = document.querySelectorAll('.catalogue__author');

        tabsCat.forEach((item) => {
            item.addEventListener('click', function () {
                const activeTab = this.dataset.cataloguetab;
                const activeAuthor = document.querySelector(`[data-cataloguecontent="${activeTab}"]`);
                const activeAuthorNames = activeAuthor.querySelectorAll('.catalogue__accordion-item');
                const activeAuthorData = activeAuthor.querySelector('.catalogue__accordion-item').dataset.catalogueauthorname;

                tabsCat.forEach((it) => {
                    it.classList.remove('catalogue__tab-active');
                });
                this.classList.add('catalogue__tab-active');

                tabsContent.forEach((it) => {
                    it.classList.remove('content-active');
                });
                document.querySelector(`[data-cataloguecontent="${activeTab}"]`).classList.add('content-active');

                activeAuthorNames.forEach((it) => {
                    it.classList.remove('catalogue__accordion-list-selected');
                });
                activeAuthor.querySelector('.catalogue__accordion-item').classList.add('catalogue__accordion-list-selected');

                tabsCards.forEach((aut) => {
                    aut.classList.remove('catalogue__author-active');
                });
                document.querySelector(`[data-catalogueauthorcard="${activeAuthorData}"]`).classList.add('catalogue__author-active');
            });
        });

        tabsNames.forEach((author) => {
            author.addEventListener('click', function () {
                const activeName = this.dataset.catalogueauthorname;

                tabsNames.forEach((aut) => {
                    aut.classList.remove('catalogue__accordion-list-selected');
                });
                this.classList.add('catalogue__accordion-list-selected');

                tabsCards.forEach((aut) => {
                    aut.classList.remove('catalogue__author-active');
                });
                document.querySelector(`[data-catalogueauthorcard="${activeName}"]`).classList.add('catalogue__author-active');
            });
        });
    }());

    // Аккордион в каталоге
    $(function () {
        $(".catalogue__accordion").accordion({
            header: ".catalogue__accordion-dates",
            heightStyle: "content",
        });
    });

    // Плавный скролл на мобильном устройстве в каталоге
    $('.catalogue__accordion-btn').on('click', function (event) {
        if (tabletOn) {
            event.preventDefault();
            let activeTab = document.querySelector('.content-active');
            let offset = activeTab.querySelector('.catalogue__author-active').offsetTop;
            $('body,html').animate({
                scrollTop: offset,
            }, 2000);
        }
    });

    // События
    const eventsBtn = document.querySelector('.events__btn');
    const eventsItems = document.querySelectorAll('.events__item');

    function allEventsVisible() {
        eventsBtn.style.display = 'none';

        eventsItems.forEach((event) => {
            event.style.display = 'block';
        });
    }

    function eventsVisible() {
        eventsBtn.addEventListener('click', () => {
            allEventsVisible();
        });
    };

    eventsVisible();

    // Слайдер в событиях на мобильных устройствах
    const sliderEvents = document.querySelector('.events__slider');

    let eventsSlider;

    function mobileSliderEvents() {
        let bodyWidth = document.body.clientWidth;

        if (bodyWidth <= 480 && sliderEvents.dataset.mobile == 'false') {
            eventsSlider = new Swiper(sliderEvents, {
                slidesPerView: 1,
                spaceBetween: 30,
                wrapperClass: 'events__swiper-wrapper',
                slideClass: 'events__card',
                pagination: {
                    el: '.events__slider-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                preloadImages: false,
            });

            sliderEvents.dataset.mobile = 'true';
        }

        if (bodyWidth > 480) {
            sliderEvents.dataset.mobile = 'false';

            if (sliderEvents.classList.contains('swiper-initialized')) {
                eventsSlider.destroy();
            }
        }
    }

    mobileSliderEvents();


    // Слайдер в изданиях
    const publicationsSlider = document.querySelector('.publications__slider');

    function mobilePublicsSlider() {
        let w = document.body.clientWidth;
        let sliderInPublications;

        if (w > 480 && !sliderInPublications) {
            sliderInPublications = new Swiper(publicationsSlider, {
                preloadImages: false,
                loop: false,
                breakpoints: {
                    481: {
                        spaceBetween: 34,
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    769: {
                        spaceBetween: 34,
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    998: {
                        spaceBetween: 50,
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    1025: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    },
                    1440: {
                        spaceBetween: 50,
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    }
                },
                wrapperClass: 'publications__swiper-wrapper',
                slideClass: 'publications__card',
                navigation: {
                    nextEl: '.publications__slider-next',
                    prevEl: '.publications__slider-prev',
                },
                pagination: {
                    el: '.publications__slider-pagination',
                    type: 'fraction',
                },
            });
        }

        if (w < 481 && sliderInPublications) {
            sliderInPublications.destroy();
        }
    }

    mobilePublicsSlider();


    // Список чекбоксов в изданиях на мобильных устройствах
    function openCloseCheckboxList() {
        let w = window.innerWidth;
        let category = document.querySelector('.publications__list-name');
        let icon = document.querySelector('.publications__list-icon');
        let checkboxes = document.querySelectorAll('.publications__checkbox-item');

        function checkboxCheck() {
            checkboxes.forEach((el) => {
                let checkbox = el.querySelector('.publications__checkbox-input');
                if (checkbox.checked) {
                    el.classList.add('js-checkbox__input-checked--visible');
                } else {
                    el.classList.remove('js-checkbox__input-checked--visible');
                }
            });
        }

        if (w < 481) {
            checkboxCheck();

            category.addEventListener('click', () => {
                if (category.dataset.listopened == 'true') {
                    checkboxes.forEach((el) => {
                        let checkbox = el.querySelector('.publications__checkbox-input');
                        if (!checkbox.checked) {
                            el.classList.remove('js-checkbox__input-checked--visible');
                        }
                    });

                    icon.classList.remove('js-publications__list-icon--opened');

                    category.dataset.listopened = 'false'
                    return
                }

                if (category.dataset.listopened == 'false') {
                    checkboxes.forEach((el) => {
                        let checkbox = el.querySelector('.publications__checkbox-input');
                        if (!checkbox.checked) {
                            el.classList.add('js-checkbox__input-checked--visible');
                        }
                    });

                    icon.classList.add('js-publications__list-icon--opened');

                    category.dataset.listopened = 'true'
                }
            });

            checkboxes.forEach((event) => {
                event.addEventListener('click', () => {
                    if (category.dataset.listopened == 'false') {
                        checkboxes.forEach((el) => {
                            let checkbox = el.querySelector('.publications__checkbox-input');
                            if (!checkbox.checked) {
                                el.classList.remove('js-checkbox__input-checked--visible');
                            }
                        });
                    }
                });
            });
        }
    }

    openCloseCheckboxList();


    // Слайдер в проектах
    const sliderProjects = document.querySelector('.projects__partners-slider');

    let projectsSlider = new Swiper(sliderProjects, {
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 34,
            },
            998: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 50,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 50,
            },
        },
        navigation: {
            nextEl: '.projects__partners-slider-next',
            prevEl: '.projects__partners-slider-prev',
        },
        preloadImages: false,
        wrapperClass: 'projects__partners-swiper-wrapper',
        slideClass: 'projects__partners-card',
    });

    // INPUT MASK
    let telMask = document.querySelector('.contacts__form-input-tel');
    let imTel = new Inputmask("+7 (999) 999-99-99");
    imTel.mask(telMask);

    // VALIDATION OF FORM
    new JustValidate('.contacts__form', {
        colorWrong: '#D11616',
        focusWrongField: true,
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 30
            },
            myPhone: {
                required: true,
                function: () => {
                    const phone = telMask.inputmask.unmaskedvalue();

                    return Number(phone) && phone.length === 10;
                }
            },
        },
        messages: {
            name: 'Недопустимый формат',
            myPhone: 'Недопустимый формат'
        },
        submitHandler: function (thisForm) {
            let formData = new FormData(thisForm);

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        new GraphModal().open('mail');
                    }
                }
            }

            xhr.open('POST', 'mail.php', true);
            xhr.send(formData);

            thisForm.reset();
        }
    });

    // YANDEX MAP
    // перемещение Яндекс.Карты на мобильных устройствах
    function ymapsMove() {
        if (window.innerWidth <= 600) {
            document.querySelector('.contacts__adress').after(document.querySelector('.contacts__map'));
        } else {
            document.querySelector('.contacts__left').after(document.querySelector('.contacts__map'));
        }
    }

    ymapsMove();

    const contacts = document.querySelector('.contacts');
    let ymapBlanchard;
    let blanchardPlacemark;

    document.addEventListener('scroll', () => {
        if (!ymapBlanchard && contacts.getBoundingClientRect().top < 1400) {
            ymaps.ready(init);
        }
    });


    function init() {
        // Создание карты.
        if (window.innerWidth <= 600) {
            if (ymapBlanchard) {
                ymapBlanchard.destroy();
            }

            ymapBlanchard = new ymaps.Map("contactsMap", {
                center: [55.7587, 37.6125],
                controls: [],
                zoom: 14,
                autoFitToViewport: 'always',
            });

            blanchardPlacemark = new ymaps.Placemark(
                [55.75846306898368, 37.601079499999905],
                {},
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/mapCustomIcon.png",
                    iconImageSize: [20, 20],
                    iconImageOffset: [0, 0],
                }
            );
        } else if (window.innerWidth <= 768) {
            if (ymapBlanchard) {
                ymapBlanchard.destroy();
            }

            ymapBlanchard = new ymaps.Map("contactsMap", {
                center: [55.7614, 37.61],
                controls: [],
                zoom: 14,
                autoFitToViewport: 'always',
            });

            blanchardPlacemark = new ymaps.Placemark(
                [55.75846306898368, 37.601079499999905],
                {},
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/mapCustomIcon.png",
                    iconImageSize: [20, 20],
                    iconImageOffset: [0, 0],
                }
            );
        } else if (window.innerWidth <= 1024) {
            if (ymapBlanchard) {
                ymapBlanchard.destroy();
            }

            ymapBlanchard = new ymaps.Map("contactsMap", {
                center: [55.76, 37.6168],
                controls: [],
                zoom: 14,
                autoFitToViewport: 'always',
            });

            blanchardPlacemark = new ymaps.Placemark(
                [55.7587, 37.6],
                {},
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/mapCustomIcon.png",
                    iconImageSize: [20, 20],
                    iconImageOffset: [0, 0],
                }
            );
        } else {
            if (ymapBlanchard) {
                ymapBlanchard.destroy();
            }

            ymapBlanchard = new ymaps.Map("contactsMap", {
                zoom: 14,
                center: [55.7608, 37.6458],
                controls: ['smallMapDefaultSet', 'geolocationControl', 'zoomControl'],
                autoFitToViewport: 'always',
            },
                {
                    geolocationControlFloat: 'right',
                    zoomControlFloat: 'right',
                    geolocationControlSize: 'small',
                    zoomControlSize: 'small'
                }
            );

            blanchardPlacemark = new ymaps.Placemark(
                [55.75846306898368, 37.601079499999905],
                {},
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/mapCustomIcon.png",
                    iconImageSize: [20, 20],
                    iconImageOffset: [0, 0],
                }
            );
        }

        ymapBlanchard.geoObjects.add(blanchardPlacemark);
    }

    window.addEventListener('resize', () => {
        widthCheckup();
        burgerMenuMove();
        gallerySwiperMove();
        eventsBtn.classList.remove('events-hidden');
        mobileSliderEvents();
        openCloseCheckboxList();
        mobilePublicsSlider();
        ymapsMove();
    });
});