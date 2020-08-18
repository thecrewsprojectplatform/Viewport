from flask import Flask
from flask_testing import TestCase
import os
import unittest
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)
from app import create_app, db

class VideoApiTest(TestCase):
    test_video = {"url": "test_url"}

    def create_app(self):
        return create_app(for_testing=True)
    
    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_post(self):
        """Tests POST at /videos"""
        response = self.client.post("/videos", json=self.test_video)
        self.assertEqual(response.json["url"], self.test_video["url"])

    def test_post_invalid_request(self):
        """Tests POST at /videos with invalid request body"""
        response = self.client.post("/videos", json={})
        self.assert400(response)

    def test_get(self):
        """Tests GET at /videos/{video_id}"""
        post_response = self.client.post("/videos", json=self.test_video)
        get_response = self.client.get(f"/videos/{post_response.json['id']}")
        self.assertEqual(get_response.json, post_response.json)
    
    def test_get_invalid_id(self):
        """Tests GET at /videos/{video_id} with invalid request body"""
        get_response = self.client.get("/videos/0")
        self.assert404(get_response)

    def test_delete(self):
        """Tests DELETE at /videos/{video_id}"""
        post_response = self.client.post("/videos", json=self.test_video)
        delete_response = self.client.delete(f"/videos/{post_response.json['id']}")
        self.assert200(delete_response)
        get_response = self.client.get(f"/videos/{post_response.json['id']}")
        self.assert404(get_response)

    def test_delete_invalid_id(self):
        delete_response = self.client.delete("/videos/0")
        self.assert404(delete_response)

if __name__ == "__main__":
    unittest.main()