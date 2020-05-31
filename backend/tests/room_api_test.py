from flask import Flask
from flask_testing import TestCase
import os
import unittest
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)
from app import create_app, db

class RoomApiTest(TestCase):
    test_room = {"name": "Test Room"}

    def create_app(self):
        return create_app(for_testing=True)

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get(self):
        """Tests GET at /rooms/{room_id}"""
        post_response = self.client.post("/rooms", json=self.test_room)
        get_response = self.client.get(f"/rooms/{post_response.json['id']}")
        self.assertEqual(get_response.json, post_response.json)

    def test_get_invalid_id(self):
        """Tests GET at /rooms/{room_id} with invalid room_id"""
        get_response = self.client.get("/rooms/0")
        self.assert404(get_response)

    def test_get_all(self):
        """Tests GET at /rooms"""
        response = self.client.get("/rooms")
        self.assertEqual(response.json, [])

    def test_post(self):
        """Tests POST at /rooms"""
        response = self.client.post("/rooms", json=self.test_room)
        self.assertEqual(response.json["name"], self.test_room["name"])

    def test_post_invalid_request(self):
        """Tests POST at /rooms with invalid request body"""
        response = self.client.post("/rooms", json={})
        self.assert400(response)

    def test_put(self):
        """Tests PUT at /rooms"""
        updated_room = {"name": "Updated Room", "video_id": "Random ID"}
        post_response = self.client.post("/rooms", json=self.test_room)
        put_response = self.client.put(f"/rooms/{post_response.json['id']}", json=updated_room)
        self.assertEqual(put_response.json["name"], updated_room["name"])
        self.assertEqual(post_response.json["id"], put_response.json["id"])

    def test_put_invalid_id(self):
        """Tests PUT at /rooms with invalid room_id"""
        updated_room = {"name": "Updated Room", "video_id": "Random ID", "video_state": "BAD_STATE"}
        put_response = self.client.put(f"/rooms/0", json=updated_room)
        self.assert404(put_response)

    def test_put_invalid_video_state(self):
        """Tests PUT at /rooms with an invalid video_state"""
        updated_room = {"name": "Updated Room", "video_id": "Random ID", "video_state": "BAD_STATE"}
        post_response = self.client.post("/rooms", json=self.test_room)
        put_response = self.client.put(f"/rooms/{post_response.json['id']}", json=updated_room)
        self.assert400(put_response)

    def test_delete(self):
        """Tests DELETE at /rooms"""
        post_response = self.client.post("/rooms", json=self.test_room)
        delete_response = self.client.delete(f"/rooms/{post_response.json['id']}")
        self.assert200(delete_response)
        get_response = self.client.get(f"/rooms/{post_response.json['id']}")
        self.assert404(get_response)

    def test_delete_invalid_id(self):
        """Tests DELETE at /rooms with invalid room_id"""
        delete_response = self.client.delete(f"/rooms/0")
        self.assert404(delete_response)

if __name__ == "__main__":
    unittest.main()