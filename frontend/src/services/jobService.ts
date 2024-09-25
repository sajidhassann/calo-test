import axios from 'axios';
import { Job } from '../interfaces/Job';

// Base API URL (adjust as per your backend setup)
const API_URL = 'http://localhost:3000';

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

export const createJob = async (): Promise<string> => {
  const response = await axios.post(`${API_URL}/jobs`);
  return response.data.id;
};

export const fetchJobById = async (id: string): Promise<Job> => {
  const response = await axios.get(`${API_URL}/jobs/${id}`);
  return response.data;
};
