// Get the objects we need to modify
let addTeamsForm = document.getElementById('add-teams-form');

// Modify the objects we need
addTeamsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputteamName = document.getElementById("input-team-name");
    let inputcoachName = document.getElementById("input-coach-name");
    let inputcoachPhone = document.getElementById("input-coach-phone");
    let inputcoachEmail = document.getElementById("input-coach-email");

    // Get the values from the form fields
    let teamNameValue = inputteamName.value;
    let coachNameValue = inputcoachName.value;
    let coachPhoneValue = inputcoachPhone.value;
    let coachEmailValue = inputcoachEmail.value;

    if (teamNameValue, coachNameValue, coachPhoneValue, coachEmailValue === '') {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        teamName: teamNameValue,
        coachName: coachNameValue,
        coachPhone: coachPhoneValue,
        coachEmail: coachEmailValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-teams-ajax", true);
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
    addTeamsForm.reset();
})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("teams-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length-1]
    console.log(newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let teamNameCell = document.createElement("TD");
    let coachNameCell = document.createElement("TD");
    let coachPhoneCell = document.createElement("TD");
    let coachEmailCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.teamID;
    teamNameCell.innerText = newRow.teamName;
    coachNameCell.innerText = newRow.coachName;
    coachPhoneCell.innerText = newRow.coachPhone;
    coachEmailCell.innerText = newRow.coachEmail;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTeams(newRow.teamID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(teamNameCell);
    row.appendChild(coachNameCell);
    row.appendChild(coachPhoneCell);
    row.appendChild(coachEmailCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.teamID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("select-team");
    let option = document.createElement("option");
    option.text = newRow.teamID + ' ' +  newRow.teamName;
    option.value = newRow.teamID;
    selectMenu.add(option);
    window.location.reload();
}