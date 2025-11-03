# Frontend
## Test Frontend
To start a test frontend, you can simply run

    ../frontend_up

in the terminal. This will start a development server for the frontend.

## VITE_API_URL
For the frontend to work, the VITE_API_URL must be set. Currently, it is set in Github to connect
to my personal Raspberry Pi server. For a production frontend, the variable is not set in this
repository.

## Backend Connection
When running ./backend_up and ./frontend_up, the frontend runs at http://localhost:5173
and the backend at http://localhost:8000. Both should then automatically communicate with each
other. If you want to connect the frontend to a different backend, you can set the
VITE_API_URL variable in an .env file in the frontend directory.
