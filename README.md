# Student Placement Portal

A comprehensive full-stack web application for managing student placements, connecting students with companies, and streamlining the recruitment process.

## 🚀 Features

### For Students
- **Profile Management**: Create and maintain detailed profiles with education, skills, projects, and resume
- **Job Search**: Browse and search job postings with advanced filters
- **Application Tracking**: Apply to jobs and track application status in real-time
- **Dashboard**: View statistics and recent applications

### For Companies
- **Job Posting**: Create and manage job listings with detailed requirements
- **Application Management**: Review student applications and update their status
- **Company Profile**: Showcase company information and culture
- **Dashboard**: Monitor job postings and application metrics

### For Administrators
- **User Management**: Manage students, companies, and their accounts
- **Company Approval**: Review and approve company registrations
- **Statistics Dashboard**: View comprehensive placement statistics
- **Application Oversight**: Monitor all applications across the platform

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📁 Project Structure

```
student-placement-portal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service calls
│   │   ├── context/       # React context (Auth)
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth & validation
│   │   ├── config/        # Configuration
│   │   └── types/         # TypeScript interfaces
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd student-placement-portal
```

2. **Setup Backend**
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret

# Build TypeScript
npm run build
```

3. **Setup Frontend**
```bash
cd ../client
npm install

# Create .env file
cp .env.example .env
# Edit .env if needed (default: http://localhost:5000/api)
```

### Running the Application

**Note: As per your requirements, we're not starting the servers. To run the application:**

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server** (in server directory)
```bash
npm run dev
# Server will run on http://localhost:5000
```

3. **Start Frontend** (in client directory)
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

## 🔐 Default Admin Account

To create an admin account, you can register through the API or directly insert into MongoDB:

```javascript
// Using MongoDB shell or Compass
{
  email: "admin@placement.com",
  password: "<hashed-password>",
  role: "admin",
  isApproved: true
}
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Students
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `GET /api/students/all` - Get all students (Admin/Company)

### Companies
- `GET /api/companies/profile` - Get company profile
- `PUT /api/companies/profile` - Update company profile
- `GET /api/companies/all` - Get all companies (Admin/Student)

### Jobs
- `POST /api/jobs` - Create job (Company)
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get job details
- `GET /api/jobs/company` - Get company's jobs
- `PUT /api/jobs/:id` - Update job (Company)
- `DELETE /api/jobs/:id` - Delete job (Company)

### Applications
- `POST /api/applications` - Apply for job (Student)
- `GET /api/applications/student` - Get student's applications
- `GET /api/applications/job/:jobId` - Get job applications (Company)
- `PUT /api/applications/:id/status` - Update application status
- `GET /api/applications/all` - Get all applications (Admin)

### Admin
- `PUT /api/admin/approve/:userId` - Approve company
- `PUT /api/admin/reject/:userId` - Reject company
- `GET /api/admin/users` - Get all users
- `GET /api/admin/statistics` - Get platform statistics
- `DELETE /api/admin/users/:userId` - Delete user

## 🎨 Features Highlights

### Modern UI/UX
- Clean, professional design with Tailwind CSS
- Responsive layout for all screen sizes
- Intuitive navigation with role-based menus
- Card-based layouts for better content organization

### Security
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes on frontend and backend

### User Experience
- Real-time form validation
- Loading states and error handling
- Success/error notifications
- Smooth transitions and animations

## 🧪 Testing

### Backend
```bash
cd server
npm run build
# Check for TypeScript errors
npx tsc --noEmit
```

### Frontend
```bash
cd client
npm run build
# Check for TypeScript errors
npx tsc --noEmit
```

## 📦 Building for Production

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
# Output will be in dist/ directory
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React and TypeScript communities
- Tailwind CSS for the amazing utility-first CSS framework
- MongoDB for the flexible database solution
- Express.js for the robust backend framework

## 📞 Support

For support, email support@placement.com or create an issue in the repository.

---

**Happy Coding! 🚀**
