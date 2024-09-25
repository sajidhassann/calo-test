import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Job } from './interfaces/job.interface';
import { JobQueue } from './job-queue';

@Injectable()
export class JobsService {
    constructor(private readonly jobQueue: JobQueue) { }

    async createJob(): Promise<string> {
        const job: Job = {
            id: uuidv4(),
            status: 'pending',
            createdAt: new Date(),
        };

        await this.jobQueue.addJob(job);
        return job.id;
    }

    async getAllJobs() {
        return this.jobQueue.getAllJobs();
    }

    async getJobById(id: string) {
        return this.jobQueue.getJobById(id);
    }
}
