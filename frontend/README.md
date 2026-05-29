HMS/
│
├── backend/                         ← Spring Boot Backend
│
├── frontend/                        ← React Frontend
│   │
│   ├── node_modules/
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── api/                     ← Axios configs
│   │   │
│   │   ├── assets/                  ← Images, icons, logos
│   │   │
│   │   ├── components/              ← Reusable UI Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── layouts/                 ← Page Layout Structures
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── DoctorLayout.jsx
│   │   │   └── PatientLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ManageDoctors.jsx
│   │   │   │   └── ManagePatients.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   │
│   │   │   ├── doctor/
│   │   │   │   ├── DoctorDashboard.jsx
│   │   │   │   ├── Appointments.jsx
│   │   │   │   └── Prescriptions.jsx
│   │   │   │
│   │   │   ├── patient/
│   │   │   │   ├── PatientDashboard.jsx
│   │   │   │   ├── BookAppointment.jsx
│   │   │   │   └── MedicalHistory.jsx
│   │   │   │
│   │   │   └── receptionist/
│   │   │       ├── ReceptionDashboard.jsx
│   │   │       └── PatientRegistration.jsx
│   │   │
│   │   ├── routes/                  ← Route Management
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── services/                ← Backend API Services
│   │   │   ├── authService.js
│   │   │   ├── patientService.js
│   │   │   └── doctorService.js
│   │   │
│   │   ├── styles/                  ← CSS Files
│   │   │   ├── navbar.css
│   │   │   ├── login-page.css
│   │   │   ├── dashboard.css
│   │   │   └── sidebar.css
│   │   │
│   │   ├── utils/                   ← Helper Functions
│   │   │   ├── tokenUtils.js
│   │   │   └── roleUtils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── README.md
└── .gitignore