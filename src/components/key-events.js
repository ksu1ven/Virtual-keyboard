export default class KeyEvents {
  static highlighAndInputLetters(event, caps) {
    const textarea = document.querySelector('.textarea');
    textarea.focus();
    const keys = document.querySelectorAll('.key');
    const caret = KeyEvents.getCaretPos();
    const key = [...keys].find((el) => el.id === event.code);
    if (key === undefined) return;
    key.classList.add('active');
    key.classList.add('animation');
    if (key.id === 'MetaLeft') {
      event.preventDefault();
      return;
    }
    if ((!event.shiftKey && key.classList.contains('key_letter') && caps === 'off')
       || (caps === 'on' && event.shiftKey && key.classList.contains('key_letter'))) {
      event.preventDefault();
      textarea.value = textarea.value.slice(0, caret) + key.innerHTML.toLowerCase()
      + textarea.value.slice(caret, textarea.value.length);
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if ((event.shiftKey && key.classList.contains('key_letter') && caps === 'off')
      || (caps === 'on' && !event.shiftKey && key.classList.contains('key_letter'))) {
      event.preventDefault();
      textarea.value = textarea.value.slice(0, caret) + key.innerHTML
      + textarea.value.slice(caret, textarea.value.length);
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (!event.shiftKey && key.classList.contains('key_double')) {
      event.preventDefault();
      textarea.value = textarea.value.slice(0, caret) + key.lastChild.innerHTML
      + textarea.value.slice(caret, textarea.value.length);
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (event.shiftKey && key.classList.contains('key_double')) {
      event.preventDefault();
      textarea.value = textarea.value.slice(0, caret) + key.firstChild.innerHTML
      + textarea.value.slice(caret, textarea.value.length);
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
    if (key.classList.contains('tab')) {
      event.preventDefault();
      textarea.value = `${textarea.value.slice(0, caret)}\t${textarea.value.slice(caret, textarea.value.length)}`;
      textarea.selectionStart = caret + 1;
      textarea.selectionEnd = caret + 1;
    }
  }

  static removeAnimationFromKeys(event, caps) {
    const keys = document.querySelectorAll('.key');
    const key = [...keys].find((el) => el.id === event.code);
    if (!key) return;
    if (key.classList.contains('caps') && caps === 'on') return;
    key.classList.remove('active');
    setTimeout(() => key.classList.remove('animation'), 1000);
  }

  static getCaretPos() {
    const textarea = document.querySelector('textarea');
    textarea.focus();
    if (textarea.selectionStart) return textarea.selectionStart;
    if (document.selection) {
      const sel = document.selection.createRange();
      const clone = sel.duplicate();
      sel.collapse(true);
      clone.moveToElementText(textarea);
      clone.setEndPoint('EndToEnd', sel);
      return clone.text.length;
    }
    return 0;
  }
}
