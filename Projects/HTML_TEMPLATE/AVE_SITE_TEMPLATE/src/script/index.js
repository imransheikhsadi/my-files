import '../style/sass/main.scss';
import Rotate from '../vendors/js/text_rotate';
import Glide from '@glidejs/glide';
import AOS from 'aos';
import 'aos/dist/aos.scss';

let glide = new Glide('.glide',{type: 'carousel'}).mount();
let glide_two = new Glide('.glide_two',{type: 'carousel'}).mount();
let rotate = new Rotate('hero_text_animation','UP_FADE_TWO',6000);
AOS.init();


function counter(id, start, end, duration) {
  let obj = document.getElementById(id),
  current = start,
  range = end - start,
  increment = end > start ? 1 : -1,
  step = Math.abs(Math.floor(duration / range)),
  timer = setInterval(() => {
    current += increment;
    obj.textContent = current;
    if (current == end) {
    clearInterval(timer);
    }
  }, step);
}

document.addEventListener('aos:in:counter', ({ detail }) => {
  if (detail.classList.contains('aos-animate')) {
    counter("count_1", 0, 300, 3000);
    counter("count_2", 100, 500, 2500);
    counter("count_3", 0, 450, 3000);
    counter("count_4", 0, 450, 3000);
  }
});
 