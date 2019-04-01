# project-cms

Introduction and Disclaimer:

This project is a Content Management System built with Angular.js. This CMS is part of my dissertation project. The CMS comes with a demo site to show off the system, please note that the demo site is a work of fiction and all images were taken from pixabay.com. Please note that this is not meant to be run in a live environment as this is meant as a prototype to demonstrate how client-side technologies can be used for CMS development. Please also note that the application is functional but has not been thoroughly tested in terms of error handling. I am not responsible for any damages occurred to you as a result of this project please proceed at your own discretion. Any feedback on the project is highly welcome. Also note that many external pieces of code have been utilised within the project from external sources, all of which have been referenced within the code itself.

To configure and run the CMS please follow the below steps:

1.  find the file cms_db_ang.sql and execute this in your RDBMS of choice. It is recommend that MariaDB is used.
2.  Now change the database configurations in server.js to match your development environment and rename the folder node_module to node_modules.
3.  Install NPM through command line in the project root, once finished you can run 'npm start' to run the CMS
4.  Within your browser navigate to http://localhost:8081.

Specification:

- Front end framework(s): UIkit 2.5.7 Foundation 6.5.1
- Font(s): Railway, Titillum Web, Allan, Oxygen (Google Fonts)
- Icon set(s): Clarity Icons, FontAwesome Icons
- Technologies: Node.js, Express.js, Angular.js

Requirements

- Node.js
- MariaDB or equivilant