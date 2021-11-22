async function run() {
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
    const categoriesContainer = categoriesPage.querySelector('.categories');
    const arrCategories = categoriesPage.querySelector('.category');
    const categoryImgs = categoriesPage.querySelectorAll('.category-img');
    const trueAnswersCategory = categoriesPage.querySelectorAll('.category .true-answers');
    const scoreBtns = scorePage.querySelectorAll('.category-score');
    const quizAuthor = gamePage.querySelector('.quiz-author');
    const quizPicture = gamePage.querySelector('.quiz-picture');
    const question = gamePage.querySelector('.question');
    const quizAuthorImg = quizAuthor.querySelector('.img');
    const containerAnswerButtons = quizAuthor.querySelector('.option-buttons');
    const answerButtons = containerAnswerButtons.querySelectorAll('.answer-button');
    const slides = quizAuthor.querySelectorAll('.question-slider li');
    const optionPictures = quizPicture.querySelectorAll('.option-picture');
    const responsePageImg = responsePage.querySelector('.result-picture');
    const markImg = responsePage.querySelector('.mark');
    const pictureName = responsePage.querySelector('.picture-name');
    const infoPicture = responsePage.querySelector('.info-picture');
    const nextQuestionBtn = responsePage.querySelector('.button-next');
    const trueAnswersResult = resultPage.querySelector('.result-page .true-answers');
    const resultButtons = resultPage.querySelector('.result-buttons');


    const data = new Data();
    await data.getObject();

    const authorGame = new AuthorQuiz(data);
    const pictureGame = new PictureQuiz(data);
    let typeGame = '';
    let numCategory;
    let questionNum = 0;
    let rightAnswers = 0;

    // home
    choice.addEventListener('click', async(event) => {
        const target = event.target
        if (target.closest('div') === authorChoice || target.closest('div') === picChoice) {
            await Promise.all([
                hideElement(home),
                hideElement(header)
            ]);
            console.log(quizAuthor)
            showElement(categoriesPage)
            if (target === authorChoice) {
                typeGame = 'authors'
                authorGame.setBgCategory(authorGame.ImgsNumsForCategories, categoryImgs);
                question.textContent = authorGame.questionText
            } else {
                typeGame = 'pictures'
                pictureGame.setBgCategory(pictureGame.ImgsNumsForCategories, categoryImgs);
            }
        }
    })
    settingsImg.addEventListener('click', async() => {
        await Promise.all([
            hideElement(home),
            hideElement(header)
        ])

        showElement(settingsPage)
    })

    // settings
    backFromSettings.addEventListener('click', async() => {
        await Promise.all([hideElement(settingsPage)])
        showElement(header)
        showElement(home)
    });

    // categories
    backFromCategories.addEventListener('click', async() => {
        await Promise.all([hideElement(categoriesPage)])
        showElement(header)
        showElement(home)
    })
    categoriesSettings.addEventListener('click', async() => {
        await Promise.all([hideElement(categoriesPage)])
        showElement(settingsPage)
    })
    categoriesContainer.addEventListener('click', async(ev) => {
        const targetCategory = ev.target.closest('.category')
        if (!targetCategory) return
        numCategory = +targetCategory.dataset.categoryNum
        if (typeGame === 'authors') {
            const allAuthorsNames = authorGame.createArrUniqueAuthors(authorGame.infoImgs)
            authorGame.setGameContentAuthorQuiz(numCategory, questionNum, allAuthorsNames, quizAuthorImg, answerButtons)
            slides[questionNum].style.backgroundColor = 'aliceblue'
            showElement(quizAuthor);
        } else {
            pictureGame.setGameContentPictureQuiz(numCategory, questionNum, optionPictures)
            question.textContent = pictureGame.questionText
            showElement(quizPicture)
        }

        console.log('category', numCategory)
        await Promise.all([hideElement(categoriesPage)])

        showElement(gamePage)
    });
    //game-page
    containerAnswerButtons.addEventListener('click', (ev) => {
        const targetBtn = ev.target.closest('.answer-button')
        if (!targetBtn) return
        showElement(responsePage)
        console.log(authorGame)
        authorGame.setPicture(authorGame.currentQuestion.imageNum, responsePageImg)
        pictureName.textContent = authorGame.currentQuestion.name
        infoPicture.textContent = authorGame.currentQuestion.author + ', ' + authorGame.currentQuestion.year
        if (targetBtn.textContent === authorGame.rightAnswer) {
            markImg.style.backgroundImage = 'url(../assets/svg/right-answer.svg)';
            rightAnswers++
        } else markImg.style.backgroundImage = 'url(../assets/svg/wrong-answer.svg)';
    })
    quizPicture.addEventListener('click', (ev) => {
            const targetOpt = ev.target.closest('.option-picture')
            if (!targetOpt) return
            const pressedImg = pictureGame.getNumPressedImg(targetOpt)
            showElement(responsePage)
            pictureGame.setPicture(pictureGame.currentQuestion.imageNum, responsePageImg)
            pictureName.textContent = pictureGame.currentQuestion.name
            infoPicture.textContent = pictureGame.currentQuestion.author + ', ' + pictureGame.currentQuestion.year
            if (pressedImg === pictureGame.rightAnswer) {
                markImg.style.background = 'url(../assets/svg/right-answer.svg) no-repeat';
                rightAnswers++
            } else markImg.style.background = 'url(../assets/svg/wrong-answer.svg) no-repeat';
        })
        //response-page
    nextQuestionBtn.addEventListener('click', async() => {
            console.log('questionNum', questionNum)
            if (questionNum === 9) {
                showElement(resultPage)
                trueAnswersCategory[numCategory - 1].textContent = rightAnswers
                trueAnswersResult.textContent = rightAnswers
                rightAnswers = 0
                questionNum = 0
                categoryImgs[numCategory - 1].style.filter = 'none'
                slides.forEach(item => item.style.backgroundColor = '#e6dddd')
            } else {
                questionNum++;
                await Promise.all([
                    hideElement(responsePage),
                    hideElement(gamePage)
                ]);
                if (typeGame === 'authors') {
                    const allAuthorsNames = authorGame.createArrUniqueAuthors(authorGame.infoImgs)
                    authorGame.setGameContentAuthorQuiz(numCategory, questionNum, allAuthorsNames, quizAuthorImg, answerButtons)
                    slides[questionNum].style.backgroundColor = 'aliceblue'
                } else {
                    pictureGame.setGameContentPictureQuiz(numCategory, questionNum, optionPictures)
                    question.textContent = pictureGame.questionText
                }
                showElement(gamePage);
            }

        })
        // result-Page
    resultButtons.addEventListener('click', async(ev) => {

        if (!ev.target.closest('button')) return
        if (typeGame === 'authors') await Promise.all([hideElement(quizAuthor)])
        else await Promise.all([hideElement(quizPicture)])
        await Promise.all([
            hideElement(resultPage),
            hideElement(responsePage),
            hideElement(gamePage)
        ]);
        if (ev.target.closest('.home-next')) {
            showElement(home);
            showElement(header)
        } else {
            showElement(categoriesPage);
        }
    })
}

class Data {
    async getObject() {
        const data = await fetch('scripts/engData.json');
        this.obj = await data.json()
    }
}

class Game {
    constructor(data) {
        this.infoImgs = data.obj;
        this.halfLength = this.infoImgs.length / 2;
    }
    getCategories(arr) {
        const chunk = 10;
        let result = [];
        for (let i = 0; i < arr.length; i += chunk) {
            let temporary = arr.slice(i, i + chunk);
            result.push(temporary)
        }
        return result
    }
    getNumFirstCategory(arr) {
        let result = [];
        for (let category of arr) {
            category.forEach((img, index) => {
                if (index === 0) result.push(img.imageNum)
            });

        }
        return result
    }
    setBgCategory(nums, categoryImgs) {
        nums.forEach((num, index) => {
            const img = new Image();
            img.src = `https://raw.githubusercontent.com/ANOVIKOVA21/image-data/master/img/${num}.jpg`
            img.onload = () => {
                categoryImgs.forEach((categoryImg, indexImg) => {
                    if (index === indexImg) {
                        categoryImg.style.backgroundImage = `url('${img.src}')`
                    }
                })
            }
        })
        return console.log('Done')
    }
    setPicture(num, element) {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/ANOVIKOVA21/image-data/master/img/${num}.jpg`
        img.onload = () => {
            element.style.backgroundImage = `url('${img.src}')`
        }
    }
    getAnswerOptions(rightAnswer, allOptions) {
        let answerOptions = [rightAnswer]
        while (answerOptions.length < 4) {
            const randomNum = getRandomIntInclusive(0, allOptions.length - 1)
            const randomElement = allOptions[randomNum]
            if (randomElement !== rightAnswer) answerOptions.push(randomElement)
        }
        return shuffle(answerOptions)
    }
}
class AuthorQuiz extends Game {
    constructor(data) {
        super(data);
        this.gameType = 'author';
        this.authorsData = this.infoImgs.slice(0, this.halfLength)
        this.categories = this.getCategories(this.authorsData)
        this.ImgsNumsForCategories = this.getNumFirstCategory(this.categories)
        this.questionText = 'Who is the author of this picture?'
    }
    createArrUniqueAuthors(arr) {
        let uniqueAuthors = new Set()
        arr.forEach(item => {
            if (typeof(item) === 'object') uniqueAuthors.add(item.author)
        })
        return Array.from(uniqueAuthors)
    }
    setGameContentAuthorQuiz(numCategory, questionNum, allAuthorsNames, quizAuthorImg, answerButtons) {
        const infoQuestions = this.categories[numCategory - 1]
        this.currentQuestion = infoQuestions[questionNum]
        this.rightAnswer = this.currentQuestion.author
        this.setPicture(this.currentQuestion.imageNum, quizAuthorImg)
        const answerOptions = this.getAnswerOptions(this.rightAnswer, allAuthorsNames)

        answerButtons.forEach((btn, index) => btn.textContent = answerOptions[index])
    }
}

class PictureQuiz extends Game {
    constructor(data) {
        super(data)
        this.gameType = 'picture';
        this.picturesData = this.infoImgs.slice(this.halfLength)
        this.categories = this.getCategories(this.picturesData)
        this.ImgsNumsForCategories = this.getNumFirstCategory(this.categories)
    }
    getAllImgNums() {
        let allImgNums = []
        this.infoImgs.forEach(item => { allImgNums.push(item.imageNum) })
        return allImgNums
    }
    setGameContentPictureQuiz(numCategory, questionNum, optionPictures) {
        const infoQuestions = this.categories[numCategory - 1]
        this.currentQuestion = infoQuestions[questionNum]
        this.rightAnswer = this.currentQuestion.imageNum
        const author = this.currentQuestion.author
        this.questionText = `Which is ${author} picture?`
        const allImgNums = this.getAllImgNums()
        const answerOptions = this.getAnswerOptions(this.rightAnswer, allImgNums)
        optionPictures.forEach((opt, index) => this.setPicture(answerOptions[index], opt))
    }

    getNumPressedImg(targetElem) {
        const targetImg = targetElem.style.backgroundImage
        const beginIndex = targetImg.lastIndexOf('/') + 1
        const endIndex = targetImg.indexOf('.jpg')
        return targetImg.slice(beginIndex, endIndex)
    }
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideElement(elem) {

    return new Promise((resolve, reject) => {
        const onElementTransitionend = () => {
            elem.classList.add('hide');
            elem.removeEventListener('transitionend', onElementTransitionend);
            resolve();
        }

        elem.addEventListener('transitionend', onElementTransitionend);
        elem.style.transform = 'translate(-100vw)';
    });
}


function showElement(elem) {
    elem.classList.remove('hide');
    setTimeout(() => { elem.style.transform = 'translate(0)'; }, 1000);
}

function less(element) {
    +element.value == 5 ? element.value = 5 : element.value = element.value - 5;
}

function more(element) {
    +element.value == 30 ? element.value = 30 : element.value = +element.value + 5;
}

run();