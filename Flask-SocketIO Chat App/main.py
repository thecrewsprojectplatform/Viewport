from flask import Flask, render_template            
from flask_socketio import SocketIO, send
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thecrewprojectplatform'
socketio = SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://sql3340937:1T8cg3X18S@sql3.freemysqlhosting.net/sql3340937"
db = SQLAlchemy(app)

# chat history database
class chatHistory(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    message = db.Column('message', db.String(500)) # this message is called in the jinja syntax

@socketio.on('chat message')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    #print('received my event: ' + str(json))     # this is just a check for terminal, can be removed
    
    # saves every message from every client into mysql database
    database_message = chatHistory(message = json)
    db.session.add(database_message)
    db.session.commit()

    # sending message
    socketio.emit('message response', json)

@app.route('/')
def chat():
    # chat_history is a list of dictionaries as it is calling from a database
    chat_history = chatHistory.query.all()
    return render_template('index.html', chat_history=chat_history)

if __name__ == '__main__':
    socketio.run(app, debug=True)
