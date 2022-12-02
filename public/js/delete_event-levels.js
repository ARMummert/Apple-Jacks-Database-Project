function deleteEventLevel(eventlevelID) {
    let link = '/delete-event-level/'
    let data = {
        id: eventlevelID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(eventlevelID);
            
        }
    });
}

function deleteRow(eventlevelID){

    let table = document.getElementById("event-level-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (row.getAttribute("data-value") == eventlevelID) {
            table.deleteRow(i);
            break;
       }
    }
}

