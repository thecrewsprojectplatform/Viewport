from flask import Flask
from flask_testing import TestCase
import os
import unittest
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)
from app import create_app, db

class PlaylistApiTest(TestCase):
    test_room = {"name": "Test Room"}
    test_room_id = -1
    test_user = {"name": "Test User"}
    test_user_id = -1
    test_video = {"url": "test_url"}
    test_video_id = -1
    test_playlist = None

    def create_app(self):
        return create_app(for_testing=True)

    def setUp(self):
        db.create_all()
        room_post = self.client.post("/rooms", json=self.test_room)
        self.test_room_id = room_post.json["id"]
        user_post = self.client.post("/users", json=self.test_user)
        self.test_user_id = user_post.json["id"]

        self.test_video["user_id"] = self.test_user_id
        video_post = self.client.post("/videos", json=self.test_video)
        self.test_video_id = video_post.json["id"]
        self.test_playlist = {"room_id": self.test_room_id, "video_id": self.test_video_id}

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_post(self):
        """Tests POST at /rooms/{room_id}/playlist"""
        response = self.client.post(f"/rooms/{self.test_room_id}/playlist", json=self.test_playlist)
        self.assertEqual(response.json, self.test_video_id)

    def test_post_invalid_id(self):
        """Tests POST at /rooms/{room_id}/playlist with invalid request body"""
        response = self.client.post(f"/rooms/{self.test_room_id + 1}/playlist", json=self.test_playlist)
        self.assert404(response)

    def test_post_invalid_request(self):
        """Tests POST at /rooms/{room_id}/playlist with invalid request body"""
        response = self.client.post(f"/rooms/{self.test_room_id}/playlist", json={})
        self.assert400(response)
        
    def test_get(self):
        """Tests GET at /rooms/{room_id}/playlist"""
        post_response = self.client.post(f"/rooms/{self.test_room_id}/playlist", json=self.test_playlist)
        get_response = self.client.get(f"/rooms/{self.test_room_id}/playlist")
        self.assertEqual(get_response.json[0]["room_id"], self.test_room_id)
        self.assertEqual(get_response.json[0]["video_id"], self.test_video_id)

    def test_get_invalid_id(self):
        """Tests GET at /rooms/{room_id}/playlist with invalid room_id"""
        get_response = self.client.get(f"/rooms/{self.test_room_id + 1}/playlist")
        self.assert404(get_response)

    def test_delete(self):
        """Tests DELETE at /rooms/{room_id}/playlist/{video_id}"""
        post_response = self.client.post(f"/rooms/{self.test_room_id}/playlist", json=self.test_playlist)
        delete_response = self.client.delete(f"/rooms/{self.test_room_id}/playlist/{self.test_video_id}")
        self.assert200(delete_response)
    
    def test_delete_invalid_room_id(self):
        """Tests DELETE at /rooms/{room_id}/playlist/{video_id}"""
        post_response = self.client.post(f"/rooms/{self.test_room_id}/playlist", json=self.test_playlist)
        delete_response = self.client.delete(f"/rooms/{self.test_room_id + 1}/playlist/{self.test_video_id}")
        self.assert404(delete_response)

    def test_delete_invalid_video_id(self):
        """Tests DELETE at /rooms/{room_id}/playlist/{video_id}"""
        post_response = self.client.post(f"/rooms/{self.test_room_id}/playlist", json=self.test_playlist)
        delete_response = self.client.delete(f"/rooms/{self.test_room_id}/playlist/{self.test_video_id + 1}")
        self.assert404(delete_response)