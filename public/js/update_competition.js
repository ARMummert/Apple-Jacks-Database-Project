// Get the objects we need to modify
let updateCompetitionForm = document.getElementById('update-competition-form');

// Modify the objects we need
updateCompetitionForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputcompetitionID = document.getElementbyId("mySelect");
    let inputcompetitionName = document.getElementById("update-competition-name");
    let inputdate = document.getElementById("update-date");
    let inputstartTime = document.getElementById("update-start-time");
    let inputlocationName = document.getElementById("update-location-name");
    let inputlocationAddress = document.getElementById("update-location-address");
    let inputlocationPhone = document.getlElementbyID("update-competition-phone");
    

    // Get the values from the form fields
    let competitionIDValue =  inputcompetitionID.value
    let competitionNameValue = inputcompetitionName.value;
    let dateValue = inputdate.value;
    let startTimeValue = inputstartTime.value;
    let locationNameValue = inputlocationName.value;
    let locationAddressValue = inputlocationAddress.value;
    let locationPhoneValue = inputlocationPhone.value;
    
    // currently the database table for competitions does not allow  updating some values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(competitionNameValue) || isNan(locationNameValue) || isNan(locationAddressValue)) 
    {
        return;
    }
    

    // Put our data we want to send in a javascript object
    let data = {
      competitionID:competitionIDValue,
      competitionName:competitionNameValue,
      date:dateValue,
      startTime:startTimeValue,
      locationName:locationNameValue,
      locationAddress:locationAddressValue,
      LocationPhone:locationPhoneValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-competition-ajax", true);
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
    //xhttp.onload = function () { // added this
    //    location.reload()
    //};
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    updateCompetitionForm.reset();
  
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