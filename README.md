🧠 AI-Powered RFP Management System

A full-stack application that automates Vendor, RFP, and Proposal management using Node.js, Express, MongoDB, and React, with Gemini AI integration to auto-generate structured RFPs.

🚀 Features
✅ Vendor Management

Add, edit, delete, and view vendors

Stored in MongoDB

Clean CRUD API

✅ RFP Management

Create, view, update, delete RFPs

Categorized & structured fields

Database-driven

✅ AI-Generated RFP (Gemini)

Enter any purchase description

AI converts it into a structured JSON RFP

Saved to database automatically

✅ Proposal Management

Create proposals linked to RFPs

CRUD operations

REST API based

✅ Frontend (React)

Vendor, RFP, and Proposal dashboards

Form-based data entry

Uses Axios to call backend APIs

🛠️ Tech Stack
Frontend

React

Vite

Axios

Backend

Node.js

Express.js

Mongoose (MongoDB)

Gemini API

Database

MongoDB (Local or Atlas)

📁 Project Structure
ai-rfp-management-system/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
│── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/kaneshak79/ai-rfp-management-system.git
cd ai-rfp-management-system

🔧 Backend Setup
cd backend
npm install


Create .env file:

MONGO_URI=mongodb://localhost:27017/rfp-db
GEMINI_API_KEY=your_api_key_here
PORT=5000


Run backend:

npm start

💻 Frontend Setup
cd frontend
npm install
npm run dev


App runs at:

http://localhost:5173

🔥 API Endpoints
Vendor
GET    /api/vendors
POST   /api/vendors
PUT    /api/vendors/:id
DELETE /api/vendors/:id

RFP
GET    /api/rfps
POST   /api/rfps
PUT    /api/rfps/:id
DELETE /api/rfps/:id
POST   /api/rfps/generate   <-- AI RFP Generator

Proposal
GET    /api/proposals
POST   /api/proposals
PUT    /api/proposals/:id
DELETE /api/proposals/:id


📸 Screenshots
Home Page- <img width="1920" height="1080" alt="Screenshot (9)" src="https://github.com/user-attachments/assets/fe4fd404-331d-4749-a842-def45916e004" />
Rfp Page- <img width="1920" height="1080" alt="Screenshot (10)" src="https://github.com/user-attachments/assets/3f542ab5-e24e-4ca9-bd03-04b60ece5c16" />
Vendors Page- <img width="1920" height="1080" alt="Screenshot (11)" src="https://github.com/user-attachments/assets/0be07565-22f9-41db-b86a-07b941de2161" />
Proposals Page- <img width="1920" height="1080" alt="Screenshot (12)" src="https://github.com/user-attachments/assets/7c5cd514-b5c7-4b46-ae27-79c93b14a445" />
Compare Proposal Page-<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/2ecfaae4-28b1-45d7-ac11-d25151504bfc" />

🏁 Status

✔️ Vendor CRUD complete
✔️ RFP CRUD + AI generator complete
✔️ Proposal CRUD complete
✔️ Frontend connected
✔️ Project functional end-to-end

👩‍💻 Author

Kanesha K
AI + Full-Stack Developer
