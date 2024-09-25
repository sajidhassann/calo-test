import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Job } from './jobs/interfaces/job.interface';

enum Event {
    ON_RESOLVED_JOB = 'ON_RESOLVED_JOB'
}

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    emitResolvedJob(job: Job) {
        console.log('Emitting resolved job to client', JSON.stringify(job));
        this.server.emit(Event.ON_RESOLVED_JOB, job);
    }
}