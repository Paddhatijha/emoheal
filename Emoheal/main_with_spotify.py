import cv2
from fer import FER
import random
import time
import webbrowser
import spotipy
from spotipy.oauth2 import SpotifyOAuth

# ----------------------------------------------------
# 🎧 SPOTIFY AUTHENTICATION (NO ERROR METHOD)
# ----------------------------------------------------
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id="63ae557f57cd4e31aeb8bcc0db1673d8",      
    client_secret="93cc866850954c41a38d0f5b16925a03",  
    redirect_uri="http://127.0.0.1:8888/callback",
    scope="user-read-playback-state user-modify-playback-state"
))

print("Spotify auth successful!")

# ----------------------------------------------------
# 🎵 MOOD-BASED SONGS (Bollywood + Hollywood Mixed)
# ----------------------------------------------------
playlists = {
    "happy": [
        "https://open.spotify.com/track/0LSG3Y1jPzIAmEYDxk8d2l",
        "https://open.spotify.com/track/5YqnzjVEonxJr1q8LojRxX",
        "https://open.spotify.com/track/4uLU6hMcjMI75M1A2tKUQC",
        "https://open.spotify.com/track/2XU0oxnq2qxCpomAAuJY8K",
        "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg"
    ],
    "sad": [
        "https://open.spotify.com/track/0ldH66oPChurWQIbSoeM8z",
        "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
        "https://open.spotify.com/track/7qEHsqek33rTcFNT9PFqLf",
        "https://open.spotify.com/track/4kflIGfjdZJW4ot2ioixTB"
    ],
    "angry": [
        "https://open.spotify.com/track/3T4tUhGYeRLMzF9RRiX11q",
        "https://open.spotify.com/track/1yGbNOtRIgdIi47LgG5bPq",
        "https://open.spotify.com/track/4O3w1Qd2zJYCT0w6vNzzbo"
    ],
    "neutral": [
        "https://open.spotify.com/track/1lDWb6b6ieDQ2xT7ewTC3G",
        "https://open.spotify.com/track/6I3mqTwhRpn34SLVafSH7G",
        "https://open.spotify.com/track/5CtI0qwDJkDQGwXD1H1cLb"
    ],
    "surprise": [
        "https://open.spotify.com/track/0Ty3QwVz5WbMcXm0ZgZC6E",
        "https://open.spotify.com/track/3EcXqN3Vc3Omr2jLbP4N4Z",
        "https://open.spotify.com/track/6uL7j3tA4O4QyTWTUB4PRD"
    ]
}

# ----------------------------------------------------
# 😀 FAST EMOTION DETECTOR (NO MTCNN – FASTER)
# ----------------------------------------------------
detector = FER(mtcnn=False)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Camera error!")
    exit()

print("EmoHeal Running... Press Q to Quit")

last_mood = None
last_play_time = 0
current_song_name = ""

def get_song_name(url):
    return url.split("/")[-1]

# ----------------------------------------------------
# 🔥 MAIN LOOP
# ----------------------------------------------------
while True:
    ret, frame = cap.read()
    if not ret:
        print("Frame error!")
        break

    emotions = detector.detect_emotions(frame)

    if emotions:
        mood_data = emotions[0]["emotions"]
        top_mood = max(mood_data, key=mood_data.get)

        # Show mood
        cv2.putText(frame, f"Mood: {top_mood}", (40, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

        current_time = time.time()

        # Play new song if mood changed or after 25 sec
        if top_mood != last_mood or (current_time - last_play_time > 25):
            if top_mood in playlists:
                song_url = random.choice(playlists[top_mood])
                webbrowser.open(song_url)

                current_song_name = get_song_name(song_url)
                print(f"🎵 Mood: {top_mood} → Playing: {song_url}")

                last_mood = top_mood
                last_play_time = current_time

        # Display current song
        cv2.putText(frame, f"Playing: {current_song_name}", (40, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 220, 0), 2)

    cv2.imshow("EmoHeal - Live Mood Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()



                                                              











