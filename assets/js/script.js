// elements
currentDayEl = $("#currentDay");
timeBlocksContainerEl = $(".container");

// current day stuff
var setCurrentDay = function () {
    currentDayEl.text(moment().format("dddd, MMMM Do"));
};

var currentDayTimeout = function () {
    var currentTime = moment();
    // moments are mutable so clone currentTime by wrapping it in moment
    var endOfDay = moment(currentTime).endOf("day");
    // milliseconds until Next Day
    var msUntilNextDay = endOfDay.diff(currentTime) + 1;
    // start timeout
    setTimeout(() => {
        setCurrentDay();
        // set an Interval to update Current Day every 24 hours
        setInterval(() => setCurrentDay(), 24 * 60 * 60 * 1000)
    }, msUntilNextDay);
};

// create elements for timeblocks stuff
var createTimeBlocks = function () {
    for (var i = 9; i < 18; i++) {
        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row");
        timeBlockEl.data("hour", i);

        var timeEl = $("<div>");
        timeEl.addClass("col-1")
        timeEl.text("todo" + i);

        var taskEl = $("<div>");
        taskEl.addClass("col-10")
        taskEl.text("todo" + i);

        var saveEl = $("<div>");
        saveEl.addClass("col-1")
        saveEl.text("todo" + i);

        timeBlockEl.append(timeEl, taskEl, saveEl);
        timeBlocksContainerEl.append(timeBlockEl);
    }
}
// timers for timeblocks stuff
// eventhandlers for timeblock stuff

// save/load tasks in timeblocks

// start
setCurrentDay();
currentDayTimeout();
createTimeBlocks();