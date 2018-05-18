const percent = 1 + (0.06 / 12);
let start = 3000;
let sum = start;
let step = 1;
let incomeMonth = step;
let ticks = 0;
const startTime = Date.now();

while (sum < 1000000 * 62) {
    sum = start;
    incomeMonth += step;

    for (let i = 0; i < 12 * 20; i++) {
        ticks++;
        sum = (sum * percent) + incomeMonth;
    }
}

const finishTime = Date.now();
const time = finishTime - startTime;

console.log({ sum, percent, step, incomeMonth, time, ticks, start });
