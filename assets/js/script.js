// globals
var schedulerData = {
    tasks: [],
    startHour: 9,
    endHour: 17,
    // return the task that corresponds to the hour
    setTaskAtHour: function (hour, text) {
        this.tasks[hour - this.startHour] = text;
    }
};


// elements
var currentDayEl = $("#currentDay");
var timeBlocksContainerEl = $(".container");


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
    for (var i = schedulerData.startHour; i <= schedulerData.endHour; i++) {
        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row time-block");
        timeBlockEl.data("hour", i);

        var timeEl = $("<div>");
        timeEl.addClass("col-1 hour text-right pt-3")
        // fun with logical operators
        var timeMod12 = i % 12;
        timeEl.text((timeMod12 > 0 && timeMod12 || i) + (i - 12 >= 0 && "PM" || "AM"));

        var taskEl = $("<div>");
        taskEl.addClass(createTaskClassList(i));
        taskEl.text(schedulerData.tasks[i - schedulerData.startHour] || "");

        var saveEl = $("<div>");
        saveEl.addClass("col-1 saveBtn d-flex align-items-center justify-content-center");
        saveEl.html("<i class='fas fa-save my-a'></i>");

        timeBlockEl.append(timeEl, taskEl, saveEl);
        timeBlocksContainerEl.append(timeBlockEl);
    }
};

var getTaskState = function (hour) {
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

// returns the class list for a task
var createTaskClassList = function (hour) {
    return "col-10 task text-left p-3 " + getTaskState(hour);
};

//  update all tasks state classes as the day progresses
var setTaskStates = function () {
    currentHour = moment().hour();
    $(".task").each(function () {
        var hour = $(this).parent().data("hour");
        var classes = createTaskClassList(hour);
        $(this)
            .removeClass()
            .addClass(classes);
    })
};

// timers for timeblocks stuff
var timeBlockTimeout = function () {
    createTimeOutInterval("hour", setTaskStates, 60 * 60 * 1000);
};

// eventhandlers for timeblock stuff


// loadsave/clear tasks
var loadTasks = function () {
    schedulerData.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
};
var saveTask = function (hour, text) {
    // update tasks array
    schedulerData.setTaskAtHour(hour, text);
    // save it to local storage
    localStorage.setItem("tasks", JSON.stringify(schedulerData.tasks));
};
var clearTasks = function () {
    // wipe tasks out
    schedulerData.tasks = [];
    localStorage.setItem("tasks", JSON.stringify(schedulerData.tasks));
    // reload to force loading empty saved state instead of updating in place
    location.reload();
};

// start
setCurrentDay();
currentDayTimeout();
createTimeBlocks();
timeBlockTimeout();