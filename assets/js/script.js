// set date in header
var setDate = function() {
    var currentDay = moment().format("LL LT");
    $("#currentDay").text(currentDay);
}

// put time in time blocks beginning at 9:00am and ending at 5:00pm
var setTimeBlocks = function() {
    // set beginning to 8:00 am so we can add 1 and start at 9:00am
    var beginningOfDay = moment("8:00", "h:ss");
    $(".container").find(".hour").each(function() {
        beginningOfDay.add(1, "hour");
        // add time to DOM .time-blocks
        $(this).text(beginningOfDay.format("LT"));
    })
}

// add class tense
var addClassState = function(state, iteration) {
    $(".container").find(`.row:nth-child(${iteration}) > div:nth-child(2)`).each(function() {
        $(this).addClass(state);
    })
}




// if blocks are in the past then 
// make them grey
// if the current time is in a block then
// make that block red
// if blocks are in the future then 
// make that block green

setDate();
setTimeBlocks();

// check if blocks are in the past
var hourColorHandler = function() {
    var i = 1
    $(".container").find(".hour").each(function() {
        var time = moment($(this).text(), "LT");
        var timeBlockState = time.diff(moment(), "hours")
        if ( timeBlockState < 0) {
            addClassState("past", i);
        }
        else if (timeBlockState === 0) {
            addClassState("present", i)
        }
        else if (timeBlockState > 0) {
            addClassState("future", i)
        }
        i++
    })
}

hourColorHandler();

