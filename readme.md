# Slipstream Client Management Application

## Overview
This is a basic application to manage clients using a SQL Server database, a C# WebApi backend with .NET 8, and a React frontend built with Vite.


## Prerequisites
- .NET 8 SDK
- Node.js (v16+) (tested with Node v18)
- SQL Server

## Getting Started

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DuncanPodmore/slipstream-Assessment
   cd backend
   ```

2. **Set up the database:**
   - Create a database in your SQL Server instance.
   - Update the connection string in `appsettings.json`:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Your_Connection_String_Here"
       }
     }
     ```

3. **Apply migrations:**
   ```bash
   dotnet ef database update --startup-project API/API.csproj -c API.Models.BackendDbContext
   ```

4. **Run the backend server:**
   ```bash
   dotnet run --project API/API.csproj
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

