# MongoDB Backup System for Arabic Typing App

This document explains the MongoDB backup system that saves all transliteration suggestions to create a local database as a fallback when the Yamli API is unavailable.

## Overview

The backup system automatically:
1. **Saves** all successful API responses to MongoDB
2. **Retrieves** translations from backup when API fails
3. **Provides** fallback translations for common words
4. **Tracks** usage frequency and statistics

## Setup Instructions

### 1. Install MongoDB

**Option A: Local MongoDB**
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/atlas
2. Create a free cluster
3. Get connection string

### 2. Configure Environment Variables

Create `.env.local` file in your project root:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/arabizi-backup

# For MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arabizi-backup?retryWrites=true&w=majority
```

### 3. Install Dependencies

The required packages are already installed:
- `mongodb` - MongoDB driver
- `mongoose` - ODM for MongoDB

## How It Works

### 1. Translation Flow

```
User types Latin word → API checks Yamli → Success? → Save to MongoDB + Return suggestions
                                      ↓ Fail?
                                   Check MongoDB → Found? → Return cached suggestions
                                      ↓ Not found?
                                   Return fallback translations
```

### 2. Database Schema

```typescript
interface ITranslation {
  latinWord: string;        // Original Latin word (indexed)
  arabicSuggestions: string[]; // Array of Arabic suggestions
  bestMatch: string;        // Best/first suggestion
  frequency: number;        // How many times used
  lastUsed: Date;          // Last usage timestamp
  createdAt: Date;         // When first saved
  updatedAt: Date;         // Last update
}
```

### 3. API Integration

The transliterate API now returns additional information:

```json
{
  "success": true,
  "candidates": ["أهلا", "أهلاً"],
  "best_match": "أهلا",
  "original": "ahlan",
  "source": "api",           // "api", "backup", or "fallback"
  "backup_available": true
}
```

## API Endpoints

### Translation API
- `POST /api/transliterate` - Main transliteration endpoint

### Backup Management API
- `GET /api/backup?action=stats` - Get database statistics
- `GET /api/backup?action=list&limit=50&page=1` - List all translations
- `GET /api/backup?action=search&word=ahlan` - Search specific word
- `GET /api/backup?action=popular&limit=20` - Get most popular translations
- `POST /api/backup` - Manually save translation
- `DELETE /api/backup?word=ahlan` - Delete specific translation
- `DELETE /api/backup?action=clear-all` - Clear all translations

## Usage Examples

### Check Database Stats
```bash
curl "http://localhost:3000/api/backup?action=stats"
```

### Search for a Word
```bash
curl "http://localhost:3000/api/backup?action=search&word=ahlan"
```

### Get Popular Translations
```bash
curl "http://localhost:3000/api/backup?action=popular&limit=10"
```

### Manually Save Translation
```bash
curl -X POST "http://localhost:3000/api/backup" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "save",
    "word": "salam",
    "suggestions": ["سلام", "سلم"],
    "bestMatch": "سلام"
  }'
```

## Features

### 1. Automatic Backup
- Every successful Yamli API response is automatically saved
- Duplicate words update existing entries and increment frequency
- No manual intervention required

### 2. Intelligent Fallback
- If Yamli API fails, system checks MongoDB backup
- If backup doesn't exist, uses built-in fallback translations
- Ensures app always provides suggestions

### 3. Performance Tracking
- Tracks usage frequency for each word
- Records last usage timestamps
- Provides statistics on backup database size

### 4. Built-in Fallbacks
Over 50 common Arabic words are pre-programmed as fallbacks:
- Greetings: salam, ahlan, sahlan
- Common words: ana, anta, huwa, hiya
- Numbers: wa7da, tneyn
- And many more...

## Database Management

### View Database Contents
```javascript
// In MongoDB shell or MongoDB Compass
use arabizi-backup
db.translations.find().limit(10)
```

### Check Database Size
```javascript
db.stats()
db.translations.countDocuments()
```

### Find Most Popular Words
```javascript
db.translations.find().sort({frequency: -1}).limit(10)
```

### Clear Old Entries
```javascript
// Remove entries older than 30 days
const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);
db.translations.deleteMany({lastUsed: {$lt: thirtyDaysAgo}})
```

## Benefits

1. **Reliability**: App works even when Yamli API is down
2. **Performance**: Cached responses are faster than API calls
3. **Offline Capability**: Can work with previously cached words
4. **Data Insights**: Track popular words and usage patterns
5. **Cost Reduction**: Reduces API calls for repeated words

## Monitoring

The system logs all operations:
- API successes/failures
- Backup saves/retrievals
- Fallback usage
- Database errors

Check your application logs to monitor the backup system performance.

## Troubleshooting

### MongoDB Connection Issues
1. Check if MongoDB is running: `brew services list | grep mongodb`
2. Verify connection string in `.env.local`
3. Check firewall settings for MongoDB port (27017)

### API Not Saving to Backup
1. Check MongoDB connection
2. Verify environment variables
3. Check application logs for errors

### Backup Not Being Used
1. Confirm Yamli API is actually failing
2. Check if word exists in backup database
3. Verify backup service is properly imported

## Future Enhancements

1. **Export/Import**: Backup data export/import functionality
2. **Analytics Dashboard**: Web interface for backup statistics
3. **Sync**: Multi-instance backup synchronization
4. **Machine Learning**: Improve suggestions based on usage patterns
5. **Compression**: Optimize storage for large datasets 