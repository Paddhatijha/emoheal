import spacy
from textblob import TextBlob
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from typing import Dict, List
import re

class NLPProcessor:
    def __init__(self):
        # Load spaCy model
        self.nlp = spacy.load('en_core_web_sm')
        
        # Initialize sentiment analyzer (VADER)
        self.sia = SentimentIntensityAnalyzer()
        
        # Mental health lexicon
        self.mental_health_terms = {
            'depression': ['sad', 'empty', 'hopeless', 'worthless', 'depressed', 'down', 'blue'],
            'anxiety': ['worried', 'anxious', 'nervous', 'scared', 'panic', 'fear', 'afraid'],
            'stress': ['stressed', 'overwhelmed', 'pressure', 'tense', 'burden', 'exhausted'],
            'anger': ['angry', 'furious', 'irritated', 'mad', 'frustrated', 'rage'],
            'loneliness': ['alone', 'lonely', 'isolated', 'abandoned', 'left out', 'no one cares']
        }
        
        # Therapy topics
        self.therapy_topics = {
            'relationships': ['friend', 'family', 'partner', 'love', 'break up', 'relationship'],
            'work': ['job', 'work', 'career', 'boss', 'colleague', 'office'],
            'health': ['health', 'sick', 'pain', 'doctor', 'hospital', 'ill'],
            'sleep': ['sleep', 'insomnia', 'tired', 'rest', 'wake up'],
            'school': ['school', 'exam', 'test', 'grade', 'study', 'homework']
        }

    def process_message(self, user_message: str) -> Dict:
        """
        Comprehensive NLP analysis of user message
        Returns: sentiment, emotions, topics, entities
        """
        # Basic processing
        doc = self.nlp(user_message)
        
        # Sentiment analysis (VADER)
        sentiment = self.sia.polarity_scores(user_message)
        
        # Extract emotions
        emotions = self._extract_emotions(user_message)
        
        # Extract topics
        topics = self._extract_topics(doc)
        
        return {
            'text': user_message,
            'sentiment': {
                'compound': round(sentiment['compound'], 3),  # -1 to 1 (neg to pos)
                'positive': round(sentiment['pos'], 3),
                'negative': round(sentiment['neg'], 3),
                'neutral': round(sentiment['neu'], 3)
            },
            'emotions': emotions,
            'topics': topics,
            'entities': [(ent.text, ent.label_) for ent in doc.ents],
            'tokens': [token.text for token in doc]
        }

    def _extract_emotions(self, text: str) -> List[Dict]:
        """Extract emotion keywords from text"""
        emotions_found = []
        text_lower = text.lower()
        
        for emotion_category, terms in self.mental_health_terms.items():
            for term in terms:
                if term in text_lower:
                    intensity = self._calculate_intensity(term, text_lower)
                    emotions_found.append({
                        'emotion': emotion_category,
                        'term': term,
                        'intensity': round(intensity, 2)
                    })
                    break  # First match per category
        
        return emotions_found[:2]  # Top 2 emotions

    def _extract_topics(self, doc) -> List[str]:
        """Extract therapy topics from message"""
        topics = []
        text_lower = doc.text.lower()
        
        for topic, keywords in self.therapy_topics.items():
            if any(kw in text_lower for kw in keywords):
                topics.append(topic)
        
        return topics

    def _calculate_intensity(self, term: str, text: str) -> float:
        """Calculate emotional intensity (0-1)"""
        intensifiers = ['very', 'so', 'extremely', 'really', 'incredibly', 'absolutely']
        intensity = 0.5  # Base
        
        for intensifier in intensifiers:
            if f"{intensifier} {term}" in text or f"{intensifier} {term}s" in text:
                return 0.9
        
        return intensity

