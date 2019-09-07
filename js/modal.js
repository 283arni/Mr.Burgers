(function () {
  // modal window

  const modal = document.querySelector('#modal-popup').innerHTML;
  const btnRead = document.querySelectorAll('.btn_black');
  const comment = document.querySelector('.comments__story');

  for (i = 0; i < btnRead.length; i++) {
    btnRead[i].addEventListener('click', (e) => {
      e.preventDefault();
      const block = createBlock(comment.innerHTML);
      document.body.appendChild(block);
    });
  }

  function createBlock(text) {
    const div = document.createElement('div');
    div.classList.add('popup');
    div.innerHTML = modal;

    let popMess = div.querySelector('.popup__message');
    popMess.innerHTML = text;

    const btnClose = div.querySelector('.close__popup .close__link');
    btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.removeChild(div);
    });

    div.addEventListener('click', (e) => {
      if (e.target === div) {
        btnClose.click();
      }
    });

    return div;
  }

  // validate form

  const validTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\-]?)?[\d\- ]{7,10}$/;
  const validName = /^[а-яА-Я]{2,30}|[a-zA-Z]{2,30}$/;
  const validComment = /^[А-Яа-я0-9\ \.,!\?\-@]+$/;
  const isForm = document.querySelector('#form');
  const sendBtn = document.querySelector('#sendBtn');
  var valid = true;

  function createError(neighbor, message) {
    neighbor.nextElementSibling.style.display = 'block';
    neighbor.nextElementSibling.textContent = message;
  }

  function removeError(neighbor) {
    neighbor.nextElementSibling.style.display = 'none';
  }

  function validateForm(valid) {
    
    if (!validName.test(isForm.name.value)) {
      const erroreName = "Введите адекватное имя. Пример: Степан, Billy, Иоган.";
      createError(isForm.name, erroreName);
      valid = false;
    } else {
      removeError(isForm.name);
    }

    if (!validTel.test(isForm.phone.value)) {
      const errorePhone = "Введите верный номер телефона. Пример: +7 123 456 78 90, 1234567890.";
      createError(isForm.phone, errorePhone);
      valid = false;
    } else {
      removeError(isForm.phone);
    }

    if (!validComment.test(isForm.comment.value)) {
      const errorePhone = "Введите комментарий. Не больше 150 символов. Разрешено только кириллица, символы ! , . ? - @.";
      createError(isForm.comment, errorePhone);
      valid = false;
    } else {
      removeError(isForm.comment);
    }
    return valid;
  }

  isForm.addEventListener('keydown', () => {validateForm(valid);});

  isForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm(valid);

    if (validateForm(valid)) {
      const form = new FormData(isForm);

      form.append('to', 'mail@mail.com');
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.send(form);
      xhr.addEventListener('load', () => {
        const block = createModal(JSON.parse(xhr.responseText).message);
        if (xhr.status >= 400) {
          document.body.appendChild('Что-то сломалось...');
        } else {
          document.body.appendChild(block);
          deleteModul(block);
        }
      });
    }
    sendBtn.disabled = true;

    setTimeout( () => {
      sendBtn.disabled = false;
    }, 3000);
  });

  //create modal for form

  function createModal(text) {
    const divForm = document.createElement('div');
    const input = document.createElement('input');

    divForm.classList.add('popup');
    divForm.innerHTML = modal;

    let popMess = divForm.querySelector('.popup__message');

    popMess.innerHTML = text;
    divForm.firstElementChild.firstElementChild.remove();
    input.classList.add('btn', 'btn_modal');
    input.type = 'submit';
    input.value = "Закрыть";
    divForm.firstElementChild.appendChild(input);
    return divForm;
  }

  //remove modul

  function deleteModul(elem) {
    const closeBtnModal = document.querySelector('.btn_modal');

    closeBtnModal.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.removeChild(elem);
    });
  }
})();