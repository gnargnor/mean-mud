# MEAN MUD v2

## Updates In Progress - 07/18/17

I recently hosted this application with Heroku and will be making updates to the source code.  I intend to add instructions, extend the functionality of the Gameplay Terminal, and clean up the code for production.  Stay Tuned.

## App Description

MEAN MUD was developed in the spirit of Multi User Dimension games that first started gaining popularity in the late 1970's.  If you're not familiar with text based role playing games or MUDs, check out these Wikipedia Articles:  
* [Text Based Adventures](https://en.wikipedia.org/wiki/Text-based_game)
* [Multi User Dimensions](https://en.wikipedia.org/wiki/MUD)  

The MEAN MUD application is intended to allow users to experience building out and playing text based adventure games in a familiar web based environment without the need to learn code.  The GUI interface allows users to save the progress they have made creating worlds (self contained text based gaming environments) and the objects, locations, sights, and characters that bring these worlds to life.

A robust database structure paired with a logical GUI interface guides the creation of the user's worlds in order to allow for a basic gameplay.  The gameplay terminal allows user's to test out how the worlds created will respond to user input.

This project is still in development and as such some of the functionality of the gameplay terminal is limited.  To get an idea of how the terminal will work, type \<help\> in the terminal and explore the functions listed out.  After you've created some objects using the GUI, try \<list\> to list out \<worlds\> and \<locations\>, \<goto\> to visit the locations and return a room description, and \<look\> to return a description of the sights.  Remember to use quotes and exact spelling and capitalization on objects with titles containing more than one word.

## Getting Started

Follow the steps below to get a copy of the MEAN MUD application up and running on your local machine.

### Prerequisites

* Git
* Grunt  
* MongoDB  
* Node and NPM  
* RoboMongo (or a similar MongoDB management tool)  

### Installing

* Git
  * Initialize a Git repository
  * Add the remote
  * Pull the project to your local repository
```
>git init
>git remote add origin https://github.com/gnargnor/mean-mud.git
>git pull origin master
```
* Grunt  
  * Start Grunt 
```
>grunt
```
* MongoDB  
  * Start a local MongoDB database server
```
>Mongod
```
* Node and NPM  
  * Install dependencies
  * Spin up the Node server
```
>npm install
>npm start

```
* Browser  
  * Navigate to `localhost:5000`

#### You'll be directed to MEAN MUD's login page.  Select "register" to register a new user and get started.

## Built With

* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com/)
* [MongoDB](https://mongodb.com)
* [AngularJS](https://angularjs.org)
* [Mongoose](http://mongoosejs.com)
* [Bootstrap 3](http://getbootstrap.com/)
* [Passport](https://passportjs.org)
* [Angular Terminal](https://vtortola.github.io/ng-terminal-emulator/)
* [Heroku](https://www.heroku.com/)
* [mLab](https://mlab.com/)
* Angular Route
* CSS3
* HTML5
* JavaScript

## Versioning

MEAN MUD v2  
  * To view MEAN MUD v1, visit [mean-mud-old](https://github.com/gnargnor/mean-mud-old)

## Author

* **Logan Kelly** - *Initial work* -  
  * [github.com/gnargnor](https://github.com/gnargnor)  
  * [Bizzey Tech, LLC](http://www.bizzeytech.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Angular Terminal](https://vtortola.github.io/ng-terminal-emulator/) - implemented and edited the source code for the gameplay terminal
* [Chris Black](https://github.com/christopher-black) - suggested and helped with the implementation of Angular-Terminal
* [Prime Academy](http://www.primeacademy.io) - this project is the result of my first solo project completed at Prime Academy
