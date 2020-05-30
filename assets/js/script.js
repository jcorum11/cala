// set date in header
var setDate = function() {
    var currentDay = moment().format("LL LT");
    $("#currentDay").text(currentDay);
}

// put time in time blocks
var setTimeBlocks = function() {
    var beginningOfDay = moment("8:00", "h:ss");
    $(".container").find(".time-block").each(function() {
        beginningOfDay.add(1, "hour");
        $(this).text(beginningOfDay.format("LT"));
    })
}

setDate();
setTimeBlocks();