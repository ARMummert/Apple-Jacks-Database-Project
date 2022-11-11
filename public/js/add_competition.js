// Get the objects we need to modify
let addCompetitonForm = document.getElementById('add-competition-form');

// Modify the objects we need
addCompetitionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCompetitionName = document.getElementById("input-competition-name");
    let inputCompetitionDate = document.getElementById("input-competition-date");
    let inputCompetitonStartTime = document.getElementById("input-competition-start-time");
    let inputCompetitionLocationName = document.getElementById("input-competition-location-name");
    let inputCompetitionAddress = document.getElementById("input-competition-location-address");
    let inputCompetitionPhone = document.getlElementbyID("input-competition-phone");
    

    // Get the values from the form fields
    let nameValue = inputCompetitionName.value;
    let dateValue = inputCompetitionDate.value;
    let startTimeValue = inputCompetitonStartTime.value;
    let locationNameValue = inputCompetitionLocationName.value;
    let competitionAddressValue = inputCompetitionAddress.value;
    let competitionPhone = inputCompetitionPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
      competitionName:nameValue,
      date:dateValue,
      startTime:startTimeValue,
      locationName:locationNameValue,
      locationAddress:competitionAddressValue,
      LocationPhone:competitionPhone  
      
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'add-competition-form', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            competitionName:nameValue = '';
            date:dateValue ='';
            startTime:startTimeValue = '';
            locationName:locationNameValue ='';
            locationAddress:competitionAddressValue = '';
            LocationPhone:competitionPhone = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Competitions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("competitions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let competitionNameCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let startTimeCell = document.createElement("TD");
    let locationNameCell = document.createElement("TD");
    let locationAddressCell = document.createElement("TD");
    let locationPhoneCell = document.createElement("TD");
    
    // Fill the cells with correct data
    idCell.innerText = newRow.competitionID;
    competitionNameCell.innerText = newRow.competitionName;
    dateCell.innerText = newRow.date;
    startTimeCell.innerText = newRow.startTime;
    locationNameCell.innerText = newRow.locationName;
    locationAddressCell.innerText = newRow.locationAddress;
    locationPhoneCell.innnerText =newRow.locationPhone;
  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(competitionNameCell);
    row.appendChild(dateCell);
    row.appendChild(startTimeCell);
    row.appendChild(locationNameCell);
    row.appendChild(locationAddressCell);
    row.appendChild(locationPhoneCell);
  
    // Add the row to the table
    currentTable.appendChild(row);
}
