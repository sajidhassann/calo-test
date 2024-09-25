import { io, Socket } from 'socket.io-client';
import { Job } from '../interfaces/Job';

const SOCKET_URL = 'http://localhost:3000'; // Adjust to your backend URL

enum Event {
    ON_RESOLVED_JOB = 'ON_RESOLVED_JOB'
}

class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(SOCKET_URL);
    }

    // Listen for resolved job events
    onResolvedJob(callback: (job: Job) => void) {
        this.socket.on(Event.ON_RESOLVED_JOB, (job: Job) => {
            callback(job);
        });
    }

    // Optionally, you can add other event handlers here, e.g., disconnect, reconnect, etc.
}

export default new SocketService();
