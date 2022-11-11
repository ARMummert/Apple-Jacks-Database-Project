// Get the objects we need to modify
let addCompetitonForm = document.getElementById('add-competition-form');

// Modify the objects we need
addCompetitionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCompetitionName = document.getElementById("inputCompetitionName");
    let inputCompetitionDate = document.getElementById("inputDate");
    let inputCompetitonStartTime = document.getElementById("inputStartTime");
    let inputCompetitionLocationName = document.getElementById("inputLocationName");
    let inputCompetitionAddress = document.getElementById("inputAddress");
    let inputCompetitionPhone = document.getlElementbyID("inputPhone");
    

    // Get the values from the form fields
    let competitionNameValue = inputCompetitionName.value;
    let competitionDateValue = inputCompetitionDate.value;
    let competitionStartTimeValue= inputCompetitonStartTime.value;
    let competitionLocatioNameValue = inputCompetitionLocationName.value;
    let competitionAddressValue = inputCompetitionAddress.value;
    let competitionPhoneValue = inputCompetitionPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
      competitionName:competitionNameValue,
      competitionDate:competitionDateValue,
      competitionStartTime:competitionStartTimeValue,
      competitionLocatioName:competitionLocatioNameValue,
      competitionAddress:competitionAddressValue,
      competitionPhone:competitionPhoneValue 
      
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
            //competitionName:nameValue = '';
            //date:dateValue ='';
            //startTime:startTimeValue = '';
            //locationName:locationNameValue ='';
            //locationAddress:competitionAddressValue = '';
            //LocationPhone:competitionPhone = '';
            
            inputCompetitionName.value = '';
            inputDate.value = '';
            inputCompetitonStartTime.value = '';
            inputCompetitionLocationName.value = '';
            inputCompetitionAddress.value = '';
            inputCompetitionPhone.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    // Reload the page
    location.reload();

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
    console.log("newRow" + newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let competitionNameCell = document.createElement("TD");
    let competitionDateCell = document.createElement("TD");
    let competitionStartTimeCell = document.createElement("TD");
    let competitionLocationNameCell = document.createElement("TD");
    let competitionAddressCell = document.createElement("TD");
    let competitionPhoneCell = document.createElement("TD");
    
    // Fill the cells with correct data
    idCell.innerText = newRow.competitionID;
    competitionNameCell.innerText = newRow.competitionName;
    competitionDateCell.innerText = newRow.competitionDate;
    competitionStartTimeCell.innerText = newRow.competitionStartTime;
    competitionLocationNameCell.innerText = newRow.locationName;
    competitionAddressCell.innerText = newRow.competitionAddress;
    competitionPhoneCell.innnerText =newRow.competitionPhone;
  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(competitionNameCell);
    row.appendChild(competitionDateCell);
    row.appendChild(competitionStartTimeCell);
    row.appendChild(competitionLocationNameCell);
    row.appendChild(competitionAddressCell);
    row.appendChild(competitionPhoneCell);
  
    // Add the row to the table
    currentTable.appendChild(row);
}
