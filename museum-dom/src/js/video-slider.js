import $ from 'jquery';
import './slick.min';
import { handleVideo } from './video';

$(document).ready(() => {
  $('.video__iframes').slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendArrows: $('.video-slider'),
    appendDots: $('.video-slider'),
    asNavFor: '.video__list',
    swipe: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
  $('.video__list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.video__iframes',
  });
  const videoProgressInfo = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };
  $('.video__list').click(() => handleVideo());
  $('.video__play-large').click(() => handleVideo());
  $('.video__play').click(() => handleVideo());
  $('.video__list').on(
    'beforeChange',
    (event, slick, currentSlide, nextSlide) => {
      const videoProgress = $('.video__progress', $('.video__controls'));
      if ($('.video__play').attr('data-is-play') === 'true') handleVideo();
      console.log(videoProgress);
      videoProgressInfo[currentSlide] = videoProgress.val();
      videoProgress.val(videoProgressInfo[nextSlide]);
      const nextSlideVal = videoProgress.val();
      videoProgress.css(
        'background',
        `linear-gradient(to right, #710707 0%, #710707 ${nextSlideVal}%, #C4C4C4 ${nextSlideVal}%, #C4C4C4 100%)`
      );
      const videos = $('.video__video');
      videos[nextSlide].volume = videos[currentSlide].volume;
      videos[nextSlide].muted = videos[currentSlide].muted;
    }
  );
});
