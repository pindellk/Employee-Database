DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NULL,
  salary decimal,
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NULL,
  last_name varchar(30) NULL,
  role_id int,
  manager_id int NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"), 
("Finance"), 
("Legal");