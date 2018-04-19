# Users
INSERT INTO User (username, password, userType) VALUES ('admin','admin','Admin');
INSERT INTO User (username, password, userType) VALUES ('admin2','admin2','Admin');

INSERT INTO User (username, password, userType) VALUES ('d1','d1','Doctor');
INSERT INTO User (username, password, userType) VALUES ('d2','d2','Doctor');

INSERT INTO User (username, password, userType) VALUES ('n1','n1','Nurse');
INSERT INTO User (username, password, userType) VALUES ('n2','n2','Nurse');

INSERT INTO User (username, password, userType) VALUES ('s1','s1','Secretary');
INSERT INTO User (username, password, userType) VALUES ('s2','s2','Secretary');


# Admins


# Doctors
INSERT INTO Doctor (firstname, lastname, UserId) VALUES ('Anders', 'Andersson',3);
INSERT INTO Doctor (firstname, lastname, UserId) VALUES ('Sven', 'Svensson',4);


# Nurses
INSERT INTO Nurse (firstname, lastname, UserId) VALUES ('Karla','Karlsson',5);
INSERT INTO Nurse (firstname, lastname, UserId) VALUES ('Berta','Bengtsson',6);


# Secretaries
INSERT INTO Secretary (firstname, lastname, UserId) VALUES ('My','Magnusson',7);
INSERT INTO Secretary (firstname, lastname, UserId) VALUES ('Thea','Thorsson',8);


# Patients
INSERT INTO Patient (firstname, lastname,phone, DoctorId) VALUES ('Roman','Ronsson','123456794',1);
INSERT INTO Patient (firstname, lastname,phone, DoctorId) VALUES ('Nina','Nilsson','1234433244',2);
INSERT INTO Patient (firstname, lastname,phone, DoctorId) VALUES ('Alex','Turner','1234433244',3);


# PatientInfo
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('120/80','Patient seems fine.', 1);
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('140/95','Patient seems sick.', 1);
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('125/85','Patient seems in good health.', 2);
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('80/60','Patient doesn\'t seem fine.', 2);
--Diagnosis Data
#diagnosisType
INSERT INTO DiagnosisType (diagnosisTypeName) VALUES ('Chonic');
INSERT INTO DiagnosisType (diagnosisTypeName) VALUES ('Type 1 Diabetes');
INSERT INTO DiagnosisType (diagnosisTypeName) VALUES ('Type 2 Diabetes');
INSERT INTO DiagnosisType (diagnosisTypeName) VALUES ('HIV/AIDS');
INSERT INTO DiagnosisType (diagnosisTypeName) VALUES ('Down Syndrom');

#Diagnosis
INSERT INTO Diagnosis (diagnosisType,createdAt,updatedAt,PatientId,DoctorId) VALUES (1,15/04/2018,15/13/2018,1,2);
INSERT INTO Diagnosis (diagnosisType,createdAt,updatedAt,PatientId,DoctorId) VALUES (2,15/04/2018,15/13/2018,3,1);
INSERT INTO Diagnosis (diagnosisType,createdAt,updatedAt,PatientId,DoctorId) VALUES (3,15/04/2018,15/13/2018,2,1);
