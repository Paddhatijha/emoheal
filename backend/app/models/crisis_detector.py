import json
import numpy as np
from typing import Dict, List

class CrisisDetector:
    def __init__(self):
        # Load crisis keywords
        with open('../data/crisis_keywords.json', 'r') as f:
            self.keywords = json.load(f)
        
        # Risk levels with scores
        self.risk_levels = {
            'high': {'keywords': self.keywords['high_risk_keywords'], 'score': 0.9},
            'medium': {'keywords': self.keywords['medium_risk_keywords'], 'score': 0.5},
            'low': {'keywords': self.keywords['low_risk_keywords'], 'score': 0.2}
        }

    def detect_crisis_level(self, user_message: str, conversation_history: List[Dict]) -> Dict:
        """
        Detect crisis level from user message
        Returns: {level: 'low'|'medium'|'high', confidence: 0-1, triggered_keywords: [...]}
        """
        message_lower = user_message.lower()

        # Step 1: Check for high-risk keywords (IMMEDIATE DANGER)
        for keyword in self.risk_levels['high']['keywords']:
            if keyword in message_lower:
                return {
                    'level': 'high',
                    'confidence': 0.95,
                    'triggered_keywords': [keyword],
                    'action': 'IMMEDIATE_INTERVENTION',
                    'message': 'We detect you may be in immediate danger. Please reach out to emergency services: 988 (US) or your local crisis line.'
                }

        # Step 2: Check for medium-risk keywords
        for keyword in self.risk_levels['medium']['keywords']:
            if keyword in message_lower:
                return {
                    'level': 'medium',
                    'confidence': 0.7,
                    'triggered_keywords': [keyword],
                    'action': 'INCREASED_MONITORING',
                    'message': "I sense you're going through something difficult. Let's talk about this."
                }

        # Step 3: Analyze conversation pattern
        crisis_score = self._analyze_conversation_pattern(conversation_history)

        if crisis_score > 0.6:
            return {
                'level': 'medium',
                'confidence': crisis_score,
                'triggered_keywords': [],
                'action': 'CONTINUED_SUPPORT',
                'message': 'I notice a pattern of difficult emotions. How can I help you right now?'
            }

        return {
            'level': 'low',
            'confidence': 0.1,
            'triggered_keywords': [],
            'action': 'NORMAL_CONVERSATION',
            'message': None
        }

    def _analyze_conversation_pattern(self, conversation_history: List[Dict]) -> float:
        """Analyze overall conversation for crisis indicators"""
        if len(conversation_history) < 3:
            return 0.0

        crisis_score = 0.0
        recent_messages = conversation_history[-5:]  # Last 5 messages

        negative_words = ["can't", "won't", "never", "always", "nothing", "nobody"]
        
        for msg in recent_messages:
            text = msg.get('message', '').lower()
            for word in negative_words:
                if word in text:
                    crisis_score += 0.1

        return min(crisis_score, 1.0)
