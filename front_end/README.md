# Frontend

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

### Running the Frontend Client Application
To start the client application, navigate to the 'client' directory and run:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.


### Running the SocketIO Server
From this directory, run

'''
node index.js
'''

## Running the Frontend Test
To start the test, navigate to the 'client' directory and run:

```
npm test
```

## Deploying to Heroku 
First, you do need to log in through the Heroku CLI, so install it and do that. Then, after pushing changes to master you can push the changes to the Heroku application by doing the following:

```
git subtree push --prefix front_end heroku master
```

You can then see the website at [heroku](https://multimedia-platform-frontend.herokuapp.com)