# Users
INSERT INTO User (username, password, userType) VALUES ('JustineD','admin123','Admin');
INSERT INTO User (username, password, userType) VALUES ('AndyF','hello123','Admin');
INSERT INTO User (username, password, userType) VALUES ('JasonW','helloworld','Admin');

INSERT INTO User (username, password, userType) VALUES ('JohanL','doctor123','Doctor');
INSERT INTO User (username, password, userType) VALUES ('EddieC','letmein123','Doctor');
INSERT INTO User (username, password, userType) VALUES ('ColeB','qwerty123','Doctor');

INSERT INTO User (username, password, userType) VALUES ('HarleyS','nurse123','Nurse');
INSERT INTO User (username, password, userType) VALUES ('AngelinaD','iloveyou','Nurse');
INSERT INTO User (username, password, userType) VALUES ('BradH','welcome1','Nurse');

INSERT INTO User (username, password, userType) VALUES ('JannaJ','secretary123','Secretary');
INSERT INTO User (username, password, userType) VALUES ('BreannaS','superman','Secretary');
INSERT INTO User (username, password, userType) VALUES ('MileyH','sunshine','Secretary');


# Admins
INSERT INTO Admin (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Justine', 'Dalton', '1972-05-20', '+46700000000', 'JustineD@gmail.com', 1);

INSERT INTO Admin (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Andy', 'Fredriksen', '1976-04-05', '+46700000001', 'AndyF@gmail.com', 2);

INSERT INTO Admin (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Jason', 'Walker', '1982-05-01', '+46700000002', 'JasonW@gmail.com', 3);

# Doctors
INSERT INTO Doctor (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Johan', 'Larsson', '1965-12-15', '+46700000003', 'JohanL@gmail.com', 4);

INSERT INTO Doctor (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Eddie', 'Cruz', '1969-02-26', '+46700000004', 'EddieC@gmail.com', 5);

INSERT INTO Doctor (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Cole', 'Berg', '1968-07-20', '+46700000005', 'ColeB@gmail.com', 6);

# Nurses
INSERT INTO Nurse (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Harley', 'Stephenson', '1985-04-27', '+46700000006', 'HarleyS@gmail.com', 7);

INSERT INTO Nurse (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Angelina', 'Davidsson', '1982-09-08', '+46700000007', 'AngelinaD@gmail.com', 8);

INSERT INTO Nurse (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Brad', 'Hunter', '1977-08-10', '+46700000008', 'BradH@gmail.com', 9);

# Secretaries
INSERT INTO Secretary (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Janna', 'Jonsson', '1977-08-22', '+46700000009', 'JannaJ@gmail.com', 10);

INSERT INTO Secretary (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Breanna', 'Shea', '1974-02-25', '+46700000010', 'BreannaS@gmail.com', 11);

INSERT INTO Secretary (firstname, lastname, dateofbirth, phone, email, UserId) 
VALUES ('Miley', 'Haley', '1972-01-09', '+46700000011', 'MileyH@gmail.com', 12);

# Patients
INSERT INTO Patient (gender, firstname, lastname, dateofbirth, phone, ssNbr, UserId) 
VALUES (1,'Alex', 'Bengtsson', '1986-04-09', '+46700000012', '8604090000', 12);

INSERT INTO Patient (gender, firstname, lastname, dateofbirth, phone, ssNbr, UserId) 
VALUES (1,'Robert', 'Gustavsson', '1976-12-14', '+46700000013', '7612140000', 12);

INSERT INTO Patient (gender, firstname, lastname, dateofbirth, phone, ssNbr, UserId) 
VALUES (0,'Ingrid', 'Ingvarsson', '1958-12-14', '+46700000014', '5812140000', 12);

INSERT INTO Patient (gender, firstname, lastname, dateofbirth, phone, ssNbr, UserId) 
VALUES (0,'Melina', 'Ekberg', '1991-08-27', '+46700000015', '9108270000', 12);

# PatientInfo
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('120/80','Patient seems fine.', 1);
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('140/95','Patient seems sick.', 1);
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('125/85','Patient seems in good health.', 2);
INSERT INTO PatientInfo (bloodPressure, patientNotes, PatientId) VALUES ('80/60','Patient doesn\'t seem fine.', 2);
