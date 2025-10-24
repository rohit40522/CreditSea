# CreditSea

## Project structure

credit-report-app/
├── backend/
│   ├── models/
│   │   └── CreditModel.js
│   ├── controllers/
│   │   └── creditController.js
│   ├── routes/
│   │   └── creditRoutes.js
│   ├── server.js
│   ├── package.json
│   └── ...
└── frontend/
    ├── src/
    │   ├── API/Api.js
    │   ├── components/
    │   │   ├── FileUpload.jsx
    │   │   └── ProfileCard.jsx
    │   ├── pages/Home.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    ├── index.css
    ├── package.json
    └── ...



## Backend
 Clone the repository
   git clone https://github.com/<your-username>/credit-report-app.git
  cd credit-report-app

Backend Setup
  cd backend
  npm install

Create a .env file inside /backend
  MONGO_URI="YOUR MONGDB URI"
  PORT=5000

  Start backend Server
    npm start


## Frontend
  Setup
    cd ../frontend
    npm install

    npm run dev

Connecting Frontend and Backend
http://localhost:5000/api





 
   
