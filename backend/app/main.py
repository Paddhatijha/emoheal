"""
EmoHeal Psychiatric Chatbot - Main FastAPI Application
Entry point for the backend server
"""

"""
EmoHeal Psychiatric Chatbot API
Phase 5: Complete Backend with MongoDB
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime
import logging
from typing import List, Dict

# Import database module
from .database.db import connect_to_mongo, close_mongo_connection, get_database, create_indexes
from .routes.chatbot import router as chatbot_router

# Import AI services
from .models.crisis_detector import CrisisDetector
from .services.nlp_processor import NLPProcessor
from .services.response_generator import TherapeuticResponseGenerator

# ============================================
# INITIALIZE SERVICES
# ============================================

CRISIS_READY = False
NLP_READY = False

try:
    crisis_detector = CrisisDetector()
    CRISIS_READY = True
    print("✅ CrisisDetector loaded")
except Exception as e:
    print(f"⚠️ CrisisDetector failed: {e}")

try:
    nlp_processor = NLPProcessor()
    response_generator = TherapeuticResponseGenerator()
    NLP_READY = True
    print("✅ NLP & Response Generator loaded")
except Exception as e:
    print(f"⚠️ NLP failed: {e}")

# ============================================
# CREATE FASTAPI APP
# ============================================

app = FastAPI(
    title="EmoHeal Psychiatric Chatbot API",
    version="0.3.0",
    description="AI-powered mental health support with crisis detection"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(chatbot_router)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================
# STARTUP & SHUTDOWN EVENTS
# ============================================

@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    await connect_to_mongo()
    #await create_indexes()
    logger.info("🚀 EmoHeal API started with database")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database on shutdown"""
    await close_mongo_connection()
    logger.info("🔌 EmoHeal API stopped")

# ============================================
# ROOT ENDPOINTS
# ============================================

@app.get("/")
async def root():
    """Root endpoint with API info"""
    return {
        "service": "EmoHeal Psychiatric Chatbot API",
        "version": "0.3.0",
        "status": "running",
        "modules": {
            "crisis_detection": CRISIS_READY,
            "nlp_processing": NLP_READY,
            "database": "connected"
        },
        "endpoints": {
            "websocket_chat": "ws://localhost:8000/ws/chat/{user_id}",
            "api_docs": "/docs",
            "health": "/health",
            "database_health": "/api/health/database",
            "chat_history": "/api/chat-history/{user_id}",
            "mood_summary": "/api/mood-summary/{user_id}",
            "crisis_alerts": "/api/crisis-alerts/{user_id}",
            "user_stats": "/api/user-stats/{user_id}"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "emoheal-psychiatric-chatbot",
        "crisis_detector": CRISIS_READY,
        "nlp_processor": NLP_READY
    }

@app.get("/test-crisis")
async def test_crisis():
    """Test crisis detection"""
    if not CRISIS_READY:
        return {"error": "Crisis detector not ready"}
    
    tests = [
        "I want to kill myself",
        "I'm feeling sad",
        "Everything feels hopeless",
        "I feel anxious about work"
    ]
    
    results = []
    for test in tests:
        result = crisis_detector.detect_crisis_level(test, [])
        results.append({"input": test, "result": result})
    
    return {"tests": results, "total": len(results)}

# ============================================
# WEBSOCKET CHAT ENDPOINT
# ============================================

@app.websocket("/ws/chat/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    """
    WebSocket endpoint for real-time chat
    Handles:
    - Crisis detection
    - NLP emotion analysis
    - Response generation
    - Data storage in MongoDB
    """
    await websocket.accept()
    db = await get_database()
    
    session_id = f"{user_id}_{datetime.now().timestamp()}"
    conversation_history: List[Dict] = []
    
    try:
        # Send welcome message
        await websocket.send_json({
            "type": "bot_response",
            "message": "Hello! I'm EmoHeal. How are you feeling today?",
            "timestamp": datetime.now().isoformat()
        })
        
        # Main chat loop
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message_data = json.loads(data)
            user_message = message_data.get("message", "").strip()
            
            if not user_message:
                continue
            
            # Add to conversation history
            conversation_history.append({
                "message": user_message,
                "timestamp": datetime.now()
            })
            
            # ---- STEP 1: CRISIS DETECTION ----
            crisis_level = "low"
            crisis_result = None
            
            if CRISIS_READY:
                crisis_result = crisis_detector.detect_crisis_level(user_message, conversation_history)
                crisis_level = crisis_result['level']
                
                # If HIGH CRISIS, handle immediately
                if crisis_level == 'high':
                    # Log crisis alert to database
                    await db.crisis_alerts.insert_one({
                        "user_id": user_id,
                        "session_id": session_id,
                        "alert_level": "high",
                        "trigger_message": user_message,
                        "detected_keywords": crisis_result.get('triggered_keywords', []),
                        "resolved": False,
                        "timestamp": datetime.now()
                    })
                    
                    # Send crisis alert to user
                    response = {
                        "type": "crisis_alert",
                        "message": crisis_result['message'],
                        "level": "high",
                        "resources": {
                            "suicide_hotline": "988",
                            "crisis_text": "Text HOME to 741741",
                            "emergency": "911"
                        },
                        "timestamp": datetime.now().isoformat()
                    }
                    await websocket.send_json(response)
                    
                    # Store message in database
                    await db.chatbot_history.insert_one({
                        "userId": user_id,
                        "sessionId": session_id,
                        "userMessage": user_message,
                        "botResponse": "CRISIS_ALERT",
                        "sentiment": {},
                        "emotionDetected": [],
                        "crisisLevel": "high",
                        "crisisConfidence": crisis_result.get('confidence', 0),
                        "timestamp": datetime.now()
                    })
                    
                    # Skip normal response and continue
                    continue
            
            # ---- STEP 2: NLP ANALYSIS ----
            nlp_analysis = None
            emotions = []
            
            if NLP_READY:
                nlp_analysis = nlp_processor.process_message(user_message)
                emotions = nlp_analysis.get('emotions', [])
            
            # ---- STEP 3: RESPONSE GENERATION ----
            if NLP_READY and nlp_analysis:
                bot_response = response_generator.generate_response(
                    nlp_analysis,
                    crisis_level,
                    conversation_history
                )
            else:
                bot_response = f"I hear you saying: '{user_message}'. Tell me more about how you're feeling."
            
            # ---- STEP 4: STORE IN DATABASE ----
            await db.chatbot_history.insert_one({
                "userId": user_id,
                "sessionId": session_id,
                "userMessage": user_message,
                "botResponse": bot_response,
                "sentiment": nlp_analysis['sentiment'] if nlp_analysis else {},
                "emotionDetected": [e['emotion'] for e in emotions] if emotions else [],
                "crisisLevel": crisis_level,
                "crisisConfidence": crisis_result.get('confidence', 0) if crisis_result else 0,
                "timestamp": datetime.now()
            })
            
            # ---- STEP 5: SEND RESPONSE TO USER ----
            response_data = {
                "type": "bot_response",
                "message": bot_response,
                "crisis_level": crisis_level,
                "timestamp": datetime.now().isoformat()
            }
            
            if nlp_analysis:
                response_data["sentiment"] = nlp_analysis['sentiment']
                response_data["emotions"] = emotions
                response_data["topics"] = nlp_analysis.get('topics', [])
            
            await websocket.send_json(response_data)
            
            logger.info(f"Chat: User={user_id}, Crisis={crisis_level}, Message processed")
    
    except WebSocketDisconnect:
        logger.info(f"User {user_id} disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        try:
            await websocket.close()
        except:
            pass
