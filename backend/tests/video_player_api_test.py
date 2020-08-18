from flask import Flask
from flask_testing import TestCase
import os
import unittest
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)
from app import create_app, db

class VideoPlayerApiTest(TestCase):
    test_room = {"name": "Test Room"}
    test_room_id = -1

    def create_app(self):
        return create_app(for_testing=True)

    def setUp(self):
        db.create_all()
        room_post = self.client.post("/rooms", json=self.test_room)
        self.test_room_id = room_post.json["id"]

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_video_state(self):
        """Tests GET at /rooms/{room_id}/video_state"""
        get_response = self.client.get(f"/rooms/{self.test_room_id}/video_state")
        self.assertEqual(get_response.json, "PAUSED")

    def test_put_video_state(self):
        """Tests PUT at /rooms/{room_id}/video_state"""
        put_response = self.client.put(f"/rooms/{self.test_room_id}/video_state", json={"video_state": "PLAYING"})
        self.assertEqual(put_response.json["video_state"], "PLAYING")

    def test_put_invalid_video_state(self):
        """Tests PUT at /rooms/{room_id}/video_state with an invalid video_state"""
        put_response = self.client.put(f"/rooms/{self.test_room_id}/video_state", json={"video_state": "BAD_STATE"})
        self.assert400(put_response)

    def test_get_video_time(self):
        """Tests GET at /rooms/{room_id}/video_time"""
        get_response = self.client.get(f"/rooms/{self.test_room_id}/video_time")
        self.assertEqual(get_response.json, 0)

    def test_put_video_time(self):
        """Tests PUT at /rooms/{room_id}/video_time"""
        put_response = self.client.put(f"/rooms/{self.test_room_id}/video_time", json={"video_time": 0.5})
        self.assertEqual(put_response.json["video_time"], 0.5)

    def test_get_video_url(self):
        """Tests GET at /rooms/{room_id}/video_url"""
        get_response = self.client.get(f"/rooms/{self.test_room_id}/video_url")
        self.assertEqual(get_response.json, "")

    def test_put_video_url(self):
        """Tests PUT at /rooms/{room_id}/video_url"""
        put_response = self.client.put(f"/rooms/{self.test_room_id}/video_url", json={"video_url": "test_url"})
        self.assertEqual(put_response.json["video_url"], "test_url")

if __name__ == "__main__":
    unittest.main()