import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '100px',
  timeout: 5000,
});

const inputDate = document.querySelector('input');
const buttonStart = document.querySelector('button');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let diffDate = 0;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    diffDate = selectedDates[0] - currentDate;
    if (selectedDates[0] > currentDate) {
      buttonStart.disabled = false;
    } else {
      Notiflix.Notify.info('Please choose a date in the future');
      buttonStart.disabled = true;
    }
  },
};

const instance = flatpickr(inputDate, options);

const onClick = evt => {
  evt.preventDefault();
  buttonStart.disabled = true;
  timerId = setInterval(() => {
    const values = convertMs(diffDate);
    daysValue.textContent = values.days;
    hoursValue.textContent = values.hours;
    minutesValue.textContent = values.minutes;
    secondsValue.textContent = values.seconds;
    if (diffDate > 1000) {
      diffDate = diffDate - 1000;
    } else {
      clearTimeout(timerId);
    }
  }, 1000);
};

buttonStart.addEventListener('click', onClick);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
