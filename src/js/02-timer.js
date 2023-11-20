// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримання посилань на елементи DOM
const flatpickrElement = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Змінна для зберігання інтервалу
let countdownInterval;

// Налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    // Перевірка, чи обрана користувачем дата в майбутньому
    if (selectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Встановлення кнопки startButton неактивною при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  startButton.disabled = true; // Встановлюємо кнопку в стан "disable"
});

// Ініціалізація календаря flatpickr
const calendar = flatpickr(flatpickrElement, options);

// Обробник події при кліку на поле вибору дати
flatpickrElement.addEventListener('click', () => {
  // Перевірка, чи запущений таймер
  if (countdownInterval) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please reload the page to change the timer.',
    });
  }
});

// Функція для оновлення таймера
function updateTimer(endTime) {
  const currentTime = new Date().getTime();
  const timeLeft = endTime - currentTime;

  // Перевірка, чи вже минув термін таймера
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    iziToast.success({
      title: 'Countdown Finished',
      message: 'The countdown has ended!',
    });
    flatpickrElement.disabled = false;
    return;
  }

  // Обчислення часу
  const time = convertMs(timeLeft);
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

// Обробник події при кліку на кнопку Start
startButton.addEventListener('click', () => {
  // Перевірка, чи таймер вже запущений
  if (countdownInterval) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please reload the page to change the timer.',
    });
    return;
  }

  const selectedDate = calendar.parseDate(
    flatpickrElement.value,
    'Y-m-d H:i:S'
  );
  const endTime = selectedDate.getTime();

  // Запуск таймера
  countdownInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);

  flatpickrElement.disabled = true;
  startButton.disabled = true;
});

// Функція для конвертації мілісекунд у дні, години, хвилини і секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання ведучого нуля
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Перевіряємо обрану користувачем дату під час завантаження сторінки
flatpickrElement.addEventListener('change', () => {
  const selectedDate = calendar.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    startButton.disabled = true; // Встановлюємо кнопку в стан "disable"
  } else {
    startButton.disabled = false; // Встановлюємо кнопку в стан "enable"
  }
});
