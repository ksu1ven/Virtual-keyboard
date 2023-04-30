import './style.scss';
import View from './components/view';
import KeyEvents, { showCat } from './components/key-events';
import ClickEvents from './components/click-events';

class Keyboard {
  constructor() {
    this.view = new View();
    this.lang = localStorage.getItem('a_saved') || 'ru';
    this.caps = 'off';
  }

  createKeyboard() {
    View.createElements();
    this.view.createLetters(this.lang, this.caps);
  }

  addEvents() {
    let pressedKeys = new Set();
    const keyboard = document.querySelector('.keyboard');

    document.addEventListener('keydown', (event) => {
      pressedKeys.add(event.key);
      if (event.key === 'CapsLock') {
        if (this.caps === 'off') {
          this.caps = 'on';
        } else {
          this.caps = 'off';
          document.querySelector('#CapsLock').classList.remove('active');
        }
      }
      KeyEvents.highlighAndInputLetters(event, this.caps);
    });

    document.addEventListener('keyup', (event) => {
      if ((pressedKeys.has('Alt') && pressedKeys.has('Shift'))
        || (pressedKeys.has('AltGraph') && pressedKeys.has('Shift'))) {
        this.changeLang();
      }
      KeyEvents.removeAnimationFromKeys(event, this.caps);
      pressedKeys = new Set();
    });

    keyboard.addEventListener('mousedown', (event) => {
      ClickEvents.mouseDown(event, this.caps);
      const pushedKey = event.target.closest('div');
      if (!pushedKey) return;
      if (pushedKey.classList.contains('caps')) {
        if (this.caps === 'off') {
          this.caps = 'on';
        } else {
          this.caps = 'off';
          pushedKey.classList.remove('active');
        }
      }
    });

    keyboard.addEventListener('mouseup', () => ClickEvents.mouseUp());

    keyboard.addEventListener('click', (e) => {
      if (!e.target.closest('div')) return;
      e.target.closest('div').classList.add('animation');
      showCat(e.target.closest('div').getBoundingClientRect());
      document.querySelector('audio').play();
      setTimeout(() => e.target.closest('div').classList.remove('animation'), 1000);
    });
  }

  changeLang() {
    localStorage.setItem('a_saved', this.lang);
    document.querySelector('.keyboard').innerHTML = '';
    if (this.lang === 'ru') {
      this.lang = 'eng';
    } else { this.lang = 'ru'; }
    this.view.createLetters(this.lang);
    if (this.caps === 'on') {
      document.querySelector('#CapsLock').classList.add('active');
    }
  }
}

const keyboard = new Keyboard();
keyboard.createKeyboard();
keyboard.addEvents();
