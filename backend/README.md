# Backend

## Setup
To install the required packages:
```
pip install -r requirements.txt
```

To create the database for the first time, run:
```
python create_new_db.py
```

## Running the Tests
To run the backend tests, run:
```
python tests\run_all_tests.py
```

## Running the Backend
To start the Flask server, run:
```
python start_server.py
```

## Using the API
The api can be found queried at `http://127.0.0.1:5000/{endpoint}`

Documentation for the api can be found at `http://localhost:5000/api/spec.html`

## Deploying to Heroku
First, you do need to log in through the Heroku CLI, so install it and do that. Then, after pushing changes to master you can push the changes to the Heroku application by doing the following:
```
git subtree push --prefix backend heroku master
```