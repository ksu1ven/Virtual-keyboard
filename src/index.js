import './style.scss';
import View from './components/view';

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
}
const keyboard = new Keyboard();
keyboard.createKeyboard();
