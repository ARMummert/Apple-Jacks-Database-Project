// Get the objects we need to modify
let addDivisionForm = document.getElementById('add-division-form');

// Modify the objects we need
addDivisionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputdivisionName = document.getElementById("input-division-name");
    
    // Get the values from the form fields
    let divisionNameValue = inputdivisionName.value;

    if (divisionNameValue === '') {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        divisionName: divisionNameValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-division-ajax", true);
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
    addDivisionForm.reset();
})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("divisions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length-1]
    console.log("newRow" + newRow)

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let divisionNameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.divisionID;
    divisionNameCell.innerText = newRow.divisionName;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.className = "button-62"
    deleteCell.onclick = function(){
        deleteDivision(newRow.divisionID);
    };
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(divisionNameCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.divisionID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("select-division");
    let option = document.createElement("option");
    option.text = newRow.divisionID + ' ' +  newRow.divisionName;
    option.value = newRow.divisionID;
    selectMenu.add(option);
    
   
}