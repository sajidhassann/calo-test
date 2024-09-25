import { Injectable } from '@nestjs/common';
import * as Bull from 'bull';
import { Job } from './interfaces/job.interface';
import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';
import { EventsGateway } from 'src/events.gateway';

@Injectable()
export class JobQueue {
    private jobQueue: Bull.Queue<Job>;
    private unsplashApi = 'https://api.unsplash.com/photos/random/?client_id=QTPejTSotopfu3BtrTxzVemNOGTrKLBY9RaTY1MXWOk&query=food'
    private jobs: Array<Job> = []
    constructor(private readonly eventsGateway: EventsGateway) {
        this.loadJobs()

        this.jobQueue = new Bull('jobQueue', {
            redis: { host: 'localhost', port: 6379 },
        });
        this.jobQueue.process(async ({ data: job }) => {
            await this.resolveJob(job)
            return job;
        });
    }

    private async executeJob(job: Job) {
        try {
            const data = await axios.get(this.unsplashApi).then(res => res.data)
            job.status = 'resolved';
            job.result = data.urls.small
        } catch (err) {
            console.log({ err });
            job.status = 'failed';
        }
        return job
    }
    private async resolveJob(job: Job) {
        job = await this.executeJob(job)
        this.jobs = this.jobs.map(j => job.id === j.id ? job : j)
        this.eventsGateway.emitResolvedJob(job)
        await this.saveJobResult();
    }

    async addJob(job: Job): Promise<void> {
        this.jobs.push(job)
        await this.saveJobResult();
        await this.jobQueue.add(job, {
            delay: this.generateRandomDelay(),
        });
    }

    private generateRandomDelay(): number {
        return Math.floor(Math.random() * (60 * 1000)) + 5000;
    }

    private async saveJobResult(): Promise<void> {
        const filePath = path.resolve(__dirname, 'jobs.json');
        await fs.writeJson(filePath, this.jobs, { spaces: 2 });
    }

    private async loadJobs() {
        const filePath = path.resolve(__dirname, 'jobs.json');
        let jobs: Array<Job> = [];
        if (await fs.pathExists(filePath)) {
            jobs = await fs.readJson(filePath);
        }
        this.jobs = jobs
        return this.jobs
    }

    async getAllJobs(): Promise<Job[]> {
        return this.loadJobs()
    }

    async getJobById(id: string): Promise<Job | undefined> {
        const jobs = await this.getAllJobs();
        return jobs.find((job) => job.id === id);
    }
}
