function deleteAthlete(athleteID) {
    console.log(athleteID)
    let link = '/delete-athlete/'
    let data = {
        id: athleteID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(athleteID);
            deleteDropDown(athleteID);
        }
    });
}

function deleteRow(athleteID){

    let table = document.getElementById("athletes-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (row.getAttribute("data-value") == athleteID) {
            table.deleteRow(i);
            break;
       }
    }
}


function deleteDropDown(athleteID) {
    let selectAthlete = document.getElementById("select-athlete")
    for (let i = 0; i < selectAthlete.length; i++) {
        if(Number(selectAthlete.options[i].value) === Number(athleteID)) {
            selectAthlete[i].remove();
            table.deleteDropDown(i);
        }
    }
}
