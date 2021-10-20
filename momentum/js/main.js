const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

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
    const timesOfDay = ['night', 'morning', 'day', 'evening']
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