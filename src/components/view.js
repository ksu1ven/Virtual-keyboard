export default class View {
  constructor() {
    this.numbers = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#92;'];
    this.numbersTop = ['~', '!', '@', '#', '$', '%', ':', '?', '*', '(', ')', '_', '+', '/'];
    this.letters = ['Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'Del', 'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '&#8242;', 'Enter', 'Shift', '&#92;', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '/', '&#8679;', 'Shift ', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '&#8678;', '&#8681;', '&#8658;'];
    this.lettersRussian = ['Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Del', 'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', '&#8217;', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '&#8679;', 'Shift ', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '&#8678;', '&#8681;', '&#8658;'];
    this.idDoublekeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backslash'];
    this.idLetters = ['Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', '/', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft',
      'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
  }

  static createElements() {
    const main = document.createElement('main');
    document.body.appendChild(main);
    main.classList.add('main');
    const textarea = document.createElement('textarea');
    main.appendChild(textarea);
    textarea.classList.add('textarea');
    textarea.focus();
    const section = document.createElement('section');
    main.appendChild(section);
    section.classList.add('keyboard');
    const p = document.createElement('p');
    main.appendChild(p);
    p.classList.add('change-language');
    p.innerHTML = 'Press Shift + Alt to change language';
  }

  createTopNumbers() {
    const keyboard = document.querySelector('.keyboard');
    for (let i = 0; i < this.numbers.length; i += 1) {
      const div = document.createElement('div');
      keyboard.appendChild(div);
      div.classList.add('key');
      div.classList.add('key_double');
      div.id = `${this.idDoublekeys[i]}`;
      if (div.id === 'Backquote') {
        div.classList.add('key_dark');
      }
      if (i === this.numbers.length - 1) {
        div.classList.add('slash');
      }
      const p = document.createElement('p');
      div.appendChild(p);
      p.classList.add('key_topleft-letters');
      p.innerHTML = `${this.numbersTop[i]}`;
      const p2 = document.createElement('p');
      div.appendChild(p2);
      p2.classList.add('key_center-letters');
      p2.innerHTML = `${this.numbers[i]}`;
    }
  }

  createLetters(lang, caps) {
    this.createTopNumbers();
    const keyboard = document.querySelector('.keyboard');
    for (let i = 0; i < this.letters.length; i += 1) {
      const div = document.createElement('div');
      keyboard.appendChild(div);
      if (lang === 'eng') {
        div.innerHTML = `${this.letters[i]}`;
        div.id = `${this.idLetters[i]}`;
        if (div.id === 'ArrowUp' || div.id === 'ArrowDown' || div.id === 'ArrowLeft'
            || div.id === 'ArrowRight' || div.id === 'MetaLeft') {
          div.classList.add('key_dark');
        }
      } else {
        div.innerHTML = `${this.lettersRussian[i]}`;
        div.id = `${this.idLetters[i]}`;
        if (div.id === 'ArrowUp' || div.id === 'ArrowDown' || div.id === 'ArrowLeft'
                || div.id === 'ArrowRight' || div.id === 'MetaLeft') {
          div.classList.add('key_dark');
        }
      }
      div.classList.add('key');
      if (div.innerHTML === 'Win') { div.classList.add('meta'); } else if (div.innerHTML === 'Backspace') { div.classList.add('backspace'); } else if (div.innerHTML === 'Tab') { div.classList.add('tab'); } else if (div.innerHTML === 'Del') { div.classList.add('del'); } else if (div.innerHTML === 'Caps Lock') {
        div.classList.add('caps');
        if (caps === 'on') { div.classList.add('active'); }
      } else if (div.innerHTML === 'Enter') { div.classList.add('enter'); } else if (div.innerHTML === 'Shift') { div.classList.add('shift'); } else if (div.innerHTML === 'Shift ') {
        div.classList.add('key_dark');
        div.classList.add('shift-little');
      } else if (div.innerHTML === 'Ctrl') { div.classList.add('ctrl'); } else if (div.innerHTML === 'Alt') { div.classList.add('alt'); } else if (div.innerHTML === ' ') {
        div.classList.add('space');
        div.classList.add('key_letter');
      } else if ((div.innerHTML.charCodeAt(0) > 64 && div.innerHTML.charCodeAt(0) < 91)
            || (div.innerHTML.charCodeAt(0) > 1039 && div.innerHTML.charCodeAt(0) < 1072)
            || div.innerHTML.charCodeAt(0) === 8217 || div.innerHTML.charCodeAt(0) === 46
            || div.innerHTML.charCodeAt(0) === 91 || div.innerHTML.charCodeAt(0) === 93
            || div.innerHTML.charCodeAt(0) === 59 || div.innerHTML.charCodeAt(0) === 8242
            || div.innerHTML.charCodeAt(0) === 47 || div.innerHTML.charCodeAt(0) === 44
            || div.innerHTML.charCodeAt(0) === 92
      ) { div.classList.add('key_letter'); }
    }
  }
}
