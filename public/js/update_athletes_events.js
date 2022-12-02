let updateAthletes_EventsForm = document.getElementById('update-athletes-events-form')

updateAthletes_EventsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputathleteName = document.getElementById('update-athlete-name');
    let inputeventName = document.getElementById('update-event-name')

    let athleteNameValue = inputathleteName.value;
    let eventNameValue = inputeventName.value;

    console.log(athleteNameValue);
    console.log(eventNameValue);

    if (isNaN(eventNameValue)) {
        return;
    }
    let data = {
        athleteName: athleteNameValue,
        eventName: eventNameValue
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-athletes-events-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, athleteNameValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, athleteID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("athletes-events-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == athleteID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td1 = updateRowIndex.getElementsByTagName("td")[2];

            let td2 = updateRowIndex.getElementsByTagName("td")[3];

            td1.innerHTML = parsedData[0].name;
            td2.innerHTML = parsedData[0].name;
        }
        window.location.reload();
    }
}