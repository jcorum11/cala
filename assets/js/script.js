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
var addClassTense = function(tense) {
    $(".container").find(".row > div:nth-child(2)").each(function() {
        $(this).addClass(tense);
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
var timeList = $(".container").find(".hour").each(function() {
    console.log($(this).text() );
})