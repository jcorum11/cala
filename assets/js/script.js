var currentDay = moment().format("LL LT");
var currentTime = moment();
var beginningOfDay = moment("8:00", "h:ss");
var events = JSON.parse(localStorage.getItem("events"));
var timeIndex = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 pM",
    "1:00 pM",
    "2:00 pM",
    "3:00 pM",
    "4:00 pM",
    "5:00 pM"
]

// INPUT HANDLERS
// hour block event listener to change div to textarea when clicked
$(".text").click(function() {
    var text = $(this).text().trim();
    var eventInput = $("<textarea>").addClass("text col-sm-10").val(text);
    $(this).replaceWith(eventInput);
    eventInput.trigger("focus");
    setHourColor();
});

// textarea event listener to change textarea to div when it loses focus
$(".text").on("blur", function() {
    var text = $(this).text().trim();
    var eventDiv = $("<div>").addClass("text col-sm-10").val(text);
    $(this).replaceWith(eventDiv);
    setHourColor();
})

// STATE HANDLERS
// checks hour block time against current time and changes color accordingly
var setHourColor = function() {
    $(".container").find(".hour").each(function() {
        var time = moment($(this).text(), "LT");
        var timeBlockState = Math.ceil(time.diff(moment(), "hours", true));
        console.log(timeBlockState);
        var textEl = $(this).next();
        if (timeBlockState < 0) {
            textEl.addClass("past")
        }
        else if (timeBlockState === 0) {
            textEl.addClass("present")
        }
        else if (timeBlockState > 0) {
            textEl.addClass("future")
        }
    })
}

// puts time in time blocks beginning at 9:00am and ending at 5:00pm
var setTimeBlocks = function() {
    // set beginning to 8:00 am so we can add 1 and start at 9:00am
    $(".container").find(".hour").each(function() {
        beginningOfDay.add(1, "hour");
        // add time to DOM .time-blocks
        $(this).text(beginningOfDay.format("LT"));
    })
}

// put icon in button class
var setButtonIcon = function() {
    $(".container").find("button").each(function() {
        var iEl = $("<i>")
            .addClass("fas fa-save")
        $(this).append(iEl);
    })
}

// set current day in header
var setDate = function() {
    $("#currentDay").text(currentDay);
}

// EVENT HANDLERS
// load events into hour blocks
var loadEvents = function() {
    if (events) {
        events.forEach(evnt => {
            console.log();
            var hour = $(`.hour:contains(${evnt.time.trim()})`);
            hour.siblings(".text").text(evnt.text);
        });
    }
}


// event listener to save when save buttons clicked 
$(".saveBtn").click(function (e) { 
    e.preventDefault();
    var eventText = $(this).siblings(".text").val();
    var eventTime = $(this).siblings(".hour").text();
    if (!events) {
        events = [];
    }
    events.push({
        text: eventText, 
        time: eventTime
    });
    localStorage.setItem("events", JSON.stringify(events));
});

setDate();
setTimeBlocks();
setHourColor();
setButtonIcon();
loadEvents()