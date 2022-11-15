// code for deleteCompetition using regular javascript/xhttp
// function deleteCompetition(competitionID) {
// Put our data we want to send in a javascript object
//  let data = {
//     id: CompetitionID
//  };
    
// Setup our AJAX request
//    var xhttp = new XMLHttpRequest();
//    xhttp.open("DELETE", "/delete-competition-ajax", true);
//    xhttp.setRequestHeader("Content-type", "application/json");

// Tell our AJAX request how to resolve
//    xhttp.onreadystatechange = () => {
//        if (xhttp.readyState == 4 && xhttp.status == 204) {

// Add the new data to the table
//    deleteRow(personID);
//    }
//    else if (xhttp.readyState == 4 && xhttp.status != 204) {
//        console.log("There was an error with the input.")
//    }
//    }
// Send the request and wait for the response
//   xhttp.send(JSON.stringify(data));
//}

function deleteCompetition(competitionID) {
    let link = '/delete-competition/'
    let data = {
        id: competitionID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(competitionID);
        }
    });
}

function deleteRow(competitionID){

    let table = document.getElementById("competitions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.row[i].getAttribute("data-value") == competitionID) {
            table.deleteRow(i);
            deleteDropDown(competitionID);
            break;
       }
    }
}

function deleteDropDown(competitionID) {
    let selectMenu = document.getElementById("mySelect")
    for (let i = 0; i < selectMenu.length; i++) {
        if(Number(selectMenu.options[i].value) === Number(competitionID)) {
            selectMenu>[i].remove();
            break;
        }
    }
}