'use strict'
let images = ['assets/img/1.jpg', 'assets/img/2.jpg', 'assets/img/3.jpg', 'assets/img/4.jpg', 'assets/img/5.jpg']
let container = document.querySelector('.welcome__img')
let slider = document.querySelector('.welcome__slider')
let numOfImg = document.querySelector('.num')
let squares = document.querySelectorAll('.square')
let arrows = document.querySelectorAll('.arrow')
let indexCurImg = 0
let currentImg = images[indexCurImg]


slider.addEventListener('click', (event) => {
    // debugger
    let target = event.target
    if (!target.closest('.arrow') && !target.closest('.square')) return
    let targetArrow = target.closest('.arrow')

    if (targetArrow) {
        if (targetArrow === arrows[0]) {
            indexCurImg === 0 ? indexCurImg = images.length - 1 : indexCurImg--
        } else {
            indexCurImg === images.length - 1 ? indexCurImg = 0 : indexCurImg++
        }
        currentImg = images[indexCurImg]
        return container.style.backgroundImage = `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.5) 16.19%, rgba(0, 0, 0, 0) 30.73%),url(${currentImg})`;
    }
})