# THE PHANTOM - Production Engineering Report

## 1. System Architecture
The system is built as a **Distributed Realtime Multiplayer Ecosystem**. 

- **Frontend**: Cinematic React OS (already established).
- **Backend Orchestration**: NestJS with a modular architecture for horizontal scaling.
- **Persistence**: 
    - **PostgreSQL**: Source of truth for users, economies, and historical session data.
    - **Redis**: High-speed volatile storage for live session states, countdowns, and matchmaking.
- **Background Tasks**: BullMQ for processing asynchronous events (bot logic, payout distributions, Telegram notifications).

## 2. Core Engines
- **Matchmaking**: Prioritizes "Emotional Continuity" by matching rivals and squadmates based on historical affinity scores.
- **Rivalry Engine**: A dynamic scoring system that tracks steals, eliminations, and revenge acts, fueling the "Rivalry Panel" in the Command Center.
- **Bot AI**: Simulates believable player behavior with distinct personalities (Aggressor, Survivor, Chaos) to ensure liquidity and tension in every session.

## 3. Realtime Flow
- **WebSocket Gateway**: Manages state synchronization between the backend and the React frontend. Every UI widget (HUD, live player grid, tickers) is mapped to specific WS events.
- **Redis Pub/Sub**: Ensures that session updates (e.g., a player elimination) are broadcast across all distributed backend nodes.

## 4. Telegram Integration
- **Orchestration Layer**: Handles onboarding via Telegram `initData`, manages camp verification (subscriber counts), and triggers live session alerts directly to camp groups and channels.
- **Strategic Isolation**: Gameplay remains strictly within the webapp, while Telegram serves as the social and notification hub.

## 5. Economy & Security
- **Immutable Ledger**: Every transaction (payouts, entry fees, commissions) is logged in an immutable audit table.
- **Fraud Prevention**: Device fingerprinting and risk-scoring track suspicious login patterns or bot-like behavior from human accounts.
- **Manager Commissions**: Automated payout engine for camp managers based on their audience's session participation and performance.

## 6. Deployment & Scaling
- **Containerization**: Full Docker support for independent scaling of the API, WebSocket Gateway, and Worker nodes.
- **Monitoring**: Prometheus/Grafana stack for live tracking of session health, concurrent users, and economy stability.

---
**Status**: Backend architecture, Database schema, Redis strategy, and Core logic modules have been initialized.
**Next Phase**: Implementation of specific API routes and integration of the Telegram Bot SDK.
