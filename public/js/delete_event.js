function deleteEvent(eventID) {
    let link = '/delete-event/'
    let data = {
        id: eventID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(eventID);
            
        }
    });
}

function deleteRow(eventID){

    let table = document.getElementById("events-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (row.getAttribute("data-value") == eventID) {
            table.deleteRow(i);
            break;
       }
    }
}


function deleteDropDown(eventID) {
    let selectEvent = document.getElementById("select-event")
    for (let i = 0; i < selectEvent.length; i++) {
        if(Number(selectEvent.options[i].value) === Number(eventID)) {
            selectEvent[i].remove();
            table.deleteDropDown(i);
        }
    }
}
