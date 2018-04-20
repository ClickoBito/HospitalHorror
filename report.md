%Agile Development Processes Project Report - Hospital Horror
%Team 3
%Kirsten Bassuday; Teklie Belay Bzuneh; Jamel Debbiche; Patrick Franz; Carl Jansson; Amar Kulaglic; Sebastian Nilsson


<!---
This is the project report template.
Fill it out over the course of the project.
--->

# Project Description
<!---
Include the project description from the assignment,
your chosen target platform,
programming language,
and a name for the software.
--->
This project is about creating a system for doctors to keep track of patients in a hospital environment. In order to do this, the system lets the doctors know important details about the patients, such as their treatments, allergies, diagnosis and corresponding doctor, which is accessible through the system. This system is implemented as a web application using Node.js with Javascript and is called Horror Hospital.
The following tools have been decided on: Slack is used as the main communication tool. As suggested we are also using Travis as a continuous integration service, GitHub as project repository and issue tracker, MariaDB as the database management system, Express.js as the web-application framework for our backend and Angular as the front-end web application platform.

Important links:

- git repository: https://github.com/HeyHoProBro/HospitalHorror
- issue tracker: https://github.com/HeyHoProBro/HospitalHorror/projects/1
- continuous integration builds: https://travis-ci.org/HeyHoProBro/HospitalHorror

# Sprint 1 Log
<!---
Per sprint, fill out one sprint log section and its subsections.
--->
This is the first sprint of the project and contains the setup of the project.

## Commitment
<!---
List the features/stories that the team committed to finish during the sprint.
--->
The following features were commited to for the first sprint:

- Set up Slack.
- Set up Github.
- Create a "Hello World" application.
- Set up a working back end.
- Configure Travis CI.
- Preliminary Database Design (Entity Relationship Diagram)

## Work Done
<!---
Log what was accomplished, and how.
Please report on all activities; for example, in addition to coding, planning and design discussion.
--->
<!--
*Name and ID of each feature* | *X hours* | *Member A: Y hours, Member B: Z hours*
-->
Feature | Time estimated | Time spent per team member
--------|----------------|--------
Set up Slack | 15 minutes |
Set up GitHub | 15 minutes |
Create a Hello World application | 30 minutes | Patrick: 30 minutes
Set up working back end | 30 minutes | Patrick: 30 minutes
Configure Travis CI | 1 hour | Patrick: 1 hour
Entity Relationship Diagram | 90 minutes | Jamel: 90 minutes
Write in the report | 3 hours | Amar: 3 hours
Node.js tutorial | 1 hour | Amar: 1 hour

## Reflections
<!---
Reflect on how the work worked.
This data will form the basis for your final reflection.
As the postmortem will be a writeup, it's fine to use shorthand notes, bullet list, and similar.
Keep within 1000-1500 words. Discuss any deviations from the sprint commitment. Reflect on the agile practice practiced:
- Did your experience correspond to or contradict with what literature claims?
    - Analysis of why. Mostly interesting if something unexpected happens, but even
      if everything runs according to plan, reflecting on the underlying mechanisms
      can be interesting.
- How did the practices interact?
  Did they complement or counteract each other?
- How efficient were the practices, given the time they took to use?
---->
The first meeting was successful and all team members participated equally in the discussions. Since we decided to use Angular, Node.js and Travis CI, which were new for many of us. We decided that we could watch tutorials about these tools and frameworks so that we could be prepared for the actual programming of the project. Also, we discussed and briefly explained the tools and frameworks, since some of us had prior experience. We also helped each other when a teammate had a problem with his or her work, for example when setting up the project on their own computer.

Since we have had only one meeting where we got started with the project by setting up the environment and getting to know each other, we have not practiced any proper agile pracices yet. Despite this, the first meeting has been important anyways since we also recieved information from the supervisors about how the project will work.


# Sprint 2 Log
<!---
Per sprint, fill out one sprint log section and its subsections.
--->
This is the second sprint of the project with focus on setup of the project as well as basic functionality, which was decided on together with the customer.

## Commitment
<!---
List the features/stories that the team committed to finish during the sprint.
--->
The following features were commited to for the second sprint:

- Database implementation
- Create login screen
- Authentication for login
- Create admin register screen
- Create register functionality
- Display status messages to frontend
- Initialize testing framework

## Work Done
<!---
Log what was accomplished, and how.
Please report on all activities; for example, in addition to coding, planning and design discussion.
--->
<!--
*Name and ID of each feature* | *X hours* | *Member A: Y hours, Member B: Z hours*
-->
Feature | Time estimated | Time spent per team member
--------|----------------|--------
Create login screen | 1 hour | Sebastian and Arnaud: 30 minutes
Node/Express tutorials | 4 hours | Sebastian: 2 hours, Carl: 2 hours
Authentication for login | 6 hours | Sebastian and Arnaud: 3 hours
Create admin register screen | 4 hours | Arnaud: 4 hours
Create register functionality | 4 hours | Sebastian: 4 hours
Entity Relationship Diagram | 15 hours | Amar: 12 hours, Kirsten 3 hours
Implementation of database | 13 hours | Amar: 13 hours, Patrick: 4 hours
Created testdata for the database | 6 hours | Amar: 6 hours, Patrick: 2 hours
Write in the report | 1.5 hours | Amar: 1.5 hours
Display status messages to frontend (Pug) | 2 hours | Sebastian: 2 hours
Mocha test framework | 4 hours | Carl: 4 hours
Travis CI | 7 hours | Patrick: 1 hour, Carl: 6 hours
Functions to handle PatientInfo | 2 hours | Patrick: 2 hours
Functions to handle PatientAllergy | 2 hours | Teklie: 2 hours
Functions to handle PatientDiagnosis | 3 hours | Kirsten and Arnaud: 3 hours
Designed Doctor's Dashboard | 2 hours | Jamel Debbiche: 2 hours
Functions to display Patients List | 8 hours | Jamel Debbiche: 8 hours
Functions to display Doctor List (on going) | 1 hours | Jamel Debbiche: 8 hours
Functions to display Nurse List (on going) | 1 hours | Jamel Debbiche: 8 hours
Convertion of html to pug | 6 hours | Jamel Debbiche: 6 hours

## Reflections
<!---
Reflect on how the work worked.
This data will form the basis for your final reflection.
As the postmortem will be a writeup, it's fine to use shorthand notes, bullet list, and similar.
Keep within 1000-1500 words. Discuss any deviations from the sprint commitment. Reflect on the agile practice practiced:
- Did your experience correspond to or contradict with what literature claims?
    - Analysis of why. Mostly interesting if something unexpected happens, but even
      if everything runs according to plan, reflecting on the underlying mechanisms
      can be interesting.
- How did the practices interact?
  Did they complement or counteract each other?
- How efficient were the practices, given the time they took to use?
---->
Sprint 2 began with a consultation with our customer. From this meeting, we were able to gather the main project requirements and verify existing requirements that we had collected. Each requirement was broken down into manageable-sized tasks for one person and individually created as a story card on Trello. When meeting with the client we negotiated a reasonable amount of functionality that can be derived by the next acceptance test. To determine the workload, we looked at the number of recourses available, hours available and experience needed. We were able to factor these aspects in when planning for our sprint 2 delivery. One of the ways we did this is by creating research and design story cards. This would ensure that the necessary groundwork can be done and is a part of our sprint cycle.

What went well in this sprint, is that we built a good foundation of understanding within our team. We achieved this by meeting and working together to design an Entity Relationship Diagram which would form the starting point of our project. We also were able to identify which functional requirements we would be able to meet for our customer and which requirements we could put on a backlog for sprint 3. This allowed us to work at a sustainable pace. Other than that, we started getting more and more into code reviewing on GitHub, which let us verify the code as a part of the work process before merging it with bigger branches. Continuous integration was an integral part of this since it helps combat merge conflicts and other issues. It let many of us follow the changes that were made in the code so that we could be updated with the code implementation, but also if the changes needed some improvements, it could be added by the code reviewer.

Another aspect that will ensure quality in the future is that we extended our testing framework. There is now a test suite for the project using mocha, chai, and supertest. Using these we will be able to implement both unit and integration tests that execute automatically using Travis every time a commit is pushed to the repository. The configuration for Travis includes the setup of our database, so full functionality tests are possible to implement.

In this sprint, we decided it was important to meet. This allowed us the opportunity to help each other out and tackle any issues we had. We also were able to finalize a few pending decisions that considered the technologies we were using, such as the template engine used in the backend. Short retrospectives were held during these meetings so that everyone was brought up to speed. There were some small issues with keeping track of what other people in the project were working on, which can be improved by meeting more frequently in the coming sprints. Easter was obviously preventing us from working optimally. We also encouraged each other to keep our Trello-board up-to-date for preventing overlapping work and communications issues.

A few members tried pair programming in the group, which proved helpful in making sure that all cases were considered, such as error handling. Since some group members have experience in developing web-applications while others have none, pair-programming proved to be an efficient way to transfer knowledge from one group member to another while also implementing features. Another benefit of pair-programming was the ability to brainstorm different ideas and discuss solutions to problems.

During this sprint, we were still not able to make full use of all agile methods. One of the reasons for this was that not all base modules in our application had been fully implemented, thus preventing people from working on certain features. However, we expect the remaining base modules (template engine & testing environment) to be incorporated during the coming sprint. Once the basis for our application is complete, we can implement more features which we haven't been able to work on.

Some hurdles in this sprint were overcoming the learning curve and getting all members of the team familiar with the technology platforms. As expected we still have some teething issues with platforms and coding language used but at the end of this sprint, the team was more familiar and comfortable in the project space. The team has also grown more comfortable with each other and matured from the first sprint. Overall this sprint went well considering it was our first real working sprint.

<!--While working in the backend, a postman has been used to fire requests such as post,put and delete to API. This tool helped us to check the functions we implemented to handle requests coming from the front-end before the views were set up.-->

# Sprint 3 Log
This is the third sprint of the project ...

## Commitment
<!---
List the features/stories that the team committed to finish during the sprint.
--->
The following features were commited to for the second sprint:

- Authentication in the backend

## Work Done
<!---
Log what was accomplished, and how.
Please report on all activities; for example, in addition to coding, planning and design discussion.
--->
<!--
*Name and ID of each feature* | *X hours* | *Member A: Y hours, Member B: Z hours*
-->
Feature | Time estimated | Time spent per team member
--------|----------------|--------
Backend authentication | 1 hour | Patrick: 1 hour
Password encryption    | 2 hours| Teklie and Sabastian : 2 hours

## Reflections
<!---
Reflect on how the work worked.
This data will form the basis for your final reflection.
As the postmortem will be a writeup, it's fine to use shorthand notes, bullet list, and similar.
Keep within 1000-1500 words. Discuss any deviations from the sprint commitment. Reflect on the agile practice practiced:
- Did your experience correspond to or contradict with what literature claims?
    - Analysis of why. Mostly interesting if something unexpected happens, but even
      if everything runs according to plan, reflecting on the underlying mechanisms
      can be interesting.
- How did the practices interact?
  Did they complement or counteract each other?
- How efficient were the practices, given the time they took to use?
---->
[...]

# Sprint X Log
*As for the previous sprints.*


# Postmortem
Once the project is finished, summarize your experiences.
The postmortem part shall be 2000-3000 words long.

Considering the following:

- With regards to the agile practices, reflect on the combined experience from all sprints.

- Which practices had the most impact on the software developed?
  Think of both positives and negatives.

- What would you do differently in a future but similar project?


# Project outcome
Document the project, for example using screenshots.
