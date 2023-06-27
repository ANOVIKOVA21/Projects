const controls = document.querySelector('.video__controls');
const wrapVideo = document.querySelector('.video__main');
const videoTrack = document.querySelector('.video__progress');
const btnPlay = document.querySelector('.video__play');
const btnPlayImg = document.querySelector('.video__play img');
const btnPlayLarge = document.querySelector('.video__play-large');
const volumeProgress = document.querySelector('.video__volume-progress');
const btnVolume = document.querySelector('.video__volume');
const btnVolumeImg = document.querySelector('.video__volume img');
const btnFullscreen = document.querySelector('.video__fullscreen');
const btnFullscreenImg = document.querySelector('.video__fullscreen img');

let promise;
function videoPause(currentVideo, videoState) {
  btnPlay.dataset.isPlay = 'false';
  if (videoState === 'pause') currentVideo.pause();
  btnPlayLarge.style.display = '';
  btnPlayLarge.children[0].src = './svg/play_large.svg';
  btnPlayImg.src = './svg/play_small.svg';
}
function videoPlay(currentVideo) {
  debugger;
  if (videoTrack.value === '100') videoTrack.value = '0';
  if (currentVideo.readyState >= 3) promise = currentVideo.play();
  else {
    currentVideo.load();
    currentVideo.addEventListener('canplay', () => {
      console.log('canplay readyState', currentVideo.readyState);
      promise = currentVideo.play();
    });
  }

  btnPlayImg.src = './svg/pause.svg';
  const playingListener = function () {
    btnPlay.dataset.isPlay = 'true';
    btnPlayLarge.style.display = 'none';
  };

  const waitingListener = function () {
    btnPlayLarge.children[0].src = './gif/loading.gif';
    btnPlayLarge.style.display = '';
  };
  const timeListener = function () {
    if (currentVideo !== document.querySelector('.video__video.slick-active'))
      return;
    if (videoTrack.value !== '100') {
      if (currentVideo.readyState < 3) return;
      const videoTime = Math.round(currentVideo.currentTime);
      const videoLength = Math.round(currentVideo.duration);
      videoTrack.value = `${(videoTime * 100) / videoLength}`;
      videoTrack.style.background = `linear-gradient(to right, #710707 0%, #710707 ${videoTrack.value}%, #C4C4C4 ${videoTrack.value}%, #C4C4C4 100%)`;
    } else {
      videoPause(currentVideo, 'ended');
      currentVideo.removeEventListener('timeupdate', timeListener, false);
      currentVideo.removeEventListener('playing', playingListener);
      currentVideo.removeEventListener('waiting', waitingListener);
    }
  };
  currentVideo.addEventListener('playing', playingListener);
  currentVideo.addEventListener('waiting', waitingListener);
  currentVideo.addEventListener('timeupdate', timeListener, false);
}

export function handleVideo() {
  const currVideo = document.querySelector('.video__video.slick-active');
  if (btnPlay.dataset.isPlay === 'false') {
    videoPlay(currVideo);
    console.log('play ', promise);
  } else {
    console.log('pause ', promise);
    if (promise !== undefined) {
      promise.then(() => {
        videoPause(currVideo, 'pause');
      });
    }
    return false;
  }
}
function volumeIsMute() {
  if (btnVolume.dataset.isMute === 'true') {
    volumeProgress.value = '0';
    btnVolumeImg.src = './svg/mute.svg';
  } else {
    btnVolumeImg.src = './svg/volume.svg';
  }
  volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeProgress.value}%, #C4C4C4 ${volumeProgress.value}%, #C4C4C4 100%)`;
}

function fullscreen(currVideo) {
  if (btnFullscreen.dataset.isFullscreen === 'false') {
    btnFullscreen.dataset.isFullscreen = 'true';
    btnFullscreenImg.src = './svg/fullscreen_exit.svg';
    currVideo.classList.add('fullscreen');
    controls.classList.add('controls_fullscreen');
    wrapVideo.requestFullscreen();
  } else {
    btnFullscreen.dataset.isFullscreen = 'false';
    btnFullscreenImg.src = './svg/fullscreen.svg';
    currVideo.classList.remove('fullscreen');
    controls.classList.remove('controls_fullscreen');
    document.exitFullscreen();
  }
}
export function addVideoListeners() {
  controls.addEventListener('input', (event) => {
    if (event.target.tagName !== 'INPUT') return;
    const { value } = event.target;
    event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  });
  controls.addEventListener('click', (event) => {
    const currVideo = document.querySelector('.video__video.slick-active');
    if (event.target.closest('.video__progress')) {
      const inputWidth = videoTrack.offsetWidth;
      const eventPosition = event.offsetX;
      videoTrack.value = (100 * eventPosition) / inputWidth;
      currVideo.currentTime = currVideo.duration * (eventPosition / inputWidth);
    }
    if (event.target.closest('.video__volume')) {
      if (btnVolume.dataset.isMute === 'false') {
        btnVolume.dataset.isMute = 'true';
        volumeIsMute();
      } else {
        btnVolume.dataset.isMute = 'false';
        volumeProgress.value = '50';
        volumeIsMute();
      }
      currVideo.volume = volumeProgress.value / 100;
    }
    if (event.target.closest('.video__volume-progress')) {
      if (volumeProgress.value === '0') btnVolume.dataset.isMute = 'true';
      else btnVolume.dataset.isMute = 'false';
      volumeIsMute();
      currVideo.volume = volumeProgress.value / 100;
    }
    if (event.target.closest('.video__fullscreen')) {
      fullscreen(currVideo);
    }
  });
  // video.addEventListener('keydown', (ev) => {
  //     console.log(ev.target)
  // })
}
