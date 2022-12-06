// Get the objects we need to modify
let addCompetitionForm = document.getElementById('add-competition-form');

// Modify the objects we need
addCompetitionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputcompetitionName = document.getElementById("input-competition-name");
    let inputdate = document.getElementById("input-date");
    let inputstartTime = document.getElementById("input-start-time");
    let inputlocationName = document.getElementById("input-location-name");
    let inputlocationAddress = document.getElementById("input-location-address");
    let inputlocationPhone = document.getElementById("input-location-phone");
    

    // Get the values from the form fields
    let competitionNameValue = inputcompetitionName.value;
    let dateValue = inputdate.value;
    let startTimeValue= inputstartTime.value;
    let locationNameValue = inputlocationName.value;
    let locationAddressValue = inputlocationAddress.value;
    let locationPhoneValue = inputlocationPhone.value;
    console.log(locationPhoneValue);
    
    console.log(locationPhoneValue);
    // Put our data we want to send in a javascript object
    let data = {
      competitionName:competitionNameValue,
      date:dateValue,
      startTime:startTimeValue,
      locationName:locationNameValue,
      locationAddress:locationAddressValue,
      locationPhone:locationPhoneValue 
      
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-competition-ajax', true);
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
    addCompetitionForm.reset();

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
    let newRow = parsedData[parsedData.length -1]
    console.log(newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let competitionNameCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let startTimeCell = document.createElement("TD");
    let locationNameCell = document.createElement("TD");
    let locationAddressCell = document.createElement("TD");
    let locationPhoneCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.competitionID;
    competitionNameCell.innerText = newRow.competitionName;
    datestring = newRow.date.toString('MM-DD-YYYY')
    dateCell.innerText = datestring;
    startTimeCell.innerText = newRow.startTime;
    locationNameCell.innerText = newRow.locationName;
    locationAddressCell.innerText = newRow.locationAddress;
    locationPhoneCell.innerText = newRow.locationPhone;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.className = "button-62"
    deleteCell.onclick = function(){
        deleteCompetition(newRow.competitionID); 
    };
  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(competitionNameCell);
    row.appendChild(dateCell);
    row.appendChild(startTimeCell);
    row.appendChild(locationNameCell);
    row.appendChild(locationAddressCell);
    row.appendChild(locationPhoneCell);
    row.appendChild(deleteCell);
    row.setAttribute('data-value', newRow.competitionID);
  
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("select-competition");
    let option = document.createElement("option");
    option.text = newRow.competitionName;
    option.value = newRow.competitionID;
    selectMenu.add(option);


}   