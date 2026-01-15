import json
import random
from typing import Dict, List

class TherapeuticResponseGenerator:
    def __init__(self):
        # Load therapeutic response templates
        try:
            with open('../data/therapeutic_responses.json', 'r') as f:
                self.responses = json.load(f)
        except FileNotFoundError:
            self.responses = {"general": {"default": "I'm here to listen. Tell me more."}}

    def generate_response(self, nlp_analysis: Dict, crisis_level: str, conversation_history: List[Dict]) -> str:
        """
        Generate empathetic therapeutic response
        """
        # Step 1: Handle crisis first
        if crisis_level == 'high':
            return self.responses['crisis_intervention'].get('immediate_support', 'Please reach out for help immediately.')
        
        if crisis_level == 'medium':
            return self.responses['crisis_intervention'].get('high_risk_keywords', "I want to help you through this difficult time.")
        
        # Step 2: Determine therapy type
        therapy_type = self._select_therapy_type(nlp_analysis)
        
        # Step 3: Get response template
        response_template = self._get_response_template(therapy_type, nlp_analysis)
        
        # Step 4: Personalize
        final_response = self._personalize_response(response_template, nlp_analysis, conversation_history)
        
        return final_response

    def _select_therapy_type(self, nlp_analysis: Dict) -> str:
        """Select therapy approach based on analysis"""
        sentiment = nlp_analysis.get('sentiment', {})
        emotions = nlp_analysis.get('emotions', [])
        
        # Severe negative sentiment → CBT
        if sentiment.get('negative', 0) > 0.5 and sentiment.get('compound', 0) < -0.3:
            return 'cognitive_behavioral_therapy'
        
        # Anxiety detected → DBT
        if any(e['emotion'] == 'anxiety' for e in emotions):
            return 'dialectical_behavior_therapy'
        
        # Default empathetic listening
        return 'empathetic_reflection'

    def _get_response_template(self, therapy_type: str, nlp_analysis: Dict) -> str:
        """Select specific response template"""
        responses = self.responses.get(therapy_type, self.responses.get('empathetic_reflection', {}))
        
        # Match to primary emotion
        emotions = nlp_analysis.get('emotions', [])
        if emotions:
            primary_emotion = emotions[0]['emotion']
            if primary_emotion in responses:
                return responses[primary_emotion]
        
        # Match to topics
        topics = nlp_analysis.get('topics', [])
        for topic in topics:
            if topic in responses:
                return responses[topic]
        
        return responses.get('general', 'Tell me more about how you\'re feeling.')

    def _personalize_response(self, template: str, nlp_analysis: Dict, history: List[Dict]) -> str:
        """Personalize with user context"""
        response = template
        
        # Add emotion reflection
        emotions = nlp_analysis.get('emotions', [])
        if emotions:
            emotion_reflection = f"I hear you're feeling {emotions[0]['emotion']} right now. "
            response = emotion_reflection + response
        
        # Reference recent conversation
        if history and len(history) > 1:
            last_user_msg = history[-2].get('message', '')[:50] + "..."
            reflection = random.choice([
                f"Building on what you said about '{last_user_msg}'",
                f"Regarding your earlier mention of {last_user_msg}",
                ""
            ])
            if reflection:
                response = reflection + " " + response
        
        return response
