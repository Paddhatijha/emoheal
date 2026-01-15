"""
Chat Bot API Routes
Endpoints for chat history, mood tracking, crisis alerts
"""

from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timedelta
from typing import List, Dict
import logging
from ..database.db import get_database

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["chatbot"])

# ============================================
# CHAT HISTORY ENDPOINTS
# ============================================

@router.get("/chat-history/{user_id}")
async def get_chat_history(
    user_id: str,
    limit: int = Query(50, ge=1, le=500),
    skip: int = Query(0, ge=0)
):
    """Get user's chat conversation history"""
    try:
        db = await get_database()
        
        total = await db.chatbot_history.count_documents({"userId": user_id})
        history = await db.chatbot_history.find(
            {"userId": user_id}
        ).sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)
        
        for msg in history:
            msg["_id"] = str(msg["_id"])
        
        logger.info(f"Retrieved {len(history)} messages for user {user_id}")
        
        return {
            "success": True,
            "user_id": user_id,
            "history": history,
            "count": len(history),
            "total": total,
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Error retrieving chat history: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mood-summary/{user_id}")
async def get_mood_summary(
    user_id: str,
    days: int = Query(7, ge=1, le=90)
):
    """Get user's mood patterns and emotion distribution"""
    try:
        db = await get_database()
        
        start_date = datetime.now() - timedelta(days=days)
        messages = await db.chatbot_history.find({
            "userId": user_id,
            "timestamp": {"$gte": start_date}
        }).to_list(500)
        
        emotion_counts = {}
        sentiment_scores = []
        daily_sentiment = {}
        
        for msg in messages:
            emotions = msg.get('emotionDetected', [])
            for emotion in emotions:
                emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1
            
            sentiment = msg.get('sentiment', {})
            compound = sentiment.get('compound', 0)
            sentiment_scores.append(compound)
            
            date_key = msg['timestamp'].strftime("%Y-%m-%d")
            if date_key not in daily_sentiment:
                daily_sentiment[date_key] = {"scores": [], "count": 0}
            daily_sentiment[date_key]["scores"].append(compound)
            daily_sentiment[date_key]["count"] += 1
        
        avg_sentiment = sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0
        top_emotions = sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        sentiment_trend = {
            date: {
                "average": sum(data["scores"]) / len(data["scores"]),
                "count": data["count"]
            }
            for date, data in sorted(daily_sentiment.items())
        }
        
        logger.info(f"Generated mood summary for {user_id} ({days} days)")
        
        return {
            "success": True,
            "userId": user_id,
            "period_days": days,
            "total_messages": len(messages),
            "emotion_distribution": emotion_counts,
            "top_emotions": [{"emotion": e, "count": c} for e, c in top_emotions],
            "average_sentiment": round(avg_sentiment, 3),
            "sentiment_trend": sentiment_trend,
            "analysis_date": datetime.now().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error generating mood summary: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/crisis-alerts/{user_id}")
async def get_crisis_alerts(
    user_id: str,
    resolved: bool = Query(None)
):
    """Get user's crisis alerts"""
    try:
        db = await get_database()
        
        query = {"userId": user_id}
        if resolved is not None:
            query["resolved"] = resolved
        
        alerts = await db.crisis_alerts.find(query).sort("timestamp", -1).to_list(100)
        
        for alert in alerts:
            alert["_id"] = str(alert["_id"])
        
        unresolved_count = await db.crisis_alerts.count_documents({
            "userId": user_id,
            "resolved": False
        })
        
        logger.info(f"Retrieved {len(alerts)} crisis alerts for {user_id}")
        
        return {
            "success": True,
            "user_id": user_id,
            "alerts": alerts,
            "count": len(alerts),
            "unresolved_count": unresolved_count
        }
        
    except Exception as e:
        logger.error(f"Error retrieving crisis alerts: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user-stats/{user_id}")
async def get_user_statistics(user_id: str):
    """Get comprehensive user statistics"""
    try:
        db = await get_database()
        
        total_messages = await db.chatbot_history.count_documents({"userId": user_id})
        total_sessions = await db.sessions.count_documents({"userId": user_id})
        crisis_count = await db.crisis_alerts.count_documents({
            "userId": user_id,
            "alert_level": "high"
        })
        latest = await db.chatbot_history.find_one(
            {"userId": user_id},
            sort=[("timestamp", -1)]
        )
        
        return {
            "success": True,
            "userId": user_id,
            "total_messages": total_messages,
            "total_sessions": total_sessions,
            "crisis_alerts": crisis_count,
            "last_message_time": latest["timestamp"].isoformat() if latest else None
        }
        
    except Exception as e:
        logger.error(f"Error retrieving user stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health/database")
async def database_health():
    """Check database connection and status"""
    try:
        db = await get_database()
        await db.command("ping")
        
        return {
            "success": True,
            "database": "connected",
            "status": "healthy"
        }
        
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {
            "success": False,
            "database": "disconnected",
            "status": "unhealthy",
            "error": str(e)
        }
