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
    updateCompetitionForm.reset();
  
    });


function updateRow(data, competitionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("competitions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == competitionID) {

            
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
          
            
            td1.innerHTML = parsedData[0].competitionName;
          
             
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
          
            
            td2.innerHTML = parsedData[0].date
            
            
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
          
            
            td3.innerHTML = parsedData[0].startTime
         
           
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
          
           
            td4.innerHTML = parsedData[0].locationName
         
            
            let td5 = updateRowIndex.getElementsByTagName("td")[5];
          
            
            td5.innerHTML = parsedData[0].locationAddress
            
            let td6 = updateRowIndex.getElementsByTagName("td")[6];
          
            // Reassign location Phone to value we updated to
            td6.innerHTML = parsedData[0].locationPhone
                 
      }
      
      }

};

