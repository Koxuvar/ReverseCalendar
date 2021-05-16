# ReverseCalendar
A web app designed to not focus about deadlines and the future. A calendar for just living in today. See the deployed app at https://fathomless-sands-68777.herokuapp.com/. 

## Table of Contents

 - [Description](#Description)
 - [Installation](#Installation)
 - [Usage](#Usage)
 - [Test](#Tests)
 - [Contributors](#Contributors)
 - [License](#License)

 ## Installation

 ```npm i``` to install all dependencies necessary. Currently using bcrypt, connenct-session-sequelize, dotenv, express, express-handlebars, express-session, handlebars, mysql2, sequelize.

 ## Usage

 ```npm start``` to initialize the app. Once running, the app will serve a homepage html file to the port specified in the server.js file, either 3001 on local machines or environment dependent on deployment. The home page has a form for a user to register with a username & password or login with existing credentials. Passwords are encrypted using ```bcrypt```. User sessions are tracked using ```express-session```. 

 Data is stored in the ```reverse_calendarDB```. The database is comprised of 3 tables: the User table (user login data); the Catagory table (user goals data); and the DailyCheck table (user goals tracker per day). See ```db``` and ```models``` folders. GET and POST routes are used to add and retrieve data from the database.
 
 The app contains 4 main pages: the login page, the main Calendar page, the Goals page, and the Stats page.  HTML pages are rendered using ```handlebars``` templates, which can be found in the ```views``` folder, as well as JavaScript and CSS files, found in the ```public``` folder. 

The Goals page allows users to create & save goals, and assign a color to each goal. From the Calendar page, a user clicks on a given day and selects from their saved goals to track progress that day against that goal. The ```calendar.js``` file leverages ```luxon``` to render new DailyCheck data (goals tracked against dates) for a given user. The Stats page shows statistics on user progress toward their goals. It gets DailyCheck data and uses ```Chart.js``` for data visualization.

Login Page: 
(/assets/shuhbang-login.png)

Goals Page: 
(/assets/shuhbang-goals.png)

Calendar Page: 
(/assets/shuhbang-calendar.png)

 ## Tests

 No tests are implemented in this application.

 ## Contributors
- Connor Sullivan (https://github.com/Koxuvar/)
- Dennis J. Irvin (https://github.com/AudioDen)
- Emily Alvarado (https://github.com/emilyalv)

 ## License

 MIT License
 
 Copyright (c) 2021 
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.