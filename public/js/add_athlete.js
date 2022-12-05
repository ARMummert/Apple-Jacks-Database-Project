// Get the objects we need to modify
let addAthleteForm = document.getElementById('add-athlete-form');

// Modify the objects we need
addAthleteForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputathleteName = document.getElementById("input-athlete-name");
    let inputteamName = document.getElementById("input-team-name");
    let inputdivisionName = document.getElementById("input-division-name");
    let inputathletePhone = document.getElementById("input-athlete-phone");
    let inputathleteEmail = document.getElementById("input-athlete-email");
    let inputlathleteAddress = document.getElementById("input-athlete-address");
    let inputlathleteDOB = document.getElementById("input-athlete-DOB");
    let inputlathleteAge = document.getElementById("input-athlete-age");

    // Get the values from the form fields
    let athleteNameValue = inputathleteName.value;
    let teamValue = inputteamName.value;
    let divisionValue= inputdivisionName.value;
    let athletephoneValue = inputathletePhone.value;
    let athleteemailValue = inputathleteEmail.value;
    let athleteaddressValue = inputlathleteAddress.value;
    let athleteDOBValue = inputlathleteDOB.value;
    let athleteageValue = inputlathleteAge.value;

    if (athleteNameValue, teamValue, divisionValue, athletephoneValue, athleteemailValue, athleteaddressValue, athleteDOBValue,athleteageValue === '') {
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
      athleteName:athleteNameValue,
      teamID: teamValue,
      divisionID: divisionValue,
      athletePhone:athletephoneValue,
      athleteEmail:athleteemailValue,
      athleteAddress:athleteaddressValue,
      athleteDOB:athleteDOBValue,
      athleteAge: athleteageValue
      

 
   
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-athlete-ajax', true);
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
    addAthleteForm.reset();

})


// Creates a single row from an Object representing a single record from 
// Competitions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("athletes-table");

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
    let athleteDivisionCell = document.createElement("TD");
    let athleteTeamCell = document.createElement("TD");
    let athletePhoneCell = document.createElement("TD");
    let athleteEmailCell = document.createElement("TD");
    let athleteAddressCell = document.createElement("TD");
    let athleteDOBCell = document.createElement("TD");
    let athleteAgeCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.ID;
    athleteNameCell.innerText = newRow.Athlete;
    athleteTeamCell.innerText = newRow.Team;
    athleteDivisionCell.innerText = newRow.Division;
    athletePhoneCell.innerText = newRow.AthletePhone;
    athleteEmailCell.innerText = newRow.AthleteEmail;
    athleteAddressCell.innerText = newRow.AthleteAddress;
    athleteDOBCell.innerText = newRow.DOB;
    athleteAgeCell.innerText = newRow.Age;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.className = "button-62"
    deleteCell.onclick = function(){

    deleteAthlete(newRow.ID);
    }

  
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(athleteNameCell);
    row.appendChild(athleteTeamCell);
    row.appendChild(athleteDivisionCell);
    row.appendChild(athletePhoneCell);
    row.appendChild(athleteEmailCell);
    row.appendChild(athleteAddressCell);
    row.appendChild(athleteDOBCell);
    row.appendChild(athleteAgeCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.athleteID);
  
    // Add the row to the table
    currentTable.appendChild(row);

  

    let selectMenu = document.getElementById("select-athlete");
    let option = document.createElement("option");
    option.text = newRow.athleteID + ' ' +  newRow.athleteName;
    option.value = newRow.athleteID;
    selectMenu.add(option);
}   
 