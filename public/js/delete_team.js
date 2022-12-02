function deleteTeams(teamID) {
    let link = '/delete-teams/'
    let data = {
        id: teamID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(teamID);
            
        }
    });
}

function deleteRow(teamID){

    let table = document.getElementById("teams-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (row.getAttribute("data-value") == teamID) {
            table.deleteRow(i);
            break;
       }
    }
}


function deleteDropDown(teamID) {
    let selectTeam = document.getElementById("select-team")
    for (let i = 0; i < selectTeam.length; i++) {
        if(Number(selectTeam.options[i].value) === Number(teamID)) {
            selectTeam[i].remove();
            table.deleteDropDown(i);
        }
    }
}
