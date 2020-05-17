from app import db


if __name__ == "__main__":
    """
    This script clears the database and creates a new clean instance
    """
    db.drop_all()
    db.create_all()