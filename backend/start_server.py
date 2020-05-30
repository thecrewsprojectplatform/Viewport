from app import create_app


"""
This script starts the server
"""
app = create_app()
app.run(debug=True)