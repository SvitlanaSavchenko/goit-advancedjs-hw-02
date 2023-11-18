// Описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримання посилання на форму
const form = document.querySelector('.form');

// Функція для створення промісу з вказаною затримкою
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Імітація випадкового результату для промісу
    const shouldResolve = Math.random() > 0.3;

    // Встановлення затримки для промісу
    setTimeout(() => {
      // Виклик resolve або reject залежно від умови
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Обробник події сабміту форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Отримання значень з полів форми
  const delay = parseInt(form.elements['delay'].value);
  const step = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  // Створення вказаної кількості промісів
  for (let i = 1; i <= amount; i++) {
    // Виклик функції createPromise з відповідними параметрами
    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success',
          message: `Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise ${position} in ${delay}ms`,
        });
      });

    // Збільшення затримки для наступних промісів
    delay += step;
  }
});
