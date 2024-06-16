const lengthText = document.getElementById("consecutiveTime");
const totalTimeText = document.getElementById("totalAmountTime");
const startTimeText = document.getElementById("startingTime");
const endTimeText = document.getElementById("endingTime");

let timeLength = 30;
let totalTime = 30;
let startTime = "6:00";
let endTime = "19:00";

let dailyClearTimeLength = 0;
let dailyClearTotalTime = 0;

function updateDisplay() {
    lengthText.textContent = `連続時間: ${timeLength}min`;
    totalTimeText.textContent = `合計時間: ${totalTime}min`;
    startTimeText.textContent = `開始時間: ${startTime}`;
    endTimeText.textContent = `終了時間: ${endTime}`;
}

function addTimeLength(a, button, skillType) {
    timeLength += a;
    if (skillType === 'daily') {
        dailyClearTimeLength += a;
    }
    updateDisplay();
    button.disabled = true;
}

function addTotalTime(a, button, skillType) {
    totalTime += a;
    if (skillType === 'daily') {
        dailyClearTotalTime += a;
    }
    updateDisplay();
    button.disabled = true;
}

function adjustTime(type, minutes, button) {
    let time = (type === 'start') ? startTime : endTime;
    let [hours, mins] = time.split(':').map(Number);
    mins += minutes;
    
    while (mins < 0) {
        mins += 60;
        hours -= 1;
    }
    
    while (mins >= 60) {
        mins -= 60;
        hours += 1;
    }
    
    hours = (hours + 24) % 24;
    
    let newTime = `${hours}:${mins.toString().padStart(2, '0')}`;
    
    if (type === 'start') {
        startTime = newTime;
    } else {
        endTime = newTime;
    }
    updateDisplay();
    button.disabled = true;
}

function dailyReset() {
    timeLength -= dailyClearTimeLength;
    totalTime -= dailyClearTotalTime;

    dailyClearTimeLength = 0;
    dailyClearTotalTime = 0;

    updateDisplay();

    document.querySelectorAll('#daily-clear button').forEach(button => {
        button.disabled = false;
    });
}

function allReset() {
    timeLength = 30;
    totalTime = 30;
    startTime = "6:00";
    endTime = "19:00";

    dailyClearTimeLength = 0;
    dailyClearTotalTime = 0;

    updateDisplay();

    document.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
}
