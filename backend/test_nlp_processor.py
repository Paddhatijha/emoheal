from app.services.nlp_processor import NLPProcessor

processor = NLPProcessor()

test_messages = [
    "I'm feeling very anxious about my exams",
    "I feel so depressed and worthless",
    "Work is overwhelming me completely",
    "I'm lonely and nobody cares"
]

for msg in test_messages:
    analysis = processor.process_message(msg)
    print(f"\n📝 '{msg}'")
    print(f"Sentiment: {analysis['sentiment']}")
    print(f"Emotions: {analysis['emotions']}")
    print(f"Topics: {analysis['topics']}")
    print("-" * 50)
