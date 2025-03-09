MeowFi

## Project Structure

- **apps/frontend**: Contains the frontend application.
- **apps/backend**: Contains the backend application.

### Running the Applications

You can start the development servers for both the frontend and backend concurrently with:

```bash
npm run dev
```

Alternatively, you can run them separately:

- **Frontend:**
  ```bash
  npm run dev:frontend
  ```
- **Backend:**
  ```bash
  npm run dev:backend
  ```

## Scripts

- **dev:frontend**: Starts the frontend development server.
- **dev:backend**: Starts the backend development server.
- **dev**: Uses `concurrently` to run both frontend and backend servers at the same time.

