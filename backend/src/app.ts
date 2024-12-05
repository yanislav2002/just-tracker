import express, { Request, Response } from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
