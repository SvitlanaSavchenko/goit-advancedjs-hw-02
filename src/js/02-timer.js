// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Елементи інтерфейсу
const flatpickrElement = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Функція конвертації мілісекунд в об'єкт {days, hours, minutes, seconds}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання ведучого нуля до числа, якщо воно менше 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Опції для бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

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

// Ініціалізація flatpickr
flatpickr(flatpickrElement, options);

// Змінні для інтервалу таймера
let countdownInterval;
let endTime;

// Функція оновлення таймера
function updateTimer() {
  const currentTime = new Date().getTime();
  const difference = endTime - currentTime;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    startButton.disabled = true;
    return;
  }

  const time = convertMs(difference);
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

// Обробник події кліку на кнопці "Start"
startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(
    flatpickrElement.value,
    'Y-m-d H:i:S'
  );
  endTime = selectedDate.getTime();

  countdownInterval = setInterval(() => {
    updateTimer();
  }, 1000);
});
