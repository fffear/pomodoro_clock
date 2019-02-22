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
const addZeroPadding = (num) => "0" + num;

function changeSessionTime(e) {
    if (sessionValue == 1 && e.target.id == "increase-session") {
        sessionValue += 1;
        displaySessionMinute.textContent = sessionValue;
    } else if (sessionValue == 1 && e.target.id == "decrease-session") {
        return;
    } else if (e.target.id == "increase-session") {
        sessionValue += 1;
        displaySessionMinute.textContent = sessionValue;
    } else if (e.target.id == "decrease-session") {
        sessionValue -= 1;
        displaySessionMinute.textContent = sessionValue;
    } else {
        return;
    }
    updateTimeDisplay();
}

function changeBreakTime(e) {
    if (breakValue == 1 && e.target.id == "increase-break") {
        breakValue += 1;
        displayBreakMinute.textContent = breakValue;
    } else if (breakValue == 1 && e.target.id == "decrease-break") {
        return;
    } else if (e.target.id == "increase-break") {
        breakValue += 1;
        displayBreakMinute.textContent = breakValue;
    } else if (e.target.id == "decrease-break") {
        breakValue -= 1;
        displayBreakMinute.textContent = breakValue;
    } else {
        return;
    }
}

function updateTimeDisplay() {
    let timeArray = timeValue.split(":");
    let hour = Math.floor(sessionValue / 60);

    if (sessionValue >= 1 && sessionValue <= 9) {
        timeValue = addZeroPadding(sessionValue) + ":00";
    } else if (sessionValue >= 10 && sessionValue <= 59) {
        timeValue = sessionValue + ":00";
    } else if (sessionValue >= 60) {
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
        timeValue = timeArray.join(":");
    }
    displayTime.textContent = timeValue;
}

/*function changeTimeValue(e) {
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
}*/

function startTimer(e) {
    if (e.target.id === "start") {
        intervalID = setInterval(updateTime, 1000);

        mainBody.removeEventListener("click", changeSessionTime);
        mainBody.removeEventListener("click", changeBreakTime);
        mainBody.removeEventListener("click", startTimer);
    }
}

function pauseTimer(e) {
    if (e.target.id === "pause") {
        clearInterval(intervalID, 1000);
        mainBody.addEventListener("click", startTimer);
    } 
}

function stopTimer(e) {
    if (e.target.id === "stop") {
        clearInterval(intervalID);
        updateTimeDisplay();
        displayTime.textContent = timeValue;

        mainBody.addEventListener("click", changeSessionTime);
        mainBody.addEventListener("click", changeBreakTime);
        mainBody.addEventListener("click", startTimer);
    }
}

function updateTime() {
    timeArray = timeValue.split(":");
    hour = Math.floor(sessionValue / 60);

    const seconds = timeArray[timeArray.length - 1];
    const minutes = timeArray[timeArray.length - 2];
    const hours = timeArray[timeArray.length - 3];

        if (seconds == "00" && minutes == "00" && hours == "01") {
            timeArray.shift();
            timeArray[timeArray.length - 2] = "59";
            timeArray[timeArray.length - 1] = "59";
        } else if (seconds == "00" && minutes == "00" && hours >= "02" && hours <= "09") {
            timeArray[timeArray.length -3] = addZeroPadding(hours - 1);
            timeArray[timeArray.length - 2] = "59";
            timeArray[timeArray.length - 1] = "59";
        } else if (seconds == "00" && minutes >= "11") {
            timeArray[timeArray.length - 1] = "59";
            timeArray[timeArray.length - 2] -= 1;
        } else if (seconds == "00" && minutes < 11) {
            timeArray[timeArray.length - 1] = "59";
            timeArray[timeArray.length - 2] = addZeroPadding(minutes - 1);
        } else if (seconds >= "11" && seconds <= "59") {
            timeArray[timeArray.length - 1] -= 1;
        } else if (seconds <= "10") {
            timeArray[timeArray.length - 1] = addZeroPadding(seconds - 1);
        }
    timeValue = timeArray.join(":");
    displayTime.textContent = timeValue;
    console.log(timeValue);

    if (timeValue == "00:00") {
        clearInterval(intervalID); 
        timeValue = covertBreakValueToTimer();
        displayTime.textContent = timeValue;
        console.log(timeValue);
    }
}

function resetToDefaultSettings(e) {
    if (e.target.id === "reset") {
        sessionValue = 25;
        displaySessionMinute.textContent = sessionValue;
        breakValue = 5;
        displayBreakMinute.textContent = breakValue;
        clearInterval(intervalID);
        updateTimeDisplay();
        displayTime.textContent = timeValue;

        mainBody.addEventListener("click", changeSessionTime);
        mainBody.addEventListener("click", changeBreakTime);
        mainBody.addEventListener("click", startTimer);
    }
}

mainBody.addEventListener("mouseover", hoverColor);
mainBody.addEventListener("mouseout", removeHoverColor);
mainBody.addEventListener("click", changeSessionTime);
mainBody.addEventListener("click", changeBreakTime);
mainBody.addEventListener("click", startTimer);
mainBody.addEventListener("click", pauseTimer);
mainBody.addEventListener("click", stopTimer);
mainBody.addEventListener("click", resetToDefaultSettings);

function covertBreakValueToTimer() {
    let breakHour = Math.floor(breakValue / 60);
    let breakMinute = breakValue % 60;
    let breakArray = [];
    let breakTime;
    
    if (breakValue >= 1 && breakValue <= 9) {
        breakTime = addZeroPadding(breakValue) + ":00";
        breakArray = breakTime.split(":");
    } else if (breakValue >= 10 && breakValue <= 59) {
        breakTime = breakValue + ":00";
        breakArray = breakTime.split(":");
    } else if (breakValue >= 60) {
        if (breakMinute >= 0 && breakMinute <= 9 && breakHour >= 1 && breakHour <= 9) {
            breakArray[0] = addZeroPadding(breakHour);
            breakArray[1] = addZeroPadding(breakMinute);
            breakArray[2] = "00";
        } else if (breakMinute >= 10 && breakMinute <= 59 && breakHour >= 1 && breakHour <= 9) {
            breakArray[0] = addZeroPadding(breakHour);
            breakArray[1] = breakMinute;
            breakArray[2] = "00";
        } else if (breakHour >= 10) {
            if (breakMinute >= 0 && breakMinute <= 9) {
                breakArray[0] = breakHour;
                breakArray[1] = addZeroPadding(breakMinute);
                breakArray[2] = "00";
            } else if (breakMinute >= 10 && breakMinute <= 59) {
                breakArray[0] = breakHour;
                breakArray[1] = breakMinute;
                breakArray[2] = "00";
            }
        }
    }
    breakTime = breakArray.join(":");
    return breakTime;
}

function startBreakTimer() {
    breakArray = breakValue.split(":");
    hour = Math.floor(sessionValue / 60);

    const seconds = breakArray[breakArray.length - 1];
    const minutes = breakArray[breakArray.length - 2];
    const hours = breakArray[breakArray.length - 3];

    if (seconds == "00" && minutes == "00" && hours == "01") {
        breakArray.shift();
        breakArray[breakArray.length - 2] = "59";
        breakArray[breakArray.length - 1] = "59";
    } else if (seconds == "00" && minutes == "00" && hours >= "02" && hours <= "09") {
        breakArray[breakArray.length -3] = addZeroPadding(hours - 1);
        breakArray[breakArray.length - 2] = "59";
        breakArray[breakArray.length - 1] = "59";
    } else if (seconds == "00" && minutes >= "11") {
        breakArray[breakArray.length - 1] = "59";
        breakArray[breakArray.length - 2] -= 1;
    } else if (seconds == "00" && minutes < 11) {
        breakArray[breakArray.length - 1] = "59";
        breakArray[breakArray.length - 2] = addZeroPadding(minutes - 1);
    } else if (seconds >= "11" && seconds <= "59") {
        breakArray[breakArray.length - 1] -= 1;
    } else if (seconds <= "10") {
        breakArray[breakArray.length - 1] = addZeroPadding(seconds - 1);
    }
    breakValue = breakArray.join(":");
    displayTime.textContent = breakValue;
    console.log(breakValue);

    if (breakValue == "00:00") clearInterval(intervalID); 
}