import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'phantom',
})
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    // 1. Register connection in Redis (ws:connections:user:{userId})
    // 2. Join session-specific rooms if user is active in a session
    console.log(`User ${userId} connected`);
  }

  handleDisconnect(client: Socket) {
    // 1. Remove connection from Redis
  }

  // --- SESSION EVENTS ---

  @SubscribeMessage('join_lobby')
  async handleJoinLobby(@MessageBody() data: { sessionId: string }, @ConnectedSocket() client: Socket) {
    client.join(`session:${data.sessionId}`);
    // Emit PLAYER_JOINED to the room
  }

  @SubscribeMessage('perform_action')
  async handlePlayerAction(@MessageBody() data: any) {
    // 1. Validate action (tokens, state)
    // 2. Process via Session Engine
    // 3. Broadcast result to room (e.g., PLAYER_STEAL_SUCCESS)
  }

  // --- SPIN EVENTS ---

  @SubscribeMessage('trigger_spin')
  async handleSpin(@MessageBody() data: { roundId: string }) {
    // 1. Calculate result
    // 2. Persist to DB
    // 3. Broadcast SPIN_RESULT to user
  }

  // --- ADMIN OVERRIDES ---

  @SubscribeMessage('admin_emergency_stop')
  async handleEmergencyStop(@MessageBody() data: { sessionId: string }) {
    // 1. Verify admin permissions
    // 2. Freeze all session state in Redis
    // 3. Broadcast SESSION_PAUSED to all participants
  }
}
