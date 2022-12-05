// Get the objects we need to modify
let addEventLevelForm = document.getElementById('add-event-level-form');

// Modify the objects we need
addEventLevelForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputeventlevelName = document.getElementById("input-event-level-name");
    

    // Get the values from the form fields
    let eventlevelNameValue = inputeventlevelName.value;
    

    if (eventlevelNameValue === '') {
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
      eventlevelName: eventlevelNameValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-event-level-ajax', true);
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
    addEventLevelForm.reset();

})


// Creates a single row from an Object representing a single record from 
// Competitions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("event-level-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    console.log("newRow" + newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let eventlevelNameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.eventlevelID;
    eventlevelNameCell.innerText = newRow.eventlevelName;
    

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEventLevel(newRow.eventlevelID);
    }
  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(eventlevelNameCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.eventlevelID);
  
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("select-event-level");
    let option = document.createElement("option");
    option.text = newRow.eventlevelID + ' ' +  newRow.eventlevelName;
    option.value = newRow.eventlevelID;
    selectMenu.add(option);
    
}   