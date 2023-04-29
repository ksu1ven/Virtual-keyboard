import './style.scss';
import View from './components/view';
import KeyEvents from './components/key-events';

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
