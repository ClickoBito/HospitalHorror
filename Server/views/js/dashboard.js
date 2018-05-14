function getPatientData(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "/patient/" + id, false);
	xhr.addEventListener('load', function(e) {
			$('#main').html(xhr.responseText);
	});
	xhr.send();
}

function getDoctorProfile(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "/doctorprofile/" + id, false);
	xhr.addEventListener('load', function(e) {
			$('#main').html(xhr.responseText);
	});
	xhr.send();
}

function getNurseProfile(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "/nurseprofile/" + id, false);
	xhr.addEventListener('load', function(e) {
			$('#main').html(xhr.responseText);
	});
	xhr.send();
}
