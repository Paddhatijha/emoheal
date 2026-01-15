import sounddevice as sd
import numpy as np
import librosa

EMOTIONS = ["Happy", "Sad", "Angry", "Calm"]

def predict_emotion(audio):
    return EMOTIONS[np.random.randint(0, len(EMOTIONS))]

def record_audio(duration=3, fs=22050):
    print("🎤 Speak now...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1)
    sd.wait()
    print("✔ Recorded")
    
    audio = audio.flatten()
    return audio

def start_speech_detection():
    audio = record_audio()
    emotion = predict_emotion(audio)
    print(f"Detected Emotion: {emotion}")

if __name__ == "__main__":
    start_speech_detection()
