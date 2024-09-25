import React, { useState } from 'react';
import { createJob } from '../services/jobService';

interface Props {
    onJobCreated: () => void;
}

const CreateJob: React.FC<Props> = ({ onJobCreated }) => {
    const [creating, setCreating] = useState(false);

    const handleCreateJob = async () => {
        setCreating(true);
        await createJob();
        setCreating(false);
        onJobCreated(); // Notify parent to refresh the job list
    };

    return (
        <div className="p-4">
            <button
                onClick={handleCreateJob}
                disabled={creating}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
            >
                {creating ? 'Creating...' : 'Create New Job'}
            </button>
        </div>
    );
};

export default CreateJob;
