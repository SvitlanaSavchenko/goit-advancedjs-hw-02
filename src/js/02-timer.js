// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримання необхідних елементів DOM
const flatpickrElement = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

// Опис обраних параметрів для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      // Повідомлення про некоректну дату
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      instance.clear(); // Очищаємо вибрану дату
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      instance.close(); // Автоматичне закриття календаря
    }
  },
};

// Ініціалізація календаря flatpickr
const calendar = flatpickr(flatpickrElement, options);

// Функція для підрахунку часу
function updateTimer(endTime) {
  const currentTime = new Date().getTime();
  const timeLeft = endTime - currentTime;

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
    flatpickrElement.disabled = false; // Відключення блокування поля вводу
    return;
  }

  const time = convertMs(timeLeft);
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

// Обробник для кнопки "Start"
startButton.addEventListener('click', () => {
  const selectedDate = calendar.parseDate(
    flatpickrElement.value,
    'Y-m-d H:i:S'
  );
  const endTime = selectedDate.getTime();

  countdownInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);

  // Відключення можливості зміни дати під час відліку
  flatpickrElement.disabled = true;
});

// Функція конвертації мілісекунд в об'єкт з розрахованим часом
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

// Додавання ведучого нуля, якщо число менше двох символів
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
