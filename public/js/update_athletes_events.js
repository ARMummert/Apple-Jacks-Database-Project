let updateAthletesEventsForm = document.getElementById('update-athletes-events-form')

updateAthletesEventsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputathlete_eventID = document.getElementById('select-athlete-event')
    let inputathleteID = document.getElementById('select-updateathlete');
    let inputeventID = document.getElementById('select-updateevent')

    let athlete_eventIDValue = inputathlete_eventID.value
    let athleteIDValue = inputathleteID.value;
    let eventIDValue = inputeventID.value;

    

    let data = {
        athlete_eventID: athlete_eventIDValue,   
        athleteID: athleteIDValue,
        eventID: eventIDValue
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-athletes-events-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response,athlete_eventIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})

function updateRow(data,athlete_eventID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("athletes-events-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == athlete_eventID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td1 = updateRowIndex.getElementsByTagName("td")[1];

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
            
            td1.innerHTML = parsedData[0].athleteName;
            td2.innerHTML = parsedData[0].eventName;
            td3.innerHTML = parsedData[0].eventlevelName;
            td4.innerHTML = parsedData[0].divisionName;
        }
        
    }
}