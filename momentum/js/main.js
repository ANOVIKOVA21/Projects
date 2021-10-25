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
const audioProgress = document.querySelector('.player-progress');
const btnVolume = document.querySelector('.player-volume');
const volumeProgress = document.querySelector('.player-volume-progress');
const audioTimer = document.querySelector('.player-timer');
const audioDuration = document.querySelector('.player-duration');
const trackName = document.querySelector('.track-name');
const languageSelection = document.querySelector('.languages');
const backgroundSelection = document.querySelector('.background');
const btnTheme = document.querySelector('.btn-theme');
const tagTheme = document.querySelector('.tag-theme');
const btnSettings = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const hideList = document.querySelector('.hide-list');
const hideListElements = document.querySelectorAll('.hide-list li');

let randomNum = getRandomNum(1, 20);
let isPlay = false;
let playNum = 0;
let isMute = false;
let isSettingsClose = true;


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
    let hiddenElements = [];

    document.querySelectorAll('.hide').forEach(el => {
        el.classList.forEach(c => {
            if (c.startsWith('hide-')) {
                hiddenElements.push(c);
            }
        });
    });

    localStorage.setItem('hiddenElements', JSON.stringify(hiddenElements));

    // document.querySelectorAll('body *').forEach((el, i) => {
    //     localStorage.setItem(`${i}`, el.classList);
    // })
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }

    let hiddenElementsJson = localStorage.getItem('hiddenElements');
    let hiddenElements = JSON.parse(hiddenElementsJson);

    hiddenElements.forEach(x => {
        document.querySelectorAll('.' + x).forEach(el => {
            let classToAdd = el.tagName == 'LI' ? 'hidden' : 'hide';
            el.classList.add(classToAdd);
        });
    });

    // document.querySelectorAll('body *').forEach((el, i) => {
    //     // console.log(el.classList)
    //     el.classList = localStorage.getItem(`${i}`);
    // })
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
// getRandomNum(1, 20)

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
    let value = backgroundSelection.value
    if (value === 'gitHub') {
        randomNum === 20 ? randomNum = 1 : randomNum++
            setBg()
    } else {
        changeBackground()
    }

}

function getSlidePrev() {
    let value = backgroundSelection.value
    if (value === 'gitHub') {
        randomNum === 1 ? randomNum = 20 : randomNum--
            setBg()
    } else {
        changeBackground()
    }
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

    // getRandomNum(0, data.length - 1)
    // const randomNumOfQuote = randomNum;

    const randomNumOfQuote = getRandomNum(0, data.length - 1);
    console.log(randomNumOfQuote + ' quote')
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
playList.forEach((el, index) => {
    const li = document.createElement('li');
    li.classList.add('play-item')
    li.textContent = el.title
    playListContainer.append(li)

})
const tracks = document.querySelectorAll('.play-item')

tracks.forEach((track, index) => {
    // let prevTrack = []
    track.addEventListener('click', () => {
        playNum = index;
        // track.classList.add('track-active');
        playPauseAudio();
        // if (prevTrack.length > 0) {
        //     // tracks[prevTrack[0]].classList.remove('track-active')
        //     tracks[prevTrack[0]].classList.remove('item-active')
        //     prevTrack = []
        // }
        // prevTrack.push(index)
    })
})
btnPlay.addEventListener('click', playPauseAudio)

function playPauseAudio() {
    let audioPlay
    if (!isPlay) {
        isPlay = true;
        btnPlay.classList.add('pause');
        tracks[playNum].classList.add('item-active');
        trackName.textContent = playList[playNum].title;
        audio.src = playList[playNum].src;
        audioProgress.value = 0;
        audioDuration.textContent = playList[playNum].duration
        audio.play();
        audioPlay = setInterval(function() {
            if (audioProgress.value !== '100') {
                let currentTime = Math.round(audio.currentTime)
                audioTimer.textContent = formatTime(Math.floor(audio.currentTime))
                audioLength = Math.round(audio.duration)
                audioProgress.value = ((currentTime * 100) / audioLength) + '';
                audioProgress.style.background = `linear-gradient(to right, #28d5ec 0%, #28d5ec ${audioProgress.value}%, #C4C4C4 ${audioProgress.value}%, #C4C4C4 100%)`
            } else if (audioProgress.value === '100') {
                tracks[playNum].classList.remove('item-active');
                playNum === playList.length - 1 ? playNum = 0 : playNum++;
                audio.currentTime = 0;
                audioProgress.value = 0;
                isPlay = false;
                playPauseAudio()
            }
        }, 10)
    } else {
        isPlay = false;
        clearInterval(audioPlay)
        btnPlay.classList.remove('pause');
        audio.pause();
    }
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `0${min}:${sec}`;
};
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
audioProgress.addEventListener('click', rewindAudio)

function rewindAudio(event) {
    let inputWidth = audioProgress.offsetWidth
    let eventPosition = event.offsetX;
    audioProgress.value = 100 * eventPosition / inputWidth
    audio.currentTime = audio.duration * (eventPosition / inputWidth)
}

btnVolume.addEventListener('click', clickOnBtnVolume)

function volumeIsMute() {
    if (isMute) {
        volumeProgress.value = 0;
        btnVolume.classList.add('mute')
    } else {
        btnVolume.classList.remove('mute')
    }
    audio.volume = volumeProgress.value / 100;
    volumeProgress.style.background = `linear-gradient(to right, #28d5ec 0%, #28d5ec ${volumeProgress.value}%, #C4C4C4 ${volumeProgress.value}%, #C4C4C4 100%)`
}

function clickOnBtnVolume() {
    if (!isMute) {
        isMute = true;
    } else {
        isMute = false;
        volumeProgress.value = 50;
    }
    volumeIsMute()
}
volumeProgress.addEventListener('click', () => {
    if (volumeProgress.value === '0') isMute = true
    else isMute = false
    volumeIsMute()
})

// api

let href = {
    gitHub: function() { setBg() },
    unsplash: `https://api.unsplash.com/photos/random?orientation=landscape&query=${setThemeTag()}&client_id=QQ1kw0Nf1K0mDfDhAEFWZr5ga6y8P0kQuf9A68r7Zsk`,
    flickr: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=737d9f703e8d737bc689b12e7038f65a&tags=${setThemeTag()}&extras=url_l&format=json&nojsoncallback=1`
}


function setThemeTag() {
    let theme;
    if (tagTheme.value) {
        return theme = tagTheme.value
    } else {
        return theme = getTimeOfDay()
    }

}

function updateTagValue() {
    href.unsplash = `https://api.unsplash.com/photos/random?orientation=landscape&query=${setThemeTag()}&client_id=QQ1kw0Nf1K0mDfDhAEFWZr5ga6y8P0kQuf9A68r7Zsk`;
    href.flickr = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=737d9f703e8d737bc689b12e7038f65a&tags=${setThemeTag()}&extras=url_l&format=json&nojsoncallback=1`;
}
async function getLinkToImage(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data
}
backgroundSelection.addEventListener('change', changeBackground)

async function changeBackground() {
    let value = backgroundSelection.value
    if (value === 'gitHub') return href.gitHub()
    let data = await getLinkToImage(href[value])

    if (value === 'unsplash') {
        body.style.backgroundImage = `url('${data.urls.regular}')`
    } else {
        const randomImg = getRandomNum(0, 99)
        body.style.backgroundImage = `url('${data.photos.photo[randomImg].url_l}')`
    }

}
tagTheme.addEventListener('change', () => {
    setThemeTag()
    updateTagValue()
    backgroundSelection.dispatchEvent(new Event('change'))
})
btnTheme.addEventListener('click', () => {
    tagTheme.value = ''
    setThemeTag()
    updateTagValue()
    backgroundSelection.dispatchEvent(new Event('change'))
})
btnSettings.addEventListener('click', openSettings)

function openSettings() {
    if (isSettingsClose) {
        isSettingsClose = false
        settings.style.transform = 'translate(0)'
    } else {
        isSettingsClose = true
        settings.style.transform = 'translate(-260px)'
    }
}

//hide el
hideList.addEventListener('click', hideElement)

function hideElement(event) {
    let target = event.target
    hideListElements.forEach(el => {
        if (el === target) {
            el.classList.toggle('hidden')
            const className = el.classList[0]
            const needHide = document.querySelector(`.${className}`)
            needHide.classList.toggle('hide')
        }
    })
}