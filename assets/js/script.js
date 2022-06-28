// elements
currentDayEl = $("#currentDay");
timeBlocksContainerEl = $(".container");

// specify an `end` period that when reached will call `fn` 
// then call `fn` every `delay`
var createTimeOutInterval = function (end, fn, delay) {
    var currentTime = moment();
    // moments are mutable so clone currentTime by wrapping it in moment
    var endTime = moment(currentTime).endOf(end);
    // milliseconds until Next Day
    var msDelay = endTime.diff(currentTime) + 1;
    // start timeout
    setTimeout(() => {
        fn();
        // set an Interval to update Current Day every 24 hours
        setInterval(() => fn(), delay);
    }, msDelay);
};

// current day stuff
var setCurrentDay = function () {
    currentDayEl.text(moment().format("dddd, MMMM Do"));
};

var currentDayTimeout = function () {
    createTimeOutInterval("day", setCurrentDay, 24 * 60 * 60 * 1000);
};

// create elements for timeblocks stuff
var createTimeBlocks = function () {
    for (var i = 9; i < 18; i++) {
        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row time-block");
        timeBlockEl.data("hour", i);

        var timeEl = $("<div>");
        timeEl.addClass("col-1 hour text-right pt-3")
        // fun with logical operators
        var timeMod12 = i % 12;
        timeEl.text((timeMod12 > 0 && timeMod12 || i) + (i - 12 >= 0 && "PM" || "AM"));

        var taskEl = $("<div>");
        taskEl.addClass("col-10 text-left p-3 " + getTaskState(i));
        taskEl.text(getSavedtask(i));

        var saveEl = $("<div>");
        saveEl.addClass("col-1 saveBtn d-flex align-items-center justify-content-center");
        saveEl.html("<i class='fas fa-save my-a'></i>");

        timeBlockEl.append(timeEl, taskEl, saveEl);
        timeBlocksContainerEl.append(timeBlockEl);
    }
};

var getTaskState = function(hour) {
    currentHour = moment().hour();
    if (hour > currentHour) {
        return "future"
    }
    else if (hour < currentHour) {
        return "past"
    }
    else {
        return "present"
    }
};

// timers for timeblocks stuff
// eventhandlers for timeblock stuff

// save/load tasks in timeblocks
var getSavedtask = function(time) {
    return "todo";
};

// start
setCurrentDay();
currentDayTimeout();
createTimeBlocks();