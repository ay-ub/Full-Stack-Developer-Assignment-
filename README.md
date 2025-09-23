# Full-Stack Developer Assignment

## Objective

This project is a full-stack web application built to manage items and upload videos. It demonstrates proficiency with **React**, **FastAPI**, **SQLAlchemy**, and modern front-end libraries such as **Tailwind CSS**, **shadcn/ui**, **dnd-kit**, **Zustand**, and **React Hook Form**.

---

## Technology Stack

### Front-End

- **Framework:** React with Vite + TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Drag & Drop:** dnd-kit
- **State Management:** Zustand
- **Form Handling:** React Hook Form

### Back-End

- **Framework:** Python with FastAPI
- **Database:** SQLite (using SQLAlchemy ORM)

---

## Features

### 1. Dashboard Layout

- Clean single-page dashboard layout
- Fixed side panel for navigation (placeholder links)
- Main content area for forms and item list

### 2. Item Management

- Create new items using a form:
  - Text input for item name
  - Number input for
  - Date picker
- Display items in a list
- Edit and delete functionality:
  - Edit populates the form with item data
  - Delete removes the item from the list and database

### 3. Video Upload

- Upload video files from the dashboard
- Backend saves uploaded videos to `./uploads`
- Supports simple video processing or streaming

### 4. Drag & Drop Reordering

- Drag and drop items using **dnd-kit**
- Items can be reordered dynamically

---

## Environment Setup

Before running the application, you need to set up environment variables for both the frontend and backend.

### Frontend Environment Variables

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

### Backend Environment Variables

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   ```
   DATABASE_URL=sqlite:///./app.db
   ```

---

## Installation

### Frontend

```bash
cd client
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend

```bash
cd server
```

## Create virtual environment

```bash
python -m venv venv
```

## Install dependencies

```bash
pip install -r requirements.txt
```

## Run FastAPI server

```bash
uvicorn app.main:app --reload
```
