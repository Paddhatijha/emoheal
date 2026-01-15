from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from main_with_spotify import process_frame

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/emotion")
def emotion_api():
    emotion, song = process_frame()
    return {
        "emotion": emotion,
        "song": song
    }

