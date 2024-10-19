Cuvette Job Board
A full-stack job posting board application with email automation features. This project allows companies to register, post job listings, and automate email communications with candidates.

features

User authentication (signup, login, email verification)
Job posting creation and management
Dashboard for companies to manage their job postings
Email automation for candidate communication
Responsive design for various screen sizes

Technologies Used
Frontend

React.js
React Router for navigation
Axios for API requests
CSS for styling

Backend

Node.js
Express.js
MongoDB for database
Mongoose as ODM
JSON Web Tokens (JWT) for authentication
Nodemailer for email functionality

Setup and Installation

Clone the repository
Copygit clone https://github.com/your-username/cuvette-job-board.git
cd cuvette-job-board

Setup Backend
Copycd server
npm install
cp .env.example .env
# Edit .env with your configuration

Setup Frontend
Copycd ../client
npm install

Start the application

For backend:
Copycd ../server
npm start

For frontend:
Copycd ../client
npm start



Access the application at http://localhost:3000

Environment Variables
Ensure you set up the following environment variables in your server/.env file:
CopyMONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
EMAIL_FROM=your_sender_email
API Endpoints

POST /api/auth/signup: Register a new company
POST /api/auth/login: Login for companies
POST /api/jobs: Create a new job posting
GET /api/jobs: Get all job postings
POST /api/jobs/:jobId/send-alerts: Send job alerts to candidates

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
License
This project is licensed under the MIT License.
