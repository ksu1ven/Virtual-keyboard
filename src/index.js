import './style.scss';
import View from './components/view';
import Events from './components/events';

class Keyboard {
  constructor() {
    this.view = new View();
    this.events=new Events();
    this.lang = localStorage.getItem('a_saved') || 'ru';
    this.caps = 'off';
  }

  createKeyboard() {
    View.createElements();
    this.view.createLetters(this.lang, this.caps);
  }

  addEvents() {
    let pressedKeys = new Set();
    document.addEventListener('keydown', (event)=>{
      pressedKeys.add(event.key);
      if(pressedKeys.has('Alt') && pressedKeys.has('Shift')) {this.changeLang()}

    })

    document.addEventListener('keyup', function(event) {
      pressedKeys.delete(event.key);
    });
  }

  changeLang(){
    localStorage.setItem('a_saved', this.lang)
    document.querySelector('.keyboard').innerHTML='';
    if(this.lang=='ru'){this.lang='eng';
    } else {this.lang='ru'}
     this.view.createLetters (this.lang);
  }
}

const keyboard = new Keyboard();
keyboard.createKeyboard();
keyboard.addEvents();
