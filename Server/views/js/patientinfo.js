//populating the edit modal with data of the patient info that is to be edited
function editMode(piid) {
    $('#PatientInfoId').val(piid);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "/patientinfo/" + piid, false);
    xhr.addEventListener('load', function(e) {
        let data = xhr.responseText;
        let jsonResponse = JSON.parse(data);
        $('#editModal').on('show.bs.modal', function (e) {
            $('#bloodpressureedit').val(jsonResponse.patientinfo.bloodpressure);
            $('#weightedit').val(jsonResponse.patientinfo.weight);
            $('#descriptionedit').val(jsonResponse.patientinfo.description);
        });
    });
    xhr.send();
}

//inserting the form with patientinfo data
function insertPatientData(){
    let patientdatainsertform = document.getElementById("patientdatainsertform");
    patientdatainsertform.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    let xhrData = new FormData(patientdatainsertform);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/patientinfo');
    xhr.addEventListener('load', function(e) {
        $('#patientinfocol').html(xhr.responseText);
    });

    xhr.send(xhrData);
    $('#insertModal').modal('toggle');
    clearModal();
}

//submitting the updated patientinfo
function editPatientData(){
    let patientdataeditform = document.getElementById("patientdataeditform");

    patientdataeditform.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    let xhr = new XMLHttpRequest();
    let piid = $("#PatientInfoId").val();
    xhr.open('POST', "/patientinfo/" + piid);
    let editForm = new FormData(patientdataeditform);
    xhr.addEventListener('load', function(e) {
        $('#patientinfocol').html(xhr.responseText);
    });

    xhr.send(editForm);
    $('#editModal').modal('toggle');
    clearModal();
}


function clearModal(){
    $('.modal').on('hidden.bs.modal', function(){
        $(this).find('form')[0].reset();
    });    
}