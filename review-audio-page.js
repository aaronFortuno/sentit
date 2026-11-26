import { mountReviewRateControls } from './review-audio-rate.js?v=0.1.129';

document.querySelectorAll('audio').forEach(audio => {
  audio.after(mountReviewRateControls(audio));
  audio.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); });
  });
});
