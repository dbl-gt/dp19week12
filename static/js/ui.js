/*
   DYNAMIC OBJECT - VALUE CREATION TABLE refreshObjectTable()
   Essentially creates a row for each object in data, 
   with an input field for each value listed in datalist
   onEditValue() and onDeleteValue() are helper functions
*/

function refreshObjectTable() {
    let i, j;
    var demodiv = document.getElementById("objTable");
    let objText = "";
    objText += "<form>";
    objText += "<table>";
    // make the header
    objText += "<tr>";
    for (j = 0; j < datalist.length; j++) {
        objText += "<td>";
        objText += datalist[j];
        objText += "</td>";
    }
    objText += "</tr>";
    // make the table of editable object data fields
    for (i = 0; i < data.length; i++) { // for each object
        var item = data[i];
        objText += "<tr>";
        for (j = 0; j < datalist.length; j++) { // for each value in the datalist
            objText += "<td>";
            var value = data[i][datalist[j]];
            var itemValue = i + "?" + datalist[j];
            objText += '<input type="text" onchange="onEditValue(this.name, this.value)" name="' + itemValue + '" value="' + value + '">';
            objText += "</td>";
        }
        // add a delete button
        objText += '<td><input type="button" onclick="onDeleteObject(this.name)" name="' + i + '" value="DELETE" > </td>';
        objText += "</tr>";
    }
    objText += "</table>";
    objText += "</form>";
    //    console.log(objText);
    demodiv.innerHTML = objText;
    loaddata();
    printData();
}

function onEditValue(name, value) {
    // break out the object # and value
    var res = name.split("?");
    data[res[0]][res[1]] = value;
}

function onDeleteObject(name) {
    console.log("deleted: " + name);
    // delete an object by number (row)
    data.splice(name, 1);
    refreshObjectTable();
}

//   refreshObjectTable();

/*
    DYNAMIC OBJECT CREATION TABLE
   Essentially creates a row for each value in datalist, 
   and a creation function
   onCreateObject() is a helper function
*/

function refreshEditTable() {
    let j;
    var editDiv = document.getElementById("objCreate");
    let objText = "";
    objText += "<form>";
    objText += "<table>";
    for (j = 0; j < datalist.length; j++) {
        objText += "<tr><td>";
        // add the name
        objText += datalist[j];
        objText += "</td><td>";
        // now add the input form element
        objText += '<input type="text" id="' + datalist[j] + '">';
        objText += "</td></tr>";
    }
    objText += "</table>";
    objText += '<input type="button" onclick="onCreateObject()" value="CREATE" ></input>'
    objText += "</form>";
    editDiv.innerHTML = objText;
}

function onCreateObject() {
    let newObj = new Object;
    for (j = 0; j < datalist.length; j++) {
        newObj[datalist[j]] = document.getElementById(datalist[j]).value;
    }
    data.push(newObj);
    refreshObjectTable();
}

//      refreshEditTable();

function printData(){
    console.log(data);
}

/*
    load this function to convert 
    array into collections of json objects
*/

function loaddata(){
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        var json = {
            "id":bldg[i].id,
            "name":bldg[i].name,
            "x": bldg[i].x,
            "y": bldg[i].y,
            "l":bldg[i].l,
            "w":bldg[i].w,
            "h":bldg[i].h,
            "re":bldg[i].re,
            "gr":bldg[i].gr,
            "bl":bldg[i].bl,
            "active":bldg[i].active
        };
        var str=JSON.stringify(json);
        arr.push(str);
    }
    document.getElementById("update").value = arr;
}