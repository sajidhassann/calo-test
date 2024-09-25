Job Management System
This is a full-stack job management system where users can create jobs that fetch random Unsplash images from the food category. Jobs can have random delays and can take anywhere from 5 seconds to 5 minutes to resolve. The system uses WebSockets to update the client in real-time as jobs are resolved.

Tech Stack
Backend: NestJS, Bull Queue, Socket.IO, Redis
Frontend: React, Vite, TypeScript, TailwindCSS, Socket.IO-client
Data storage: JSON file for simplicity (No database used)
Features
Create jobs with random delays.
Fetch random Unsplash images from the "food" category.
Real-time job status updates using WebSockets.
Display job results when available.
Jobs persist between server restarts (stored in a file).
Handles high load with multiple pending jobs.
Handles unstable network connection by using WebSocket reconnections.
Setup Instructions
1. Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/sajidhassann/calo-test.git
cd your-repository
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install Redis (if not already installed):

On macOS:
bash
Copy code
brew install redis
brew services start redis
On Ubuntu:
bash
Copy code
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server.service
sudo systemctl start redis-server.service
Run the backend:

bash
Copy code
npm run start
2. Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install frontend dependencies:

bash
Copy code
yarn install
Run the frontend:

bash
Copy code
yarn dev
3. Running the Project
The frontend should be available at http://localhost:5173 (default Vite port).
The backend should be available at http://localhost:3000 (NestJS default port).
Ensure that Redis is running locally.
Time Report
This is a breakdown of the time spent on each major section of the project:

1. Backend (Total: 7 hours)
Project setup and configuration (NestJS, Redis, Bull Queue): 1 hour
Job queue logic (delayed job execution, fetching images from Unsplash): 2 hours
WebSocket setup and real-time job updates: 1.5 hours
File-based data storage and job persistence: 1 hour
Error handling and edge cases (high load, network instability): 1.5 hours
2. Frontend (Total: 5 hours)
Project setup and configuration (Vite, React, TypeScript, TailwindCSS): 1 hour
Job listing and creation UI: 2 hours
WebSocket integration and real-time job updates: 1.5 hours
Styling and responsive UI with TailwindCSS: 0.5 hours
3. Testing and Debugging (Total: 2 hours)
Testing job creation and resolution (manual tests): 1 hour
Debugging WebSocket connection and job queue issues: 1 hour
API Endpoints
1. POST /jobs
Create a new job.

Request:

http
Copy code
POST http://localhost:3000/jobs
Response:

json
Copy code
{
  "id": "job-id"
}
2. GET /jobs
Retrieve all jobs with their statuses.

Request:

http
Copy code
GET http://localhost:3000/jobs
Response:

json
Copy code
[
  {
    "id": "job-id",
    "status": "pending",
    "result": null
  },
  {
    "id": "job-id-2",
    "status": "resolved",
    "result": "https://image.unsplash.com/photo-url"
  }
]
3. GET /jobs/
Retrieve a specific job by ID.

Request:

http
Copy code
GET http://localhost:3000/jobs/:id
Response:

json
Copy code
{
  "id": "job-id",
  "status": "resolved",
  "result": "https://image.unsplash.com/photo-url"
}
WebSocket Events
Event: ON_RESOLVED_JOB
When a job is resolved, the backend emits the ON_RESOLVED_JOB event to all connected clients.

Payload:

json
Copy code
{
  "id": "job-id",
  "status": "resolved",
  "result": "https://image.unsplash.com/photo-url"
}