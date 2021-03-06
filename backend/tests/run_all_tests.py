import flask_testing
import os
import unittest

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.insert(0, parent_dir)

from tests.user_api_test import UserApiTest
from tests.room_api_test import RoomApiTest
from tests.room_user_api_test import RoomUserApiTest
from tests.video_api_test import VideoApiTest
from tests.video_player_api_test import VideoPlayerApiTest
from tests.playlist_api_test import PlaylistApiTest

if __name__ == "__main__":
    suite = unittest.TestSuite()
    result = unittest.TestResult()
    suite.addTest(unittest.makeSuite(UserApiTest))
    suite.addTest(unittest.makeSuite(RoomApiTest))
    suite.addTest(unittest.makeSuite(RoomUserApiTest))
    suite.addTest(unittest.makeSuite(VideoPlayerApiTest))
    suite.addTest(unittest.makeSuite(VideoApiTest))
    suite.addTest(unittest.makeSuite(PlaylistApiTest))
    runner = unittest.TextTestRunner(verbosity=2)
    results = runner.run(suite)
    print(results)