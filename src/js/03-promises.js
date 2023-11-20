// Описаний в документації
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримання форми
const form = document.querySelector('.form');

// Функція для створення промісу з вказаною затримкою
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Імітація випадкового результату для промісу
    const shouldResolve = Math.random() > 0.3;

    // Встановлення затримки для промісу
    setTimeout(() => {
      // Виклик resolve або reject в залежності від умови
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Додавання обробника події для сабміту форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Отримання значень з полів форми
  const delay = parseInt(form.elements['delay'].value);
  const step = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  // Зберігання початкової затримки для подальшого збільшення
  let currentDelay = delay;

  // Цикл для створення промісів
  for (let i = 1; i <= amount; i++) {
    // Виконання промісу
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        // Вивід повідомлення успішного промісу з iziToast
        iziToast.success({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        // Вивід повідомлення відхиленого промісу з iziToast
        iziToast.error({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });

    // Збільшення затримки для наступного промісу
    currentDelay += step;
  }

  // Скидання форми
  form.reset();
});
