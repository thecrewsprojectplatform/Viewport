from flask import Flask
from flask_testing import TestCase
import os
import unittest
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)
from app import create_app, db

class UserApiTest(TestCase):
    test_user = {"name": "Test User"}

    def create_app(self):
        return create_app(for_testing=True)

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get(self):
        """Tests GET at /users/{user_id}"""
        post_response = self.client.post("/users", json=self.test_user)
        get_response = self.client.get(f"/users/{post_response.json['id']}")
        self.assertEqual(get_response.json, post_response.json)

    def test_get_invalid_id(self):
        """Tests GET at /users/{user_id} with invalid user_id"""
        get_response = self.client.get(f"/users/0")
        self.assert404(get_response)

    def test_get_all(self):
        """Tests GET at /users"""
        response = self.client.get("/users")
        self.assertEqual(response.json, [])

    def test_post(self):
        """Tests POST at /users"""
        response = self.client.post("/users", json=self.test_user)
        self.assertEqual(response.json["name"], self.test_user["name"])

    def test_post_invalid_request(self):
        """Tests POST at /users with invalid request body"""
        response = self.client.post("/users", json={})
        self.assert400(response)

    def test_put(self):
        """Tests PUT at /users"""
        updated_user = {"name": "Updated User"}
        post_response = self.client.post("/users", json=self.test_user)
        put_response = self.client.put(f"/users/{post_response.json['id']}", json=updated_user)
        self.assertEqual(put_response.json["name"], updated_user["name"])
        self.assertEqual(post_response.json["id"], put_response.json["id"])

    def test_put_invalid_id(self):
        """Tests PUT at /users with invalid user_id"""
        updated_user = {"name": "Updated User"}
        put_response = self.client.put(f"/users/0", json=updated_user)
        self.assert404(put_response)

    def test_put_invalid_request(self):
        """Tests PUT at /users with invalid request body"""
        post_response = self.client.post("/users", json=self.test_user)
        put_response = self.client.put(f"/users/{post_response.json['id']}", json={})
        self.assert400(put_response)

    def test_delete(self):
        """Tests DELETE at /users"""
        post_response = self.client.post("/users", json=self.test_user)
        delete_response = self.client.delete(f"/users/{post_response.json['id']}")
        self.assert200(delete_response)
        get_response = self.client.get(f"/users/{post_response.json['id']}")
        self.assert404(get_response)

    def test_delete_invalid_id(self):
        """Tests DELETE at /users with invalid user_id"""
        delete_response = self.client.delete(f"/users/0")
        self.assert404(delete_response)


if __name__ == "__main__":
    unittest.main()