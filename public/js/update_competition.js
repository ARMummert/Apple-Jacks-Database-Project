// Get the objects we need to modify
let updateCompetitionForm = document.getElementById('update-competition-form');
// Modify the objects we need
updateCompetitionForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updatecompetitionID = document.getElementById("select-competition");
    let updatecompetitionName = document.getElementById("update-competition-name");
    let updatedate = document.getElementById("update-date");
    let updatestartTime = document.getElementById("update-start-time");
    let updatelocationName = document.getElementById("update-location-name");
    let updatelocationAddress = document.getElementById("update-location-address");
    let updatelocationPhone = document.getElementById("update-location-phone");
    

    // Get the values from the form fields
    let competitionIDValue =  updatecompetitionID.value;
    let competitionNameValue = updatecompetitionName.value;
    let dateValue = updatedate.value;
    let startTimeValue = updatestartTime.value;
    let locationNameValue = updatelocationName.value;
    let locationAddressValue = updatelocationAddress.value;
    let locationPhoneValue = updatelocationPhone.value;
    
    // Must abort if being bassed NULL for competitions
  
    if (locationPhoneValue === ''){
      locationPhoneValue = 'NULL'
    };
    
    // Put our data we want to send in a javascript object
    let data = {
      competitionID: competitionIDValue,
      competitionName: competitionNameValue,
      date: dateValue,
      startTime: startTimeValue,
      locationName: locationNameValue,
      locationAddress: locationAddressValue,
      locationPhone: locationPhoneValue
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
    
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    updateCompetitionForm.reset()
  
    });


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
            td1.innerHTML = parsedData[0].competitionName;
          
             // Get td of date Value
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
          
            // Reassign date to value we updated to
            
            td2.innerText = parsedData[0].date;
            
            // Get td of start time Value
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
          
            // Reassign start time to value we updated to
            td3.innerHTML = parsedData[0].startTime;
         
            // Get td of location Name Value
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
          
            // Reassign location Name to value we updated to
            td4.innerHTML = parsedData[0].locationName;
         
            // Get td of location Address Value
            let td5 = updateRowIndex.getElementsByTagName("td")[5];
          
            // Reassign location Address to value we updated to
            td5.innerHTML = parsedData[0].locationAddress;
            // Get td of location Phone Value
            let td6 = updateRowIndex.getElementsByTagName("td")[6];
          
            // Reassign location Phone to value we updated to
            td6.innerHTML = parsedData[0].locationPhone;
                 
      }
      }

};

