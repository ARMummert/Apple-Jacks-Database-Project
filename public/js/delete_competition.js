function deleteCompetition(competitionID) {
    
    let data = {
        id: competitionID
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-competition-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(data);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    }
    
}

function deleteRow(competitionID){

    let table = document.getElementById("competitions-data");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.row[i].getAttribute("data-value") == competitionID) {
            table.deleteRow(i);
            deleteDropDown(competitionID);
            break;
       }
    }
}

function deleteDropDown(competitionID) {
    let selectCompetition = document.getElementById("select-competition")
    for (let i = 0; i < selectCompetition.length; i++) {
        if(Number(selectCompetition.options[i].value) === Number(competitionID)) {
            selectCompetition[i].remove();
        }
    }
}