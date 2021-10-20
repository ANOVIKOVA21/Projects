const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const body = document.querySelector('body');
const btnNext = document.querySelector('.slide-next');
const btnPrev = document.querySelector('.slide-prev');

let randomNum;

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    const todayDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = todayDate.toLocaleDateString('en-US', options);
    date.textContent = currentDate;

}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const timesOfDay = ['night', 'morning', 'afternoon', 'evening']
    return timesOfDay[Math.floor(hours / 6)]
}

function showGreeting() {
    const timeOfDay = getTimeOfDay()
    const strGreeting = `Good ${timeOfDay}, `
    greeting.textContent = strGreeting
}
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum(1, 20)

function setBg() {
    const timeOfDay = getTimeOfDay()
    let bgNum = randomNum + ''
    bgNum.length === 1 ? bgNum = '0' + randomNum : randomNum
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/ANOVIKOVA21/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('${img.src}')`
        console.log(randomNum)
    }
}
setBg()

function getSlideNext() {
    randomNum === 20 ? randomNum = 1 : randomNum++
        setBg()
}

function getSlidePrev() {
    randomNum === 1 ? randomNum = 20 : randomNum--
        setBg()
}
btnNext.addEventListener('click', getSlideNext)
btnPrev.addEventListener('click', getSlidePrev)