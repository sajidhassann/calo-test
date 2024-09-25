import { Controller, Post, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(): Promise<{ id: string }> {
    const jobId = await this.jobsService.createJob();
    return { id: jobId };
  }

  @Get()
  async getAllJobs() {
    return this.jobsService.getAllJobs();
  }

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    return this.jobsService.getJobById(id);
  }
}
