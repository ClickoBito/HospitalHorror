//populate dropdown menu for inserting diagnosis (with diagnosis types and treatment types)
function getDiagnosisData(){
  let diagnosisData = getDiagnosisTreatmentData();

  //setting appropriate doctorid for inserting diagnosis
  $('#DoctorId').val(diagnosisData.doctorId.id);
  var $dropdownd = $("#dtype");
  var $dropdownt = $("#ttype");
  $dropdownd.append('<option value="">' + "Choose one Diagnosis Type" + '</option>');
  $.each(diagnosisData.diagnosisType, function() {
      $dropdownd.append('<option value="' + this.id + '">' + this.name + '</option>');
  });

  $dropdownt.append('<option value="">' + "Choose one treatment" + '</option>');
  $.each(diagnosisData.treatment, function() {
      $dropdownt.append('<option value="' + this.id + '">' + this.description + '</option>');
  });

  //clear dropdown each time modal closes so it doesn't infintely populate them
  $("#insertDiagnosisModal").on("hidden.bs.modal", function(){
      $('#dtype').empty();
      $('#ttype').empty();
  });

}

//insert Diagnosis from database using the #insertDiagnosisModal and #adddiagnosisform
function insertDiagnosis(){
  let adddiagnosisform = document.getElementById("adddiagnosisform");
  adddiagnosisform.addEventListener("submit", function (event) {
      event.preventDefault();
  });
  let xhrData = new FormData(adddiagnosisform);

  //validating image url 
  if(checkURLisImage($('#imageurl').val())) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/patientdiagnosis');

      xhr.addEventListener('load', function(e) {
          $('#patientinfocol').html(xhr.responseText);
      });

      xhr.send(xhrData);
      $('#insertDiagnosisModal').modal('toggle');


  } else {
      alert('Link inserted is not a valid image or image format, please make sure it is jpeg, jpg or png ');
  }
  clearModal();
}

//populate dropdown menu for inserting treatment
function getTreatmentData(){
  let treatmentType = getDiagnosisTreatmentData().treatmentType;
  var $dropdown = $("#treatmenttype");
  $dropdown.append('<option value="">' + "Choose one Treatment Type" + '</option>');

  $.each(treatmentType, function() {
      $dropdown.append('<option value="' + this.id + '">' + this.name + '</option>');
  });

  //clear dropdown each time modal closes so it doesn't infintely populate them
  $("#insertTreatmentModal").on("hidden.bs.modal", function(){
      $('#treatmenttype').empty();
  });

}

//insert treatment from database using the #insertTreatmentModal and #addtreatmentform
function insertTreatment(){
  let addtreatmentform = document.getElementById("addtreatmentform");
  addtreatmentform.addEventListener("submit", function (event) {
      event.preventDefault();
  });
  let xhrData = new FormData(addtreatmentform);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/treatment');
  xhr.addEventListener('load', function(e) {
      $('#patientinfocol').html(xhr.responseText);
  });
  xhr.send(xhrData);
  $('#insertTreatmentModal').modal('toggle');
  clearModal();
}


//Makes sure a scan image is uploaded
function checkURLisImage(url) {
  return(url.match(/\.(jpeg|jpg|png)$/) != null);
}

//Return diagnosis and treatment data (with diagnosis types and treatment types)
function getDiagnosisTreatmentData(){
  let data;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', "/patientdiagnosis", false);
  xhr.addEventListener('load', function(e) {
      data = JSON.parse(xhr.responseText);
  });
  xhr.send();
  console.log('diganosis and treatment is: '+data);
  return data;
}

function clearModal(){
    $('.modal').on('hidden.bs.modal', function(){
        $(this).find('form')[0].reset();
    });    
}