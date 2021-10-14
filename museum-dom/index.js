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
let wrapVideo = document.querySelector(".video__main");
let video = document.querySelector(".video__video");
let videoTrack = document.querySelector(".video__progress");
let btnPlay = document.querySelector(".video__play");
let btnPlayImg = document.querySelector(".video__play img");
let btnPlayLarge = document.querySelector(".video__play__large");
let volumeProgress = document.querySelector(".video__volume__progress");
let btnVolume = document.querySelector(".video__volume");
let btnVolumeImg = document.querySelector(".video__volume img");
let btnFullscreen = document.querySelector(".video__fullscreen");
let btnFullscreenImg = document.querySelector(".video__fullscreen img");

controls.addEventListener('click', (event) => {
    if (event.target.closest('.video__play') || event.target.closest('.video__play__large')) videoPlayPause()
    if (event.target.closest('.video__progress')) {
        let inputWidth = videoTrack.offsetWidth
        let eventPosition = event.offsetX;
        videoTrack.value = 100 * eventPosition / inputWidth
        video.currentTime = video.duration * (eventPosition / inputWidth)
    }
    // debugger
    if (event.target.closest('.video__volume')) {
        if (btnVolume.dataset.isMute === 'false') {
            btnVolume.dataset.isMute = 'true'
            volumeIsMute()
        } else {
            btnVolume.dataset.isMute = 'false'
            volumeProgress.value = '50'
            volumeIsMute()
        }
        video.volume = volumeProgress.value / 100;
    }

    if (event.target.closest('.video__volume__progress')) {
        if (volumeProgress.value === '0') btnVolume.dataset.isMute = 'true'
        else btnVolume.dataset.isMute = 'false'
        volumeIsMute()
        video.volume = volumeProgress.value / 100;
    }

    if (event.target.closest('.video__fullscreen')) {
        fullscreen()
    }

});
video.addEventListener('click', videoPlayPause)

// video.addEventListener('keydown', (ev) => {
//     console.log(ev.target)
// })

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

function volumeIsMute() {
    if (btnVolume.dataset.isMute === 'true') {
        volumeProgress.value = '0'
        btnVolumeImg.src = 'assets/svg/mute.svg'
    } else {
        btnVolumeImg.src = 'assets/svg/volume.svg'
    }
    volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeProgress.value}%, #C4C4C4 ${volumeProgress.value}%, #C4C4C4 100%)`
}

function fullscreen() {
    if (btnFullscreen.dataset.isFullscreen === 'false') {
        btnFullscreen.dataset.isFullscreen = 'true'
        btnFullscreenImg.src = 'assets/svg/fullscreen_exit.svg'
        video.classList.add('fullscreen')
        controls.classList.add('controls_fullscreen')
        wrapVideo.requestFullscreen()
    } else {
        btnFullscreen.dataset.isFullscreen = 'false'
        btnFullscreenImg.src = 'assets/svg/fullscreen.svg'
        video.classList.remove('fullscreen')
        controls.classList.remove('controls_fullscreen')
        document.exitFullscreen()
    }

}
console.log('оценка - 73 балла')
console.log('Частично выполненные пункты:')
console.log('1) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно')
console.log('2) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв')
console.log('Выполненные пункты:')
console.log('1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам')
console.log('2) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера)')
console.log('3) слайды перелистываются плавно с анимацией смещения вправо или влево')
console.log('4) перелистывание слайдов бесконечное (зацикленное)')
console.log('5) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем)')
console.log('6) при перелистывании слайдов кликами или свайпами меняется номер активного слайда')
console.log('7) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда')
console.log('8) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят')
console.log('9) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается')
console.log('10) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается')
console.log('11) прогресс-бар отображает прогресс проигрывания видео')
console.log('12) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео')
console.log('13) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play"')
console.log('14) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка)')
console.log('15) при перемещении ползунка громкости звука изменяется громкость видео')
console.log('16) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой')
console.log('17) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой')
console.log('18) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем')
console.log('19) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними')
console.log('20) ползунок можно перетягивать мышкой по горизонтали')
console.log('21) ползунок никогда не выходит за границы картины')
console.log('22) при перемещении ползунка справа налево плавно появляется нижняя картина')
console.log('23) при перемещении ползунка слева направо плавно появляется верхняя картина')
console.log('24) при обновлении страницы ползунок возвращается в исходное положение')
console.log('25) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/')
console.log('26) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется')
console.log('27) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется')
console.log('28) в секции Contacts добавлена интерактивная карта')
console.log('')
console.log('')
console.log('')
console.log('')