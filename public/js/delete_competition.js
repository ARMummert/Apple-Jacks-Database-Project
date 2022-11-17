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
       if (row.getAttribute("data-value") == competitionID) {
            table.deleteRow(i);
            break;
       }
    }
}


function deleteDropDown(competitionID) {
    let selectCompetition = document.getElementById("select-competition")
    for (let i = 0; i < selectCompetition.length; i++) {
        if(Number(selectCompetition.options[i].value) === Number(competitionID)) {
            selectCompetition[i].remove();
        }
    }
}
