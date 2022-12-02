function deleteDivision(divisionID) {
    let link = '/delete-division/'
    let data = {
        id: divisionID
    };
    $.ajax({
        url: link,
        type:'DELETE',
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf=8",
        success: function(result){
            deleteRow(divisionID);
        }
    });
}

function deleteRow(divisionID){

    let table = document.getElementById("divisions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (row.getAttribute("data-value") == divisionID) {
            table.deleteRow(i);
            break;
       }
    }
}


function deleteDropDown(divisionID) {
    let selectDivision = document.getElementById("select-division")
    for (let i = 0; i < selectDivision.length; i++) {
        if(Number(selectDivision.options[i].value) === Number(divisionID)) {
            selectDivision[i].remove();
            table.deleteDropDown(i);
        }
    }
}
