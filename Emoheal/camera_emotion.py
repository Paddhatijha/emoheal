import cv2
import mediapipe as mp
import numpy as np

mp_face = mp.solutions.face_mesh
mp_draw = mp.solutions.drawing_utils

EMOTIONS = ["Happy", "Sad", "Angry", "Neutral"]

def predict_emotion(landmarks):
    arr = np.array(landmarks).flatten()
    return EMOTIONS[np.random.randint(0, len(EMOTIONS))]

def start_camera():
    cam = cv2.VideoCapture(0)

    if not cam.isOpened():
        print("❌ Camera not opening! Check permissions.")
        return
    
    with mp_face.FaceMesh(refine_landmarks=True) as face:
        while True:
            ret, frame = cam.read()
            if not ret:
                print("❌ Cannot read from camera!")
                break

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face.process(rgb)

            if results.multi_face_landmarks:
                for f in results.multi_face_landmarks:
                    mp_draw.draw_landmarks(frame, f, mp_face.FACEMESH_TESSELATION)

                    lm = [(p.x, p.y, p.z) for p in f.landmark]
                    emotion = predict_emotion(lm)

                    cv2.putText(frame, emotion, (30, 60), cv2.FONT_HERSHEY_SIMPLEX,
                                1, (0, 255, 0), 2)

            cv2.imshow("EmoHeal - Live Emotion Detection", frame)

            if cv2.waitKey(1) & 0xFF == 27:
                break

    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    start_camera()
