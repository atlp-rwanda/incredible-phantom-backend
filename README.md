Phantom 
=======
[![Build Status](https://travis-ci.org/atlp-rwanda/incredible-phantom-backend.svg?branch=develop)](https://travis-ci.org/atlp-rwanda/incredible-phantom-backend)

[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/incredible-phantom-backend/badge.svg?branch=ch-travis-ci-coveralls-config)](https://coveralls.io/github/atlp-rwanda/incredible-phantom-backend?branch=ch-travis-ci-coveralls-config)
[![Maintainability](https://api.codeclimate.com/v1/badges/a984104b81e5b8d5e035/maintainability)](https://codeclimate.com/github/atlp-rwanda/incredible-phantom-backend/maintainability)
## Vision
Phantom is platform chich facilitate the transport into town, we track bus location, we assign the buses to drivers and operators.
---
## Project setup
---
### Dotenv setup
 1. ***Get some stuffs on table***
  * Run ``` npm install ```
  * Create ``` .env ``` in project root directory
  * Take a look at the ``` .env.example ```  file which is in the project root directory to have a clue on environment variables that are being used in this project
  * Copy all keys from the ``` .env.example ```  file to ``` .env ``` file and add values to corresponding keys. These can be obtained from the project administrator
  * Feel free to add other keys and values according to your feature requirements
  ***Note***: Add keys in ``` .env.example ``` to ease next setup for other developers.
  2. ***Time to serve***
   * For you to use your new environment variable you have to import ``` dotenv ``` module in the file where you want to utilise your environment variables and configure it. like this: ```import dotenv from 'dotenv';
   dotenv.config();```
   * Then you'll be able to access your environment variables via ``` process.env.YOUR_KEY ```
   * That's it, you're good to go!, happy coding!
### Sequelize ORM setup
1. ***Configuring ```.env```***
   * Download and install [pgAdmin](https://www.postgresql.org/download/)
   * Create three databases, one for testing and another for development and other one for production.
   * Copy ``` DEV_DATABASE_URL=postgres://postgres:yourpassword@yourhost:yourport/database-name``` 
          ``` TEST_DATABASE_URL=postgres://postgres:yourpassword@yourhost:yourport/database-name``` 
          ```DATABASE_URL=postgres://postgres:yourpassword@yourhost:yourport/database-name``` URLs
    from ```.env.example``` to ```.env```
   * Edit them with your real database user, password and database name.
2. ***Running Migrations***
   * Run ``` npm sequelize-cli db:migrate``` in terminal to fire up migration
3. ***Undoing Migrations***
  * Run ``` npm sequelize-cli db:migrate:undo ``` to undo all migrations
4. Running Seeds
 * Run ``` npm sequelize-cli db:seed:all ``` in terminal to run all seeds
5. Undoing Seeds
 * Run ``` npm sequelize-cli db:seed:undo:all ``` in termninal to undo all seeds data from the database
### Running server
   * Run `npm run dev` in terminal
### Running tests
   * Run `npm run test` in terminal
   ### Deployment URL
   https://incredible-phantomapp-heroku.herokuapp.com/
### Api Documentation
[Swagger Documentation](https://incredible-phantomapp-heroku.herokuapp.com/api/documentation)