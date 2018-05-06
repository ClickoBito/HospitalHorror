function getPatientData(id){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "/patient/" + id, false);
    xhr.addEventListener('load', function(e) {
        $('#main').html(xhr.responseText);
    });
    xhr.send();
}

