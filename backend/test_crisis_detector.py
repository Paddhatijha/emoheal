
"""
Crisis Detector Test Suite
Run: python test_crisis_detector.py
"""

from app.models.crisis_detector import CrisisDetector
import json

def run_tests():
    print("🧠 Testing EmoHeal Crisis Detector...\n")
    
    # Initialize detector
    try:
        detector = CrisisDetector()
        print("✅ CrisisDetector loaded successfully")
    except Exception as e:
        print(f"❌ Error loading detector: {e}")
        return
    
    # Test cases
    test_cases = [
        ("HIGH RISK: 'I want to kill myself'", "I want to kill myself"),
        ("MEDIUM RISK: 'Everything feels hopeless'", "Everything feels hopeless"),
        ("LOW RISK: 'I'm having a bad day'", "I'm having a bad day"),
        ("LOW RISK: 'I feel anxious about work'", "I feel anxious about work"),
        ("HIGH RISK: 'I'm going to overdose'", "I'm going to overdose"),
    ]
    
    print("=" * 60)
    print("TEST RESULTS")
    print("=" * 60)
    
    for description, message in test_cases:
        result = detector.detect_crisis_level(message, [])
        print(f"\n{description}")
        print(f"Input:  {message}")
        print(f"Level:  {result['level'].upper()} ({result['confidence']:.2f})")
        print(f"Action: {result['action']}")
        if result['triggered_keywords']:
            print(f"Keywords: {result['triggered_keywords']}")
        print("-" * 40)
    
    print("\n🎉 All tests completed!")

if __name__ == "__main__":
    run_tests()
