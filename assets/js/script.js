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
// timers for timeblocks stuff
// eventhandlers for timeblock stuff

// save/load tasks in timeblocks

// start
setCurrentDay();
currentDayTimeout();