import { showMessage } from './general-functions';

const wrapVideo = document.querySelector('.video__main');
const controls = wrapVideo.querySelector('.video__controls');
const videoTrack = controls.querySelector('.video__progress');
const btnPlay = controls.querySelector('.video__play');
const btnPlayImg = controls.querySelector('.video__play img');
const btnPlayLarge = wrapVideo.querySelector('.video__play-large');
const volumeProgress = controls.querySelector('.video__volume-progress');

let promise;
function videoPause(currentVideo, videoState) {
  btnPlay.dataset.isPlay = 'false';
  if (videoState === 'pause') currentVideo.pause();
  btnPlayLarge.style.display = '';
  btnPlayLarge.children[0].src = './svg/play_large.svg';
  btnPlayImg.src = './svg/play_small.svg';
}
function videoPlay(currentVideo) {
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
    currentVideo.focus();
  };

  const waitingListener = function () {
    btnPlayLarge.children[0].src = './gif/loading.gif';
    btnPlayLarge.style.display = '';
  };
  const timeListener = function () {
    if (currentVideo !== wrapVideo.querySelector('.video__video.slick-active'))
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
  const currVideo = wrapVideo.querySelector('.video__video.slick-active');
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
function setVolumeStyles(isMuted) {
  const btnVolumeImg = controls.querySelector('.video__volume img');
  if (isMuted === true) {
    btnVolumeImg.src = './svg/mute.svg';
  } else {
    btnVolumeImg.src = './svg/volume.svg';
  }
  volumeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeProgress.value}%, #C4C4C4 ${volumeProgress.value}%, #C4C4C4 100%)`;
}
function changeVolume(volumeInput, currentVideo) {
  if (volumeInput.value === '0') {
    currentVideo.muted = true;
  } else {
    currentVideo.muted = false;
    currentVideo.volume = volumeProgress.value / 100;
  }
  setVolumeStyles(currentVideo.muted);
}
function toggleVolume(currentVideo) {
  if (currentVideo.muted === true) {
    currentVideo.muted = false;
    volumeProgress.value = currentVideo.volume * 100;
  } else {
    currentVideo.muted = true;
    volumeProgress.value = '0';
  }
  setVolumeStyles(currentVideo.muted);
}
function fullscreen() {
  if (document.fullscreenElement === null) {
    wrapVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
export function addVideoListeners() {
  const videos = document.querySelectorAll('.video__video');
  videos.forEach((video) => {
    video.volume = volumeProgress.value / 100;
  });
  controls.addEventListener('input', (event) => {
    if (event.target.tagName !== 'INPUT') return;
    const { value } = event.target;
    event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  });

  controls.addEventListener('pointerup', (event) => {
    const currVideo = wrapVideo.querySelector('.video__video.slick-active');
    if (event.target.closest('.video__progress')) {
      const inputWidth = videoTrack.offsetWidth;
      const eventPosition = event.offsetX;
      videoTrack.value = (100 * eventPosition) / inputWidth;
      currVideo.currentTime = currVideo.duration * (eventPosition / inputWidth);
    }
    if (event.target.closest('.video__volume')) {
      toggleVolume(currVideo);
    }
    if (event.target.closest('.video__volume-progress')) {
      changeVolume(event.target, currVideo);
    }
    if (event.target.closest('.video__fullscreen')) {
      fullscreen();
    }
  });
  wrapVideo.addEventListener('keydown', (ev) => {
    const currVideo = wrapVideo.querySelector('.video__video.slick-active');
    console.log('ev.code', ev.code);
    if (!ev.target.closest('.video__video.slick-active')) return;
    if (ev.code === 'Space') {
      ev.preventDefault();
      handleVideo();
    }
    if (ev.code === 'KeyM') {
      toggleVolume(currVideo);
    }
    if (ev.code === 'KeyF') {
      fullscreen();
    }
    let { playbackRate } = ev.target;
    if (ev.code === 'Comma' && ev.shiftKey) {
      if (playbackRate === 2) return;
      playbackRate += 0.25;
      ev.target.playbackRate = playbackRate;
      showMessage(wrapVideo, `${playbackRate}x`);
    }
    if (ev.code === 'Period' && ev.shiftKey) {
      if (playbackRate === 0.25) return;
      playbackRate -= 0.25;
      ev.target.playbackRate = playbackRate;
      showMessage(wrapVideo, `${playbackRate}x`);
    }
  });
}
