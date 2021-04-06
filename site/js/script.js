var selectedRow = null //initializez selectedRow cu NULL.

//Functia foloseste valorile din campurile text
function onFormSubmit() {
    //Doar daca valoarea returnata de functia isValid va fi true vom executa operatia de inserare
    if (validate()) {
        var formData = readFormData(); //stocam in variabila formData apelul functiei readFromData()
        if (selectedRow == null) //Daca variabila este NULL atunci se va efectua
                                //operatia de inserare
            insertNewRecord(formData);
    else                        //Altfel se va efectua operatia de update.
           updateRecord(formData);
        resetForm();
    }
}
//Functia citeste valorile din campurile text
function readFormData() {
    var formData = {};  //In variabila stocam valorile din campurile text
    formData["nume"] = document.getElementById("nume").value;
    formData["pret"] = document.getElementById("pret").value;
    formData["cantitate"] = document.getElementById("cantitate").value;
    formData["descriere"] = document.getElementById("descriere").value;
    formData["comentarii"] = document.getElementById("comentarii").value;
    formData["rating"] = document.getElementById("rating").value;
    return formData;
}

//Definim o functie pentru inserarea elementelor in tabel, in care parametrul
//functiei sunt datele stocate in varibila formData.
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length); //insereaza un rand nou
                                                //functia va avea drept variabila lungimea tabelului
                                                //deaorece cu fiecare nou element inserat, lungimea va creste
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nume;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.pret;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.cantitate;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.descriere;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.comentarii;

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.rating;

    //inseram inca o celula pentru butonul de edit si delete
    //folosim ` pentru a separa butoanele pentru o mai buna intelegere a textului
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

//functia reseteaza campurile text la valoarea initiala, adica necompletate
function resetForm() {
    document.getElementById("nume").value = "";
    document.getElementById("pret").value = "";
    document.getElementById("cantitate").value = "";
    document.getElementById("descriere").value = "";
    document.getElementById("comentarii").value = "";
    document.getElementById("rating").value = "";
    selectedRow = null;
}


//Configurarea butonului Edit
function onEdit(td) {
    selectedRow = td.parentElement.parentElement; //va returna elementul de pe randul corespunzator
    //populam campurile text cu valorile corespunzatoare din tabel
    document.getElementById("nume").value = selectedRow.cells[0].innerHTML;
    document.getElementById("pret").value = selectedRow.cells[1].innerHTML;
    document.getElementById("cantitate").value = selectedRow.cells[2].innerHTML;
    document.getElementById("descriere").value = selectedRow.cells[3].innerHTML;
    document.getElementById("comentarii").value = selectedRow.cells[4].innerHTML;
    document.getElementById("rating").value = selectedRow.cells[5].innerHTML;
}

//Functia pentru updatarea campurilor nou modificate in tabel
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nume;
    selectedRow.cells[1].innerHTML = formData.pret;
    selectedRow.cells[2].innerHTML = formData.cantitate;
    selectedRow.cells[3].innerHTML = formData.descriere;
    selectedRow.cells[4].innerHTML = formData.comentarii;
    selectedRow.cells[5].innerHTML = formData.rating;
}

//Functia pentru butonul Delete
function onDelete(td) {
    if (confirm('Sunteti sigur ca doriti sa stergeti inregistrarea ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm(); //apelam functia de reset.
    }
}

function validate() {
    isValid = true; //valoarea buleana
    //Verificam daca campurile text pentru nume si pret sunt goale
    //Daca da, atunci valoarea isValid va fi setata pe Fals
    if ((document.getElementById("nume").value == "") || (document.getElementById("pret").value == "")) {
        isValid = false;
        document.getElementById("NumeValidationError").classList.remove("hide");
        document.getElementById("pretValidationError").classList.remove("hide");
    } else {
        isValid = true;
        //Daca valoarea isValid = true, verificam daca exista clasa "hide" in label-ul pentru nume si pret
        //Daca nu exista, vom introduce clasa "hide"
        if ((!document.getElementById("NumeValidationError").classList.contains("hide")) || (!document.getElementById("pretValidationError").classList.contains("hide"))){
            document.getElementById("NumeValidationError").classList.add("hide");
            document.getElementById("pretValidationError").classList.add("hide");
        }
    }
    return isValid;
}

function hilightRow(){
    var index,
        table = document.getElementById("list");
    for (var i = 0; i< table.rows.length; i++)
    {
        table.rows[i].onclick = function()
        {
            index = this.rowIndex;
            this.classList.toggle("selected");
            console.log(index);
        }
    }
}
hilightRow();
