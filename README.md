# Art of Draft

Art of Draft is a draft aid for the card game Artifact made by Valve. his Application will let a user set different values to be added to / remove from a card during draft so That they can more easily pick their next card.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Installing

* Run npm install
* Create a .env file and add SERVER_SESSION_SECRET= then a long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure.
* start postgres if not running already by using brew serves start postgresql
* run database.sql in postgressql.
* obtain API from valve 
* put api key in .env as API_KEY= 
* run node updateDataBase.js only run this once as it finishes creating the database
* Run npm run server
* Run npm run client
* navigate to localhost:3000

## Deployment

1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
6. Add an environment variable for SERVER_SESSION_SECRET with a nice random string for security
7. In the deploy section, select manual deploy


## Built With

* react
* react-redux
* react-saga
* material-UI
* node.js
* SQL
* AXIOS
* API (Valvue Artifact card game)

## Authors

* **David Friday** - *\work* - [tom1011](https://github.com/tom1011)

## Acknowledgments

* Hat tip to anyone whose code was used
* Prime Digital Academy
* etc
