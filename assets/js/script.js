// var tasks = new Array(9);
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
        
        //<input type="text" id="lname" name="lname">

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
    // if nothing in localStorage, create a new object to track all task status arrays
    
    if(localTasks != null){
        myTasks = localTasks;
        console.log("LOADING");
    } else {
        myTasks = new Array(null, Array(9));
    }
  
    // loop over object properties
    // $.each(tasks, function(arr) {
    //     console.log(arr.toDoText);
    // });
  };

var timeColor = function (){
    $("tr.hour-row").each(function(index, td){
        var currentHour = parseInt(moment().format('H'));
        var rowHour = parseInt(td.children[0].getAttribute('id'));

        console.log(index + " : " + rowHour + " : " + currentHour);
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
        // var taskText = event.target.closest("tr");
        var hourID = event.target.closest("tr").id;
        var taskText = $(".hour-row#" + hourID).children()[1].firstChild.value;
        console.log(hourID);
        console.log(taskText);
        var newTask = {
            hour: hourID,
            toDoText: taskText
        }
        myTasks[hourID] = newTask;
        // for(var i = 0; i < 9; i++){
        //     if(tasks[i] != null){
        //         console.log(i + ":- " + tasks[i].toDoText);
        //     }
        // }
        saveTasks();
    }
})

loadTasks();

createRows();

timeColor();

