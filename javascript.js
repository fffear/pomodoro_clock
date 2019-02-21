const mainBody = document.getElementById("main");

let sessionValue = 25;
const displaySessionMinute = document.getElementById("session-minute");
displaySessionMinute.textContent = sessionValue;
const IncreaseSessionBtn = document.getElementById("increase-session");
const DecreaseSessionBtn = document.getElementById("decrease-session");

let breakValue = 5;
const displayBreakMinute = document.getElementById("break-minute");
displayBreakMinute.textContent = breakValue;
const IncreaseBreakBtn = document.getElementById("increase-break");
const DecreaseBreakBtn = document.getElementById("decrease-break");

let timeValue = "25:00";
const displayTime = document.getElementById("time");
displayTime.textContent = timeValue;


const hoverColor = (e) => e.target.classList.contains("button") ? e.target.style.color = "yellow": false;
const removeHoverColor = (e) => e.target.classList.contains("button") ? e.target.style.color = "white": false;

function changeSessionTime(e) {
    if (sessionValue == 0 && e.target.id == "increase-session") {
        sessionValue += 1;
        displaySessionMinute.textContent = sessionValue;
    } else if (sessionValue == 0 && e.target.id == "decrease-session") {
        return;
    } else if (e.target.id == "increase-session") {
        sessionValue += 1;
        displaySessionMinute.textContent = sessionValue;
    } else if (e.target.id == "decrease-session") {
        sessionValue -= 1;
        displaySessionMinute.textContent = sessionValue;
    }
    changeTimeValue(e);
}

function changeBreakTime(e) {
    if (breakValue == 0 && e.target.id == "increase-break") {
        breakValue += 1;
        displayBreakMinute.textContent = breakValue;
    } else if (breakValue == 0 && e.target.id == "decrease-break") {
        return;
    } else if (e.target.id == "increase-break") {
        breakValue += 1;
        displayBreakMinute.textContent = breakValue;
    } else if (e.target.id == "decrease-break") {
        breakValue -= 1;
        displayBreakMinute.textContent = breakValue;
    }
}

function addZeroPadding(num) {
    return "0" + num;
}

function changeTimeValue(e) {
    let timeArray = timeValue.split(":");
    let hour = Math.floor(sessionValue / 60);
    if (sessionValue >= 60) {
        if (timeArray.length < 3) {
            timeArray.unshift(addZeroPadding(hour));
            timeArray[1] = "00";
        } else if (timeArray.length == 3 && sessionValue % 60 == 0) {
            if (hour >= 1 && hour <= 9) {
                timeArray[0] = addZeroPadding(hour);
            }
            timeArray[1] = "00";
        } else if (timeArray.length == 3 && (sessionValue % 60 >= 1 && sessionValue % 60 <= 9)) {
            timeArray[0] = addZeroPadding(hour);
            timeArray[1] = addZeroPadding(sessionValue % 60);
        } else if (timeArray.length == 3 && (sessionValue % 60 >= 10 && sessionValue % 60 <= 59)) {
            if (sessionValue / 60 >= 10) {
                timeArray[0] = hour;
            } else if (sessionValue / 60 < 10) {
                timeArray[0] = addZeroPadding(hour);
            }
            timeArray[1] = sessionValue % 60;
        }
    } else if (sessionValue >=0 && sessionValue <= 9) {
        timeArray[0] = addZeroPadding(sessionValue);
    } else if (sessionValue >= 10 && sessionValue <= 59) {
        if (timeArray.length == 3) {
            timeArray.shift();
        }
        timeArray[0] = sessionValue;
    }    
    timeValue = timeArray.join(":");
    displayTime.textContent = timeValue;
}

mainBody.addEventListener("mouseover", hoverColor);
mainBody.addEventListener("mouseout", removeHoverColor);
mainBody.addEventListener("click", changeSessionTime);
mainBody.addEventListener("click", changeBreakTime);