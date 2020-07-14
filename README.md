# The Crew Project I - Project Name Goes here

## Project Description
Project description goes here
Need to add what features there are in this project

<br></br>

## The Project Members
* [**Andrew Hoang**](https://github.com/Andrew03)
* [**Eric Pan**](https://github.com/ericpan0207)
* [**Michael Nguyen**](https://github.com/michan4)
* [**Sung Hyun Ahn**](https://github.com/sahn1998)

<br></br>

## Project Code Base
**Front-End:** ReactJS/Typescript
**Back-End:** Python 

<br></br>

## Demo
clips of the project goes here

<br></br>

# ------ Frontend Setup ------

## Setup
To install the required packages:

```
npm install
```

Make sure that npm install is initiated in both:
1) Current directory
2) Client directory

For Enzyme (Testing), you may need to run: 
npm i --save-dev enzyme enzyme-adapter-react-16

<br></br>

## Running the Frontend Client Application
To start the client application, navigate to the 'client' directory and run:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

<br></br>

## Running the SocketIO Server
From this directory, run

'''
node index.js
'''

<br></br>

## Running the Frontend Test
To start the test, navigate to the 'client' directory and run:

```
npm test
```


<br></br>
<br></br>
<br></br>


# ------ Backend Setup ------

## Setup
To install the required packages:
```
pip install -r requirements.txt
```

To create the database for the first time, run:
```
python create_new_db.py
```

<br></br>

## Running the Tests
To run the backend tests, run:
```
python tests\run_all_tests.py
```

<br></br>

## Running the Backend
To start the Flask server, run:
```
python start_server.py
```

<br></br>

## Using the API
The api can be found queried at `http://127.0.0.1:5000/{endpoint}`

Documentation for the api can be found at `http://localhost:5000/api/spec.html`