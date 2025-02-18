import express from 'express';
import session from 'express-session';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'printloom-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Mock user data (replace with database in production)
const users = [
  {
    id: 1,
    email: 'admin@printloom.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@printloom.com',
    password: 'user123',
    role: 'user'
  }
];
const printJobs = [];
const messages = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Authentication status endpoint
app.get('/api/auth/status', (req, res) => {
  if (req.session.user) {
    // Don't send password in response
    const { password, ...userWithoutPassword } = req.session.user;
    res.json({
      authenticated: true,
      user: userWithoutPassword
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Don't store password in session
    const { password, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }
  
  const user = {
    id: users.length + 1,
    email,
    password,
    role: 'user'
  };
  
  users.push(user);
  
  // Don't store password in session
  const { password: _, ...userWithoutPassword } = user;
  req.session.user = userWithoutPassword;
  
  res.json({ success: true, user: userWithoutPassword });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    subject,
    message,
    createdAt: new Date()
  };
  
  messages.push(newMessage);
  res.json({ success: true });
});

app.post('/api/print', upload.single('file'), (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  const printJob = {
    id: printJobs.length + 1,
    userId: req.session.user.id,
    filename: req.file.filename,
    status: 'pending',
    createdAt: new Date(),
    options: req.body
  };
  
  printJobs.push(printJob);
  res.json({ success: true, jobId: printJob.id });
});

app.get('/api/jobs', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  const userJobs = printJobs.filter(job => job.userId === req.session.user.id);
  res.json(userJobs);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});