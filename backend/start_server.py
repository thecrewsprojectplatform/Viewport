from app import create_app


if __name__ == "__main__":
    """
    This script starts the server
    """
    app = create_app()
    app.run(debug=True)