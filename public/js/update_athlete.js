// Get the objects we need to modify
let updateAthleteForm = document.getElementById('update-athlete-form');
// Modify the objects we need
updateAthleteForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let selectathleteID = document.getElementById("select-athlete");
    let selectteamID = document.getElementById("update-team-name");
    let selectdivisionID = document.getElementById("update-division-name");
    let updateathleteName = document.getElementById("update-athlete-name");
    let updateathletePhone = document.getElementById("update-athlete-phone");
    let updateathleteEmail = document.getElementById("update-athlete-email");
    let updateathleteAddress = document.getElementById("update-athlete-address");
    let updateathleteDOB = document.getElementById("update-athlete-DOB");
    let updateathleteAge = document.getElementById("update-athlete-age");

    // Get the values from the form fields
    let athleteIDValue =  selectathleteID.value;
    let teamIDValue = selectteamID.value;
    let divisionIDValue = selectdivisionID.value;
    let athleteNameValue = updateathleteName.value;
    let athletePhoneValue = updateathletePhone.value;
    let athleteEmailValue = updateathleteEmail.value;
    let athleteAddressValue = updateathleteAddress.value;
    let athleteDOBValue = updateathleteDOB.value;
    let athleteAgeValue = updateathleteAge.value;
    // Must abort if being bassed NULL for competitions
  
   
    
    // Put our data we want to send in a javascript object
    let data = {
      athleteID: athleteIDValue,
      teamID: teamIDValue,
      divisionID: divisionIDValue,
      athleteName: athleteNameValue,
      athletePhone: athletePhoneValue,
      athleteEmail: athleteEmailValue,
      athleteAddress: athleteAddressValue,
      athleteDOB: athleteDOBValue,
      athleteAge : athleteAgeValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-athlete-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, athleteIDValue); 

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
      }
    
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    // reset the form 
    updateAthleteForm.reset();
  
    });


function updateRow(data, athleteID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("athletes-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == athleteID) {

            // Get the location of the row where we found the matching competition ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of athlete Name Value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
          
            // Reassign athlete Name to value we updated to
            td1.innerHTML = parsedData[0].athleteName;
          
             // Get td of team Value
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
          
            // Reassign Team to value we updated to
            td2.innerHTML = parsedData[0].teamName;
            
            // Get td of Division Value
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
          
            // Reassign Division Name to value we updated to
            td3.innerHTML = parsedData[0].divisionName;
         
            // Get td of Athlete-Phone Value
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
          
            // Reassign Athlete-Phone to value we updated to
            td4.innerHTML = parsedData[0].athletePhone;
         
            // Get td of Athlete-Email Value
            let td5 = updateRowIndex.getElementsByTagName("td")[5];
          
            // Reassign Athlete-Email to value we updated to
            td5.innerHTML = parsedData[0].athleteEmail;

            // Get td of Athlete=Address Value
            let td6 = updateRowIndex.getElementsByTagName("td")[6];
          
            // Reassign Athlete-Address to value we updated to
            td6.innerHTML = parsedData[0].athleteAddress;
            
            // Get td of DOB Value
            let td7 = updateRowIndex.getElementsByTagName("td")[7];
          
            // Reassign DOB to value we updated to
            td7.innerText = parsedData[0].athleteDOB;

            // Get td of Athlete=Address Value
            let td8 = updateRowIndex.getElementsByTagName("td")[8];
          
            // Reassign Athlete-Address to value we updated to
            td8.innerHTML = parsedData[0].athleteAge;
      }
      }

};

