# Frontend

## Setup
To install the required packages:
```
npm install
```

### Running the Frontend Client Application
To start the client application, navigate to the client directory and run:
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.


### Running the SocketIO Server for Chat
From this directory, run
'''
node index.js
'''

## Deploying to Heroku
First, you do need to log in through the Heroku CLI, so install it and do that. Then, after pushing changes to master you can push the changes to the Heroku application by doing the following:
```
git subtree push --prefix front_end heroku master
```

You can then see the website at [heroku](https://multimedia-platform-frontend.herokuapp.com)