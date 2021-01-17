CREATE TABLE users (
ID SERIAL PRIMARY KEY,
LastName varchar(255) NOT NULL,
FirstName varchar(255) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL
)

CREATE TABLE category (
ID SERIAL PRIMARY KEY,
user_id int NOT NULL,
color varchar(255) NOT NULL,
name varchar(255) NOT NULL
)

CREATE TABLE todo_list (
ID SERIAL PRIMARY KEY,
title varchar(255) NOT NULL,
description varchar(2000),
user_id int NOT NULL,
category_id int NOT NULL,
isCompleted boolean default false,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)