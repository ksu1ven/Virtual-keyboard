import { getCaretPos } from './key-events';

export default class ClickEvents {
  static mouseDown(e, caps) {
    const textarea = document.querySelector('.textarea');
    const pushedKey = e.target.closest('div');
    const caret = getCaretPos();
    if (!pushedKey) return;
    pushedKey.classList.add('active');
    if (!pushedKey.classList.contains('caps')) {
      if ((!e.shiftKey && pushedKey.classList.contains('key_letter') && caps === 'off')
            || (caps === 'on' && e.shiftKey && pushedKey.classList.contains('key_letter'))) {
        textarea.value = textarea.value.slice(0, caret) + pushedKey.innerHTML.toLowerCase()
        + textarea.value.slice(caret, textarea.value.length);
        textarea.selectionStart = caret + 1;
        textarea.selectionEnd = caret + 1;
      }
      if ((e.shiftKey && pushedKey.classList.contains('key_letter') && caps === 'off') || (caps === 'on'
            && !e.shiftKey && pushedKey.classList.contains('key_letter'))) {
        textarea.value = textarea.value.slice(0, caret) + pushedKey.innerHTML
        + textarea.value.slice(caret, textarea.value.length);
        textarea.selectionStart = caret + 1;
        textarea.selectionEnd = caret + 1;
      }
    }
    if (!e.shiftKey && pushedKey.classList.contains('key_double')) {
      textarea.value = textarea.value.slice(0, caret) + pushedKey.lastChild.innerHTML
      + textarea.value.slice(caret, textarea.value.length);
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (e.shiftKey && pushedKey.classList.contains('key_double')) {
      textarea.value = textarea.value.slice(0, caret) + pushedKey.firstChild.innerHTML
      + textarea.value.slice(caret, textarea.value.length);
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (pushedKey.classList.contains('enter')) {
      textarea.value = `${textarea.value.slice(0, caret)}\n${textarea.value.slice(caret, textarea.value.length)}`;
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (pushedKey.classList.contains('tab')) {
      textarea.value = `${textarea.value.slice(0, caret)}\t${textarea.value.slice(caret, textarea.value.length)}`;
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (pushedKey.classList.contains('backspace')) {
      textarea.focus();
      if (textarea.selectionStart === 0) {
        return;
      }
      if (textarea.selectionEnd !== caret) {
        textarea.value = textarea.value.slice(0, textarea.selectionStart)
        + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
        textarea.selectionStart = caret;
        textarea.selectionEnd = caret;
      } else {
        textarea.value = textarea.value.slice(0, caret - 1)
        + textarea.value.slice(caret, textarea.value.length);
        textarea.selectionStart = caret - 1;
        textarea.selectionEnd = caret - 1;
      }
    }
    if (pushedKey.classList.contains('del')) {
      textarea.focus();
      if (textarea.selectionEnd !== caret) {
        textarea.value = textarea.value.slice(0, textarea.selectionStart)
        + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
        textarea.selectionStart = caret;
        textarea.selectionEnd = caret;
      } else {
        textarea.value = textarea.value.slice(0, caret) + textarea.value.slice(caret
            + 1, textarea.value.length);
        textarea.selectionStart = caret;
        textarea.selectionEnd = caret;
      }
    }
    if (pushedKey.id === 'ArrowLeft') {
      textarea.selectionStart = caret - 1;
      textarea.selectionEnd = caret - 1;
    }
    if (pushedKey.id === 'ArrowRight') {
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (pushedKey.id === 'ArrowUp' || pushedKey.id === 'ArrowDown') {
      ClickEvents.arrowUpDown(pushedKey.id);
    }
  }

  static mouseUp() {
    const textarea = document.querySelector('.textarea');
    textarea.focus();
    const keys = document.querySelectorAll('.key');
    keys.forEach((elem) => {
      if (!elem.classList.contains('caps')) {
        elem.classList.remove('active');
      }
    });
  }

  static arrowUpDown(arrow) {
    const textarea = document.querySelector('.textarea');
    const arrowCarets = textarea.value.split('\n');
    const arr = [];
    const arrlength = [];
    arrowCarets.forEach((elem) => {
      arr.push(elem.split(''));
    });
    const caret = getCaretPos();
    let counter = 0;
    let counter2 = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (i > 0) { counter2 += 1; }
      arrlength.push([]);
      for (let j = 0; j < arr[i].length; j += 1) {
        arrlength[i].push(counter2);
        counter2 += 1;
      }
      arrlength[i].push(counter2);
    }
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length + 1; j += 1) {
        if (counter === caret) {
          if (arrow === 'ArrowUp') {
            if (i === 0) return;
            textarea.selectionStart = (arrlength[i - 1][j] >= 0) ? arrlength[i - 1][j]
              : arrlength[i - 1][arr[i - 1].length];
            textarea.selectionEnd = (arrlength[i - 1][j] >= 0) ? arrlength[i - 1][j]
              : arrlength[i - 1][arr[i - 1].length];
          }
          if (arrow === 'ArrowDown') {
            if (i === arr.length - 1) return;
            textarea.selectionStart = arrlength[i + 1][j] || arrlength[i + 1][arr[i + 1].length];
            textarea.selectionEnd = arrlength[i + 1][j] || arrlength[i + 1][arr[i + 1].length];
          }
        }
        counter += 1;
      }
    }
  }
}
