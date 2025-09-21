import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(url: string = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'): void {
    this.socket = io(url);
    
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public subscribeToAlerts(callback: (alert: any) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    
    this.socket.on('safety-alert', (alert) => {
      callback(alert);
    });
  }

  public unsubscribeFromAlerts(): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    
    this.socket.off('safety-alert');
  }
}

export default SocketService.getInstance();