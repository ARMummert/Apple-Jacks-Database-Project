// Get the objects we need to modify
let updateCompetitionForm = document.getElementById('update-competition-form');

// Modify the objects we need
updateCompetitionForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCompetitionID = document.getElementbyId("mySelect");
    let inputCompetitionName = document.getElementById("update-competition-name");
    let inputCompetitionDate = document.getElementById("input-competition-date");
    let inputCompetitonStartTime = document.getElementById("input-competition-start-time");
    let inputCompetitionLocationName = document.getElementById("input-competition-location-name");
    let inputCompetitionAddress = document.getElementById("input-competition-location-address");
    let inputCompetitionPhone = document.getlElementbyID("input-competition-phone");
    

    // Get the values from the form fields
    let competitionIDValue =  inputCompetitionID.value
    let nameValue = inputCompetitionName.value;
    let dateValue = inputCompetitionDate.value;
    let startTimeValue = inputCompetitonStartTime.value;
    let locationNameValue = inputCompetitionLocationName.value;
    let competitionAddressValue = inputCompetitionAddress.value;
    let competitionPhoneValue = inputCompetitionPhone.value;
    
    // currently the database table for competitions does not allow  updating some values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(nameValue) || isNan(locationNameValue) || isNan(competitionAddressValue)) 
    {
        return;
    }
    

    // Put our data we want to send in a javascript object
    let data = {
      competitionID:competitionIDValue,
      competitionName:nameValue,
      date:dateValue,
      startTime:startTimeValue,
      locationName:locationNameValue,
      locationAddress:competitionAddressValue,
      LocationPhone:competitionPhoneValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-competitions-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, competitionIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, competitionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("competitions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == competitionID) {

            // Get the location of the row where we found the matching competition ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of competition Name Value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
          
            // Reassign competition Name to value we updated to
            td1.innerHTML = parasedData[1]
          
             // Get td of competition Name Value
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
          
            // Reassign competition Name to value we updated to
            td2.innerHTML = parasedData[2]
            
            // Get td of competition Name Value
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
          
            // Reassign competition Name to value we updated to
            td3.innerHTML = parasedData[3]
         
            // Get td of competition Name Value
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
          
            // Reassign competition Name to value we updated to
            td4.innerHTML = parasedData[4]
         
            // Get td of competition Name Value
            let td5 = updateRowIndex.getElementsByTagName("td")[5];
          
            // Reassign competition Name to value we updated to
            td5.innerHTML = parasedData[5]
            // Get td of competition Name Value
            let td6 = updateRowIndex.getElementsByTagName("td")[6];
          
            // Reassign competition Name to value we updated to
            td6.innerHTML = parasedData[6]
                  
       }
    }
} 
    
