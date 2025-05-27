/*=============== SEARCH ===============*/
const searchButton = document.getElementById('search-button'),
      searchClose = document.getElementById('search-close'),
      searchContent = document.getElementById('search-content'); // Fixed typo

/* Menu show */
if (searchButton) {
    searchButton.addEventListener('click', () => {
        searchContent.classList.add('show-search');
    });
}

/* Menu hidden */
if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchContent.classList.remove('show-search');
    });
}

/*=============== LOGIN ===============*/
const loginButton = document.getElementById('login-button'),
      loginClose = document.getElementById('login-close'),
      loginContent = document.getElementById('login-content');

/* Login show */
if (loginButton) {
    loginButton.addEventListener('click', () => {
        loginContent.classList.add('show__login'); // Corrected class name
    });
}

/* Login hidden */
if (loginClose) {
    loginClose.addEventListener('click', () => {
        loginContent.classList.remove('show__login'); // Corrected class name
    });
}



/*=============== ADD SHADOW HEADER ===============*/


/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper('.home__swiper', {
    loop: true,
    spaceBetween: -24,
    grabCursor: true,
    slidesPerView: auto,
    centeredSlides: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },


    breakpoints: {
        1220: {
            spaceBetween: -32,
        }
    }
});


/*=============== FEATURED SWIPER ===============*/
let swiperFeatured = new Swiper('.featured__swiper', {
    loop: true,
    spaceBetween: -24,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: true,

            
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        1150: {
            slidesPerView: 4,
             centeredSlides: false,
        }
    }
});


/*=============== NEW SWIPER ===============*/
document.addEventListener('DOMContentLoaded', () => {
    let swiperNew = new Swiper('.new__swiper', {
        loop: true,
        spaceBetween: -24,
        slidesPerView: 'auto',
        
        breakpoints: {
            1150: {
                slidesPerView: 4,
            }
        }
    });
});


/*=============== TESTIMONIAL SWIPER ===============*/


/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== DARK LIGHT THEME ===============*/ 


/*=============== SCROLL REVEAL ANIMATION ===============*/
