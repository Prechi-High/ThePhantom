# Redis Strategy for THE PHANTOM

## 1. Live Session State (Hashes)
Key: `session:{sessionId}:state`
Fields:
- `status`: registration | lobby | active | completed
- `round`: current round number
- `phase`: target | arena | spin | resolution
- `alive_count`: current alive players
- `pot_total`: total tokens/capital in play

## 2. Active Player Cache (Hashes)
Key: `session:{sessionId}:player:{userId}`
Fields:
- `tokens`: current token count
- `status`: alive | eliminated | pending_resurrection
- `squad_id`: current squad
- `last_action_at`: timestamp for timeout checks

## 3. Realtime Matchmaking (Sorted Sets)
Key: `queue:{sessionType}:waiting`
- Score: `rivalry_score` or `joined_at`
- Value: `userId`

## 4. Resurrection Windows (Keys with Expiry)
Key: `resurrection:{sessionId}:{eliminatedUserId}`
- Value: `squadId`
- Expiry: 60-120s (Dynamic based on round)

## 5. Global Rivalry Heatmap (Sorted Sets)
Key: `rivalry:global:heatmap`
- Score: `rivalry_index`
- Value: `playerOneId:playerTwoId`

## 6. WebSocket Connection Registry (Sets)
Key: `ws:connections:user:{userId}`
- Value: `socketId` (Multiple for multi-device support)

## 7. Rate Limiting (Strings with Expiry)
Key: `ratelimit:{userId}:{action}`
- Value: `count`
- Expiry: 1s-60s

## 8. Pub/Sub Channels
- `session:updates`: Global session state changes
- `user:{userId}:notifications`: Personal alerts
- `admin:broadcasts`: System-wide announcements
