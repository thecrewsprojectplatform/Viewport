from app import db, create_app


if __name__ == "__main__":
    """
    This script clears the database and creates a new clean instance
    """
    app = create_app()
    try:
        db.drop_all(app=app)
    except:
        pass
    finally:
        db.create_all(app=app)