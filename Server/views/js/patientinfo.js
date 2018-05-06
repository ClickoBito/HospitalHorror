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
        })
    });
    xhr.send();
}
  
  //-function insertMode(id){
    //-$("#PatienId").val(id);
  //-}
  
function insertPatientData(){
    let patientdatainsertform = document.getElementById("patientdatainsertform");
    patientdatainsertform.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    let xhrData = new FormData(patientdatainsertform);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/patientinfo');
    xhr.send(xhrData);
    $('#insertModal').modal('toggle');

    let pid = $('#PatientId').val();
    xhr.open('GET', "/patient/" + pid, false);
    xhr.addEventListener('load', function(e) {
        $('#patientinfocol').html(xhr.responseText);
    });
    xhr.send();
}
  
function editPatientData(){
    let xhr = new XMLHttpRequest();     
    let piid = $("#PatientInfoId").val();
    xhr.open('POST', "/patientinfo/" + piid);
    let patientdataeditform = document.getElementById("patientdataeditform");
    let editForm = new FormData(patientdataeditform);
    xhr.send(editForm);
    patientdataeditform.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    $('#editModal').modal('toggle');

    let pid = $('#PatientId').val();
    xhr.open('GET', "/patient/" + pid, false);
    xhr.addEventListener('load', function(e) {
        $('#patientinfocol').html(xhr.responseText);
    });
    xhr.send();


}