# Getting Started

This guide will help you set up the MERN Portfolio project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or v20.x)
- **npm** (v9.x or higher)
- **MongoDB** (v6.x or v7.x)
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/Mern-Profile.git
cd Mern-Profile
```

### 2. Install Dependencies

#### Windows
```powershell
.\scripts\setup.ps1
```

#### Linux/Mac
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Or manually install for each project:

```bash
# Backend
cd backend
npm install

# Dashboard
cd ../dashboard
npm install

# Portfolio
cd ../portfolio
npm install
```

### 3. Configure Environment Variables

Generate a template .env file:

```bash
node tools/generate-env.js
```

Edit `backend/.env` with your configuration:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET_KEY=your_generated_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### 5. Run Development Servers

Open three separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Dashboard:**
```bash
cd dashboard
npm run dev
```

**Terminal 3 - Portfolio:**
```bash
cd portfolio
npm run dev
```

## Access the Applications

- **Backend API:** http://localhost:4000
- **Portfolio:** http://localhost:3000
- **Dashboard:** http://localhost:3001

## Next Steps

- Read the [Architecture Documentation](./architecture.md)
- Check out the [API Documentation](./api.md)
- Learn about [Deployment](./deployment.md)
