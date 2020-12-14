const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ targetDate, updateTime }) {
    this.updateTime = updateTime;
    this.targetDate = targetDate;
  }

  prestartAction() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    const time = this.getTime(deltaTime);
    this.updateTime(time);
  }

  start() {
    this.prestartAction();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTime(deltaTime);
      this.updateTime(time);
    }, 1000);
  }

  getTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  targetDate: new Date('Dec 25, 2020'),
  updateTime: updateTime,
});

function updateTime({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

timer.start();
