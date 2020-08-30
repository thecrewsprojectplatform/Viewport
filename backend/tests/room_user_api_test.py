from flask import Flask
from flask_testing import TestCase
import os
import unittest
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)
from app import create_app, db

class RoomUserApiTest(TestCase):
    test_room = {"name": "Test Room"}
    test_room_id = -1
    test_user = {"name": "Test User"}
    test_user_id = -1
    test_room_user = None

    def create_app(self):
        return create_app(for_testing=True)

    def setUp(self):
        db.create_all()
        room_post = self.client.post("/rooms", json=self.test_room)
        self.test_room_id = room_post.json["id"]
        user_post = self.client.post("/users", json=self.test_user)
        self.test_user_id = user_post.json["id"]
        self.test_room_user = {"user_id": self.test_user_id}

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get(self):
        """Tests GET at /rooms/{room_id}/users"""
        post_response = self.client.post(f"/rooms/{self.test_room_id}/users", json=self.test_room_user)
        get_response = self.client.get(f"/rooms/{self.test_room_id}/users")
        self.assertEqual(get_response.json[0]["name"], self.test_user["name"])
        self.assertEqual(get_response.json[0]["id"], self.test_user_id)

    def test_get_invalid_id(self):
        """Tests GET at /rooms/{room_id}/users with invalid room_id"""
        get_response = self.client.get("/rooms/0/users")
        self.assert404(get_response)

    def test_post(self):
        """Tests POST at /rooms/{room_id}/users"""
        response = self.client.post(f"/rooms/{self.test_room_id}/users", json=self.test_room_user)
        self.assert200(response)

    def test_post_invalid_id(self):
        """Tests POST at /rooms/{room_id}/users with invalid request body"""
        response = self.client.post("/rooms/0/users", json=self.test_room_user)
        self.assert404(response)

    def test_post_invalid_request(self):
        """Tests POST at /rooms/{room_id}/users with invalid request body"""
        response = self.client.post(f"/rooms/{self.test_room_id}/users", json={})
        self.assert400(response)

    def test_delete(self):
        """Tests DELETE at /rooms/{room_id}/users/{user_id}"""
        post_response = self.client.post(f"/rooms/{self.test_room_id}/users", json=self.test_room_user)
        delete_response = self.client.delete(f"/rooms/{self.test_room_id}/users/{self.test_user_id}")
        self.assert200(delete_response)
        get_response = self.client.get(f"/rooms/{self.test_room_id}/users")
        self.assertEqual(get_response.json, [])

    def test_delete_invalid_room_id(self):
        """Tests DELETE at /rooms/{room_id}/users/{user_id} with invalid room_id"""
        delete_response = self.client.delete("/rooms/0/users/0")
        self.assert404(delete_response)

    def test_delete_invalid_user_id(self):
        """Tests DELETE at /rooms/{room_id}/users/{user_id} with invalid user_id"""
        delete_response = self.client.delete(f"/rooms/{self.test_room_id}/users/0")
        self.assert404(delete_response)

if __name__ == "__main__":
    unittest.main()