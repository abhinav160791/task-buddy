# Task Buddy

## A small project to create, list and delete tasks 📋📋📋

## Prerequisites

- Python - v3.10
- Node.js - v22.12.0
- yarn - v1.22.22

## Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Create a virtual environment:

   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. Install the required dependencies:

   ```sh
   pip install -r requirements.txt
   ```

5. Run the necessary migrations

   ```sh
   python manage.py migrate
   ```

6. Run the Django development server:
   ```sh
   python manage.py runserver
   ```

## Frontend Setup

1. Navigate to the UI directory:

   ```sh
   cd ../UI
   ```

2. Install the required dependencies:

   ```sh
   yarn install
   ```

3. Create a `.env` file from `.env.example`, the value should be same as the backend URL with port

4. Start the development sertver:
   ```sh
   yarn dev
   ```

## Accessing the Application

- The backend server will be running at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- The frontend server will be running at [http://localhost:5173/](http://localhost:5173/)

Open your browser and navigate to the frontend server URL to access the application.

## Additional Notes

- Ensure that both the backend and frontend servers are running simultaneously.
- If you encounter any issues, check the respective server logs for more information.
