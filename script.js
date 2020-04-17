
const KEYBOARD = [
  'Backquote',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',
  'Backspace',
  'Tab',
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',
  'Backslash',
  'Delete',
  'CapsLock',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'Enter',
  'ShiftLeft',
  'IntlBackslash',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
  'ArrowUp',
  'ShiftRight',
  'ControlLeft',
  'MetaLeft',
  'AltLeft',
  'Space',
  'AltRight',
  'ControlRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const ENGLISH_KEY = [
  ['`', '`'],
  ['1', '!'],
  ['2', '@'],
  ['3', '#'],
  ['4', '$'],
  ['5', '%'],
  ['6', ':'],
  ['7', '?'],
  ['8', '*'],
  ['9', '('],
  ['0', ')'],
  ['-', '_'],
  ['=', '+'],
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  ['/', '\\'],
  'Del',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  '; ',
  "'",
  'ENTER',

  'Shift',
  '\\',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  '⇧',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  ' ',
  'Alt',
  'Ctrl',
  '⇦',
  '⇩',
  '⇨',
];

const RUSSIAN_KEY = [
  'ë',
  ['1', '!'],
  ['2', '"'],
  ['3', '№'],
  ['4', ';'],
  ['5', '%'],
  ['6', '^'],
  ['7', '&'],
  ['8', '*'],
  ['9', '('],
  ['0', ')'],
  ['-', '_'],
  ['=', '+'],
  'Backspace',
  'Tab',
  'й',
  'ц',
  'у',
  'к',
  'е',
  'н',
  'г',
  'ш',
  'щ',
  'з',
  'х',
  'ъ',
  ['/', '\\'],
  'Del',
  'CapsLock',
  'ф',
  'ы',
  'в',
  'а',
  'п',
  'р',
  'о',
  'л',
  'д',
  'ж ',
  'э',
  'ENTER',

  'Shift',
  '\\',
  'я',
  'ч',
  'с',
  'м',
  'и',
  'т',
  'ь',
  'б',
  'ю',
  '/',
  '⇧',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  ' ',
  'Alt',
  'Ctrl',
  '⇦',
  '⇩',
  '⇨',
];

const SPECIAL_BUTTONS = [
  'BracketLeft',
  'BracketRight',
  'Semicolon',
  'Quote',
  'Comma',
  'Period',
  'Backquote',
  'Slash',
  'IntlBackslash',
];

const MAP_KEYBOARD = new Map();
let KEYBOARD_EVENTS = document.getElementById('keyboard');
let checkLanguage;

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.placeholder = 'Привет, смена языка происходит при быстром нажатие, сначала на Shift, потом на Control или наоборот, и двойные символы так же(shift+). На физической клавиатуре Contrl  Shift . Спасибо за внимание:)';
document.body.append(textarea);
const INITIALIZE_MAP = (keys) => {
  for (let i = 0; i < keys.length; i += 1) {
    MAP_KEYBOARD.set(KEYBOARD[i], keys[i]);
  }
};
if (localStorage.getItem('checkLanguage') !== 'Eng') {
  INITIALIZE_MAP(RUSSIAN_KEY);
} INITIALIZE_MAP(ENGLISH_KEY);


const VIRTUAL_BUTTOM_DELAY = (event) => {
  if (event.target.id !== 'CapsLock') {
    event.target.classList.add('active-button');
    setTimeout(() => {
      event.target.classList.remove('active-button');
    }, 1000);
  }
};
const DELETE_SELECTION = () => {
  const selection = textarea.selectionStart;

  textarea.value = textarea.value.substring(0, textarea.selectionStart)
    + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
  textarea.focus();
  textarea.selectionStart = selection;
  textarea.selectionEnd = selection;
};
const DELETE_BACKSOPACE_TEXTAREA = () => {
  const selection = textarea.selectionStart;

  if (textarea.selectionStart < textarea.selectionEnd) {
    DELETE_SELECTION();
  } else if (textarea.selectionStart > 0) {
    textarea.value = textarea.value.substring(0, textarea.selectionStart - 1)
      + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
    textarea.focus();
    textarea.selectionStart = selection;
    textarea.selectionEnd = selection - 1;
  }
};
const DELETE_NEXT_TEXTAREA = () => {
  const selection = textarea.selectionStart;
  if (textarea.selectionStart < textarea.selectionEnd) {
    DELETE_SELECTION();
  } else if (textarea.selectionEnd < textarea.value.length) {
    textarea.value = textarea.value.substring(0, textarea.selectionEnd)
      + textarea.value.substring(
        textarea.selectionEnd + 1,
        textarea.value.length,
      );
    textarea.focus();
    textarea.selectionStart = selection;
    textarea.selectionEnd = selection;
  }
};
const upLetters = () => {
  document.querySelectorAll('.letter').forEach((str) => { str.innerHTML = str.innerHTML.toUpperCase(); });
};

const downLetters = () => {
  document.querySelectorAll('.letter').forEach((string) => {
    string.innerHTML = string.innerHTML.toLowerCase();
  });
};
const VIRTUAL_CAPSLOCK = (button) => {
  if (button.target.classList.contains('active-button')) {
    button.target.classList.remove('active-button');
    downLetters();
  } else {
    button.target.classList.add('active-button');
    upLetters();
  }
};
const ADD_TEXT_BUTTON = function (value, key) {
  const button = document.createElement('DIV');
  const span = document.createElement('SPAN');
  const valueButton = document.createElement('div');

  if (Array.isArray(value) === true) {
    const eValue = value.values();
    button.id = key;
    button.classList.add('keyboard-button');
    button.classList.add('double-button');

    document.getElementById('keyboard').appendChild(button);

    valueButton.innerHTML = eValue.next().value;
    valueButton.classList.add('smallNumber');

    span.classList.add('smallDigit');
    span.innerHTML = eValue.next().value;

    document.getElementById(key).appendChild(valueButton).after(span);
  } else {
    button.id = key;
    button.classList.add('keyboard-button');
    for (let i = 0; i < SPECIAL_BUTTONS.length; i += 1) {
      if (SPECIAL_BUTTONS[i] === key) {
        button.classList.add('letter');
      }
    }
    if (/^Key/.test(key) === true) {
      button.classList.add('letter');
    }
    button.innerHTML = value;
    document.getElementById('keyboard').appendChild(button);
  }
};

const ADD_BUTTONS = (keyboard) => {
  const div = document.createElement('div');
  div.id = 'keyboard';
  div.className = 'keyboard';
  if (document.getElementById('keyboard')) {
    document.getElementById('keyboard').replaceWith(div);
    VIRTUAL_CHECK();
  } else {
    document.body.append(div);
  }

  keyboard.forEach((value, key) => {
    ADD_TEXT_BUTTON(value, key);
  });
};

const CHANGE_LAYOUT = () => {
  if (checkLanguage === 'Rus') {
    INITIALIZE_MAP(ENGLISH_KEY);
    ADD_BUTTONS(MAP_KEYBOARD);

    checkLanguage = 'Eng';
    localStorage.setItem('checkLanguage', checkLanguage);
  } else {
    INITIALIZE_MAP(RUSSIAN_KEY);
    ADD_BUTTONS(MAP_KEYBOARD);

    checkLanguage = 'Rus';
    localStorage.setItem('checkLanguage', checkLanguage);
    localStorage.getItem('checkLanguage');
  }
};

const VIRTUAL_CONTROL = () => {
  if (
    KEYBOARD_EVENTS.querySelector('#ShiftRight').classList.contains(
      'active-button',
    )
    || KEYBOARD_EVENTS.querySelector('#ShiftLeft').classList.contains(
      'active-button',
    )
  ) {
    CHANGE_LAYOUT();
  }
};

const VIRTUAL_SHIFT = () => {
  if (
    KEYBOARD_EVENTS.querySelector('#ControlRight').classList.contains(
      'active-button',
    )
    || KEYBOARD_EVENTS.querySelector('#ControlLeft').classList.contains(
      'active-button',
    )
  ) {
    CHANGE_LAYOUT();
  }
};
const CHECKBUTTON = (button) => {
  VIRTUAL_BUTTOM_DELAY(button);
  switch (button.target.id) {
    case 'Enter':
      textarea.value += '\n';
      break;
    case 'Space':
      textarea.value += ' ';
      break;
    case 'Backspace':
      DELETE_BACKSOPACE_TEXTAREA();
      break;
    case 'Delete':
      DELETE_NEXT_TEXTAREA();
      break;
    case 'CapsLock': {
      VIRTUAL_CAPSLOCK(button);
      break;
    }
    case 'Tab': {
      textarea.value += '\t';
      button.defaultPrevented();
      break;
    }
    case 'ShiftRight':
    case 'ShiftLeft':
      VIRTUAL_SHIFT();
      break;
    case 'ControlLeft':
    case 'ControlRight':
      VIRTUAL_CONTROL();
      break;
    case 'ArrowLeft':
      textarea.selectionEnd -= 1;
      break;
    case 'ArrowRight':
      textarea.selectionStart += 1;
      break;
    default:
      break;
  }
  return button.target.innerHTML;
};


const VIRTUAL_CHECK = () => {
  KEYBOARD_EVENTS = document.getElementById('keyboard');
  KEYBOARD_EVENTS.addEventListener('click', (event) => {
    textarea.focus();


    if (event.target.classList.contains('keyboard-button')) {
      CHECKBUTTON(event);

      if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
        upLetters();
        setTimeout(() => {
          downLetters();
        }, 1000);
      }
      if (event.target.classList.contains('letter')) {
        textarea.value += event.target.innerHTML;
      }
      if (
        event.target.classList.contains('double-button')
        || event.target.classList.contains('smallNumber')
      ) {
        if (
          document
            .getElementById('keyboard')
            .querySelector('#ShiftLeft')
            .classList.contains('active-button')
          || document
            .getElementById('keyboard')
            .querySelector('#ShiftRight')
            .classList.contains('active-button')
        ) {
          textarea.value += event.target.lastChild.innerHTML;
        } else textarea.value += event.target.firstChild.innerHTML;
      }
    }

    if (
      event.target.classList.contains('smallDigit')
      || event.target.classList.contains('smallNumber')
    ) {
      event.target.parentNode.classList.add('active-button');
      setTimeout(() => {
        event.target.parentNode.classList.remove('active-button');
      }, 1000);

      if (event.target.classList.contains('smallDigit')) {
        if (
          document
            .getElementById('keyboard')
            .querySelector('#ShiftLeft')
            .classList.contains('active-button')
          || document
            .getElementById('keyboard')
            .querySelector('#ShiftRight')
            .classList.contains('active-button')
        ) {
          textarea.value += event.target.innerHTML;
        } else textarea.value += event.target.previousElementSibling.innerHTML;
      }
      if (event.target.classList.contains('smallNumber')) {
        if (
          document
            .getElementById('keyboard')
            .querySelector('#ShiftLeft')
            .classList.contains('active-button')
          || document
            .getElementById('keyboard')
            .querySelector('#ShiftRight')
            .classList.contains('active-button')
        ) {
          textarea.value += event.target.nextElementSibling.innerHTML;
        } else textarea.value += event.target.innerHTML;
      }
    }
  });
};

ADD_BUTTONS(MAP_KEYBOARD);

window.onload = () => {
  VIRTUAL_CHECK();
  let a;
  const sum = [];

  window.addEventListener('keydown', (event) => {
    textarea.focus();
    const n = document
      .getElementById('keyboard')
      .querySelector(`#${event.code}`);
    if (n.id === event.code) {
      a = n;

      a.classList.add('active-button');
      if (event.repeat === false) {
        sum.push(a);
      }
    }
    if (event.getModifierState('CapsLock')) upLetters();

    if (event.getModifierState('CapsLock') && event.code === 'ShiftLeft') downLetters();
    if (event.getModifierState('CapsLock') && event.code === 'ShiftRight') downLetters();
    if (/^Cont/.test(event.code) && event.shiftKey) {
      CHANGE_LAYOUT();
    }
    if (/^Shift/.test(event.code) && event.ctrlKey) {
      CHANGE_LAYOUT();
    }
  });

  window.addEventListener('keyup', (event) => {
    for (let i = 0; i < sum.length; i += 1) {
      if (sum[i].id === event.code) {
        sum[i].classList.remove('active-button');
        sum.splice(i, 1);
      }
      if (event.code === 'CapsLock') downLetters();

      if (event.getModifierState('CapsLock') && event.code === 'ShiftLeft') upLetters();
      if (event.getModifierState('CapsLock') && event.code === 'ShiftRight') upLetters();
    }
  });
};
