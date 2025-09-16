import { io, Socket } from 'socket.io-client';

class SocketClient {
    private socket: Socket | null = null;
    private token: string | null = null;

    connect(token: string) {
        if (this.socket?.connected) {
            return this.socket;
        }

        this.token = token;
        this.socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/meal-plan`, {
            auth: {
                token: token,
            },
            autoConnect: true,
        });
        console.log('socket : ', this.socket)

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    getSocket() {
        return this.socket;
    }

    isConnected() {
        return this.socket?.connected || false;
    }
}

export const socketClient = new SocketClient();
