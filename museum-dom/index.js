'use strict'
let images = ['assets/img/1.jpg', 'assets/img/2.jpg', 'assets/img/3.jpg', 'assets/img/4.jpg', 'assets/img/5.jpg']
    // let images = document.querySelectorAll('.welcome__img img')
let container = document.querySelector('.welcome__img')
let slider = document.querySelector('.welcome__slider')
let numOfImg = document.querySelector('.num')
let squares = document.querySelectorAll('.square')
let arrows = document.querySelectorAll('.arrow')
let indexCurImg = 0
let currentImg = images[indexCurImg]


slider.addEventListener('click', (event) => {

    let target = event.target
    if (!target.closest('.arrow') && !target.closest('.square')) return
    let targetArrow = target.closest('.arrow')
    let targetSquare = target.closest('.square')
    squares[indexCurImg].style.backgroundColor = '#FFFFFF'
    container.style.opacity = '0'
    if (targetArrow) {
        if (targetArrow === arrows[0]) {
            indexCurImg === 0 ? indexCurImg = images.length - 1 : indexCurImg--

        } else {
            indexCurImg === images.length - 1 ? indexCurImg = 0 : indexCurImg++
        }
    }

    if (targetSquare) {

        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === target) {
                indexCurImg = i
                break
            }
        }
    }

    numOfImg.innerHTML = `0${indexCurImg + 1}`
    squares[indexCurImg].style.backgroundColor = '#D2B183'
    currentImg = images[indexCurImg]
    setTimeout(() => {
        container.style.opacity = '1'
        container.style.background = `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.5) 16.19%, rgba(0, 0, 0, 0) 30.73%),url(${currentImg}) no-repeat`;
    }, 500)

})
const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });


// для input date
let dateContainer = document.querySelector('.booking__date__container')
let placeholderDate = document.querySelector('.booking__date__placeholder')
let inputDate = document.querySelector('.booking__date')
dateContainer.addEventListener('focus', () => {
    placeholderDate.style.display = 'none'
    inputDate.hidden = false
})
inputDate.addEventListener('blur', () => {
    if (!inputDate.value) {
        placeholderDate.style.display = ''
        inputDate.hidden = true
    }
})

// для input time
let timeContainer = document.querySelector('.booking__time__container')
let placeholderTime = document.querySelector('.booking__time__placeholder')
let inputTime = document.querySelector('.booking__time')
timeContainer.addEventListener('focus', () => {
    placeholderTime.style.display = 'none'
    inputTime.hidden = false
})
inputTime.addEventListener('blur', () => {
    if (!inputTime.value) {
        placeholderTime.style.display = ''
        inputTime.hidden = true
    }
})

// для формы
let ticketsBuyButton = document.querySelector('.tickets__buy')
let ticketsForm = document.querySelector('.booking__tickets')
let closeFormButton = document.querySelector('.booking__close')
ticketsBuyButton.addEventListener('click', () => {
    ticketsForm.hidden = false
    setTimeout(() => {
        ticketsForm.style.right = '0'
    }, 500)
})
closeFormButton.addEventListener('click', () => {
    ticketsForm.style.right = '-100%'
    setTimeout(() => {
        ticketsForm.hidden = true
    }, 1000)
})

// для меню
let menuButton = document.querySelector('.header__burger')
let menu = document.querySelector('.header__nav')
let welcomeContent = document.querySelector('.welcome__content')

menuButton.addEventListener('click', () => {
    if (menuButton.dataset.isOpen === 'true') {
        menuButton.dataset.isOpen = false;
        menu.style.transform = 'translateX(-100%)'
        menuButton.style.background = 'url(assets/svg/burger.svg) no-repeat right transparent'

        setTimeout(() => {
            menu.hidden = true
            welcomeContent.style.opacity = '1'
        }, 500)
    } else {
        menuButton.dataset.isOpen = true;
        menu.hidden = false
        menuButton.style.background = 'url(assets/svg/close-white.svg) no-repeat right transparent'

        setTimeout(() => {
            menu.style.transform = 'translateX(0)'
            welcomeContent.style.opacity = '0'
        }, 1000)
    }
})

// для галерии

const animItems = document.querySelectorAll('.gallery__img img');

window.addEventListener('scroll', animAndScroll)

function animAndScroll() {

    for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemTop = scrollPosition(animItem).top;
        const animCoef = 5;
        let animPointStart = window.innerHeight - animItemHeight / animCoef
        if (animItemHeight > window.innerHeight) {
            animPointStart = window.innerHeight - window.innerHeight / animCoef
        }
        if ((window.pageYOffset > animItemTop - animPointStart) && window.pageYOffset < (animItemTop + animItemHeight)) {
            animItem.classList.add('_active-img')
        } else {
            animItem.classList.remove('_active-img')
        }
    }
}

function scrollPosition(element) {
    const coords = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: coords.top + scrollTop, left: coords.left + scrollLeft }
}


// для ползунка сравнения изображений
function initComparisons() {
    let x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-overlay");
    for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
    }

    function compareImages(img) {
        let exploreSlider, clicked = 0,
            w, h;
        /*get the width and height of the img element*/
        w = img.offsetWidth;
        h = img.offsetHeight;
        /*set the width of the img element to 50%:*/
        img.style.width = (w / 2) + 20 + "px";

        /*create slider:*/
        exploreSlider = document.createElement("IMG");
        exploreSlider.setAttribute("src", "assets/svg/explore-slider.svg");
        exploreSlider.setAttribute("alt", "explore-slider");
        exploreSlider.setAttribute("class", "explore__img-slider");

        /*insert slider*/
        img.parentElement.insertBefore(exploreSlider, img);
        /*position the slider in the middle:*/
        exploreSlider.style.left = (w / 2) - (exploreSlider.offsetWidth / 2) + "px";
        /*execute a function when the mouse button is pressed:*/
        exploreSlider.addEventListener("mousedown", slideReady);
        /*and another function when the mouse button is released:*/
        window.addEventListener("mouseup", slideFinish);
        /*or touched (for touch screens:*/
        exploreSlider.addEventListener("touchstart", slideReady);
        /*and released (for touch screens:*/
        window.addEventListener("touchstop", slideFinish);

        function slideReady(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/
            clicked = 1;
            /*execute a function when the slider is moved:*/
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            /*the slider is no longer clicked:*/
            clicked = 0;
        }

        function slideMove(e) {
            let pos;
            /*if the slider is no longer clicked, exit this function:*/
            if (clicked == 0) return false;
            /*get the cursor's x position:*/
            pos = getCursorPos(e)
                /*prevent the slider from being positioned outside the image:*/
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /*execute a function that will resize the overlay image according to the cursor:*/
            slide(pos);
        }

        function getCursorPos(e) {
            var a, x = 0;
            e = e || window.event;
            /*get the x positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x coordinate, relative to the image:*/
            x = e.pageX - a.left;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            /*resize the image:*/
            img.style.width = x + "px";
            /*position the slider:*/
            exploreSlider.style.left = img.offsetWidth - (exploreSlider.offsetWidth / 2) + "px";
        }
    }
}


// для input

const controls = document.querySelector('.video__controls')
controls.addEventListener('input', function(event) {
    if (event.target.tagName != 'INPUT') return
    const value = event.target.value;
    event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

// для видеоплеера

let video = document.querySelector(".video__video");
let videoTrack = document.querySelector(".video__progress");
let btnPlay = document.querySelector(".video__play");
let btnPlayImg = document.querySelector(".video__play img");
let btnPlayLarge = document.querySelector(".video__play__large");

controls.addEventListener('click', (event) => {
    if (event.target.closest('.video__play') || event.target.closest('.video__play__large')) videoPlayPause()
    if (event.target.closest('.video__progress')) {
        let posX = event.clientX - 9;
        let timePos = (posX * 100) / 1020;
        videoTrack.value = timePos + '';
        video.currentTime = (timePos * Math.round(video.duration)) / 100
    }
});

function videoPlayPause() {
    // debugger
    let videoPlay
    if (btnPlay.dataset.isPlay === 'false') {
        btnPlay.dataset.isPlay = 'true'
        videoTrack.value = '0';
        btnPlayLarge.style.display = 'none'
        btnPlayImg.src = 'assets/svg/pause.svg'
        video.play();
        videoPlay = setInterval(function() {
            if (videoTrack.value !== '100') {
                let videoTime = Math.round(video.currentTime)
                let videoLength = Math.round(video.duration)
                videoTrack.value = ((videoTime * 100) / videoLength) + '';
                videoTrack.style.background = `linear-gradient(to right, #710707 0%, #710707 ${videoTrack.value}%, #C4C4C4 ${videoTrack.value}%, #C4C4C4 100%)`
            } else {
                btnPlay.dataset.isPlay = 'false'
                video.pause();
                clearInterval(videoPlay)
                btnPlayLarge.style.display = ''
                btnPlayImg.src = 'assets/svg/play_small.svg'
            }

        }, 10)
    } else {
        btnPlay.dataset.isPlay = 'false'
        video.pause();
        clearInterval(videoPlay)
        btnPlayLarge.style.display = ''
        btnPlayImg.src = 'assets/svg/play_small.svg'
    }

}