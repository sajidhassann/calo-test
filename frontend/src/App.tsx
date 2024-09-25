import React, { useState } from 'react';
import CreateJob from './components/CreateJob';
import JobList from './components/JobList';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshJobList = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger reload in JobList
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Job Management</h1>
        <CreateJob onJobCreated={refreshJobList} />
        <JobList key={String(refresh)} />
      </div>
    </div>
  );
};

export default App;
