var myTasks = [];


var currentDay = moment().format("dddd" + ", " + "MMMM Do");

$("#currentDay").append(currentDay);

var createRows = function () {
    for(var i = 0; i < 9; i++){
        var row = $("<tr>").addClass("hour-row");
        row.attr('id', i);
        

        if(i+9 > 12){
            var hourHeader = $("<th>").addClass("the-hour").text(9+i-12 + "PM");
            hourHeader.attr("id", i+9);
        } else if(i+9 == 12){
            var hourHeader = $("<th>").addClass("the-hour").text("12PM");
            hourHeader.attr("id", i+9);
        } else {
            var hourHeader = $("<th>").addClass("the-hour").text(9+i + "AM");
            hourHeader.attr("id", i+9);
        }

        var text = $("<td>").addClass("text-area");
        var textArea = $("<textarea>").addClass("form-control");
        textArea.attr("id", "taskText");
        if(myTasks[i] != null){
            textArea.val(myTasks[i].toDoText);
        }

        text.append(textArea);

        var save = $("<td>").addClass("save");
        var saveBtn = $("<button>").addClass("saveBtn saving");
        var saveIcon = $("<i>").addClass("oi oi-lock-locked saving");

        saveBtn.append(saveIcon);
        save.append(saveBtn);

        row.append(hourHeader);
        row.append(text);
        row.append(save);
        
        $(".time-block").append(row);
    }
}

var saveTasks = function (){
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
};

var loadTasks = function() {
    var localTasks = JSON.parse(localStorage.getItem("myTasks"));
    
    if(localTasks != null){
        myTasks = localTasks;
    } else {
        myTasks = new Array(null, Array(9));
    }
  };

var timeColor = function (){
    $("tr.hour-row").each(function(index, td){
        var currentHour = parseInt(moment().format('H'));
        var rowHour = parseInt(td.children[0].getAttribute('id'));

        if(rowHour < currentHour){
            // background grey
            $("#" + index + ".hour-row").css("background-color", "#d3d3d3");
        } else if (rowHour == currentHour){
            // background red
            $("#" + index + ".hour-row").css("background-color", "#ff6961");
        } else if (rowHour > currentHour) {
            // background green
            $("#" + index + ".hour-row").css("background-color", "#77dd77");
        }

    })
}

$(".time-block").click( function() {
    var classClicked = event.target.getAttribute("class");
    if(classClicked.includes("saving")){
        var hourID = event.target.closest("tr").id;
        var taskText = $(".hour-row#" + hourID).children()[1].firstChild.value;
        var newTask = {
            hour: hourID,
            toDoText: taskText
        }
        myTasks[hourID] = newTask;
        saveTasks();
    }
})

loadTasks();

createRows();

timeColor();

