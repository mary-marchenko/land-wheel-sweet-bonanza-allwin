
const playBtn = document.querySelector('.bonus__main-wheel-btn'),
      main = document.querySelector('.bonus__main'),
      wheel = document.querySelector('.bonus__main-wheel-reel'),
      mainWheel = document.querySelector('.bonus__main-wheel'),
      overlay = document.querySelector('.bonus__overlay'),
      popupFirst = document.querySelector('.bonus__firstWin'),
      popupFirstBtn = document.querySelector('.bonus__firstWin-btn'),
      popupSecond = document.querySelector('.bonus__secondWin'),
      overflow = document.querySelector('body'),
      wrapper = document.querySelector('.bonus'),
      rotateText = document.querySelector('.bonus__main-txt-center');


let triesCounter = 0
let textAfterRotate = 'У тебе <span>1</span> спроба';

playBtn.addEventListener('click', () => {
    if (triesCounter === 0) {
        runFirstRotation()
        rotateText.innerHTML = textAfterRotate;
    } else {
        runSecondRotation()
    }
})

function runFirstRotation() {
    wheel.classList.add('reel-rotation-first')
    playBtn.classList.remove('pulse-btn')
    playBtn.style.cursor = 'default'
    wrapper.style.pointerEvents = 'none'
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
        doAfterFirstRotation()
    }, 6000)
    triesCounter++
}

function doAfterFirstRotation() {
    wheel.style.transform = 'rotate(946deg)'
    wheel.classList.remove('reel-rotation-first')
    displayPopup(popupFirst)
    wrapper.style.pointerEvents = 'auto'
    overflow.style.overflow = 'hidden'
    setTimeout(() => {
        playBtn.classList.add('pulse-btn')
        playBtn.style.cursor = 'pointer'
    }, 1200)
}

function runSecondRotation() {
    wheel.classList.add('reel-rotation-second')
    playBtn.classList.remove('pulse-btn')
    playBtn.style.cursor = 'default'
    overflow.style.overflow = 'hidden'
    wrapper.style.pointerEvents = 'none'

    setTimeout(() => {
        doAfterSecondRotation()
    }, 6000)
    triesCounter++
}

function doAfterSecondRotation() {
    displayPopup(popupSecond)
    wrapper.style.pointerEvents = 'auto'
}


popupFirstBtn.addEventListener('click', () => {
    overlay.classList.add('opacity-overlay')
    popupFirst.classList.add('hide')
    overflow.style.overflow = 'unset'
})

function displayPopup(popup) {
    overlay.classList.remove('opacity-overlay')
    popup.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    console.log(popup)

}



(function () {
    var url = new URL(window.location.href);
    var params = ['l', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'param1', 'param2', 'param3', 'param4', 'creative_type', 'creative_id'];
    var linkParams = ['affid', 'cpaid']; // ищем в url redirectUrl в url:

    if (url.searchParams.has('redirectUrl')) {
        var redirectUrl = new URL(url.searchParams.get('redirectUrl'));

        if (redirectUrl.href.match(/\//g).length === 4 && redirectUrl.searchParams.get('l')) {
            //если ссылка в ссылка redirectUrl корректная
            localStorage.setItem('redirectUrl', redirectUrl.href); // указываем точкой входа домен с протоколом из redirectUrl
        }
    }

    params.forEach(function (param) {
        if (url.searchParams.has(param)) localStorage.setItem(param, url.searchParams.get(param));
    });

    linkParams.forEach(function (linkParam) {
        if (url.searchParams.has(linkParam)) localStorage.setItem(linkParam, url.searchParams.get(linkParam));
    });

    window.addEventListener('click', function (e) {
        var link,
            parent = e.target.closest('a');

        if (parent.getAttribute('href') !== 'https://tds.favbet.partners') {
            return;
        }

        if (parent) {
            e.preventDefault();
            var affid = localStorage.getItem('affid');
            var cpaid = localStorage.getItem('cpaid');

            if (localStorage.getItem("redirectUrl")) {
                link = new URL(localStorage.getItem("redirectUrl"));
            } else {
                link = new URL(parent.href);
                if (affid && cpaid) {
                    link.pathname = '/' + affid + '/' + cpaid;
                }
            }

            params.forEach(function (param) {
                if (url.searchParams.has(param)) {
                    link.searchParams.set(param, localStorage.getItem(param));
                }
            });

            document.location.href = link;
        }
    });

    // TEST

    document.querySelector(".menu-btn").addEventListener('click', () => {
        document.querySelector(".menu-test").classList.toggle('hide')
    })

    document.querySelector(".popup1").addEventListener('click', () => {
        popupSecond.classList.add('hide')
        displayPopup(popupFirst)
    })

    document.querySelector(".popup2").addEventListener('click', () => {
        popupFirst.classList.add('hide')
        displayPopup(popupSecond)
    })
})();
