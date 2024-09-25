import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsService } from './jobs/jobs.service';
import { JobsController } from './jobs/jobs.controller';
import { JobQueue } from './jobs/job-queue';
import { BullModule } from '@nestjs/bull';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379 },
    }),
  ],
  controllers: [AppController, JobsController],
  providers: [AppService, JobsService, JobQueue, EventsGateway],
})
export class AppModule { }