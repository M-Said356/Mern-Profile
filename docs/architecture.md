# Architecture

## System Overview

The MERN Portfolio is a full-stack application consisting of three main components:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
├──────────────────────┬──────────────────────────────────┤
│   Portfolio (React)  │   Dashboard (React)              │
│   Port: 3000         │   Port: 3001                     │
└──────────────────────┴──────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Express.js)                   │
│                   Port: 4000                            │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Database (MongoDB)                         │
│                   Port: 27017                           │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│         Cloud Storage (Cloudinary)                      │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Cloudinary
- **Validation:** Express Validator

### Frontend (Portfolio)
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context/Hooks
- **HTTP Client:** Axios

### Frontend (Dashboard)
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context/Hooks
- **HTTP Client:** Axios

## Project Structure

```
mern-profile/
├── backend/              # Node.js + Express API
│   ├── controller/       # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   ├── database/        # Database connection
│   └── utils/           # Utility functions
│
├── dashboard/           # React Admin Dashboard
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # State management
│   │   └── App.jsx      # Main app component
│   └── public/          # Static assets
│
├── portfolio/           # React Portfolio Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app component
│   └── public/          # Static assets
│
├── .github/             # GitHub Actions workflows
├── .devops/             # Docker, K8s configs
├── scripts/             # Automation scripts
├── tools/               # Utility tools
└── docs/                # Documentation
```

## Data Flow

### Authentication Flow
1. User submits credentials to `/api/v1/user/login`
2. Backend validates credentials
3. JWT token generated and sent in HTTP-only cookie
4. Client includes token in subsequent requests
5. Middleware validates token on protected routes

### Content Management Flow
1. Admin logs into dashboard
2. Creates/updates content (projects, skills, etc.)
3. Files uploaded to Cloudinary
4. Data saved to MongoDB
5. Portfolio fetches and displays updated content

## Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- Rate limiting (recommended)
- Helmet.js for security headers (recommended)

## Scalability Considerations

- Stateless API design
- Database indexing
- CDN for static assets (Cloudinary)
- Docker containerization
- Kubernetes orchestration support
- Horizontal scaling capability
