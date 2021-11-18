const home = document.querySelector('.home-page');
const header = document.querySelector('.header');
const settingsPage = document.querySelector('.settings-page');
const categoriesPage = document.querySelector('.categories-page');
const gamePage = document.querySelector('.game-page');
const responsePage = document.querySelector('.response-page');
const resultPage = document.querySelector('.result-page');
const scorePage = document.querySelector('.score-page');
const choice = document.querySelector('.choice');
const authorChoice = choice.querySelector('.painter');
const picChoice = choice.querySelector('.picture');
const settingsImg = home.querySelector('.settings');
const backFromSettings = settingsPage.querySelector('.back');
const time = settingsPage.querySelector('.time');
const backFromCategories = categoriesPage.querySelector('.categories-header p');
const categoriesSettings = categoriesPage.querySelector('.categories-page .settings');
const categoryImgs = categoriesPage.querySelectorAll('.category-img');
const scoreBtns = scorePage.querySelectorAll('.category-score');


function hideElement(elem) {
    const onElementTransitionend = () => {
        elem.classList.add('hide');
        elem.removeEventListener('transitionend', onElementTransitionend);
    }

    elem.addEventListener('transitionend', onElementTransitionend);
    elem.style.transform = 'translate(-100%)';
}


// })
function showElement(elem) {
    elem.classList.remove('hide');
    setTimeout(() => { elem.style.transform = 'translate(0%)'; }, 1000);
}


// home
choice.addEventListener('click', (event) => {
    const target = event.target
    if (target.closest('div') === authorChoice || target.closest('div') === picChoice) {
        hideElement(home)
        hideElement(header)
        showElement(categoriesPage)
    }
})
settingsImg.addEventListener('click', () => {
    hideElement(home)
    hideElement(header)
    showElement(settingsPage)
})

// settings
backFromSettings.addEventListener('click', () => {
    hideElement(settingsPage)
    setTimeout(() => {
        showElement(header)
        showElement(home)
    }, 600)
})

function less(element) {
    +element.value == 5 ? element.value = 5 : element.value = element.value - 5;
}

function more(element) {
    +element.value == 30 ? element.value = 30 : element.value = +element.value + 5;
}

// categories
backFromCategories.addEventListener('click', () => {
    hideElement(categoriesPage)
    setTimeout(() => {
        showElement(header)
        showElement(home)
    }, 600)
})
categoriesSettings.addEventListener('click', () => {
    hideElement(categoriesPage)
    setTimeout(() => {
        showElement(settingsPage)
    }, 600)
})
async function getObject() {
    const data = await fetch('scripts/engData.json');
    return await data.json()
}
async function smy() {
    const infoImgs = await getObject()
    const length = infoImgs.length / 2
    const authors = infoImgs.slice(0, length)
    const pictures = infoImgs.slice(length)
    const authorsOpt = getCategories(authors)
    const picturesOpt = getCategories(pictures)
    const authorsImgsNums = getNumFirstCategory(authorsOpt)
    const picturesImgsNums = getNumFirstCategory(picturesOpt)
    setBgCategory(authorsImgsNums)
    setBgCategory(picturesImgsNums)
    console.log(authorsOpt)
    console.log(picturesOpt)
        // console.log(infoImgs[2].author)
    console.log(authorsImgsNums)
    console.log(picturesImgsNums)
}

function setBgCategory(nums) {
    nums.forEach(num => {
        const img = new Image();
        img.src = `https://github.com/ANOVIKOVA21/image-data/tree/master/img/${num}.jpg`
        img.onload = () => {
            categoryImgs.forEach(img => {
                img.style.backgroundImage = `url('${img.src}')`
            })
        }
    })
    return console.log('Done')
}

function getCategories(arr) {
    const chunk = 10;
    let result = [];
    for (let i = 0; i < arr.length; i += chunk) {
        let temporary = arr.slice(i, i + chunk);
        result.push(temporary)
    }
    return result
}

function getNumFirstCategory(arr) {
    let result = [];
    for (let category of arr) {
        category.forEach((img, index) => {
            if (index === 0) result.push(img.imageNum)
        });

    }
    return result
}