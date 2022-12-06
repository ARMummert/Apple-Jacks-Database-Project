function deleteAthletes_Events(athlete_eventID) {
    let link = '/delete-athletes-events/'
    let data = {
        id: athlete_eventID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(athlete_eventID);
            deleteDropDown(athlete_eventID);
        }
    });
}

function deleteRow(athlete_eventID){

    let table = document.getElementById("athletes-events-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (row.getAttribute("data-value") == athlete_eventID) {
            table.deleteRow(i);        
            break;
       }
    }
}


function deleteDropDown(athlete_eventID) {
    let selectAthletes_Events = document.getElementById("select-athlete-event")
    for (let i = 0; i < selectAthletes_Events.length; i++) {
        if(Number(selectAthletes_Events.options[i].value) === Number(athlete_eventID)) {
            selectAthletes_Events[i].remove();
            table.deleteDropDown(i);
        }
    }
}
