// Get the objects we need to modify
let addEventForm = document.getElementById('add-event-form');

// Modify the objects we need
addEventForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputeventName = document.getElementById("input-event-name");
    let inputcompetitionName = document.getElementById("input-competition-name");
    let inputdivisionName = document.getElementById("input-division-name");
    let inputeventlevelName = document.getElementById("input-event-level-name");


    // Get the values from the form fields
    let eventNameValue = inputeventName.value;
    let competitionNameValue = inputcompetitionName.value;
    let divisionNameValue = inputdivisionName.value;
    let eventlevelNameValue = inputeventlevelName.value;

    if (eventNameValue, competitionNameValue, divisionNameValue, eventlevelNameValue  === '') {
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
        eventName: eventNameValue,
        competitionName: competitionNameValue,
        divisionName: divisionNameValue,
        eventlevelName: eventlevelNameValue
    }
    console.log(data)
  //Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    //
    addEventForm.reset();
})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("events-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    console.log(newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let competitionNameCell = document.createElement("TD");
    let divisionNameCell = document.createElement("TD");
    let eventlevelNameCell = document.createElement("TD");
    let eventNameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    
    // Fill the cells with correct data
    idCell.innerText = newRow.ID;
    competitionNameCell.innerText = newRow.Competition
    divisionNameCell.innerText = newRow.Division;
    eventlevelNameCell.innerText = newRow.EventLevel;
    eventNameCell.innerText = newRow.Event;

    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEvent(newRow.ID);
    };



    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(eventNameCell);
    row.appendChild(competitionNameCell);
    row.appendChild(divisionNameCell);
    row.appendChild(eventlevelNameCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.ID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("select-event");
    let option = document.createElement("option");
    option.text = newRow.eventID + ' ' +  newRow.eventName + '' + newRow.competitionName + '' + newRow.divisionName + '' + newRow.eventlevelName;
    option.value = newRow.eventID;
    selectMenu.add(option);
    window.location.reload();
   
}