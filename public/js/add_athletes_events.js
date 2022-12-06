// Get the objects we need to modify
let addAthletes_EventsForm = document.getElementById('add-athletes-events-form');

// Modify the objects we need
addAthletes_EventsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputathleteID = document.getElementById("input-athlete-name")
    let inputeventID = document.getElementById("input-event-name")
    

    // Get the values from the form fields
    let athleteIDValue = inputathleteID.value;
    let eventIDValue = inputeventID.value;
    
    
    // Put our data we want to send in a javascript object
    let data = {
      athleteID:athleteIDValue,
      eventID: eventIDValue,
      
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
    

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let athleteNameCell = document.createElement("TD");
    let eventNameCell = document.createElement("TD");
    let eventlevelNameCell = document.createElement("TD");
    let divisionNameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD")

    // Fill the cells with correct data
    idCell.innerText = newRow.ID;
    athleteNameCell.innerText = newRow.Athlete;
    eventNameCell.innerText = newRow.Event;
    eventlevelNameCell .innerText = newRow.EventLevel;
    divisionNameCell.innerText = newRow.Division;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.className = "button-62"
    deleteCell.onclick = function(){
        deleteAthletes_Events(newRow.ID);
    };
  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(athleteNameCell);
    row.appendChild(eventNameCell);
    row.appendChild(eventlevelNameCell);
    row.appendChild(divisionNameCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.ID);
  
    // Add the row to the table
    currentTable.appendChild(row);

  

    let selectMenu = document.getElementById("select-athlete-event");
    let option = document.createElement("option");
    option.text = newRow.ID + ' ' +  newRow.Athlete + '' + newRow.Event + '' + newRow.EventLevel + '' + newRow.Division;
    option.value = newRow.ID;
    console.log(option)
    selectMenu.add(option);

}   
 