// Get the objects we need to modify
let addAthletes_EventsForm = document.getElementById('add-athlete-form');

// Modify the objects we need
addAthletes_EventsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputathleteName = document.getElementById("input-athlete-name");
    let inputeventName = document.getElementById("input-event-name");
    let inputeventlevelName = document.getElementById("input-event-level-name");
    let inputdivisionName = document.getElementById("input-division-name");

    // Get the values from the form fields
    let athleteNameValue = inputathleteName.value;
    let eventNameValue = inputeventName.value;
    let eventlevelNameValue = inputeventlevelName.value;
    let divisionNameValue= inputdivisionName.value;
    

    if (athleteNameValue, eventNameValue, eventlevelNameValue, divisionNameValue === '') {
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
      athleteName:athleteNameValue,
      eventID: eventNameValue,
      eventlevelID: eventlevelNameValue,
      divisionID: divisionNameValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-athletes-events-ajax', true);
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
    // Reload the page
    addAthletes_EventsForm.reset();

})


// Creates a single row from an Object representing a single record from 
// Competitions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("athletes-events-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length -1]
    console.log(newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let athleteNameCell = document.createElement("TD");
    let eventNameCell = document.createElement("TD");
    let eventlevelNameCell = document.createElement("TD");
    let divisionNameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.ID;
    athleteNameCell.innerText = newRow.Athlete;
    eventNameCell.innerText = newRow.eventName;
    eventlevelNameCell .innerText = newRow.eventlevelName;
    divisionNameCell.innerText = newRow.divisionName;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteAthletesEvents(newRow.athlete_eventID);
    }
  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(athleteNameCell);
    row.appendChild(eventNameCell);
    row.appendChild(eventlevelNameCell);
    row.appendChild(divisionNameCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.athlete_eventID);
  
    // Add the row to the table
    currentTable.appendChild(row);

  

    let selectMenu = document.getElementById("select-athletes-events");
    let option = document.createElement("option");
    option.text = newRow.athlete_eventID + ' ' +  newRow.athleteName + '' + newRow.eventName + '' + newRow.eventlevelName + '' + newRow.divisionName;
    option.value = newRow.athlete_eventID;
    selectMenu.add(option);
}   
 