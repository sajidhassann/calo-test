import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/jobService';
import { Job } from '../interfaces/Job';
import socketService from '../services/socketService';

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJobs = async () => {
            const fetchedJobs = await fetchJobs();
            setJobs(fetchedJobs);
            setLoading(false);
        };

        loadJobs();

        // Listen for WebSocket events
        socketService.onResolvedJob((resolvedJob: Job) => {
            // Update the job in the job list when it gets resolved
            setJobs((prevJobs) =>
                prevJobs.map((job) =>
                    job.id === resolvedJob.id ? { ...job, ...resolvedJob } : job
                )
            );
        });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Job List</h2>
            {loading ? (
                <div>Loading...</div>
            ) : jobs.length === 0 ? (
                <div>No jobs available</div>
            ) : (
                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li
                            key={job.id}
                            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
                        >
                            <span className="font-medium">Job ID: {job.id}</span>
                            <span
                                className={`px-2 py-1 rounded ${job.status === 'resolved'
                                        ? 'bg-green-500 text-white'
                                        : job.status === 'failed'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-yellow-500 text-white'
                                    }`}
                            >
                                {job.status}
                            </span>
                            {job.result && (
                                <img
                                    src={job.result}
                                    alt="Unsplash Image"
                                    className="h-12 w-12 rounded-md"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobList;
