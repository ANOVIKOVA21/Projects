const controls = document.querySelector('.video__controls');
const wrapVideo = document.querySelector('.video__main');
const video = document.querySelector('.video__video');
const videoTrack = document.querySelector('.video__progress');
const btnPlay = document.querySelector('.video__play');
const btnPlayImg = document.querySelector('.video__play img');
const btnPlayLarge = document.querySelector('.video__play-large');
const volumeProgress = document.querySelector('.video__volume-progress');
const btnVolume = document.querySelector('.video__volume');
const btnVolumeImg = document.querySelector('.video__volume img');
const btnFullscreen = document.querySelector('.video__fullscreen');
const btnFullscreenImg = document.querySelector('.video__fullscreen img');

function videoPlayPause() {
  let videoPlay;
  if (btnPlay.dataset.isPlay === 'false') {
    btnPlay.dataset.isPlay = 'true';
    videoTrack.value = '0';
    btnPlayLarge.style.display = 'none';
    btnPlayImg.src = './svg/pause.svg';
    video.play();
    videoPlay = setInterval(() => {
      if (videoTrack.value !== '100') {
        const videoTime = Math.round(video.currentTime);
        const videoLength = Math.round(video.duration);
        videoTrack.value = `${(videoTime * 100) / videoLength}`;
        videoTrack.style.background = `linear-gradient(to right, #710707 0%, #710707 ${videoTrack.value}%, #C4C4C4 ${videoTrack.value}%, #C4C4C4 100%)`;
      } else {
        btnPlay.dataset.isPlay = 'false';
        clearInterval(videoPlay);
        btnPlayLarge.style.display = '';
        btnPlayImg.src = './svg/play_small.svg';
      }
    }, 10);
  } else {
    btnPlay.dataset.isPlay = 'false';
    video.pause();
    clearInterval(videoPlay);
    btnPlayLarge.style.display = '';
    btnPlayImg.src = './svg/play_small.svg';
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

function fullscreen() {
  if (btnFullscreen.dataset.isFullscreen === 'false') {
    btnFullscreen.dataset.isFullscreen = 'true';
    btnFullscreenImg.src = './svg/fullscreen_exit.svg';
    video.classList.add('fullscreen');
    controls.classList.add('controls_fullscreen');
    wrapVideo.requestFullscreen();
  } else {
    btnFullscreen.dataset.isFullscreen = 'false';
    btnFullscreenImg.src = './svg/fullscreen.svg';
    video.classList.remove('fullscreen');
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
    if (event.target.closest('.video__play')) videoPlayPause();
    if (event.target.closest('.video__progress')) {
      const inputWidth = videoTrack.offsetWidth;
      const eventPosition = event.offsetX;
      videoTrack.value = (100 * eventPosition) / inputWidth;
      video.currentTime = video.duration * (eventPosition / inputWidth);
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
      video.volume = volumeProgress.value / 100;
    }
    if (event.target.closest('.video__volume-progress')) {
      if (volumeProgress.value === '0') btnVolume.dataset.isMute = 'true';
      else btnVolume.dataset.isMute = 'false';
      volumeIsMute();
      video.volume = volumeProgress.value / 100;
    }
    if (event.target.closest('.video__fullscreen')) {
      fullscreen();
    }
  });
  video.addEventListener('click', videoPlayPause);
  btnPlayLarge.addEventListener('click', videoPlayPause);
  // video.addEventListener('keydown', (ev) => {
  //     console.log(ev.target)
  // })
}
