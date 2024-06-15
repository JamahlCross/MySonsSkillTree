const lengthText = document.getElementById("consecutiveTime");
const totalTimeText = document.getElementById("totalAmountTime");
const startTimeText = document.getElementById("startingTime");
const endTimeText = document.getElementById("endingTime");

let timeLength = 30;
let totalTime = 30;
let startTime = "6:00";
let endTime = "19:00";

// Variables to track daily clear active skill time
let dailyClearTimeLength = 0;
let dailyClearTotalTime = 0;

function addTimeLength(a, button, skillType) {
    timeLength += a;
    if (skillType === 'daily') {
        dailyClearTimeLength += a; // Track daily clear active skill time
    }
    lengthText.textContent = `連続時間: ${timeLength}min`;
    button.disabled = true;
}

function addTotalTime(a, button, skillType) {
    totalTime += a;
    if (skillType === 'daily') {
        dailyClearTotalTime += a; // Track daily clear active skill time
    }
    totalTimeText.textContent = `合計時間: ${totalTime}min`;
    button.disabled = true;
}

function adjustTime(type, minutes, button) {
    let time;
    if (type === 'start') {
        time = startTime;
    } else {
        time = endTime;
    }
    
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
    
    if (hours < 0) {
        hours += 24;
    } else if (hours >= 24) {
        hours -= 24;
    }
    
    let newTime = `${hours}:${mins.toString().padStart(2, '0')}`;
    
    if (type === 'start') {
        startTime = newTime;
        startTimeText.textContent = `開始時間: ${newTime}`;
    } else {
        endTime = newTime;
        endTimeText.textContent = `終了時間: ${newTime}`;
    }

    button.disabled = true;
}

function dailyReset() {
    // Reset only the time added by daily clear active skills
    timeLength -= dailyClearTimeLength;
    totalTime -= dailyClearTotalTime;
    lengthText.textContent = `連続時間: ${timeLength}min`;
    totalTimeText.textContent = `合計時間: ${totalTime}min`;

    // Reset daily clear active skill time trackers
    dailyClearTimeLength = 0;
    dailyClearTotalTime = 0;

    // Enable buttons only within the "デイリークリア" section
    const dailyClearButtons = document.querySelectorAll('#daily-clear button');
    dailyClearButtons.forEach(button => {
        button.disabled = false;
    });
}

function allReset() {
    // Reset to base time
    timeLength = 30;
    totalTime = 30;

    // Update the displayed time
    lengthText.textContent = `連続時間: ${timeLength}min`;
    totalTimeText.textContent = `合計時間: ${totalTime}min`;

    // Reset start and end times
    startTime = "6:00";
    endTime = "19:00";
    startTimeText.textContent = `開始時間: ${startTime}`;
    endTimeText.textContent = `終了時間: ${endTime}`;

    // Re-enable all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });

    // Reset daily clear active skill time trackers
    dailyClearTimeLength = 0;
    dailyClearTotalTime = 0;
}
