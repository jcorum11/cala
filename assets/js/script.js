var currentDay = moment().format("LL LT");
var currentTime = moment();
var beginningOfDay = moment("8:00", "h:ss");
var events = []
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
//save funct
//load funct
//past str
//present str
//future str
//state handler
// - put current day in header
// - check event time against current time
// - keep track of event states
// - ensure states are updated
//input handler
// - change html
//event handler
// - save events
// - load events
// - ensure persistency

$(".row > div:nth-child(2)").click(function() {
    var text = $(this).text().trim();
    var eventInput = $("<textarea>").addClass("col-sm-12").val(text);
    $(this).replaceWith(eventInput);
    eventInput.trigger("focus");
});

$(".row").on("blur", "textarea", function() {
    var text = $(this).text().trim();
    var eventDiv = $("<div>").addClass("col-sm-12").val(text);
    $(this).replaceWith(eventDiv);
})

//event handlers
var loadEvent = function() {
    var events = JSON.parse(localStorage.getItem("events"));
    if (events) {
        events.forEach(e => {
            var hourBlock = $("body").find(`.container:nth-child(${timeIndex.indexOf[e.time] + 1}) > div:nth-child(2) > p`);
            console.log(hourBlock);
        });
    }
}
loadEvent()

//save button
$(".saveBtn").click(function (e) { 
    e.preventDefault();
    var eventText = $(this).closest("div").text();
    var eventTime = $(this).closest(".hour").text();
    events.push({
        text: eventText, 
        time: eventTime
    });
    localStorage.setItem("events", JSON.stringify(events));
});

// set date in header
var setDate = function() {
    $("#currentDay").text(currentDay);
}

// put time in time blocks beginning at 9:00am and ending at 5:00pm
var setTimeBlocks = function() {
    // set beginning to 8:00 am so we can add 1 and start at 9:00am
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

// check if blocks are in the past
var setHourColor = function() {
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

var createEvent = function() {
    var eventP = $("<p>").addClass("description");
}



// put icon in button class
var setButtonIcon = function() {
    $(".container").find("button").each(function() {
        var spanEl = $("<span>")
            .addClass("fas fa-save")
        $(this).append(spanEl);
    })
}

$(".saveBtn").click(function (e) { 
    e.preventDefault();
    
});

setDate();
setTimeBlocks();
setHourColor();
setButtonIcon()