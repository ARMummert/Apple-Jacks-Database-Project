let deleteCompetitionForm = document.getElementById("deleteCompetitionForm")

deleteCompetitionForm.addEventListener("submit", function(e) {

    e.preventDefault();

})
let data = {
    competitionID: inputCompetitionID
};
function deleteCompetition(competitionID) {
    // Put our data we want to send in a javascript object
 

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-competition-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(inputCompetitionID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(competitionID){

    let table = document.getElementById("competitions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.row[i].getAttribute("data-value") == competitionID) {
            table.deleteRow(i);
            break;
       }
    }
}
