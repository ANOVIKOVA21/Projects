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

// для input

const controls = document.querySelector('.video__controls')
controls.addEventListener('input', function(event) {
    if (event.target.tagName != 'INPUT') return
    const value = event.target.value;
    event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

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
    ticketsForm.style.right = '0'
})
closeFormButton.addEventListener('click', () => {
    ticketsForm.style.right = '-100%'
})