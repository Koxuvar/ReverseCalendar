DROP DATABASE IF EXISTS reverse_calendarDB;
CREATE DATABASE reverse_calendarDB;

USE reverse_calendarDB;

    CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30),
        password VARCHAR(30),
        email VARCHAR(30)
    );


    CREATE TABLE dailyCheck (
        category_id VARCHAR(30)
        day DATE,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id)
    );

   CREATE TABLE category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30),
        color INT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id)
    );
