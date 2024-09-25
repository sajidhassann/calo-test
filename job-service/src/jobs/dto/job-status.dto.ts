export class JobStatusDto {
    id: string;
    status: 'pending' | 'resolved' | 'failed';
    result?: string; // The URL of the random Unsplash image
  }
  