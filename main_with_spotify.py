import cv2
import time
from fer import FER
import spotipy
from spotipy.oauth2 import SpotifyOAuth

# ===================== SPOTIFY AUTH =====================
sp = spotipy.Spotify(
    auth_manager=SpotifyOAuth(
        client_id="63ae557f57cd4e31aeb8bcc0db1673d8",
        client_secret="93cc866850954c41a38d0f5b16925a03",
        redirect_uri="http://localhost:8888/callback",
        scope="user-modify-playback-state user-read-playback-state"
    )
)

print("✅ Spotify Premium Auth Successful")

# ===================== EMOTION → BOLLYWOOD QUERY =====================
EMOTION_QUERY = {
    "happy": "Bollywood happy songs",
    "sad": "Bollywood sad songs",
    "angry": "Bollywood motivational songs",
    "fear": "Bollywood calm songs",
    "surprise": "Bollywood party songs",
    "neutral": "Bollywood relaxing songs",
    "disgust": "Bollywood soothing songs"
}

# ===================== PLAY SONG =====================
def play_song_by_emotion(emotion):
    query = EMOTION_QUERY.get(emotion, "Bollywood songs")

    results = sp.search(q=query, type="track", limit=1, market="IN")

    if results["tracks"]["items"]:
        track = results["tracks"]["items"][0]
        sp.start_playback(uris=[track["uri"]])
        return f'{track["name"]} - {track["artists"][0]["name"]}'

    return "No song"

# ===================== CAMERA & EMOTION =====================
# ❌ MTCNN removed for SPEED
detector = FER(mtcnn=False)

cap = cv2.VideoCapture(0)

# ✅ Reduce resolution (BIG FPS boost)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

current_emotion = "neutral"
current_song = ""
last_change_time = time.time()

frame_count = 0
DETECT_EVERY_N_FRAMES = 15   # ⭐ KEY OPTIMIZATION

print("🎥 EmoHeal Running | Optimized | Press Q to Quit")

# ===================== MAIN LOOP =====================
while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)

    frame_count += 1

    # 🔥 Emotion detection every N frames
    if frame_count % DETECT_EVERY_N_FRAMES == 0:
        emotions = detector.detect_emotions(frame)

        if emotions:
            top_emotion = max(
                emotions[0]["emotions"],
                key=emotions[0]["emotions"].get
            )

            if (
                top_emotion != current_emotion
                and time.time() - last_change_time > 7
            ):
                current_emotion = top_emotion
                last_change_time = time.time()
                current_song = play_song_by_emotion(current_emotion)

    # ===================== DISPLAY =====================
    cv2.rectangle(frame, (0, 0), (640, 85), (0, 0, 0), -1)

    cv2.putText(
        frame,
        f"Emotion : {current_emotion}",
        (20, 35),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )

    cv2.putText(
        frame,
        f"Song : {current_song}",
        (20, 70),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.55,
        (255, 255, 255),
        2
    )

    cv2.imshow("EmoHeal - Fast Bollywood Player", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# ===================== CLEANUP =====================
cap.release()
cv2.destroyAllWindows()









                                                              











