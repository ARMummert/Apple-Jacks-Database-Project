// Get all objects we need to modify
let updateEventForm = document.getElementById('update-event-form')

// Modify the objects we need
updateEventForm.addEventListener("submit", function(e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputeventID = document.getElementById("mySelect");
    let inputeventName = document.getElementById("update-event-name")
    let inputcompetitionID = document.getElementById("update-competition-ID");
    let inputdivisionID = document.getElementById("update-division-ID")
    let inputeventlevelID = document.getElementById("update-event-level-ID");
    
    // Get the values from the form fields
    let eventIDValue = inputeventID.value;
    let eventNameValue = inputeventName.value;
    let competitionIDValue = inputcompetitionID.value;
    let divisionIDValue = inputdivisionID.value;
    let eventlevelIDValue = inputeventlevelID.value;
     
    // Put our data we want to send in a javascript object
     let data = {
        eventID:eventIDValue,
        eventName:eventNameValue,
        competitionID:competitionIDValue,
        divisionID:divisionIDValue,
        eventlevelID:eventlevelIDValue   
     };
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/put-event-ajax", true);
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
     updateEventForm.reset();
   
     })
 
 
 function updateRow(data, eventID){
     let parsedData = JSON.parse(data);
     
     let table = document.getElementById("events-table");
 
     for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == eventID) {
 
             // Get the location of the row where we found the matching event ID
             let updateRowIndex = table.getElementsByTagName("tr")[i];
 
             // Get td of event Name Value
             let td1 = updateRowIndex.getElementsByTagName("td")[1];
           
             // Reassign event Name to value we updated to
             td1.innerHTML = parasedData[1]
           
              // Get td of compeition ID Value
             let td2 = updateRowIndex.getElementsByTagName("td")[2];
           
             // Reassign competition ID to value we updated to
             td2.innerHTML = parasedData[2]
             
             // Get td of division ID Value
             let td3 = updateRowIndex.getElementsByTagName("td")[3];
           
             // Reassign division ID to value we updated to
             td3.innerHTML = parasedData[3]
          
             // Get td of eventlevel ID Value
             let td4 = updateRowIndex.getElementsByTagName("td")[4];
           
             // Reassign eventlevel ID to value we updated to
             td4.innerHTML = parasedData[4]
                   
        }
     }
    let selectMenu = document.getElementById("mySelectupdate");
    let option = document.createElement("option");
    option.text = newRow.eventID + ' ' +  newRow.eventName + '' + newRow.competitionID + '' + newRow.divisionID + '' + newRow.eventlevelID;
    option.value = newRow.id;
    selectMenu.update(option);
 } 

    

