# Building Docker Images

## Step 1 - In the folder with the docker-compose.yml file, run the command "docker-compose build" to build the required images

## Step 2 - Once the images have been built, run the "docker-compose up -d" command to run the docker container

# Setting Up Databases

## Step 1 - In your web browser, go to "http://localhost:8082" to access the phpMyAdmin interface for the MySQL database. Log in using username: "root".

## Step 2 - Click on "Import" and click "Choose File", then select the file at "PlayFoo/database/playfoo.sql" and click "Go"

## Step 3 - Click on user table. It is pre-populated with 3 accounts. Use those account details for testing the scenerios later on. For example, you can use 'test' username and 'test' password to login.

# How to run the frontend

## Step 1 - Build the dependency

```bash
npm install
```

## Step 2 - Start the frontend

```bash
npm start
```
"# PLayFoo" 
#   P L a y F o o  
 