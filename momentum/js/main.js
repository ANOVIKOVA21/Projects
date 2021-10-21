const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const body = document.querySelector('body');
const btnNext = document.querySelector('.slide-next');
const btnPrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const btnChangeQuote = document.querySelector('.change-quote');
const audio = document.querySelector('audio');
const btnPlay = document.querySelector('.play');
const btnPlayPrev = document.querySelector('.play-prev');
const btnPlayNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;
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
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
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


//Weather
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=df45b93f4e1254acbda8ce8b11d4f1af&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
        humidity.textContent = `Humidity: ${data.main.humidity}%`
        weatherError.textContent = ''
    } catch (er) {
        er = 'Please enter correct data'
        weatherError.textContent = er
    }
}
getWeather()
city.addEventListener('change', getWeather)

//Quotes
async function getQuotes() {
    const quotes = 'js/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    // console.log(data[5].text)
    getRandomNum(0, data.length - 1)
    const randomNumOfQuote = randomNum;
    console.log(randomNum + ' quote')
    quote.textContent = data[randomNumOfQuote].text
    author.textContent = data[randomNumOfQuote].author
}
getQuotes();
btnChangeQuote.addEventListener('click', getQuotes)

//audio
const playList = [{
        title: 'Aqua Caelestis',
        src: '../assets/sounds/Aqua Caelestis.mp3',
        duration: '00:39'
    },
    {
        title: 'Ennio Morricone',
        src: '../assets/sounds/Ennio Morricone.mp3',
        duration: '01:37'
    },
    {
        title: 'River Flows In You',
        src: '../assets/sounds/River Flows In You.mp3',
        duration: '01:37'
    },
    {
        title: 'Summer Wind',
        src: '../assets/sounds/Summer Wind.mp3',
        duration: '01:50'
    }
]
playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item')
    li.textContent = el.title
    playListContainer.append(li)
})
const tracks = document.querySelectorAll('.play-item')

btnPlay.addEventListener('click', playPauseAudio)

function playPauseAudio() {
    if (!isPlay) {
        isPlay = true;
        btnPlay.classList.add('pause');
        tracks[playNum].classList.add('item-active');
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
    } else {
        isPlay = false;
        btnPlay.classList.remove('pause');
        audio.pause();
    }
}
btnPlayNext.addEventListener('click', playNext)
btnPlayPrev.addEventListener('click', playPrev)

function playNext() {
    isPlay = false
    tracks[playNum].classList.remove('item-active');
    playNum === playList.length - 1 ? playNum = 0 : playNum++
        playPauseAudio()
}

function playPrev() {
    isPlay = false
    tracks[playNum].classList.remove('item-active');
    playNum === 0 ? playNum = playList.length - 1 : playNum--
        playPauseAudio()
}
// if (audio.currentTime == playList[playNum].duration) {
//     playNum++
//     playPauseAudio()
// }